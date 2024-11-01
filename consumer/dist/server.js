"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
// handler
const handler_1 = require("./handler");
connection_1.rabbitmq.consumeQueue("test", handler_1.baseHandler);
connection_1.rabbitmq.consumeQueue("tasks", handler_1.objectHandler);
connection_1.rabbitmq.consumeQueue("task", handler_1.tableHandler);
