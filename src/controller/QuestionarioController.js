import BaseController from './BaseController'
import QuestionarioCommand from './../command/QuestionarioCommand'

class QuestionarioController extends BaseController {

    constructor(db) {
        super();

        this.db = db;

        this.getAllQuestionario = this.getAllQuestionario.bind(this);
        this.getQuestionarioById = this.getQuestionarioById.bind(this);
        this.createQuestionario = this.createQuestionario.bind(this);
    }

    async getAllQuestionario(req, resp) {
        try {
            const command = new QuestionarioCommand(this.db);

            const result = await command.getAllQuestionario();

            if (command.validator.isValid())
                this.OkOnlyData(resp, result)
            else
                this.Fail(resp, command.validator.errors)
        } catch (ex) {
            this.ServerError(resp, ex)
        }
    }
    async getQuestionarioById(req, resp) {
        try {
            const command = new QuestionarioCommand(this.db);

            const { questionarioId } = req.params;

            const result = await command.getQuestionarioById(questionarioId);

            if (command.validator.isValid())
                this.OkOnlyData(resp, result)
            else
                this.Fail(resp, command.validator.errors)
        } catch (ex) {
            this.ServerError(resp, ex)
        }
    }
    async createQuestionario(req, resp) {
        try {
            const command = new QuestionarioCommand(this.db)

            const { titulo, descricao, senhaAcesso, senhaAdmin, endIn, allowAnon, allowRewrite } = req.body;

            const result = await command.createQuestionario(titulo, descricao, senhaAcesso, senhaAdmin, endIn, allowAnon, allowRewrite)

            if (command.validator.isValid())
                this.Ok(resp, result)
            else
                this.Fail(resp, command.validator.errors)
        } catch (ex) {
            this.ServerError(resp, ex)
        }
    }



}

export default QuestionarioController;