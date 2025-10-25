export const KafkaConfig = {
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
};
