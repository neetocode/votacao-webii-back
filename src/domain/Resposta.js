import { ObjectId } from 'mongodb'


class Resposta {

    constructor(votacaoId, perguntas, horario, nomePessoa) {

        this._id = new ObjectId();
        this.votacaoId = votacaoId;
        this.perguntas = perguntas;
        this.horario = horario;
        this.nomePessoa = nomePessoa;
        this.deleted = false;
    }

    toObj() {
        const obj = {
            votacaoId: this.votacaoId,
            perguntas: this.perguntas,
            horario: this.horario,
            nomePessoa: this.nomePessoa,
            deleted: this.deleted
        }

        return obj;
    }
}

export default Resposta;