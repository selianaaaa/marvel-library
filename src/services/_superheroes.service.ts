import axios from 'axios';

import { ICharacter, IMarvelResponse } from '@types';
import { urlsConstants } from '@constants';
import { encodeMd5 } from '@utils';

export class SuperheroesService {
  /**
   * The request to get the list of characters
   */
  getCharacters() {
    const timeStamp = new Date().getTime();
    const privateKey = process.env.REACT_APP_MARVEL_PRIVITE_KEY;
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const hash = encodeMd5({
      timeStamp,
      privateKey,
      publicKey,
    });

    return axios.get<IMarvelResponse<ICharacter[]>>(
      `${urlsConstants.MARVEL_URL}/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`,
    );
  }
}
