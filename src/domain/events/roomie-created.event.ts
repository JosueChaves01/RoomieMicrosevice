import { Roomie } from '../entities/roomie.entity';

export class RoomieCreatedEvent {
  readonly eventType = 'RoomieCreated';
  readonly aggregateId: string;
  readonly occurredAt: Date;
  readonly eventVersion: number = 1;

  readonly roomie: Roomie;

  constructor(roomie: Roomie) {
    this.aggregateId = roomie.id;
    this.occurredAt = new Date();
    this.roomie = roomie;
  }

  // Optional: You can add business-specific event data here
  getRoomieData() {
    return {
      id: this.roomie.id,
      name: this.roomie.name,
      location: this.roomie.location,
      verified: this.roomie.verified,
      hasApartment: this.roomie.hasApartment,
      budget: this.roomie.budget,
    };
  }
}
