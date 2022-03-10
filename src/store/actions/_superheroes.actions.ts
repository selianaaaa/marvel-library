import { SuperheroesService } from '@services';
import { ISuperHero, superheroesActionTypes, IAppAction } from '@types';

export const createSuperheroesActions = (
  superheroesService: SuperheroesService,
) => {
  /**
   *  Set the superheroes
   * @param {ISuperHero[] | null} superheroes - list of superheroes
   */
  const setSuperheroes = (superheroes: ISuperHero[] | null): IAppAction => ({
    type: superheroesActionTypes.SET_SUPERHEROES,
    payload: superheroes,
  });

  return {
    setSuperheroes,
  };
};
