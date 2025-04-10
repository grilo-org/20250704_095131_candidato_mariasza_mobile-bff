import { Expose } from 'class-transformer';

export class LocationInfo {
  @Expose()
  name: string;

  @Expose()
  url: string;
}

export class RickAndMortyCharacterResponseDto {
  id: number;

  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  species: string;

  @Expose()
  image: string;

  type: string;
  gender: string;
  origin: LocationInfo;
  location: LocationInfo;

  episode: string[];
  url: string;
  created: string;
}
