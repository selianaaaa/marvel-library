import { SuperheroesService } from '@services';
import {
  ISuperHero,
  superheroesActionTypes,
  IAppAction,
  ThunkResult,
  IRequestError,
} from '@types';
import { httpStatuses } from '@constants';

export const createSuperheroesActions = (
  superheroesService: SuperheroesService,
) => {
  /**
   *  Set the list of superheroes
   * @param {ISuperHero[] | null} superheroes - list of superheroes
   */
  const setSuperheroes = (superheroes: ISuperHero[] | null): IAppAction => ({
    type: superheroesActionTypes.SET_SUPERHEROES,
    payload: superheroes,
  });

  /**
   *  Set superheroes request
   * @param {boolean} inRequest - define the superheroes request status
   */
  const setSuperheroesRequest = (inRequest: boolean): IAppAction => ({
    type: superheroesActionTypes.SET_SUPERHEROES_REQUEST,
    payload: inRequest,
  });

  /**
   * Executing the request to get superheroes
   */
  const getSuperheroes = (): ThunkResult<void> => {
    return async (dispatch) => {
      dispatch(setSuperheroesRequest(true));
      try {
        const response = await superheroesService.getSuperheroes();

        console.log('response', response);
        // if (ok) {
        //   // dispatch(setTaggedNews(data));
        // }
      } catch (error) {
        console.log(error);
        // alert(error);
      }
      dispatch(setSuperheroesRequest(false));
    };
  };

  return {
    setSuperheroes,
    setSuperheroesRequest,
    getSuperheroes,
  };
};
