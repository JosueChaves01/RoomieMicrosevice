import { Repository } from 'typeorm';
import { Roomie } from '../../../../domain/entities/roomie.entity';
import { RoomieEntity } from './entities/roomie.typeorm-entity';

export class RoomieTypeORMRepository {
  constructor(private readonly typeormRepo: Repository<RoomieEntity>) {
    console.log(
      'RoomieTypeORMRepository created with typeormRepo:',
      !!typeormRepo
    );
  }

  async save(roomie: Roomie): Promise<void> {
    try {
      console.log('RoomieTypeORMRepository.save called with:', roomie);

      const entity = this.typeormRepo.create({
        id: roomie.id,
        name: roomie.name,
        age: roomie.age,
        avatar: roomie.avatar,
        verified: roomie.verified,
        rating: roomie.rating,
        reviews: roomie.reviews,
        location: roomie.location,
        hasApartment: roomie.hasApartment,
        budget: roomie.budget,
        bio: roomie.bio,
        interests: roomie.interests,
        occupation: roomie.occupation,
        socialLevel: roomie.socialLevel,
        cleanlinessLevel: roomie.cleanlinessLevel,
        acceptsSmokers: roomie.acceptsSmokers,
        acceptsPets: roomie.acceptsPets,
        acceptsGuests: roomie.acceptsGuests,
        languages: roomie.languages,
        photos: roomie.photos,
        createdAt: roomie.createdAt,
      });
      console.log('TypeORM entity created:', entity);

      console.log('Saving to database...');
      await this.typeormRepo.save(entity);
      console.log('Entity saved successfully');
    } catch (error) {
      console.error('Error in RoomieTypeORMRepository.save:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Roomie | null> {
    const entity = await this.typeormRepo.findOneBy({ id });
    if (!entity) return null;

    return this.mapEntityToDomain(entity);
  }

  async findAll(): Promise<Roomie[]> {
    const entities = await this.typeormRepo.find();
    return entities.map((entity) => this.mapEntityToDomain(entity));
  }

  async findWithFilters(filters: {
    page?: number;
    pageSize?: number;
    minBudget?: number;
    maxBudget?: number;
    minAge?: number;
    maxAge?: number;
    verified?: boolean;
    minCleanliness?: number;
    minSocial?: number;
    sort?: 'recent' | 'rating' | 'age' | 'budget';
    search?: string;
  }): Promise<{ roomies: Roomie[]; total: number }> {
    const query = this.typeormRepo.createQueryBuilder('roomie');

    // Aplicar filtros
    if (filters.minBudget !== undefined) {
      query.andWhere("CAST(roomie.budget->>'max' AS INTEGER) >= :minBudget", {
        minBudget: filters.minBudget,
      });
    }

    if (filters.maxBudget !== undefined) {
      query.andWhere("CAST(roomie.budget->>'min' AS INTEGER) <= :maxBudget", {
        maxBudget: filters.maxBudget,
      });
    }

    if (filters.minAge !== undefined) {
      query.andWhere('roomie.age >= :minAge', { minAge: filters.minAge });
    }

    if (filters.maxAge !== undefined) {
      query.andWhere('roomie.age <= :maxAge', { maxAge: filters.maxAge });
    }

    if (filters.verified !== undefined) {
      query.andWhere('roomie.verified = :verified', {
        verified: filters.verified,
      });
    }

    if (filters.minCleanliness !== undefined && filters.minCleanliness > 0) {
      query.andWhere('roomie."cleanlinessLevel" >= :minCleanliness', {
        minCleanliness: filters.minCleanliness,
      });
    }

    if (filters.minSocial !== undefined && filters.minSocial > 0) {
      query.andWhere('roomie."socialLevel" >= :minSocial', {
        minSocial: filters.minSocial,
      });
    }

    if (filters.search) {
      query.andWhere(
        '(roomie.name ILIKE :search OR roomie.bio ILIKE :search OR roomie.location ILIKE :search)',
        {
          search: `%${filters.search}%`,
        }
      );
    }

    // Aplicar ordenamiento
    switch (filters.sort) {
      case 'rating':
        query.orderBy('roomie.rating', 'DESC');
        break;
      case 'age':
        query.orderBy('roomie.age', 'ASC');
        break;
      case 'budget':
        query.orderBy("roomie.budget->>'min'", 'ASC');
        break;
      case 'recent':
      default:
        query.orderBy('roomie."createdAt"', 'DESC');
        break;
    }

    // Obtener total antes de paginación
    const total = await query.getCount();

    // Aplicar paginación
    const page = Math.max(1, filters.page || 1);
    const pageSize = filters.pageSize || 10;
    const skip = (page - 1) * pageSize;

    query.skip(skip).take(pageSize);

    const entities = await query.getMany();

    return {
      roomies: entities.map((entity) => this.mapEntityToDomain(entity)),
      total,
    };
  }

  private mapEntityToDomain(entity: RoomieEntity): Roomie {
    return new Roomie({
      id: entity.id,
      name: entity.name,
      age: entity.age,
      avatar: entity.avatar,
      verified: entity.verified,
      rating: entity.rating,
      reviews: entity.reviews,
      location: entity.location,
      hasApartment: entity.hasApartment,
      budget: entity.budget,
      bio: entity.bio,
      interests: entity.interests,
      occupation: entity.occupation,
      socialLevel: entity.socialLevel,
      cleanlinessLevel: entity.cleanlinessLevel,
      acceptsSmokers: entity.acceptsSmokers,
      acceptsPets: entity.acceptsPets,
      acceptsGuests: entity.acceptsGuests,
      languages: entity.languages,
      photos: entity.photos,
      createdAt: entity.createdAt,
    });
  }
}
