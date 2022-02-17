import { TestBed } from '@angular/core/testing';
import { NORMALIZER_CONFIGURATION_TOKEN } from '@paddls/ngx-serializer';
import { Column, Normalizer, RepositoryNormalizer } from '../../public-api';

class Movie {

  @Column()
  public director: string;

  @Column()
  public ageLimit: number;

  public constructor(data: Partial<Movie> = {}) {
    Object.assign(this, data);
  }
}

describe('RepositoryNormalizer', () => {

  let normalizer: RepositoryNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RepositoryNormalizer,
        {
          provide: NORMALIZER_CONFIGURATION_TOKEN,
          useValue: {
            denormalizeNull: true,
            normalizeNull: true
          }
        }
      ]
    });

    normalizer = TestBed.inject(RepositoryNormalizer);
  });

  describe('#denormalize()', () => {
    it('should denormalize with default configuration when none is provided', () => {
      const raw: any = {
        director: 'Oscar',
        ageLimit: null
      };

      const movie: Movie = normalizer.denormalize(Movie, raw);

      expect(movie).toBeInstanceOf(Movie);
      expect(movie.ageLimit).toBeNull();
    });

    it('should denormalize with provided configuration', () => {
      const raw: any = {
        director: 'Oscar',
        ageLimit: null
      };

      const movie: Movie = normalizer.denormalize(Movie, raw, {});

      expect(movie).toBeInstanceOf(Movie);
      expect(movie.ageLimit).toBeUndefined();
    });

    it('should denormalize array', () => {
      const raw: any = [
        {
          director: 'Oscar',
          ageLimit: null
        },
        {
          director: 'Thomas',
          ageLimit: 18
        }
      ];

      const movies: Movie[] = normalizer.denormalize(Movie, raw);

      expect(movies.length).toEqual(2);
      expect(movies[0]).toBeInstanceOf(Movie);
      expect(movies[1]).toBeInstanceOf(Movie);
    });
  });

  describe('#normalize()', () => {
    it('should normalize with default configuration when none is provided', () => {
      const movie: Movie = new Movie({
        director: 'Oscar',
        ageLimit: null
      });

      const raw: any = normalizer.normalize(movie);

      expect(raw.director).toEqual('Oscar');
      expect(raw.ageLimit).toBeNull();
    });

    it('should normalize with provided configuration', () => {
      const movie: Movie = new Movie({
        director: 'Oscar',
        ageLimit: null
      });

      const raw: any = normalizer.normalize(movie, {});

      expect(raw.director).toEqual('Oscar');
      expect(raw.ageLimit).toBeUndefined();
    });

    it('should normalize array', () => {
      const movies: Movie[] = [
        new Movie({
          director: 'Oscar',
          ageLimit: null
        }),
        new Movie({
          director: 'Thomas',
          ageLimit: 18
        })
      ];

      const raws: any[] = normalizer.denormalize(Movie, movies);

      expect(raws.length).toEqual(2);
      expect(raws[0].director).toEqual('Oscar');
      expect(raws[1].director).toEqual('Thomas');
    });
  });

  describe('#getNormalizer()', () => {
    it('should return normalizer instance', () => {
      expect(normalizer.getNormalizer()).toBeInstanceOf(Normalizer);
    });
  });
});
