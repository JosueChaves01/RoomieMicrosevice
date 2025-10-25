import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CreateRoomieUseCase } from '../../../../application/use-cases/create-roomie.usecase';
import { GetAllRoomiesUseCase } from '../../../../application/use-cases/get-all-roomies.usecase';
import { GetRoomieByIdUseCase } from '../../../../application/use-cases/get-roomie-by-id.usecase';
import { GetRoomiesWithFiltersUseCase } from '../../../../application/use-cases/get-roomies-with-filters.usecase';
import { CreateRoomieDTO } from '../../../../application/dtos/create-roomie.dto';
import { CreateRoomieRequestDTO } from '../dtos/create-roomie.request.dto';
import { GetRoomiesQueryDTO } from '../dtos/get-roomies.query.dto';

@Controller('roomies')
export class RoomieController {
  constructor(
    private readonly createRoomieUseCase: CreateRoomieUseCase,
    private readonly getAllRoomiesUseCase: GetAllRoomiesUseCase,
    private readonly getRoomieByIdUseCase: GetRoomieByIdUseCase,
    private readonly getRoomiesWithFiltersUseCase: GetRoomiesWithFiltersUseCase
  ) {}

  @Post()
  async create(@Body() reqBody: CreateRoomieRequestDTO) {
    try {
      console.log('Creating roomie with data:', reqBody);

      const dto: CreateRoomieDTO = {
        id: reqBody.id,
        name: reqBody.name,
        age: reqBody.age,
        avatar: reqBody.avatar,
        verified: reqBody.verified,
        rating: reqBody.rating,
        reviews: reqBody.reviews,
        location: reqBody.location,
        hasApartment: reqBody.hasApartment,
        budget: reqBody.budget,
        bio: reqBody.bio,
        interests: reqBody.interests,
        occupation: reqBody.occupation,
        socialLevel: reqBody.socialLevel,
        cleanlinessLevel: reqBody.cleanlinessLevel,
        acceptsSmokers: reqBody.acceptsSmokers,
        acceptsPets: reqBody.acceptsPets,
        acceptsGuests: reqBody.acceptsGuests,
        languages: reqBody.languages,
        photos: reqBody.photos,
      };

      console.log('Executing use case with DTO:', dto);
      const roomie = await this.createRoomieUseCase.execute(dto);
      console.log('Roomie created successfully:', roomie);

      return { status: 201, body: roomie };
    } catch (error) {
      console.error('Error in RoomieController.create:', error);
      throw error;
    }
  }

  @Get()
  async findAll(@Query() query: GetRoomiesQueryDTO) {
    try {
      console.log('Finding roomies with filters:', query);

      // Validar y sanitizar los parámetros de consulta
      const sanitizedQuery = {
        page: query.page || 1,
        pageSize: query.pageSize || 10,
        minBudget: query.minBudget,
        maxBudget: query.maxBudget,
        minAge: query.minAge,
        maxAge: query.maxAge,
        verified: query.verified,
        minCleanliness: query.minCleanliness,
        minSocial: query.minSocial,
        sort: query.sort || 'recent',
        search: query.search,
      };

      console.log('Sanitized query:', sanitizedQuery);

      const result = await this.getRoomiesWithFiltersUseCase.execute(sanitizedQuery);
      console.log(
        `Found ${result.roomies.length} roomies out of ${result.total} total`
      );

      return {
        status: 200,
        body: {
          roomies: result.roomies,
          total: result.total,
          page: Math.max(1, query.page || 1),
          pageSize: result.pageSize,
          totalPages: result.totalPages,
        },
      };
    } catch (error) {
      console.error('Error in RoomieController.findAll:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      console.log('Finding roomie by id:', id);
      const roomie = await this.getRoomieByIdUseCase.execute(id);
      console.log('Roomie found:', roomie);

      return { status: 200, body: roomie };
    } catch (error) {
      console.error('Error in RoomieController.findById:', error);
      if (error.message.includes('not found')) {
        return { status: 404, body: { message: error.message } };
      }
      throw error;
    }
  }
}
