"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_excel_1 = require("./helper/read_excel");
const amqplib_1 = __importDefault(require("amqplib"));
const node_http_1 = require("node:http");
const server = (0, node_http_1.createServer)();
const data = (0, read_excel_1.readExcel)("user-registration.xlsx");
console.log(data);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield amqplib_1.default.connect("amqp://localhost");
    // Sender
    const ch2 = yield conn.createChannel();
    const queue = `task`;
    const res = ch2.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log(res);
}))();
server.listen(3000, () => {
    console.log("server running on port 3000");
});
