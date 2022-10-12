import {Hero} from './Hero'
import {Villain} from './Villain'
import {Boy} from './Boy'

export type HeroProperty = Hero['name'] | Hero['description'] | Hero['id']
export type VillainProperty =
  | Villain['name']
  | Villain['description']
  | Villain['id']

export type BoyProperty = Boy['name'] | Boy['description'] | Boy['id']
export type EntityRoute = 'heroes' | 'villains' | 'boys'
export type EntityType = 'hero' | 'villain' | 'boy'

/** Returns the corresponding route for the entity;
 *
 * `hero` -> `/heroes`, `villain` -> `/villains`, `boy` -> `/boys` */
export const entityRoute = (entityType: EntityType) =>
  entityType === 'hero'
    ? 'heroes'
    : entityType === 'villain'
    ? 'villains'
    : 'boys'

export interface State {
  loading: boolean
  data: Boy[]
  error: undefined
}
/* istanbul ignore file */
