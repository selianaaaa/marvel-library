import { SuperheroesService } from '@services';
import {
  superheroesActionTypes,
  IAppAction,
  ThunkResult,
  IRequestError,
  ICharactersData,
} from '@types';
import { httpStatuses } from '@constants';

export const createCharactersActions = (
  superheroesService: SuperheroesService,
) => {
  /**
   *  Set data about comic characters
   * @param {ICharactersData | null} characters - data of characters
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
   *  Set search value for matching characters
   * @param {string} searchValue - search value
   */
  const setCharactersSearch = (searchValue: string): IAppAction => ({
    type: superheroesActionTypes.SET_CHARACTERS_SEARCH,
    payload: searchValue,
  });

  /**
   * Executing the request to get data about comic characters
   * @param {number} offset - offset data request
   * @param {string} nameStartsWith - value to search matching characters' name
   */
  const getCharacters = (
    offset?: number,
    nameStartsWith?: string,
  ): ThunkResult<void> => {
    return async (dispatch) => {
      if (!offset) {
        dispatch(setCharacters(null));
      }

      if (nameStartsWith) {
        dispatch(setCharactersSearch(nameStartsWith));
      }

      dispatch(setCharactersRequest(true));
      try {
        const { status, data } = await superheroesService.getCharacters(
          offset,
          nameStartsWith,
        );

        if (status === httpStatuses.OK) {
          dispatch(setCharacters(data.data));
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
      dispatch(setCharactersRequest(false));
    };
  };

  /**
   * Adding more comics characters to the list of them
   * * @param {ICharactersData} extraCharactersData - data of more characters
   */
  const addCharacters = (
    extraCharactersData: ICharactersData,
  ): ThunkResult<void> => {
    return (dispatch, getState) => {
      const { characters } = getState().superheroes;

      const currentCharacters = characters?.results || [];

      const newCharacters = [
        ...currentCharacters,
        ...extraCharactersData.results,
      ];

      const newCharactersData: ICharactersData = {
        ...extraCharactersData,
        results: newCharacters,
      };

      dispatch(setCharacters(newCharactersData));
    };
  };

  /**
   * Executing the request to get more  comic characters
   * @param {string} nameStartsWith - value to search matching characters' name
   */
  const getMoreCharacters = (nameStartsWith?: string): ThunkResult<void> => {
    return async (dispatch, getState) => {
      const { characters } = getState().superheroes;
      const offset = characters ? characters.offset + 20 : 0;

      try {
        const { status, data } = await superheroesService.getCharacters(
          offset,
          nameStartsWith,
        );

        if (status === httpStatuses.OK) {
          dispatch(addCharacters(data.data));
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
  };

  return {
    setCharacters,
    setCharactersRequest,
    getCharacters,
    addCharacters,
    getMoreCharacters,
  };
};
