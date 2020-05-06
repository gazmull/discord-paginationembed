import { Message, MessageEmbed } from 'discord.js';
import { PaginationEmbed } from './base';

/**
 * A pagination mode that uses a MessageEmbed with a field(s) containing the elements to paginate.
 * @extends [[PaginationEmbed]]
 * @noInheritDoc
 */
export class FieldsEmbed<Element> extends PaginationEmbed<Element> {

  constructor () {
    super();

    this.elementsPerPage = 10;
    this.embed = new MessageEmbed();
  }

  /** Maximum number of elements to be displayed per page. */
  public elementsPerPage: number;

  /**
   * The MessageEmbed being used for this mode.
   *
   * ### Notice
   * To customise the MessageEmbed for this mode, please access this property. Example:
   * ```js
   * <FieldsEmbed>.embed.setColor('red')
   * ```
   */
  public embed: MessageEmbed;

  /** Elements in the current page. */
  get elementList (): Element[] {
    const begin = (this.page - 1) * this.elementsPerPage;
    const end = begin + this.elementsPerPage;

    return this.array.slice(begin, end);
  }

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
   *        const field = instance.embed.fields[0];
   *
   *        if (field.name === 'Name')
   *          field.name = user.tag;
   *        else
   *          field.name = 'Name';
   *      }
   *    })
   *    .build();```
   */
  public async build () {
    this.pages = Math.ceil(this.array.length / this.elementsPerPage);

    await this._verify();

    const fields = this.embed.fields;
    this.embed.fields = [];

    for (const field of fields)
      if (typeof field.value === 'function')
        this.formatField(field.name, field.value, field.inline);
      else
        this.embed.addField(field.name, field.value, field.inline);

    const hasPaginateField = this.embed.fields.filter(f => typeof f.value === 'function').length;

    if (!hasPaginateField)
      throw new Error('Cannot invoke FieldsEmbed class without at least one formatted field to paginate.');

    return this._loadList();
  }

  /**
   * Adds a field to the embed.
   * Same as MessageEmbed.addField, but value takes a function instead.
   * @param name - Name of the field.
   * @param value - Value of the field. Function for `Array.prototype.map().join('\n')`.
   * @param inline - Whether the field is inline with other field. Default: `true`
   */
  public formatField (name: string, value: (element: Element) => any, inline = true) {
    if (typeof value !== 'function') throw new TypeError('formatField() value parameter only takes a function.');

    // @ts-ignore
    this.embed.fields.push({ name, value, inline });

    return this;
  }

  /**
   * Sets the maximum number of elements to be displayed per page.
   * @param max - Maximum number of elements to be displayed per page.
   */
  public setElementsPerPage (max: number) {
    if (typeof max !== 'number') throw new TypeError('setElementsPerPage() only accepts number type.');

    this.elementsPerPage = max;

    return this;
  }

  protected async _drawList () {
    const embed = new MessageEmbed(this.embed);
    embed.fields = [];

    for (const field of this.embed.fields)
      embed.addField(
        field.name,
        typeof field.value === 'function'
          ? this.elementList.map(field.value).join('\n')
          : field.value,
        field.inline
      );

    return embed;
  }

  /** @ignore */
  public async _loadList (callNavigation = true) {
    const embed = await this._drawList();
    const shouldIndicate = this.pageIndicator
      ? this.pages === 1
        ? undefined
        : this._buildIndicator()
      : undefined;

    if (this.clientAssets.message)
      await this.clientAssets.message.edit(shouldIndicate, { embed });
    else
      this.clientAssets.message = await this.channel.send(shouldIndicate, { embed }) as Message;
    return super._loadList(callNavigation);
  }
  
  /** @ignore */
  private _buildIndicator () {
    if (!this.circleIndicator) return `Page ${this.page} of ${this.pages}`;
    
    let textualIndicator = `[${this.page}/${this.pages}] `;
    
    for (let i = 0; i < this.pages; i++)
      textualIndicator += i === this.page - 1 ? '● ' : '○ ';
    
    return textualIndicator.trim();
  }
}
