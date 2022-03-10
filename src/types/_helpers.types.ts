export interface ICharacter {
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

export interface IRequestError {
  code: string;
  message: string;
}

export interface IMarvelResponseData<Result> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  result: Result;
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
