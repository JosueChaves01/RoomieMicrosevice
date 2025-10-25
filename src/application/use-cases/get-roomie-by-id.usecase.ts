import { RoomieTypeORMRepository } from '../../adapters/outbound/persistence/typeorm/roomie.repository';

export class GetRoomieByIdUseCase {
  constructor(private readonly repo: RoomieTypeORMRepository) {}

  async execute(id: string) {
    try {
      console.log('GetRoomieByIdUseCase.execute called with id:', id);
      const roomie = await this.repo.findById(id);

      if (!roomie) {
        throw new Error(`Roomie with id ${id} not found`);
      }

      console.log('Roomie found:', roomie);
      return roomie;
    } catch (error) {
      console.error('Error in GetRoomieByIdUseCase.execute:', error);
      throw error;
    }
  }
}
