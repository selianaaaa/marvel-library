import { SuperheroesService } from '@services';
import {
  superheroesActionTypes,
  IAppAction,
  ThunkResult,
  IRequestError,
  ICharactersData,
  ICharacter,
  IComics,
} from '@types';
import { httpStatuses } from '@constants';

export const createSuperheroesActions = (
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
    setCharacters,
    setCharactersRequest,
    getCharacters,
    addCharacters,
    getMoreCharacters,
    setCharacter,
    setCharacterRequest,
    getCharacter,
    setComics,
    setComicsRequest,
    getComics,
  };
};
