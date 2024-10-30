"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const promise_1 = __importDefault(require("mysql2/promise"));
(async () => {
    const connection = await promise_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: "secret",
        database: "dsc",
    });
    const ping = await connection.ping();
    console.log("kiwkiw ", ping);
    const queue = "task";
    const conn = await amqplib_1.default.connect("amqp://localhost");
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);
    // Listener
    ch1.consume(queue, async (msg) => {
        if (msg !== null) {
            const rawData = JSON.parse(msg.content.toString());
            const data = rawData.map((row) => [
                row.first_name,
                row.last_name,
                row.date_of_birth,
                row.occupation,
            ]);
            console.log("Received:", data);
            const sql = "INSERT INTO ninja (first_name, last_name, date_of_birth, occupation) VALUES ?";
            const res = await connection.query(sql, [data]);
            console.log("save to db ", res);
            ch1.ack(msg);
        }
        else {
            console.log("Consumer cancelled by server");
        }
    });
})();
