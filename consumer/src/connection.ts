import amqplib, { Connection, Channel } from "amqplib";

interface ICallbackFn {
  (message: string): any;
}
class Rabbitmq {
  connection!: Connection;
  channel!: Channel;
  #connected!: Boolean;

  async connect() {
    if (this.connection && this.connection) return;
    try {
      this.connection = await amqplib.connect("amqp://localhost");
      this.channel = await this.connection.createChannel();
      this.#connected = true;
      console.log("✅ Connection was established successfuly");
    } catch (error) {
      console.log("❌ Failed to establish connection ", error);
    }
  }

  async sendToQueue(queue: string, message: string) {
    if (!this.#connected) await this.connect();
    try {
      await this.channel.assertQueue(queue);
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log("✅ Message sent successfully");
    } catch (error) {
      console.log("❌ Error on sending queue ", error);
    }
  }

  async consumeQueue(queue: string, callbackFn: ICallbackFn) {
    if (!this.#connected) await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const rawData = msg.content.toString();
          callbackFn(rawData);
          this.channel.ack(msg);
        }
      },
      { noAck: false }
    );
  }
}

export const rabbitmq = new Rabbitmq();
