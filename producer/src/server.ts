import { readExcel } from "./helper/read_excel";
import { createServer } from "node:http";
import queueClient from "./queue";

const server = createServer();

const data = readExcel("user-registration.xlsx");

queueClient.sendToQueue("test", Buffer.from("hello world"));
queueClient.sendToQueue(
  "tasks",
  Buffer.from(JSON.stringify({ message: "hello world" }))
);
queueClient.sendToQueue("task", Buffer.from(JSON.stringify(data)));

server.listen(3000, () => {
  console.log("server running on port 3000");
});
