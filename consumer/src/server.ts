import amqplib from "amqplib";
import mysql from "mysql2/promise";
import { INinja } from "./model/ninja.model";

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "secret",
    database: "dsc",
  });

  const ping = await connection.ping();
  console.log("kiwkiw ", ping);

  const queue = "task";
  const conn = await amqplib.connect("amqp://localhost");

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, async (msg) => {
    if (msg !== null) {
      const rawData: INinja[] = JSON.parse(msg.content.toString());
      const data = rawData.map((row) => [
        row.first_name,
        row.last_name,
        row.date_of_birth,
        row.occupation,
      ]);
      console.log("Received:", data);

      const sql =
        "INSERT INTO ninja (first_name, last_name, date_of_birth, occupation) VALUES ?";
      const res = await connection.query(sql, [data]);
      console.log("save to db ", res);
      ch1.ack(msg);
    } else {
      console.log("Consumer cancelled by server");
    }
  });
})();
