import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoomieController } from './controllers/roomie.controller';
import { CreateRoomieUseCase } from '../../../application/use-cases/create-roomie.usecase';
import { GetAllRoomiesUseCase } from '../../../application/use-cases/get-all-roomies.usecase';
import { GetRoomieByIdUseCase } from '../../../application/use-cases/get-roomie-by-id.usecase';
import { GetRoomiesWithFiltersUseCase } from '../../../application/use-cases/get-roomies-with-filters.usecase';
import { RoomieTypeORMRepository } from '../../outbound/persistence/typeorm/roomie.repository';
import { RoomieEntity } from '../../outbound/persistence/typeorm/entities/roomie.typeorm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomieEntity])],
  controllers: [RoomieController],
  providers: [
    {
      provide: CreateRoomieUseCase,
      useFactory: async (repo: RoomieTypeORMRepository) => {
        console.log('Creating CreateRoomieUseCase with repo:', !!repo);
        const eventPublisher = async (event: any) => {
          console.log('Event would be published:', event);
        };
        const useCase = new CreateRoomieUseCase(repo, eventPublisher);
        console.log('CreateRoomieUseCase created successfully');
        return useCase;
      },
      inject: [RoomieTypeORMRepository],
    },
    {
      provide: GetAllRoomiesUseCase,
      useFactory: async (repo: RoomieTypeORMRepository) => {
        console.log('Creating GetAllRoomiesUseCase with repo:', !!repo);
        return new GetAllRoomiesUseCase(repo);
      },
      inject: [RoomieTypeORMRepository],
    },
    {
      provide: GetRoomieByIdUseCase,
      useFactory: async (repo: RoomieTypeORMRepository) => {
        console.log('Creating GetRoomieByIdUseCase with repo:', !!repo);
        return new GetRoomieByIdUseCase(repo);
      },
      inject: [RoomieTypeORMRepository],
    },
    {
      provide: GetRoomiesWithFiltersUseCase,
      useFactory: async (repo: RoomieTypeORMRepository) => {
        console.log('Creating GetRoomiesWithFiltersUseCase with repo:', !!repo);
        return new GetRoomiesWithFiltersUseCase(repo);
      },
      inject: [RoomieTypeORMRepository],
    },
    {
      provide: RoomieTypeORMRepository,
      useFactory: (roomieRepo: any) => {
        console.log(
          'Creating RoomieTypeORMRepository with roomieRepo:',
          !!roomieRepo
        );
        return new RoomieTypeORMRepository(roomieRepo);
      },
      inject: [getRepositoryToken(RoomieEntity)],
    },
  ],
})
export class RoomieModule {}
