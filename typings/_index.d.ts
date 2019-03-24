import { ColorResolvable, DMChannel, EmbedField, MessageEmbed, Snowflake, StringResolvable, TextChannel, User } from 'discord.js';
import { EventEmitter } from 'events';
import { DisabledNavigationEmojis, IClientAssets, IFunctionEmoji, INavigationEmojis, PaginationEmbedEvents } from '../src/shared';

/** @extends [[EventEmitter]] */
declare class PaginationEmbed<Element> extends EventEmitter implements PaginationEmbedEvents {

  /** The authorized users to navigate the pages. */
  public authorizedUsers: Snowflake[];

  /** The channel where to send the embed. */
  public channel: TextChannel | DMChannel;

  /** Settings for assets for the client. */
  public clientAssets: IClientAssets;

  /** An array of elements to paginate. */
  public array: Element[];

  /** Whether page number indicator on client's message is shown or not. */
  public pageIndicator: boolean;

  /**  Whether the client's message will be deleted upon timeout or not. */
  public deleteOnTimeout: boolean;

  /** Jumps to a certain page upon PaginationEmbed.build(). */
  public page: number;

  /** The time for awaiting a user action before timeout in ms. */
  public timeout: number;

  /** The emojis used for navigation emojis. */
  public navigationEmojis: INavigationEmojis;

  /** The emojis used for function emojis. */
  public functionEmojis: IFunctionEmoji<Element>;

  /**
   * The disabled navigation emojis.
   * Available navigation emojis to disable:
   * - 'BACK'
   * - 'JUMP'
   * - 'FORWARD'
   * - 'DELETE'
   * - 'ALL'
   */
  public disabledNavigationEmojis: Array< 'BACK' | 'JUMP' | 'FORWARD' | 'DELETE' | 'ALL' >;

  /**
   * Number of pages for this instance.
   * @ignore
   */
  public pages: number;

  /**
   * Adds a function emoji to the embed.
   *
   * ### Example
   * ```js
   *  <PaginationEmbed>.addFunctionEmoji('🅱', (_, instance) => {
   *    const field = instance.fields[0];
   *
   *    if (field.name.includes('🅱'))
   *      field.name = 'Name';
   *    else
   *      field.name = 'Na🅱e';
   *  });
   * ```
   * @param emoji - The emoji to use as the function's emoji.
   * @param callback - The function to call upon pressing the function emoji.
   */
  public addFunctionEmoji(emoji: string, callback: (user: User, instance: Embeds | FieldsEmbed<Element>) => any): this;

  /**
   * Deletes a function emoji.
   * @param emoji - The emoji key to delete.
   */
  public deleteFunctionEmoji(emoji: string): this;

  /** Deletes all function emojis, and then re-enables all navigation emojis. */
  public resetEmojis(): this;

  /**
   * Sets the array of elements to paginate.
   * @param array - An array of elements to paginate.
   */
  public setArray(array: Element[]): this;

  /**
   * Set the authorized users to navigate the pages.
   * @param users - An array of user IDs.
   */
  public setAuthorizedUsers(users: Snowflake[]): this;

  /**
   * The channel where to send the embed.
   * @param channel - The channel object.
   */
  public setChannel(channel: TextChannel | DMChannel): this;

  /**
   * Sets the assets for the client.
   * @param assets - Options to provide assets for the client.
   */
  public setClientAssets(assets: IClientAssets): this;

  /**
   * Sets the disabled navigation emojis.
   *
   * ### Example
   * ```js
   *  // Disable specific navigation emojis
   *  <PaginationEmbed>.setDisabledNavigationEmojis(['delete', 'jump']);
   *
   *  // Disable all navigation emojis
   *  <PaginationEmbed>.setDisabledNavigationEmojis(['all']);
   * ```
   *
   * @param emojis  - An array of navigation emojis to disable.
   */
  public setDisabledNavigationEmojis (emojis: DisabledNavigationEmojis): this;

  /**
   * Sets the emojis used for function emojis.
   *
   * ### Example
   * ```js
   *  <PaginationEmbed>.setFunctionEmojis({
   *    '🔄': (user, instance) => {
   *      const field = instance.fields[0];
   *
   *      if (field.name === 'Name')
   *        field.name = user.tag;
   *      else
   *        field.name = 'Name';
   *    }
   *  });
   * ```
   * @param emojis - An object containing customised emojis to use as function emojis.
   */
  public setFunctionEmojis (emojis: IFunctionEmoji<Element>): this;

  /**
   * Sets the emojis used for navigation emojis.
   * @param emojis - An object containing customised emojis to use as navigation emojis.
   */
  public setNavigationEmojis (emojis: INavigationEmojis): this;

  /**
   * Sets to jump to a certain page upon calling PaginationEmbed.build().
   * @param page - The page number to jump to.
   */
  public setPage (page: number | 'back' | 'forward'): this;

  /**
   * Sets the time for awaiting a user action before timeout in ms.
   * @param timeout Timeout value in ms.
   */
  public setTimeout(timeout: number): this;

  /**
   * Sets whether page number indicator on client's message is shown or not.
   * @param indicator - Show page indicator?
   */
  public showPageIndicator(indicator: boolean): this;

  /**
   * Sets whether the client's message will be deleted upon timeout or not.
   * @param deleteOnTimeout - Delete client's message upon timeout?
   */
  public setDeleteOnTimeout(deleteOnTimeout: boolean): this;
}

/**
 * A pagination mode that uses an array of MessageEmbed to paginate.
 * @extends [[PaginationEmbed]]
 */
declare class Embeds extends PaginationEmbed<MessageEmbed> {

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
  public fields: EmbedField[];

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

  /** The MessageEmbed in the current page. */
  public currentEmbed: MessageEmbed;

  /**
   * Adds a blank field to the fields of all embeds.
   * @param inline - Whether the field is inline or not to the other fields.
   */
  public addBlankField(inline?: boolean): this;

  /**
   * Adds a field to the fields of all embeds.
   * @param name - The name of the field.
   * @param value - The value of the field.
   * @param inline - Whether the field is inline or not to the other fields.
   */
  public addField(name: string, value: StringResolvable, inline?: boolean): this;

  /**
   * Build the Pagination Embeds.
   *
   * ### Example
   * ```js
   *   const { Embeds } = require('discord-paginationembed');
   *   const { MessageEmbed } = require('discord.js');
   *
   *   // Under message event.
   *   const embeds = [];
   *
   *   for (let i = 0; i < 5; ++i)
   *    embeds.push(new MessageEmbed().addField('Page', i + 1));
   *
   *   new Embeds()
   *    .setAuthorizedUsers([message.author.id])
   *    .setChannel(message.channel)
   *    .setClientAssets({ prepare: 'Preparing the embed...' })
   *    .setArray(embeds)
   *    .showPageIndicator(false)
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
  public build(): Promise<void>;

  /**
   * Sets the array of MessageEmbed to paginate.
   * @param array - An array of MessageEmbed to paginate.
   */
  public setArray(array: MessageEmbed[]): this;

  /**
   * Set the author of all embeds.
   * @param name - The name of the author.
   * @param iconURL - The icon URL of the author.
   * @param url - The URL of the author.
   */
  public setAuthor(name: string, iconURL?: string, url?: string): this;

  /**
   * Sets the color of all embeds.
   * @param color - The color of all embeds.
   */
  public setColor(color: ColorResolvable): this;

  /**
   * Sets the description of all embeds.
   * @param description - The description of all embeds.
   */
  public setDescription(description: StringResolvable): this;

  /**
   * Sets the footer of all embeds.
   * @param text - The footer text.
   * @param iconURL - URL for the footer's icon.
   */
  public setFooter(text: StringResolvable, iconURL?: string): this;

  /**
   * Sets the image of all embeds.
   * @param url - The image of all embeds.
   */
  public setImage(url: string): this;

  /**
   * Sets the thumbnail of all embeds.
   * @param url - The thumbnail of all embeds.
   */
  public setThumbnail(url: string): this;

  /**
   * Sets the timestamp of all embeds.
   * @param timestamp - The timestamp or date.
   */
  public setTimestamp(timestamp?: Date | number): this;

  /**
   * Sets the title of all embeds.
   * @param title - The title of all embeds.
   */
  public setTitle(title: StringResolvable): this;

  /**
   * Sets the URL of all embeds.
   * @param url - The URL of all embeds.
   */
  public setURL(url: string): this;

  /**
   * Removes, replaces, and inserts fields in all embeds (max 25).
   * @param index - The index to start at.
   * @param deleteCount - The number of fields to remove.
   * @param name - The name of the field.
   * @param value - The value of the field.
   * @param inline - Set the field to display inline.
   */
  public spliceField(index: number, deleteCount: number, name?: StringResolvable, value?: StringResolvable, inline?: boolean): this;
}

/**
 * A pagination mode that uses a MessageEmbed with a field(s) containing the elements to paginate.
 * @extends [[PaginationEmbed]]
 */
declare class FieldsEmbed<Element> extends PaginationEmbed<Element> {

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
  public elementList: Element[];

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
   *    .setClientAssets({ prepare: 'Preparing the embed...' })
   *    .setArray([{ name: 'John Doe' }, { name: 'Jane Doe' }])
   *    .setElementsPerPage(1)
   *    .showPageIndicator(false)
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
  public build(): Promise<void>;

  /**
   * Adds a field to the embed.
   * Same as MessageEmbed.addField, but value takes a function instead.
   * @param name - Name of the field.
   * @param value - Value of the field. Function for `Array.prototype.map().join('\n')`.
   * @param inline - Whether the field is inline with other field or not. Default: `true`
   */
  public formatField(name: string, value: (element: Element) => any, inline?: boolean): this;

  /**
   * Sets the maximum number of elements to be displayed per page.
   * @param max - Maximum number of elements to be displayed per page.
   */
  public setElementsPerPage(max: number): this;
}
