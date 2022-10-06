import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import myLogger from './winstonLog/winston.js';
import sendMail from './routers/RSendMail.js'
import { BAD_REQUEST, CREATED, NO_CONTENT, OK } from './constant/HttpResponseCode.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', sendMail)

app.use((data, req, res, next) => {
    let statusCode = data.statusCode;
    // myLogger.info(data)
    if (statusCode !== OK && statusCode !== CREATED && statusCode !== NO_CONTENT) {
        let { method, url } = req;
        // myLogger.info("Method:" + method + ", URl:" + url + ", Error: " + JSON.stringify(data), { label: "RESPONSE-ERROR" });
        res.status(statusCode||BAD_REQUEST).send({
            code: statusCode,
            error: data.data ? data.data : data.error,
            description: data.description
        })
    } else {
        let { method, url } = req;
        // myLogger.info("Method:" + method + ", URl:" + url + ", Data: %o", data.data, { label: "RESPONSE-OK" });
        // myLogger.info("Method:" + method + ", URl:" + url + ", Data: " + JSON.stringify(data.data), { label: "RESPONSE-OK" });
        res.status(statusCode).send(data.data)
    }
});

const port = process.env.UDPM11_API_PORT || 3000
const host = '0.0.0.0';
function myListener() {
    myLogger.info(`Listening on port ${port}..`);
}
app.listen(port, host, myListener)
