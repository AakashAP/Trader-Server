import express from 'express';
import parser from 'body-parser';
import cors from 'cors';

import { API } from './source/API.js';

const Server = express();

Server.use(cors());
Server.use(parser.json());

let token = '7xohaLyjqxc/G0DpZzp+9u7fEU8uQiAT8iziwqmEhwceJiGojOovghTiNgC9ISBjUWp2/32YxDGek465M+d0xZo2NVbIcbLj0a43PUSpcSoRSBuaoLZtWw==';
const API_ = new API(token);

Server.get('/user/profile', (req, res) => {
    res.json({ response: API_.profile() });
})

Server.listen(3000, () => {
    console.log(`Trader Server listening at http://localhost:3000`);
});

// const id = 9604354;
// const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
// const to = new Date();
// const from = '2023-12-06 20:21:45.581000';
// const to = '2023-12-13 20:21:45.581000';
// const interval = "5minute";
// API_.historical_data(id, from, to, interval);