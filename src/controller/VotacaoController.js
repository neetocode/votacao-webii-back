import BaseController from './BaseController'
import VotacaoCommand from './../command/VotacaoCommand'

class VotacaoController extends BaseController {

    constructor(db) {
        super();

        this.db = db;

        this.getAllVotacao = this.getAllVotacao.bind(this);
        this.getVotacaoById = this.getVotacaoById.bind(this);
        this.createVotacao = this.createVotacao.bind(this);
    }

    async getAllVotacao(req, resp) {
        try {
            const command = new VotacaoCommand(this.db);

            const result = await command.getAllVotacao();

            if (command.validator.isValid())
                this.OkOnlyData(resp, result)
            else
                this.Fail(resp, command.validator.errors)
        } catch (ex) {
            this.ServerError(resp, ex)
        }
    }
    async getVotacaoById(req, resp) {
        try {
            const command = new VotacaoCommand(this.db);

            const { votacaoId } = req.params;

            const result = await command.getVotacaoById(votacaoId);

            if (command.validator.isValid())
                this.OkOnlyData(resp, result)
            else
                this.Fail(resp, command.validator.errors)
        } catch (ex) {
            this.ServerError(resp, ex)
        }
    }
    async createVotacao(req, resp) {
        try {
            const command = new VotacaoCommand(this.db)

            const { titulo, descricao, senhaAcesso, senhaAdmin, endIn, allowAnon, allowRewrite } = req.body;

            const result = await command.createVotacao(titulo, descricao, senhaAcesso, senhaAdmin, endIn, allowAnon, allowRewrite)

            if (command.validator.isValid())
                this.Ok(resp, result)
            else
                this.Fail(resp, command.validator.errors)
        } catch (ex) {
            this.ServerError(resp, ex)
        }
    }



}

export default VotacaoController;