import { rabbitmq } from "./connection";

// handler
import { baseHandler, objectHandler, tableHandler } from "./handler";

rabbitmq.consumeQueue("test", baseHandler);
rabbitmq.consumeQueue("tasks", objectHandler);
rabbitmq.consumeQueue("task", tableHandler);
