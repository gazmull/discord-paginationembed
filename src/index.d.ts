import {
  ColorResolvable,
  DMChannel,
  MessageEmbed,
  StringResolvable,
  TextChannel,
  User,
  Message,
  EmbedField
} from 'discord.js';

declare module 'discord-paginationembed' {
  /**
   * A pagination mode that uses an array of MessageEmbed to paginate.
   * @extends [[PaginationEmbed]]
   */
  export class Embeds extends PaginationEmbed {
    /**
     * @param options Options for Embeds.
     */
    constructor(options?: EmbedsOptions);

    /**
     * The title of all embeds.
     */
    public title: string;

    /**
     * The description of all embeds.
     */
    public description: string;

    /**
     * The URL of all embeds.
     */
    public url: string;

    /**
     * The color of all embeds.
     */
    public color: number;

    /**
     * The timestamp of all embeds.
     */
    public timestamp: number;

    /**
     * The fields of all embeds.
     */
    public fields: EmbedField[];

    /**
     * The thumbnail of all embeds.
     */
    public thumbnail: MessageEmbed['thumbnail'];

    /**
     * The image of all embeds.
     */
    public image: MessageEmbed['image'];

    /**
     * The author of all embeds.
     */
    public author: MessageEmbed['author'];

    /**
     * The footer of all embeds.
     */
    public footer: MessageEmbed['footer'];

    /**
     * The MessageEmbed in the current page.
     */
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
     * ## Example
     *
     * Object as constructor.
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
     *   new Embeds({
     *    authorizedUsers: [message.author.id],
     *    channel: message.channel,
     *    clientMessage: { content: 'Preparing the embed...' },
     *    array: embeds,
     *    pageIndicator: false,
     *    page: 1,
     *    timeout: 69000,
     *    navigationEmojis: {
     *      back: '◀',
     *      jump: '↗',
     *      forward: '▶',
     *      delete: '🗑'
     *    },
     *    functionEmojis: {
     *      '⬆': (_, instance) => {
     *        for (const embed of instance.array)
     *          embed.fields[0].value++;
     *      },
     *      '⬇': (_, instance) => {
     *        for (const embed of instance.array)
     *          embed.fields[0].value--;
     *      }
     *    }
     *    description: 'This is one of my embeds with this message!',
     *    color: 0xFF00AE,
     *    timestamp: true
     *   }).build();```
     *
     * Methods as constructor.
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
     *    .setClientMessage(null, 'Preparing the embed...')
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
     * @param timestamp - The timestamp or date. Default: `Date.now()`
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
  export class FieldsEmbed extends PaginationEmbed {
    /**
     * @param options Options for FieldsEmbed.
     */
    constructor(options?: FieldsEmbedOptions);

    /**
     * Maximum number of elements to be displayed per page.
     */
    public elementsPerPage: number;

    /**
     * Elements in the current page.
     */
    public elementList: any[];

    /**
     * Build the Pagination Fields Embed.
     *
     * ## Example
     * Object as constructor.
     * ```js
     *   const { FieldsEmbed } = require('discord-paginationembed');
     *
     *   // Under message event.
     *   new FieldsEmbed({
     *    authorizedUsers: [message.author.id],
     *    channel: message.channel,
     *    clientMessage: { content: 'Preparing the embed...' },
     *    array: [{ name: 'John Doe' }, { name: 'Jane Doe' }],
     *    elementsPerPage: 1,
     *    pageIndicator: false,
     *    fields: [{ name: 'Name', value: el => el.name }],
     *    page: 1,
     *    timeout: 69000,
     *    navigationEmojis: {
     *      back: '◀',
     *      jump: '↗',
     *      forward: '▶',
     *      delete: '🗑'
     *    },
     *    functionEmojis: {
     *      '🔄': (user, instance) => {
     *        const field = instance.fields[0];
     *
     *        if (field.name === 'Name')
     *          field.name = user.tag;
     *        else
     *          field.name = 'Name';
     *      }
     *    }
     *   }).build();```
     *
     * Methods as constructor.
     * ```js
     *   const { FieldsEmbed } = require('discord-paginationembed');
     *
     *   // Under message event.
     *   new FieldsEmbed()
     *    .setAuthorizedUsers([message.author.id])
     *    .setChannel(message.channel)
     *    .setClientMessage(null, 'Preparing the embed...')
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
    public formatField(name: string, value: (element: any) => any, inline?: boolean): this;

    /**
     * Sets the maximum number of elements to be displayed per page.
     * @param max - Maximum number of elements to be displayed per page. Default: `10`
     */
    public setElementsPerPage(max: number): this;
  }

  /**
   * @extends MessageEmbed
   */
  class PaginationEmbed extends MessageEmbed {
    /**
     * @param options Options for PaginationEmbed.
     */
    constructor(options?: PaginationEmbedOptions);

    /**
     * The authorized users to navigate the pages.
     */
    public authorizedUsers: string[];

    /**
     * The channel where to send the embed.
     */
    public channel: TextChannel | DMChannel;

    /**
     * Settings for the message sent by the client.
     */
    public clientMessage: { message: Message, content: string };

    /**
     * An array of elements to paginate.
     */
    public array: any[];

    /**
     * Whether page number indicator on client's message is shown or not.
     */
    public pageIndicator: boolean;

    /**
     * Whether the client's message will be deleted upon timeout or not.
     */
    public deleteOnTimeout: boolean;

    /**
     * Jumps to a certain page upon PaginationEmbed.build().
     */
    public page: number;

    /**
     * The time for awaiting a user action before timeout in ms.
     */
    public timeout: number;

    /**
     * The emojis used for navigation emojis.
     */
    public navigationEmojis: {
      back: string | '◀',
      jump: string | '↗',
      forward: string | '▶',
      delete: string | '🗑'
    };

    /**
     * The emojis used for function emojis.
     */
    public functionEmojis: FunctionEmoji;

    /**
     * The disabled navigation emojis.
     * Available navigation emojis to disable:
     * - 'BACK'
     * - 'JUMP'
     * - 'FORWARD'
     * - 'DELETE'
     * - 'ALL'
     */
    public disabledNavigationEmojis: NavigationEmojis;

    /**
     * Adds a function emoji to the embed.
     * @param emoji - The emoji to use as the function's emoji.
     * @param callback - The function to call upon pressing the function emoji.
     *
     * ## Example
     * ```js
     *  <PaginationEmbed>.addFunctionEmoji('🅱', (_, instance) => {
     *    const field = instance.fields[0];
     *
     *    if (field.name.includes('🅱'))
     *      field.name = 'Name';
     *    else
     *      field.name = 'Na🅱e';
     *  });```
     */
    public addFunctionEmoji(emoji: string, callback: EmojiCallback): this;

    /**
     * Deletes a function emoji.
     * @param emoji - The emoji key to delete.
     */
    public deleteFunctionEmoji(emoji: string): this;

    /**
     * Deletes all function emojis, and then re-enables all navigation emojis.
     */
    public resetEmojis(): this;

    /**
     * Sets the array of elements to paginate.
     * @param array - An array of elements to paginate.
     */
    public setArray(array: any[]): this;

    /**
     * Set the authorized users to navigate the pages.
     * @param users - An array of user IDs.
     */
    public setAuthorizedUsers(users: string[]): this;

    /**
     * The channel where to send the embed.
     * @param channel - The channel object.
     */
    public setChannel(channel: TextChannel | DMChannel): this;

    /**
     * Sets the settings for the message sent by the client.
     * @param message - The message object sent by the client. Default: `Creates a new message on the channel specified`
     * @param content - The custom message content while preparing the embed. Default: `"Preparing..."`
     */
    public setClientMessage(message: Message, content?: string): this;

    /**
     * Sets the disabled navigation emojis.
     * @param emojis  - An array of navigation emojis to disable.
     *
     * ## Example
     * ```js
     *  // Disable specific navigation emojis
     *  <PaginationEmbed>.setDisabledNavigationEmojis(['delete', 'jump']);
     *
     *  // Disable all navigation emojis
     *  <PaginationEmbed>.setDisabledNavigationEmojis(['all']);```
     */
    public setDisabledNavigationEmojis(emojis: NavigationEmojis): this;

    /**
     * Sets the emojis used for function emojis.
     * @param emojis - An object containing customised emojis to use as function emojis.
     *
     * ## Example
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
     *  });```
     */
    public setFunctionEmojis(emojis: FunctionEmoji): this;

    /**
     * Sets to jump to a certain page upon calling PaginationEmbed.build().
     * @param page - The page number to jump to. As String: 'back', 'forward'
     */
    public setPage(page: number | string): this;

    /**
     * Sets the time for awaiting a user action before timeout in ms.
     * @param timeout Timeout value in ms. Default: `30000`
     */
    public setTimeout(timeout: number): this;

    /**
     * Sets whether page number indicator on client's message is shown or not.
     * @param indicator - Show page indicator? Default: `true`
     */
    public showPageIndicator(indicator: boolean): this;

    /**
     * Sets whether the client's message will be deleted upon timeout or not.
     * @param deleteOnTimeout - Delete client's message upon timeout? Default: `false`
     */
    public setDeleteOnTimeout(deleteOnTimeout: boolean): this;
  }

  export interface PaginationEmbedOptions {
    authorizedUsers?: string[];
    channel?: TextChannel | DMChannel;
    clientMessage?: { message: Message, content?: string };
    array?: any[];
    pageIndicator?: boolean;
    deleteOnTimeout?: boolean;
    page?: number;
    timeout?: number;
    navigationEmojis?: {
      back: string,
      jump: string,
      forward: string,
      delete: string
    };
    functionEmojis?: FunctionEmoji;
    disabledNavigationEmojis?: NavigationEmojis;
  }

  export interface EmbedsOptions extends PaginationEmbedOptions {
    title?: StringResolvable;
    description?: StringResolvable;
    url?: string;
    color?: ColorResolvable;
    timestamp?: boolean;
    fields?: EmbedField[];
    thumbnail?: MessageEmbed['thumbnail'];
    image?: MessageEmbed['image'];
    author?: MessageEmbed['author'];
    footer?: MessageEmbed['footer'];
  }

  export interface FieldsEmbedOptions extends PaginationEmbedOptions {
    elementsPerPage?: number;
  }

  /**
   * Callback for a [[FunctionEmoji]].
   * @param user - The user who triggered the function emoji.
   * @param embed - The current instance of PaginationEmbed.
   */
  export type EmojiCallback = (user: User, instance: Embeds | FieldsEmbed) => any;

  /**
   * Options for [[PaginationEmbed.disabledNavigationEmojis]]
   */
  export type NavigationEmojis = Array<'BACK' | 'JUMP' | 'FORWARD' | 'DELETE' | 'ALL'>;

  /**
   * Options for [[PaginationEmbed.functionEmojis]].
   * @property emojiNameOrID
   */
  export type FunctionEmoji = { [emojiNameOrID: string]: EmojiCallback };
}
