export interface IThumbnail {
  path: string;
  extension: string;
}

export interface ICharacterComisc {
  name: string;
  resourceURI: string;
}

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: ICharacterComisc[];
  };
}

export interface IComicCreator {
  name: string;
}

export interface IComics {
  id: number;
  digitalId: number;
  title: string;
  variantDescription: string;
  description: string;
  thumbnail: IThumbnail;
  creators: {
    items: IComicCreator[];
  };
}

export interface IRequestError {
  code: string;
  message: string;
}

export interface IMarvelResponseData<Result> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result;
}

export interface IMarvelResponse<Result> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: IMarvelResponseData<Result>;
}

export type ICharactersData = IMarvelResponseData<ICharacter[]>;
export type IComicsData = IMarvelResponseData<IComics[]>;
