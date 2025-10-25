import { IRoomieRepository } from '../../domain/ports/roomie-repository.port';
import { Roomie } from '../../domain/entities/roomie.entity';

export class GetRoomieUseCase {
  constructor(private readonly repo: IRoomieRepository) {}

  async execute(id: string): Promise<Roomie | null> {
    return this.repo.findById(id);
  }
}
