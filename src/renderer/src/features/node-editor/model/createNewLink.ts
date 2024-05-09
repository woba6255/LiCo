import { uuid } from 'shared/utils'
import { EventLink } from '../types'

export function createNewLink(linkPartial: Partial<EventLink> & Pick<EventLink, 'source' | 'target'>): EventLink {
    return {
        id: uuid(),
        ...linkPartial,
    }
}
