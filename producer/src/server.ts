import { readExcel } from "./helper/read_excel";
import amqplib from "amqplib";
import { createServer } from "node:http";

const server = createServer();

const data = readExcel("user-registration.xlsx");
console.log(data);

(async () => {
  const conn = await amqplib.connect("amqp://localhost");

  // Sender
  const ch2 = await conn.createChannel();
  const queue = `task`;
  const res = ch2.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  console.log(res);
})();

server.listen(3000, () => {
  console.log("server running on port 3000");
});
