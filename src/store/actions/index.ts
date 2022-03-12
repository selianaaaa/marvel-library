import { superheroesService } from '@services';
import { createCharactersActions } from './_characters.actions';
import { createCharacterActions } from './_character.actions';
import { createComicsActions } from './_comics.actions';

export const charactersActions = createCharactersActions(superheroesService);
export const characterActions = createCharacterActions(superheroesService);
export const comicsActions = createComicsActions(superheroesService);
