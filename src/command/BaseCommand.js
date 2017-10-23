import ValidationContract from './../shared/ValidationContract';

class BaseCommand {
    constructor() {
        this.validator = new ValidationContract()
    }

    handleException(ex) {
        switch (ex.name) {
            // case 'MongoError':

            //     break;
            default:
                throw ex;
        }

        return null;
    }
}

export default BaseCommand