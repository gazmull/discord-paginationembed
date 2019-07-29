import { RichEmbed } from 'discord.js';
import { PaginationEmbed } from './base';
/**
 * A pagination mode that uses a RichEmbed with a field(s) containing the elements to paginate.
 * @extends [[PaginationEmbed]]
 * @noInheritDoc
 */
export declare class FieldsEmbed<Element> extends PaginationEmbed<Element> {
    constructor();
    /** Maximum number of elements to be displayed per page. */
    elementsPerPage: number;
    /**
     * The RichEmbed being used for this mode.
     *
     * ### Notice
     * To customise the RichEmbed for this mode, please access this property. Example:
     * ```js
     * <FieldsEmbed>.embed.setColor('red')
     * ```
     */
    embed: RichEmbed;
    /** Elements in the current page. */
    readonly elementList: Element[];
    /**
     * Build the Pagination Fields Embed.
     *
     * ### Example
     * ```js
     *   const { FieldsEmbed } = require('discord-paginationembed');
     *
     *   // Under message event.
     *   new FieldsEmbed()
     *    .setAuthorizedUsers([message.author.id])
     *    .setChannel(message.channel)
     *    .setClientAssets({ prompt: 'Yo {{user}} wat peige?!?!?' })
     *    .setArray([{ name: 'John Doe' }, { name: 'Jane Doe' }])
     *    .setElementsPerPage(1)
     *    .setPageIndicator(false)
     *    .formatField('Name', el => el.name)
     *    .setPage(1)
     *    .setTimeout(69000)
     *    .setNavigationEmojis({
     *      back: '◀',
     *      jump: '↗',
     *      forward: '▶',
     *      delete: '🗑'
     *    })
     *    .setFunctionEmojis({
     *      '🔄': (user, instance) => {
     *        const field = instance.fields[0];
     *
     *        if (field.name === 'Name')
     *          field.name = user.tag;
     *        else
     *          field.name = 'Name';
     *      }
     *    })
     *    .build();```
     */
    build(): Promise<void>;
    /**
     * Adds a field to the embed.
     * Same as RichEmbed.addField, but value takes a function instead.
     * @param name - Name of the field.
     * @param value - Value of the field. Function for `Array.prototype.map().join('\n')`.
     * @param inline - Whether the field is inline with other field. Default: `true`
     */
    formatField(name: string, value: (element: Element) => any, inline?: boolean): this;
    /**
     * Sets the maximum number of elements to be displayed per page.
     * @param max - Maximum number of elements to be displayed per page.
     */
    setElementsPerPage(max: number): this;
    protected _drawList(): Promise<RichEmbed>;
    /** @ignore */
    _loadList(callNavigation?: boolean): Promise<void>;
}
