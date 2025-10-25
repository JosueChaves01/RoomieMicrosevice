import { Roomie } from '../entities/roomie.entity';

export interface IRoomieRepository {
  save(roomie: Roomie): Promise<void>;
  findById(id: string): Promise<Roomie | null>;
  findAll(): Promise<Roomie[]>;
}
