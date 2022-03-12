import { SuperheroesService } from '@services';
import {
  superheroesActionTypes,
  IAppAction,
  ThunkResult,
  IComics,
} from '@types';
import { httpStatuses } from '@constants';

export const createComicsActions = (superheroesService: SuperheroesService) => {
  /**
   *  Set comics containing a specific character
   * @param {IComics | null} character - comics containing a specific character
   */
  const setComics = (character: IComics[] | null): IAppAction => ({
    type: superheroesActionTypes.SET_COMICS,
    payload: character,
  });

  /**
   *  Set request of comics containing a specific character
   * @param {boolean} inRequest - define the comics request status
   */
  const setComicsRequest = (inRequest: boolean): IAppAction => ({
    type: superheroesActionTypes.SET_COMICS_REQUEST,
    payload: inRequest,
  });

  /**
   * Executing the request to get data about comics containing a specific character
   * @param {string} characterId - character id
   */
  const getComics = (characterId: string): ThunkResult<void> => {
    return async (dispatch) => {
      dispatch(setComicsRequest(true));
      try {
        const { status, data } = await superheroesService.getComics(
          characterId,
        );

        if (status === httpStatuses.OK) {
          dispatch(setComics(data.data.results));
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
      dispatch(setComicsRequest(false));
    };
  };

  return {
    setComics,
    setComicsRequest,
    getComics,
  };
};
