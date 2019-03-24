// @ts-ignore
import { version as DPE_VERSION } from '../package.json';
import E from './struct/Embeds';
import FE from './struct/FieldsEmbed';

/**
 * A pagination mode that uses an array of MessageEmbed to paginate.
 * @extends [[PaginationEmbed]]
 */
export const Embeds = E;

/**
 * A pagination mode that uses a MessageEmbed with a field(s) containing the elements to paginate.
 * @extends [[PaginationEmbed]]
 */
export const FieldsEmbed = FE;

export const version: string = DPE_VERSION;
