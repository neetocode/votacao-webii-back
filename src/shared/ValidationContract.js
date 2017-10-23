import FnValidacoes from './FnValidacoes'

class ValidationContract {
    constructor() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }
    addError(message) {
        this.errors.push(message);
        return null;
    }
    addErrors(errors, prefix = '') {
        errors.forEach((message) => {
            this.addError(`${prefix ? prefix + '.' : ''}${message}`);
        });

        return null;
    }
    clear() {
        this.errors = [];
        return this;
    }

    isCpf(cpf, msg = 'CPF inválido.') {
        if (!FnValidacoes.cpf(cpf)) this.addError(msg);
        return this;
    }
    isCnpj(cnpj, msg = 'CNPJ inválido.') {
        if (!FnValidacoes.cnpj(cnpj)) this.addError(msg);
        return this;
    }
    isBrPhone(phone, msg) {
        if (!FnValidacoes.brPhone(phone)) this.addError(msg);
        return this;
    }
    isCep(cep, msg = 'CEP inválido.') {
        if (!FnValidacoes.cep(cep)) this.addError(msg);
        return this;
    }
    isTimeSpan(timeSpan, msg) {
        if (!FnValidacoes.timeSpan(timeSpan)) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} TimeSpan inválido.`);
            }
        }
        return this;
    }
    validaTimeSpanIntevalo(inicio, fim, msg) {
        try {
            const inicioHora = parseInt(inicio.split(':')[0]);
            const fimHora = parseInt(fim.split(':')[0]);
            if (fimHora > inicioHora) return this;
            if (inicioHora == fimHora) {
                const inicioMinuto = parseInt(inicio.split(':')[1]);
                const fimMinuto = parseInt(fim.split(':')[1]);
                if (inicioMinuto > fimMinuto) {
                    if (msg.split(' ').length > 1) {
                        this.addError(msg);
                    } else {
                        this.addError(`${msg} possui um intervalo de horas inválido.`);
                    }
                }
            } else {
                if ((fimHora < inicioHora) && fimHora > 5) {
                    // horario fim é mais que inicio e nao esta operando na madrugada
                    if (msg.split(' ').length > 1) {
                        this.addError(msg);
                    } else {
                        this.addError(`${msg} possui um intervalo de horas inválido.`);
                    }
                }
            }
            return this;
        } catch (ex) {
            console.log(ex);
            this.addError(`Erro ao validar intervalo ${msg}.`)
        }
    }
    isEmail(email, msg = 'E-mail inválido.') {
        if (!FnValidacoes.email(email)) this.addError(msg);
        return this;
    }
    isRequired(value, msg) {
        if (!FnValidacoes.isTruthy(value)) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} é obrigatório.`);
            }
        }
        return this;
    }
    maxLength(value, size, msg) {
        if (!FnValidacoes.maxLength(value, size)) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} deve ter no maximo ${size} caracteres.`);
            }
        }
        return this;
    }
    minLength(value, size, msg) {
        if (!FnValidacoes.minLength(value, size)) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} deve ter no minimo ${size} caracteres.`);
            }
        }
        return this;
    }
    max(value, max, msg) {
        if (value > max) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} deve ter ser menor que ${max}`);
            }
        }
        return this;
    }
    min(value, min, msg) {
        if (value < min) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} deve ter ser maior que ${min}`);
            }
        }
        return this;
    }
    fixLength(value, size, msg) {
        if (!FnValidacoes.fixLength(value, size)) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} deve ter ${size} caracteres.`);
            }
        }
        return this;
    }

    in(value, collection = [], msg) {
        const exists = collection.some((elem) => elem === value);
        if (!exists) {
            if (msg.split(' ').length > 1) {
                this.addError(msg);
            } else {
                this.addError(`${msg} possui um valor inválido.`);
            }
        }

        return this;
    }

}

export default ValidationContract;