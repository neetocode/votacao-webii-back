import BaseController from './BaseController'
import ValidationContract from './../shared/ValidationContract';
import { collections } from './../mongoDb';


class RespostaController extends BaseController {

    constructor(db) {
        super();
        
        this.db = db;
        this.votacaoDb = db.collection(collections.votacao);
        this.respostaDb = db.collection(collections.resposta);

        this.validator = new ValidationContract();
    }


    async createResposta(req, resp) {
        try {

        } catch (err) {
            return this.ServerError(resp, err);
        }
    }


    async model(req, resp) {
        try {

        } catch (err) {
            return this.ServerError(resp, err);
        }
    }



}

export default RespostaController;