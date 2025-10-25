import { RoomieTypeORMRepository } from '../../adapters/outbound/persistence/typeorm/roomie.repository';

export class GetAllRoomiesUseCase {
  constructor(private readonly repo: RoomieTypeORMRepository) {}

  async execute() {
    try {
      console.log('GetAllRoomiesUseCase.execute called');
      const roomies = await this.repo.findAll();
      console.log(`Found ${roomies.length} roomies`);
      return roomies;
    } catch (error) {
      console.error('Error in GetAllRoomiesUseCase.execute:', error);
      throw error;
    }
  }
}
