
import { MongoClient } from 'mongodb';

let instance;

class MongoDb {
    async connect() {
        const mongodbUrl = process.env.MONGODB_URL
        console.log('conectando ao mongoDb...');
        const Db = await MongoClient.connect(mongodbUrl, {
            reconnectInterval: 2000,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE
        });

        console.log('conectado');

        Db.on('error', (error) => {
            console.log(error);
        });

        return Db;
    }

    static async getDb() {
        if (instance) {
            return instance;
        } else {
            const db = await new MongoDb().connect();
            return instance = db;
        }
    }
}


export const collections = {
    questionario: 'questionario',
    resposta: 'resposta'
};

export default MongoDb;