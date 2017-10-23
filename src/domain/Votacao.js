import { ObjectId } from 'mongodb'

class Votacao {

    constructor(titulo, descricao = '', senhaAcesso = '', senhaAdmin = '', allowAnon = true, allowRewrite = true, endIn) {
        this._id = new ObjectId();

        this.titulo = titulo;
        this.descricao = descricao;
        this.senhaAcesso = senhaAcesso;
        this.senhaAdmin = senhaAdmin;
        this.allowAnon = allowAnon;
        this.inProgress = false;
        this.allowRewrite = allowRewrite;
        if (endIn) this.endIn = endIn;

    }

    toObj() {
        const obj = {
            _id: this._id,
            titulo: this.titulo,
            descricao: this.descricao,
            senhaAcesso: this.senhaAcesso,
            senhaAdmin: this.senhaAdmin,
            allowAnon: this.allowAnon,
            allowRewrite: this.allowRewrite,
            inProgress: this.inProgress,
            endIn: this.endIn
        };


        return obj;
    }
}


export default Votacao;