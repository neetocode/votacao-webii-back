
// bibliotecas
import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// servicos
import MongoDb from './mongoDb'

import VotacaoController from './controller/VotacaoController'
import RespostaController from './controller/RespostaController'

import VotacaoRouter from './router/VotacaoRouter'
import RespostaRouter from './router/RespostaRouter'

// funcao que da start na aplicacao
const setupApp = async () => {
    //#region servicos

    const db = await MongoDb.getDb();

    //#endregion


    //#region controllers

    const votacaoCtrl = new VotacaoController(db);
    const respostaCtrl = new RespostaController(db);

    //#endregion


    //#region routers

    const rootRouter = Express.Router();

    rootRouter.use('/votacao', VotacaoRouter.configure(votacaoCtrl))
    rootRouter.use('/resposta', RespostaRouter.configure(respostaCtrl))


    //#endregion



    //#region pipeline
    const app = Express();

    app.use(cors());

    // verifica se request é multipart (file upload)
    app.use([
        bodyParser.json({
            limit: '3mb'
        }),
        bodyParser.urlencoded({
            extended: false
        })
    ]
    );

    app.use('/', rootRouter);

    return app;

    //#endregion
}


export default setupApp;