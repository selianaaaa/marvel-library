import { ISuperHero } from '@types';
import { urlsConstants } from '@constants';

export class SuperheroesService {
  /**
   * The request to get the list of superheroes
   */
  getSuperheroes() {
    return fetch(`${urlsConstants}/characters?apikey${process.env.PUBLIC_URL}`);
  }
}
