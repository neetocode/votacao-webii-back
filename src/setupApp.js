
// bibliotecas
require('dotenv').config();
import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// servicos
import MongoDb from './mongoDb'

import QuestionarioController from './controller/QuestionarioController'
import RespostaController from './controller/RespostaController'

import QuestionarioRouter from './router/QuestionarioRouter'
import RespostaRouter from './router/RespostaRouter'

// funcao que da start na aplicacao
const setupApp = async () => {
    //#region servicos

    const db = await MongoDb.getDb();

    //#endregion


    //#region controllers

    const questionarioCtrl = new QuestionarioController(db);
    const respostaCtrl = new RespostaController(db);

    //#endregion


    //#region routers

    const rootRouter = Express.Router();

    rootRouter.use('/questionario', QuestionarioRouter.configure(questionarioCtrl))
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