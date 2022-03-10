import { SuperheroesService } from '@services';
import {
  ICharacter,
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
   *  Set the list of comic characters
   * @param {ICharacter[] | null} characters - list of characters
   */
  const setCharacters = (characters: ICharacter[] | null): IAppAction => ({
    type: superheroesActionTypes.SET_CHARACTERS,
    payload: characters,
  });

  /**
   *  Set comic characters request
   * @param {boolean} inRequest - define the characters request status
   */
  const setCharactersRequest = (inRequest: boolean): IAppAction => ({
    type: superheroesActionTypes.SET_CHARACTERS_REQUEST,
    payload: inRequest,
  });

  /**
   * Executing the request to get list of comic characters
   */
  const getCharacters = (): ThunkResult<void> => {
    return async (dispatch) => {
      dispatch(setCharactersRequest(true));
      try {
        const { status, data } = await superheroesService.getCharacters();

        if (status === httpStatuses.OK) {
          dispatch(setCharacters(data.data.results));
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(setCharactersRequest(false));
    };
  };

  return {
    setCharacters,
    setCharactersRequest,
    getCharacters,
  };
};
