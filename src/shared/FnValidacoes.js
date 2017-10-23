
class FnValidacoes {
    static cpf(cpf) {
        if (cpf === null || cpf === undefined) return false;
        let numeros, digitos, soma, i, resultado, digitos_iguais;
        const value = cpf.replace(new RegExp(/[^\d]+/, 'g'), '');
        digitos_iguais = 1;
        if (value.length < 11)
            return false;
        for (i = 0; i < value.length - 1; i++)
            if (value.charAt(i) != value.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            numeros = value.substring(0, 9);
            digitos = value.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += parseInt(numeros.charAt(10 - i)) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != parseInt(digitos.charAt(0)))
                return false;
            numeros = value.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += parseInt(numeros.charAt(11 - i)) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != parseInt(digitos.charAt(1)))
                return false;
            return true;
        }
        else
            return false;
    };
    static cnpj(cnpj) {
        if (cnpj === null || cnpj === undefined) return false;
        const value = cnpj.replace(/[^\d]+/g, '');

        var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
        digitos_iguais = 1;
        if (value.length < 14 && value.length < 15)
            return false;
        for (i = 0; i < value.length - 1; i++)
            if (value.charAt(i) != value.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            tamanho = value.length - 2
            numeros = value.substring(0, tamanho);
            digitos = value.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros[tamanho - i]) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != parseInt(digitos[0]))
                return false;
            tamanho = tamanho + 1;
            numeros = value.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros[tamanho - i]) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != parseInt(digitos[1]))
                return false;
            return true;
        }
        else
            return false;
    };
    static isTruthy(value) {
        return value !== 0 && value !== false && value !== null && value !== undefined && value !== ''
    };
    static maxLength(value, size) {
        return value.length <= size;
    };
    static minLength(value, size) {
        return value.trim().length >= size;
    };
    static fixLength(value, size) {
        return value.trim().length === size;
    };
    static brPhone(value) {
        // com ddd
        return /(^|\()?\s*(\d{2})\s*(\s|\))*(9?\d{4})(\s|-)?(\d{4})($|\n)/.test(value);
    };
    static cep(cep) {
        return /^\d{5}[-]?\d{3}$/.test(cep)
    };
    static email(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    };
    static timeSpan(value) {
        if (!/^[0-2][0-9]:[0-5][0-9]$/.test(value)) return false

        const hora = parseInt(value.split(':')[0])
        const minuto = parseInt(value.split(':')[1])

        if (hora > 23 || minuto > 59) return false
        return true
    };
}


export default FnValidacoes