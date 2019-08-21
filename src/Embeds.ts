import { ColorResolvable, Message, MessageEmbedField, RichEmbed, StringResolvable } from 'discord.js';
import { PaginationEmbed } from './base';

/**
 * A pagination mode that uses an array of RichEmbed to paginate.
 * @extends [[PaginationEmbed]]
 * @noInheritDoc
 */
export class Embeds extends PaginationEmbed<RichEmbed> {

  /** The title of all embeds. */
  public title: string;

  /** The description of all embeds. */
  public description: string;

  /** The URL of all embeds. */
  public url: string;

  /** The color of all embeds. */
  public color: number;

  /** The timestamp of all embeds. */
  public timestamp: number;

  /** The fields of all embeds. */
  public fields: MessageEmbedField[];

  /** The thumbnail of all embeds. */
  public thumbnail: string;

  /** The image of all embeds. */
  public image: string;

  /** The author of all embeds. */
  public author: {
    name: string,
    url?: string,
    iconURL?: string
  };

  /** The footer of all embeds. */
  public footer: {
    text: string,
    iconURL?: string
  };

  /** Embed in the current page. */
  get currentEmbed (): RichEmbed {
    return this.array[this.page - 1];
  }

  /**
   * Adds a blank field to the fields of all embeds.
   * @param inline - Whether the field is inline to the other fields.
   */
  public addBlankField (inline = false) {
    if (!this.array) throw new TypeError('this.array must be set first.');

    for (const el of this.array)
      el.addBlankField(inline);

    return this;
  }

  /**
   * Adds a field to the fields of all embeds.
   * @param name - The name of the field.
   * @param value - The value of the field.
   * @param inline - Whether the field is inline to the other fields.
   */
  public addField (name: string, value: StringResolvable, inline = false) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!name && !value) return this;

    for (const el of this.array)
      el.addField(name, value, inline);

    return this;
  }

  /**
   * Build the Pagination Embeds.
   *
   * ### Example
   * ```js
   *   const { Embeds } = require('discord-paginationembed');
   *   const { RichEmbed } = require('discord.js');
   *
   *   // Under message event.
   *   const embeds = [];
   *
   *   for (let i = 0; i < 5; ++i)
   *    embeds.push(new RichEmbed().addField('Page', i + 1));
   *
   *   new Embeds()
   *    .setAuthorizedUsers([message.author.id])
   *    .setChannel(message.channel)
   *    .setClientAssets({ prompt: 'Yo {{user}} wat peige?!?!?' })
   *    .setArray(embeds)
   *    .setPageIndicator(false)
   *    .setPage(1)
   *    .setTimeout(69000)
   *    .setNavigationEmojis({
   *      back: '◀',
   *      jump: '↗',
   *      forward: '▶',
   *      delete: '🗑'
   *    })
   *    .setFunctionEmojis({
   *      '⬆': (_, instance) => {
   *        for (const embed of instance.array)
   *          embed.fields[0].value++;
   *        },
   *      '⬇': (_, instance) => {
   *         for (const embed of instance.array)
   *           embed.fields[0].value--;
   *        }
   *    })
   *    .setDescription('This is one of my embeds with this message!')
   *    .setColor(0xFF00AE)
   *    .setTimestamp()
   *    .build();```
   */
  public async build () {
    this.pages = this.array.length;

    await this._verify();

    if (this.listenerCount('start')) this.emit('start');

    return this._loadList();
  }

  /**
   * Sets the array of RichEmbed to paginate.
   * @param array - An array of RichEmbed to paginate.
   */
  public setArray (array: RichEmbed[]) {
    const isValidArray = Array.isArray(array) && Boolean(array.length);

    if (!isValidArray) throw new TypeError('Cannot invoke Embeds class without a valid array to paginate.');

    for (let i = 0; i < array.length; i++)
      if (array[i] instanceof RichEmbed) continue;
      else
        throw new TypeError(`(MessageEmbeds[${i}]) Cannot invoke Embeds class with an invalid RichEmbed instance.`);

    this.array = array;

    return this;
  }

  /**
   * Set the author of all embeds.
   * @param name - The name of the author.
   * @param iconURL - The icon URL of the author.
   * @param url - The URL of the author.
   */
  public setAuthor (name: string, iconURL?: string, url?: string) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!name) return this;

    for (const el of this.array)
      el.setAuthor(name, iconURL, url);

    return this;
  }

  /**
   * Sets the color of all embeds.
   * @param color - The color of all embeds.
   */
  public setColor (color: ColorResolvable) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!color) return this;

    for (const el of this.array)
      el.setColor(color);

    return this;
  }

  /**
   * Sets the description of all embeds.
   * @param description - The description of all embeds.
   */
  public setDescription (description: StringResolvable) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!description) return this;

    for (const el of this.array)
      el.setDescription(description);

    return this;
  }

  /**
   * Sets the footer of all embeds.
   * @param text - The footer text.
   * @param iconURL - URL for the footer's icon.
   */
  public setFooter (text: StringResolvable, iconURL?: string) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!text) return this;

    for (const el of this.array)
      el.setFooter(text, iconURL);

    return this;
  }

  /**
   * Sets the image of all embeds.
   * @param url - The image of all embeds.
   */
  public setImage (url: string ) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!url) return this;

    for (const el of this.array)
      el.setImage(url);

    return this;
  }

  /**
   * Sets the thumbnail of all embeds.
   * @param url - The thumbnail of all embeds.
   */
  public setThumbnail (url: string) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!url) return this;

    for (const el of this.array)
      el.setThumbnail(url);

    return this;
  }

  /**
   * Sets the timestamp of all embeds.
   * @param timestamp - The timestamp or date.
   */
  public setTimestamp (timestamp?: Date | number) {
    if (!this.array) throw new TypeError('this.array must be set first.');

    for (const el of this.array)
      el.setTimestamp(timestamp);

    return this;
  }

  /**
   * Sets the title of all embeds.
   * @param title - The title of all embeds.
   */
  public setTitle (title: StringResolvable) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!title) return this;

    for (const el of this.array)
      el.setTitle(title);

    return this;
  }

  /**
   * Sets the URL of all embeds.
   * @param url - The URL of all embeds.
   */
  public setURL (url: string) {
    if (!this.array) throw new TypeError('this.array must be set first.');
    if (!url) return this;

    for (const el of this.array)
      el.setURL(url);

    return this;
  }

  /** @ignore */
  public async _loadList (callNavigation = true) {
    const shouldIndicate = this.pageIndicator
      ? this.pages === 1
        ? undefined
        : `Page ${this.page} of ${this.pages}`
      : undefined;

    if (this.clientAssets.message)
      await this.clientAssets.message.edit(shouldIndicate, { embed: this.currentEmbed });
    else
      this.clientAssets.message = await this.channel.send(shouldIndicate, { embed: this.currentEmbed }) as Message;

    return super._loadList(callNavigation);
  }
}
