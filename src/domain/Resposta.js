import { ObjectId } from 'mongodb'


class Resposta {

    constructor(questionarioId, perguntas, horario, nomePessoa) {

        this._id = new ObjectId();
        this.questionarioId = questionarioId;
        this.perguntas = perguntas;
        this.horario = horario;
        this.nomePessoa = nomePessoa;
        this.deleted = false;
    }

    toObj() {
        const obj = {
            questionarioId: this.questionarioId,
            perguntas: this.perguntas,
            horario: this.horario,
            nomePessoa: this.nomePessoa,
            deleted: this.deleted
        }

        return obj;
    }
}

export default Resposta;