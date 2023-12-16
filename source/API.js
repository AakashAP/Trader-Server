import axios from "axios";

async function loginBroker(credentials) {
    const { username, password, pin } = credentials;

    const first_response = await this.session.post('https://kite.zerodha.com/api/login', {
        user_id: username, password: password
    });

    const second_response = await this.session.post('https://kite.zerodha.com/api/twofa', {
        request_id: first_response.data.data.request_id,
        user_id: first_response.data.data.user_id, twofa: pin
    });

    const enctoken = second_response.headers['set-cookie']
        .find(cookie => cookie.startWith('enctoken'))
        .split(';')[0].split('=')[1];

    if (enctoken) {
        return enctoken;
    } else {
        throw new Error('Failed to obtain enctoken');
    }
};


class API {
    constructor(credential) {
        this.rootURL = 'https://api.kite.trade';
        this.session = axios.create({ headers: { Authorization: `enctoken ${credential}` } });

        this.init();
    }

    async init() {
        if (!(await this.status())) {
            throw new Error('API initialization failed. Status is false.');
        }
    }

    async status() {
        try {
            const response = await this.session.get(this.rootURL);

            console.log(response.data);
            return true;
        } catch (error) {
            return false;
        }
    }

    async instruments() {
        try {
            const response = await this.session.get(`${this.rootURL}/instruments`);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async quote(code) {
        try {
            const response = await this.session.get(`${this.rootURL}/quote`, {
                params: { i: code }
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async ltp(code) {
        try {
            const response = await this.session.get(`${this.rootURL}/quote/ltp`, {
                params: { i: code }
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async historical_data(token, from_, to_, interval, continuous = false, oi = false) {
        try {
            const parameters = {
                from: from_,
                to: to_,
                interval: interval,
                continuous: continuous ? 1 : 0,
                oi: oi ? 1 : 0
            };

            const response = await this.session.get(`${this.rootURL}/instruments/historical/${token}/${interval}`, {
                params: parameters,
            });

            // const data = response.json();
            console.log('Hello')

            // const records = data.map(i => {
            //     const record = {
            //         date: new Date(i[0]),
            //         open: i[1],
            //         high: i[2],
            //         low: i[3],
            //         close: i[4],
            //         volume: i[5]
            //     };

            //     if (i.length === 7) {
            //         record.oi = i[6];
            //     }

            //     // console.log(record);
            //     return record;
            // });

            // return records;
        } catch (error) {
            console.error('Error in getHistorical function:', error);
            // throw error;
        }
    }

    async margins() {
        try {
            const response = await this.session.get(`${this.rootURL}/user/margins`);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async orders() {
        try {
            const response = await this.session.get(`${this.rootURL}/orders`);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async positions() {
        try {
            const response = await this.session.get(`${this.rootURL}/portfolio/positions`);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async holdings() {
        try {
            const response = await this.session.get(`${this.rootURL}/portfolio/holdings`);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async profile() {
        try {
            const response = await this.session.get(`${this.rootURL}/user/profile`);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Buy
    // Sell
    // Modify
}

export { loginBroker as LoginBroker, API };