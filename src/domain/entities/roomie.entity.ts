export class Roomie {
  readonly id: string;
  name: string;
  age: number;
  avatar: string;
  verified: boolean;
  rating: number;
  reviews: number;
  location: string;
  hasApartment: boolean;
  budget: {
    min: number;
    max: number;
  };
  bio: string;
  interests: string[];
  occupation?: string;
  socialLevel?: number;
  cleanlinessLevel?: number;
  acceptsSmokers?: boolean;
  acceptsPets?: boolean;
  acceptsGuests?: boolean;
  languages?: string[];
  photos?: string[];
  createdAt: Date;

  constructor(props: {
    id: string;
    name: string;
    age: number;
    avatar: string;
    verified: boolean;
    rating: number;
    reviews: number;
    location: string;
    hasApartment: boolean;
    budget: { min: number; max: number };
    bio: string;
    interests: string[];
    occupation?: string;
    socialLevel?: number;
    cleanlinessLevel?: number;
    acceptsSmokers?: boolean;
    acceptsPets?: boolean;
    acceptsGuests?: boolean;
    languages?: string[];
    photos?: string[];
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.age = props.age;
    this.avatar = props.avatar;
    this.verified = props.verified;
    this.rating = props.rating;
    this.reviews = props.reviews;
    this.location = props.location;
    this.hasApartment = props.hasApartment;
    this.budget = props.budget;
    this.bio = props.bio;
    this.interests = props.interests;
    this.occupation = props.occupation;
    this.socialLevel = props.socialLevel;
    this.cleanlinessLevel = props.cleanlinessLevel;
    this.acceptsSmokers = props.acceptsSmokers;
    this.acceptsPets = props.acceptsPets;
    this.acceptsGuests = props.acceptsGuests;
    this.languages = props.languages;
    this.photos = props.photos;
    this.createdAt = props.createdAt ?? new Date();
  }

  // Business rule example
  updateRating(newRating: number) {
    // TODO: validate rating range, etc.
    this.rating = newRating;
  }
}
