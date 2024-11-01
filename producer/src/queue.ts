import amqplib, { Connection, Channel } from "amqplib";

class Rabbitmq {
  connection!: Connection;
  channel!: Channel;
  #isConnected!: Boolean;

  async connect() {
    if (this.connection && this.channel) return;
    try {
      this.connection = await amqplib.connect("amqp://localhost");
      this.channel = await this.connection.createChannel();
      this.#isConnected = true;
    } catch (error) {}
  }

  async sendToQueue(routingKey: string, message: Buffer) {
    try {
      if (!this.#isConnected) await this.connect();
      this.channel.sendToQueue(routingKey, message);
      console.log("Queue sent successfully ", message.toString());
    } catch (error) {
      console.log("❌ Error ", error);
    }
  }
}

const queue = new Rabbitmq();
export default queue;
