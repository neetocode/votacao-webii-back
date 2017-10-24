import express from 'express'

class VotacaoRouter {
    static configure(votacaoController) {
        const router = express.Router();

        router.get('/', votacaoController.getAllVotacao);
        router.get('/:votacaoId', votacaoController.getVotacaoById);
        router.get('/:votacaoId/perguntas', votacaoController.getPerguntasByVotacaoId);


        router.post('/', votacaoController.createVotacao);

        return router;

    }
}

export default VotacaoRouter;