import express from 'express'

class RespostaRouter{
    static configure(respostaController){
        const router = express.Router();

        // router.get('', respostaController.getAll);

        return router;
    }
}

export default RespostaRouter;