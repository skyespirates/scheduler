"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_excel_1 = require("./helper/read_excel");
const node_http_1 = require("node:http");
const queue_1 = __importDefault(require("./queue"));
const server = (0, node_http_1.createServer)();
const data = (0, read_excel_1.readExcel)("user-registration.xlsx");
queue_1.default.sendToQueue("test", Buffer.from("hello world"));
queue_1.default.sendToQueue("tasks", Buffer.from(JSON.stringify({ message: "hello world" })));
queue_1.default.sendToQueue("task", Buffer.from(JSON.stringify(data)));
server.listen(3000, () => {
    console.log("server running on port 3000");
});
