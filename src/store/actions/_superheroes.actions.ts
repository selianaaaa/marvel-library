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
   *  Set the list of characters
   * @param {ICharacter[] | null} characters - list of characters
   */
  const setCharacters = (characters: ICharacter[] | null): IAppAction => ({
    type: superheroesActionTypes.SET_CHARACTERS,
    payload: characters,
  });

  /**
   *  Set characters request
   * @param {boolean} inRequest - define the characters request status
   */
  const setCharactersRequest = (inRequest: boolean): IAppAction => ({
    type: superheroesActionTypes.SET_CHARACTERS_REQUEST,
    payload: inRequest,
  });

  /**
   * Executing the request to get characters
   */
  const getCharacters = (): ThunkResult<void> => {
    return async (dispatch) => {
      dispatch(setCharactersRequest(true));
      try {
        const response = await superheroesService.getCharacters();

        console.log('response', response);
        // if (ok) {
        //   // dispatch(setTaggedNews(data));
        // }
      } catch (error) {
        console.log(error);
        // alert(error);
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
