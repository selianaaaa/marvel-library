export interface ISuperHero {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
}

export enum superheroesActionTypes {
  // GET_SUPERHEROES = 'get superheroes',
  SET_SUPERHEROES = 'set superheroes',
  SET_SUPERHEROES_REQUEST = 'set superheroes request',
}

export interface ISuperheroesState {
  superheroes: ISuperHero[] | null;
  superheroes_request: boolean;
}

export interface IAppState {
  superheroes: ISuperheroesState;
}

export interface IStoreAction {
  type: superheroesActionTypes;
  payload?: any;
}

export type IAppAction = Omit<IStoreAction, 'type'> & {
  type: superheroesActionTypes;
};
