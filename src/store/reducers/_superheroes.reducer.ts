import { Reducer } from 'redux';
import { ISuperheroesState, superheroesActionTypes, IAppAction } from '@types';

export const initialState: ISuperheroesState = {
  superheroes: null,
  superheroes_request: false,
};

export const superheroesReducer: Reducer<ISuperheroesState> = (
  state: ISuperheroesState = initialState,
  { type, payload }: IAppAction,
) => {
  switch (type) {
    case superheroesActionTypes.SET_SUPERHEROES:
      console.log('SET_SUPERHEROES', payload);
      return {
        ...state,
        superheroes: payload,
      };
    case superheroesActionTypes.SET_SUPERHEROES_REQUEST:
      return {
        ...state,
        superheroes_request: payload,
      };
    default:
      return state;
  }
};
