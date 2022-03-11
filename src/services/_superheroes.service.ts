import axios from 'axios';

import { ICharacter, IMarvelResponse, IComics } from '@types';
import { urlsConstants } from '@constants';
import { encodeMd5 } from '@utils';

export class SuperheroesService {
  /**
   * The request to get list of comic characters
   */
  getCharacters(offset = 0, nameStartsWith?: string) {
    const timeStamp = new Date().getTime();
    const privateKey = process.env.REACT_APP_MARVEL_PRIVITE_KEY;
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const hash = encodeMd5({
      timeStamp,
      privateKey,
      publicKey,
    });

    let queryStr = `ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    if (offset) {
      queryStr += `&offset=${offset}`;
    }

    if (nameStartsWith) {
      queryStr += `&nameStartsWith=${nameStartsWith}`;
    }

    return axios.get<IMarvelResponse<ICharacter[]>>(
      `${urlsConstants.MARVEL_URL}/characters?${queryStr}`,
    );
  }

  /**
   * The request to get comic character
   * @param {string} id - character id
   */
  getCharacter(id: string) {
    const timeStamp = new Date().getTime();
    const privateKey = process.env.REACT_APP_MARVEL_PRIVITE_KEY;
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const hash = encodeMd5({
      timeStamp,
      privateKey,
      publicKey,
    });

    return axios.get<IMarvelResponse<ICharacter[]>>(
      `${urlsConstants.MARVEL_URL}/characters?id=${id}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`,
    );
  }

  /**
   * The request  to get data about comics containing a specific character
   * @param {string} characterId - character id
   */
  getComics(characterId: string) {
    const timeStamp = new Date().getTime();
    const privateKey = process.env.REACT_APP_MARVEL_PRIVITE_KEY;
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const hash = encodeMd5({
      timeStamp,
      privateKey,
      publicKey,
    });

    return axios.get<IMarvelResponse<IComics[]>>(
      `${urlsConstants.MARVEL_URL}/characters/${characterId}/comics?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`,
    );
  }
}
