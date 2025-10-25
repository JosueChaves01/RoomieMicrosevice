import { RoomieTypeORMRepository } from '../../adapters/outbound/persistence/typeorm/roomie.repository';
import { Roomie } from '../../domain/entities/roomie.entity';
import { RoomieCreatedEvent } from '../../domain/events/roomie-created.event';
import { CreateRoomieDTO } from '../dtos/create-roomie.dto';

export class CreateRoomieUseCase {
  constructor(
    private readonly repo: RoomieTypeORMRepository,
    private readonly eventPublisher: (event: any) => Promise<void>
  ) {}

  async execute(dto: CreateRoomieDTO) {
    try {
      console.log('CreateRoomieUseCase.execute called with:', dto);

      const roomie = new Roomie({
        id: dto.id,
        name: dto.name,
        age: dto.age,
        avatar: dto.avatar,
        verified: dto.verified,
        rating: dto.rating,
        reviews: dto.reviews,
        location: dto.location,
        hasApartment: dto.hasApartment,
        budget: dto.budget,
        bio: dto.bio,
        interests: dto.interests,
        occupation: dto.occupation,
        socialLevel: dto.socialLevel,
        cleanlinessLevel: dto.cleanlinessLevel,
        acceptsSmokers: dto.acceptsSmokers,
        acceptsPets: dto.acceptsPets,
        acceptsGuests: dto.acceptsGuests,
        languages: dto.languages,
        photos: dto.photos,
      });
      console.log('Roomie entity created:', roomie);

      console.log('Saving roomie to repository...');
      await this.repo.save(roomie);
      console.log('Roomie saved successfully');

      const event = new RoomieCreatedEvent(roomie);
      console.log('Publishing event:', event);
      await this.eventPublisher(event);
      console.log('Event published successfully');

      return roomie;
    } catch (error) {
      console.error('Error in CreateRoomieUseCase.execute:', error);
      throw error;
    }
  }
}
