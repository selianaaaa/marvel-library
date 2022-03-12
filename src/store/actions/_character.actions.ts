import { SuperheroesService } from '@services';
import {
  superheroesActionTypes,
  IAppAction,
  ThunkResult,
  ICharacter,
} from '@types';
import { httpStatuses } from '@constants';

export const createCharacterActions = (
  superheroesService: SuperheroesService,
) => {
  /**
   *  Set comic character
   * @param {ICharacter | null} character - comic character
   */
  const setCharacter = (character: ICharacter | null): IAppAction => ({
    type: superheroesActionTypes.SET_CHARACTER,
    payload: character,
  });

  /**
   *  Set comic character request
   * @param {boolean} inRequest - define the character request status
   */
  const setCharacterRequest = (inRequest: boolean): IAppAction => ({
    type: superheroesActionTypes.SET_CHARACTER_REQUEST,
    payload: inRequest,
  });

  /**
   * Executing the request to get data about comic character
   * @param {string} id - character id
   */
  const getCharacter = (id: string): ThunkResult<void> => {
    return async (dispatch) => {
      dispatch(setCharacterRequest(true));
      try {
        const { status, data } = await superheroesService.getCharacter(id);

        if (status === httpStatuses.OK) {
          dispatch(setCharacter(data.data.results[0]));
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
      dispatch(setCharacterRequest(false));
    };
  };

  return {
    setCharacter,
    setCharacterRequest,
    getCharacter,
  };
};
