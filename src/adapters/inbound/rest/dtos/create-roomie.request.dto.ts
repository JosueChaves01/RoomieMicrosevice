export class CreateRoomieRequestDTO {
  id!: string;
  name!: string;
  age!: number;
  avatar!: string;
  verified!: boolean;
  rating!: number;
  reviews!: number;
  location!: string;
  hasApartment!: boolean;
  budget!: {
    min: number;
    max: number;
  };
  bio!: string;
  interests!: string[];
  occupation?: string;
  socialLevel?: number;
  cleanlinessLevel?: number;
  acceptsSmokers?: boolean;
  acceptsPets?: boolean;
  acceptsGuests?: boolean;
  languages?: string[];
  photos?: string[];
}
