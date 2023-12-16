import { LoginBroker, API } from './API.js';

class Trader {
    constructor() {
        this.API = null;
    }

    async Login(credential) {
        try {
            let enctoken;

            if (credential.username && credential.password && credential.pin) {
                enctoken = await LoginBroker(credential.username, credential.password, credential.pin);
            } else if (credential.token) {
                enctoken = credential.token;
            }

            this.API = new API(enctoken);
        } catch (error) {
            console.log('Error: ', error);
        };
    };

    async GET() {
        try {
            const res = await this.API.getProfile();
            console.log(res);
            return res;
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    PUT() {
    };

    UPDATE() {
    };
}

export default Trader;