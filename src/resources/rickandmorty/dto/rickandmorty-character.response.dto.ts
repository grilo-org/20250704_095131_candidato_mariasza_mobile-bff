export class LocationInfo {
  name: string;
  url: string;
}

export class RickAndMortyCharacterResponseDto {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationInfo;
  location: LocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
