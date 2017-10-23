import express from 'express'

class QuestionarioRouter {
    static configure(questionarioController) {
        const router = express.Router();

        router.get('/', questionarioController.getAllQuestionario);
        router.get('/:questionarioId', questionarioController.getQuestionarioById);
        

        router.post('/', questionarioController.createQuestionario);

        return router;

    }
}

export default QuestionarioRouter;