import { ISuperheroesState, superheroesActionTypes } from '../types';
import { superheroesReducer } from '../store';

describe('Superheroes state', () => {
  test('should change the state', () => {
    const state: ISuperheroesState = {
      characters: null,
      characters_request: false,
      character: null,
      characters_search: '',
      character_request: false,
      comics: null,
      comics_request: false,
    };

    const newState = superheroesReducer(state, {
      type: superheroesActionTypes.SET_CHARACTERS,
      payload: [],
    });

    expect(newState).toEqual({ ...state, characters: [] });
  });
});
