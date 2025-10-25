import { Kafka, Producer } from 'kafkajs';

export class KafkaPublisher {
  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor(brokers: string[]) {
    this.kafka = new Kafka({ clientId: 'roomiefy-roomies-service', brokers });
    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async publish(event: any) {
    const topic = 'roomies.events';
    await this.producer.send({
      topic,
      messages: [{ key: event.payload.id, value: JSON.stringify(event) }],
    });
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
