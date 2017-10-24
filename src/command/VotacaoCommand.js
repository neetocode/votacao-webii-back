import BaseCommand from './BaseCommand'
import { collections } from './../mongoDb';
import { ObjectId } from 'mongodb';
import Votacao from './../domain/Votacao'

class VotacaoCommand extends BaseCommand {
    constructor(db) {
        super();

        this.db = db;

        this.votacaoDb = db.collection(collections.votacao);
        this.respostaDb = db.collection(collections.resposta);

        this.getAllVotacao = this.getAllVotacao.bind(this);
        this.getVotacaoById = this.getVotacaoById.bind(this);
        this.createVotacao = this.createVotacao.bind(this);
        this.editVotacaoDados = this.editVotacaoDados.bind(this);
        this.startVotacao = this.startVotacao.bind(this);
        this.endVotacao = this.endVotacao.bind(this);
    }

    async getAllVotacao() {
        try {

            const votacaos = await this.votacaoDb.find({}).toArray();

            return votacaos;

        } catch (err) {
            return this.handleException(err);
        }
    }
    async getVotacaoById(votacaoId) {
        try {

            const votacao = await this.votacaoDb.findOne({ _id: new ObjectId(votacaoId) }, { senhaAcesso: 0, senhaAdmin: 0, perguntas: 0 });

            return votacao;

        } catch (err) {
            return this.handleException(err);
        }
    }
    async getPerguntasByVotacaoId(votacaoId) {
        try {

            const votacao = await this.votacaoDb.findOne({ _id: new ObjectId(votacaoId) }, { perguntas: 1 });

            return votacao.perguntas;

        } catch (err) {
            return this.handleException(err);
        }
    }
    async createVotacao(titulo, descricao, senhaAcesso, senhaAdmin, endIn, allowAnon, allowRewrite, perguntas) {
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

            if (perguntas.length == 0) return this.validator.addError('Você deve passar ao menos uma pergunta.');

            const novoVotacao = new Votacao(titulo, descricao, senhaAcesso, senhaAdmin, allowAnon, allowRewrite, endIn);

            const insertResult = await this.votacaoDb.insertOne(novoVotacao.toObj())

            if (insertResult.insertedCount === 1) {
                const value = await this.votacaoDb.findOne({ _id: insertResult.insertedId })
                return value;
            } else {
                return this.validator.addError('Falha ao gravar registro.');
            }


        } catch (err) {
            return this.handleException(err);
        }
    }

    async editVotacaoDados(votacaoId, titulo, descricao, senhaAcesso, endIn, allowAnon, allowRewrite) {
        try {
            if (!votacaoId) return this.validator.addError('votacaoId é obrigatório.');

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

            const updateResult = await this.votacaoDb.findOneAndUpdate({ _id: new ObjectId(votacaoId) }, { $set: updatePayload }, { returnNewDocument: true, returnOriginal: false });

            if (updateResult.value) {
                return updateResult.value;
            } else {
                return this.validator.addError('O registro não foi alterado.');
            }


        } catch (err) {
            return this.handleException(err);
        }
    }

    async startVotacao(votacaoId, senhaAdmin) {
        try {
            const votacao = await this.votacaoDb.findOne({ _id: new ObjectId(votacaoId) });
            if (votacao == null) return this.validator.addError('Questionário não existe.');

            if (votacao.senhaAdmin !== senhaAdmin) return this.validator.addError('Senha inválida.')

            const updateResult = await this.votacaoDb.findOneAndUpdate({ _id: votacao._id }, { inProgress: true });
            if (updateResult.value) {
                return true
            } else {
                return this.validator.addError('O registro não foi alterado.');
            }


        } catch (err) {
            return this.handleException(err);
        }
    }
    async endVotacao(votacaoId, senhaAdmin) {
        try {
            const votacao = await this.votacaoDb.findOne({ _id: new ObjectId(votacaoId) });
            if (votacao == null) return this.validator.addError('Questionário não existe.');

            if (votacao.senhaAdmin !== senhaAdmin) return this.validator.addError('Senha inválida.')

            const updateResult = await this.votacaoDb.findOneAndUpdate({ _id: votacao._id }, { inProgress: false });
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

export default VotacaoCommand;