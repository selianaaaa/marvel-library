import { superheroesService } from '@services';
import { createSuperheroesActions } from './_superheroes.actions';

export const superheroesActions = createSuperheroesActions(superheroesService);
