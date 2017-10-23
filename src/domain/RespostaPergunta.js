import { ObjectId } from 'mongodb'

class RespostaPergunta {

    constructor(perguntaId, titulo, valor){
        
        this._id = new ObjectId();
        this.perguntaId = perguntaId;
        this.titulo = titulo;
        this.valor = valor;
    }

    toObj(){
        const obj = {
            _id: this._id,
            perguntaId: this.perguntaId,
            titulo: this.titulo,
            valor: this.valor
        }

        return obj;
    }
}

export default RespostaPergunta;