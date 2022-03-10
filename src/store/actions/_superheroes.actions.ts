import { SuperheroesService } from '@services';
import {
  superheroesActionTypes,
  IAppAction,
  ThunkResult,
  IRequestError,
  ICharactersData,
} from '@types';
import { httpStatuses } from '@constants';

export const createSuperheroesActions = (
  superheroesService: SuperheroesService,
) => {
  /**
   *  Set data about comic characters
   * @param {ICharactersData | null} characters - list of characters
   */
  const setCharacters = (characters: ICharactersData | null): IAppAction => ({
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
   * Executing the request to get data about comic characters
   */
  const getCharacters = (): ThunkResult<void> => {
    return async (dispatch) => {
      dispatch(setCharactersRequest(true));
      try {
        const { status, data } = await superheroesService.getCharacters();

        if (status === httpStatuses.OK) {
          dispatch(setCharacters(data.data));
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
