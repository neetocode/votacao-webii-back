import { ObjectId } from 'mongodb'


class QuestionarioPergunta {

    constructor(titulo) {
        this._id = new ObjectId();
        this.titulo = titulo;
    }

    toObj() {
        const obj = {
            _id: this._id,
            titulo: this.titulo
        }

        return obj;
    }


}


export default QuestionarioPergunta