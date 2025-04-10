import { Expose } from 'class-transformer';

export class CatBreedDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  temperament: string;

  @Expose()
  origin: string;

  description: string;

  life_span: string;

  reference_image_id: string;

  wikipedia_url?: string;
}
