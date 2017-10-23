import BaseCommand from './BaseCommand'
import { collections } from './../mongoDb';
import { ObjectId } from 'mongodb';
import Questionario from './../domain/Questionario'

class QuestionarioCommand extends BaseCommand {
    constructor(db) {
        super();

        this.db = db;

        this.questionarioDb = db.collection(collections.questionario);
        this.respostaDb = db.collection(collections.resposta);

        this.getAllQuestionario = this.getAllQuestionario.bind(this);
        this.getQuestionarioById = this.getQuestionarioById.bind(this);
        this.createQuestionario = this.createQuestionario.bind(this);
        this.editQuestionarioDados = this.editQuestionarioDados.bind(this);
        this.startQuestionario = this.startQuestionario.bind(this);
        this.endQuestionario = this.endQuestionario.bind(this);
    }

    async getAllQuestionario() {
        try {

            const questionarios = await this.questionarioDb.find({}).toArray();

            return questionarios;

        } catch (err) {
            return this.handleException(err);
        }
    }
    async getQuestionarioById(questionarioId) {
        try {

            const questionario = await this.questionarioDb.findOne({ _id: new ObjectId(questionarioId) });

            return questionario;

        } catch (err) {
            return this.handleException(err);
        }
    }
    async createQuestionario(titulo, descricao, senhaAcesso, senhaAdmin, endIn, allowAnon, allowRewrite) {
        try {

            this.validator
                .isRequired(titulo, 'titulo')
                .isRequired(senhaAdmin, 'senhaAdmin');

            if (!this.validator.isValid()) return null;

            this.validator
                .minLength(titulo, 3, 'titulo')
                .maxLength(titulo, 100, 'titulo')
                .maxLength(senhaAdmin, 8, 'senhaAdmin');

            if (descricao) this.validator.maxLength(descricao, 500, 'descricao');
            if (senhaAcesso) this.validator.minLength(senhaAcesso, 4, 'senhaAcesso').maxLength(senhaAcesso, 8, 'senhaAcesso');

            if (!this.validator.isValid()) return null;

            const novoQuestionario = new Questionario(titulo, descricao, senhaAcesso, senhaAdmin, allowAnon, allowRewrite, endIn);

            const insertResult = await this.questionarioDb.insertOne(novoQuestionario.toObj())

            if (insertResult.insertedCount === 1) {
                const value = await this.questionarioDb.findOne({ _id: insertResult.insertedId })
                return value;
            } else {
                return this.validator.addError('Falha ao gravar registro.');
            }


        } catch (err) {
            return this.handleException(err);
        }
    }

    async editQuestionarioDados(questionarioId, titulo, descricao, senhaAcesso, endIn, allowAnon, allowRewrite) {
        try {
            if (!questionarioId) return this.validator.addError('questionarioId é obrigatório.');

            this.validator
                .minLength(titulo, 3, 'titulo')
                .maxLength(titulo, 100, 'titulo')
                .maxLength(descricao, 500, 'descricao')
                .minLength(senhaAcesso, 4, 'senhaAcesso')
                .maxLength(senhaAcesso, 8, 'senhaAcesso');

            if (!this.validator.isValid()) return null;

            const updatePayload = {
                titulo: titulo,
                descricao: descricao,
                senhaAcesso: senhaAcesso,
                endIn: endIn,
                allowAnon: allowAnon,
                allowRewrite: allowRewrite
            }

            const updateResult = await this.questionarioDb.findOneAndUpdate({ _id: new ObjectId(questionarioId) }, { $set: updatePayload }, { returnNewDocument: true, returnOriginal: false });

            if (updateResult.value) {
                return updateResult.value;
            } else {
                return this.validator.addError('O registro não foi alterado.');
            }


        } catch (err) {
            return this.handleException(err);
        }
    }

    async startQuestionario(questionarioId, senhaAdmin) {
        try {
            const questionario = await this.questionarioDb.findOne({ _id: new ObjectId(questionarioId) });
            if (questionario == null) return this.validator.addError('Questionário não existe.');

            if (questionario.senhaAdmin !== senhaAdmin) return this.validator.addError('Senha inválida.')

            const updateResult = await this.questionarioDb.findOneAndUpdate({ _id: questionario._id }, { inProgress: true });
            if (updateResult.value) {
                return true
            } else {
                return this.validator.addError('O registro não foi alterado.');
            }


        } catch (err) {
            return this.handleException(err);
        }
    }
    async endQuestionario(questionarioId, senhaAdmin) {
        try {
            const questionario = await this.questionarioDb.findOne({ _id: new ObjectId(questionarioId) });
            if (questionario == null) return this.validator.addError('Questionário não existe.');

            if (questionario.senhaAdmin !== senhaAdmin) return this.validator.addError('Senha inválida.')

            const updateResult = await this.questionarioDb.findOneAndUpdate({ _id: questionario._id }, { inProgress: false });
            if (updateResult.value) {
                return true;
            } else {
                return this.validator.addError('O registro não foi alterado.');
            }


        } catch (err) {
            return this.handleException(err);
        }
    }

}

export default QuestionarioCommand;