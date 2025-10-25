import { RoomieTypeORMRepository } from '../../adapters/outbound/persistence/typeorm/roomie.repository';
import { GetRoomiesQueryDTO } from '../../adapters/inbound/rest/dtos/get-roomies.query.dto';

export class GetRoomiesWithFiltersUseCase {
  constructor(private readonly repo: RoomieTypeORMRepository) {}

  async execute(query: GetRoomiesQueryDTO) {
    try {
      console.log(
        'GetRoomiesWithFiltersUseCase.execute called with query:',
        query
      );

      const filters = {
        page: query.page,
        pageSize: query.pageSize,
        minBudget: query.minBudget,
        maxBudget: query.maxBudget,
        minAge: query.minAge,
        maxAge: query.maxAge,
        verified: query.verified,
        minCleanliness: query.minCleanliness,
        minSocial: query.minSocial,
        sort: query.sort,
        search: query.search,
      };

      const result = await this.repo.findWithFilters(filters);
      console.log(
        `Found ${result.roomies.length} roomies out of ${result.total} total`
      );

      return {
        roomies: result.roomies,
        total: result.total,
        page: Math.max(1, query.page || 1),
        pageSize: query.pageSize || 10,
        totalPages: Math.ceil(result.total / (query.pageSize || 10)),
      };
    } catch (error) {
      console.error('Error in GetRoomiesWithFiltersUseCase.execute:', error);
      throw error;
    }
  }
}
