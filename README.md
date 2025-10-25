# Roomiefy Roomies Microservice

Hexagonal architecture scaffold for the Roomiefy roomies domain using NestJS, TypeScript, TypeORM, Kafka, and Debezium.

## Structure
```
src/
  domain/
    entities/
    value-objects/
    ports/
    events/
  application/
    use-cases/
    dtos/
  adapters/
    inbound/
      rest/
        controllers/
        dtos/
    outbound/
      persistence/
        typeorm/
      events/
        kafka/
  infrastructure/
    database/
    kafka/
    debezium/
config/
```

## Next steps
- Wire NestJS modules and providers around the provided use cases and adapters.
- Create TypeORM entities and migrations for Postgres.
- Configure Kafka topics, Debezium connector, and Docker services using the samples in `config/`.
- Add validation, logging, and tests across layers.
