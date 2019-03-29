import { DMChannel, Emoji, Message, MessageReaction, Snowflake, TextChannel, User } from 'discord.js';
import { EventEmitter } from 'events';
import { Embeds } from '../Embeds';
import { FieldsEmbed } from '../FieldsEmbed';

const MESSAGE_DELETED = 'Client\'s message was deleted before being processed.';

/**
 * The base class for Pagination Modes. **Do not invoke**.
 * @extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
 * @noInheritDoc
 */
export class PaginationEmbed<Element> extends EventEmitter {

  constructor () {
    super();

    this.authorizedUsers = [];
    this.channel = null;
    this.clientAssets = {};
    this.pageIndicator = true;
    this.deleteOnTimeout = false;
    this.page = 1;
    this.timeout = 30000;
    this.navigationEmojis = {
      back: '◀',
      jump: '↗',
      forward: '▶',
      delete: '🗑'
    };
    this.functionEmojis = {};
    this.disabledNavigationEmojis = [];

    this.pages = null;
    this._disabledNavigationEmojiValues = [];
    this._defaultNavigationEmojis = {
      back: '◀',
      jump: '↗',
      forward: '▶',
      delete: '🗑'
    };
  }

  /** The authorized users to navigate the pages. Default: `everyone` */
  public authorizedUsers: Snowflake[];

  /** The channel where to send the embed. */
  public channel: TextChannel | DMChannel;

  /** Settings for assets for the client. */
  public clientAssets: IClientAssets;

  /** An array of elements to paginate. */
  public array: Element[];

  /** Whether page number indicator on client's message is shown or not. Default: `true` */
  public pageIndicator: boolean;

  /**  Whether the client's message will be deleted upon timeout or not. Default: `false` */
  public deleteOnTimeout: boolean;

  /** Jumps to a certain page upon PaginationEmbed.build(). Default: `1` */
  public page: number;

  /** The time for awaiting a user action before timeout in ms. Default: `30000` */
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

  /** The disabled navigation emojis (in values). */
  protected _disabledNavigationEmojiValues: any[];

  /** The default navigation emojis. Used for resetting the navigation emojis. */
  protected _defaultNavigationEmojis: { back: string; jump: string; forward: string; delete: string; };

  public build () {
    throw new Error(
      'Cannot invoke this class. Invoke with [PaginationEmbed.Embeds] or [PaginationEmbed.FieldsEmbed] instead.'
    );
  }

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
  public addFunctionEmoji (emoji: string, callback: (user: User, instance: Embeds | FieldsEmbed<Element>) => any) {
    if (!(callback instanceof Function))
      throw new TypeError(`Callback for ${emoji} must be a function type.`);

    Object.assign(this.functionEmojis, { [emoji]: callback });

    return this;
  }

  /**
   * Deletes a function emoji.
   * @param emoji - The emoji key to delete.
   */
  public deleteFunctionEmoji (emoji: string) {
    if (!(emoji in this.functionEmojis))
      throw new Error(`${emoji} function emoji does not exist.`);

    delete this.functionEmojis[emoji];

    return this;
  }

  /** Deletes all function emojis, and then re-enables all navigation emojis. */
  public resetEmojis () {
    for (const emoji in this.functionEmojis)
      delete this.functionEmojis[emoji];

    this.navigationEmojis = this._defaultNavigationEmojis;

    return this;
  }

  /**
   * Sets the array of elements to paginate. This must be called first before any other methods.
   * @param array - An array of elements to paginate.
   */
  public setArray (array: Element[]) {
    const isValidArray = Array.isArray(array) && Boolean(array.length);

    if (!isValidArray) throw new TypeError('Cannot invoke PaginationEmbed class without a valid array to paginate.');

    this.array = array;

    return this;
  }

  /**
   * Set the authorized users to navigate the pages.
   * @param users - An array of user IDs.
   */
  public setAuthorizedUsers (users: Snowflake[]) {
    if (!Array.isArray(users)) throw new TypeError('Cannot invoke PaginationEmbed class without a valid array.');

    this.authorizedUsers = users;

    return this;
  }

  /**
   * The channel where to send the embed.
   * @param channel - The channel object.
   */
  public setChannel (channel: TextChannel | DMChannel) {
    this.channel = channel;

    return this;
  }

  /**
   * Sets the settings for assets for the client.
   * @param assets - The assets for the client.
   */
  public setClientAssets (assets: IClientAssets) {
    if (!assets) throw new TypeError('Cannot accept assets options as a non-object type.');

    const { message } = assets;
    let { prepare, prompt } = assets;

    if (!prepare) prepare = 'Preparing...';
    if (!prompt)
      prompt = '{{user}}, To what page would you like to jump? Say `cancel` or `0` to cancel the prompt.';

    Object.assign(this.clientAssets, { message, prepare, prompt });

    return this;
  }

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
  public setDisabledNavigationEmojis (emojis: DisabledNavigationEmojis) {
    if (!Array.isArray(emojis)) throw new TypeError('Cannot invoke PaginationEmbed class without a valid array.');

    const invalid = [];
    const sanitised = [];

    for (let emoji of emojis) {
      emoji = typeof emoji === 'string' ? emoji.toUpperCase() as NavigationEmojiIdentifier : emoji;
      const validEmojis = [ 'BACK', 'JUMP', 'FORWARD', 'DELETE', 'ALL' ];

      if (!validEmojis.includes(emoji)) invalid.push(emoji);

      if (emoji === 'ALL') {
        this.navigationEmojis = {
          back: null,
          jump: null,
          forward: null,
          delete: null
        };

        sanitised.push('ALL');
        break;
      }

      sanitised.push(emoji);

      emoji = emoji.toLowerCase() as NavigationEmojiIdentifier;

      this._disabledNavigationEmojiValues.push(this.navigationEmojis[emoji]);

      this.navigationEmojis[emoji] = null;
    }

    if (invalid.length)
      throw new TypeError(
        `Cannot invoke PaginationEmbed class with invalid navigation emoji(s): ${invalid.join(', ')}.`
      );

    this.disabledNavigationEmojis = sanitised;

    return this;
  }

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
  public setFunctionEmojis (emojis: IFunctionEmoji<Element>) {
    for (const emoji in emojis) {
      if (!emoji) continue;

      const fn = emojis[emoji];

      this.addFunctionEmoji(emoji, fn);
    }

    return this;
  }

  /**
   * Sets the emojis used for navigation emojis.
   * @param emojis - An object containing customised emojis to use as navigation emojis.
   */
  public setNavigationEmojis (emojis: INavigationEmojis) {
    Object.assign(this.navigationEmojis, emojis);

    return this;
  }

  /**
   * Sets to jump to a certain page upon calling PaginationEmbed.build().
   * @param page - The page number to jump to.
   */
  public setPage (page: number | 'back' | 'forward') {
    const isString = typeof page === 'string';

    if (!(!isNaN(page as number) || isString)) throw new TypeError('setPage() only accepts number/string type.');

    const navigator = page === 'back'
      ? this.page === 1 ? this.page : this.page - 1
      : this.page === this.pages ? this.pages : this.page + 1;

    this.page = isString ? navigator : page as number;

    return this;
  }

  /**
   * Sets the time for awaiting a user action before timeout in ms.
   * @param timeout Timeout value in ms.
   */
  public setTimeout (timeout: number) {
    if (typeof timeout !== 'number') throw new TypeError('setTimeout() only accepts number type.');

    this.timeout = timeout;

    return this;
  }

  /**
   * Sets whether page number indicator on client's message is shown or not.
   * @param indicator - Show page indicator?
   */
  public setPageIndicator (boolean: boolean) {
    if (typeof boolean !== 'boolean') throw new TypeError('setPageIndicator() only accepts boolean type.');

    this.pageIndicator = boolean;

    return this;
  }

  /**
   * Sets whether the client's message will be deleted upon timeout or not.
   * @param deleteOnTimeout - Delete client's message upon timeout?
   */
  public setDeleteOnTimeout (boolean: boolean) {
    if (typeof boolean !== 'boolean') throw new TypeError('deleteOnTimeout() only accepts boolean type.');

    this.deleteOnTimeout = boolean;

    return this;
  }

  /**
   * Evaluates the constructor and the client.
   * @ignore
   */
  public async _verify () {
    this.setClientAssets(this.clientAssets);

    if (!this.clientAssets.message && !this.channel)
      throw new Error('Cannot invoke PaginationEmbed class without either a message object or a channel object set.');

    if (!(this.page >= 1 && this.page <= this.pages))
      throw new Error(`Page number is out of bounds. Max pages: ${this.pages}`);

    const message = (this.clientAssets.message
      ? await this.clientAssets.message.edit(this.clientAssets.prepare)
      : await this.channel.send(this.clientAssets.prepare)) as Message;
    this.clientAssets.message = message as Message;

    this.setClientAssets(this.clientAssets);

    if (message.guild) {
      const missing = (message.channel as TextChannel)
        .permissionsFor(message.client.user)
        .missing([ 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'EMBED_LINKS' ]);

      if (missing.length)
        throw new Error(`Cannot invoke PaginationEmbed class without required permissions: ${missing.join(', ')}`);
    }

    return true;
  }

  /**
   * Returns whether the given navigation emoji is enabled or not.
   * @param emoji The navigation emoji to search.
   */
  protected _enabled (emoji: NavigationEmojiIdentifier) {
    return this.disabledNavigationEmojis.includes('ALL')
      ? false
      : !this.disabledNavigationEmojis.includes(emoji);
  }

  /** Deploys emoji reacts for the message sent by the client. */
  protected async _drawNavigation () {
    if (Object.keys(this.functionEmojis).length)
      for (const emoji in this.functionEmojis)
        await this.clientAssets.message.react(emoji);

    /* tslint:disable: max-line-length */

    if (this._enabled('BACK') && this.pages > 1) await this.clientAssets.message.react(this.navigationEmojis.back);
    if (this._enabled('JUMP') && this.pages > 2) await this.clientAssets.message.react(this.navigationEmojis.jump);
    if (this._enabled('FORWARD') && this.pages > 1) await this.clientAssets.message.react(this.navigationEmojis.forward);
    if (this._enabled('DELETE')) await this.clientAssets.message.react(this.navigationEmojis.delete);

    /* tslint:enable: max-line-length */

    return this._awaitResponse();
  }

  /**
   * Helper for intialising the MessageEmbed.
   * [For sub-class] Initialises the MessageEmbed.
   * @param callNavigation - Whether to call _drawNavigation() or not.
   * @ignore
   */
  public _loadList (callNavigation = true) {
    if (callNavigation) return this._drawNavigation();
  }

  /**
   * Calls PaginationEmbed.setPage() and then executes `_loadList()` and `_awaitResponse()`.
   * @param param - The page number to jump to.
   */
  protected async _loadPage (param: number | 'back' | 'forward' = 1) {
    this.setPage(param);
    await this._loadList(false);

    return this._awaitResponse();
  }

  /** Awaits the reaction from the user. */
  protected async _awaitResponse () {
    const emojis = Object.values(this.navigationEmojis);
    const filter = (r: MessageReaction, u: User) => {
      const enabledEmoji = this._enabled('ALL')
        ? !this._disabledNavigationEmojiValues.length
          || this._disabledNavigationEmojiValues.some(e => ![ r.emoji.name, r.emoji.id ].includes(e))
        : false;
      const passedEmoji =
        (enabledEmoji && (emojis.includes(r.emoji.name) || emojis.includes(r.emoji.id))) ||
        r.emoji.name in this.functionEmojis || r.emoji.id in this.functionEmojis;

      if (this.authorizedUsers.length)
        return this.authorizedUsers.includes(u.id) && passedEmoji;

      return !u.bot && passedEmoji;
    };
    const clientMessage = this.clientAssets.message;

    try {
      const responses = await clientMessage.awaitReactions(filter, { max: 1, time: this.timeout, errors: [ 'time' ] });
      const response = responses.first();
      const user = response.users.last();
      const emoji = [ response.emoji.name, response.emoji.id ];

      this.emit('react', user, response.emoji);

      if (clientMessage.guild) await response.users.remove(user);

      switch (emoji[0] || emoji[1]) {
        case this.navigationEmojis.back:
          if (this.page === 1) return this._awaitResponse();

          return this._loadPage('back');

        case this.navigationEmojis.jump:
          if (this.pages <= 2) return this._awaitResponse();

          return this._awaitResponseEx(user);

        case this.navigationEmojis.forward:
          if (this.page === this.pages) return this._awaitResponse();

          return this._loadPage('forward');

        case this.navigationEmojis.delete:
          this.emit('finish', user);

          return clientMessage.delete();

        default:
          const cb = this.functionEmojis[emoji[0]] || this.functionEmojis[emoji[1]];

          await cb(user, this as unknown as Embeds | FieldsEmbed<Element>);

          return this._loadPage(this.page);
      }
    } catch (c) {
      if (clientMessage.guild && !clientMessage.deleted) await clientMessage.reactions.removeAll();
      if (this.deleteOnTimeout && clientMessage.deletable) await clientMessage.delete();
      if (c instanceof Error) return this.emit('error', c);

      this.emit('expire');

      return true;
    }
  }

  /**
   * Awaits the custom page input from the user.
   * @param user - The user who reacted to jump on a certain page.
   */
  protected async _awaitResponseEx (user: User) {
    const cancel = [ '0', 'cancel' ];
    const filter = (m: Message) => {
      const supposedPage = parseInt(m.content);

      return (
        m.author.id === user.id && (
          (!isNaN(Number(m.content)) && supposedPage !== this.page && supposedPage >= 1 && supposedPage <= this.pages)
          || cancel.includes(m.content.toLowerCase())
        )
      );
    };
    const channel = this.clientAssets.message.channel;
    const prompt = await channel
      .send(this.clientAssets.prompt.replace(/\{\{user\}\}/g, user.toString())) as Message;

    try {
      const responses = await channel.awaitMessages(filter, { max: 1, time: this.timeout, errors: [ 'time' ] });
      const response = responses.first();
      const content = response.content;

      if (this.clientAssets.message.deleted)
        return this.emit('error', new Error(MESSAGE_DELETED));

      await prompt.delete();
      if (response.deletable) await response.delete();
      if (cancel.includes(content)) return this._awaitResponse();

      return this._loadPage(parseInt(content));
    } catch (c) {
      if (prompt.deletable) await prompt.delete();
      if (c instanceof Error) return this.emit('error', c);

      this.emit('expire');

      return true;
    }
  }

   /**
    * Emitted upon successful `build()`.
    * @event
    */
   public on (event: 'start', listener: () => void): this;

   /**
    * Emitted when the instance is finished by a user reacting with `DELETE` navigation emoji.
    * @event
    */
   public on (event: 'finish', listener: ListenerUser): this;

   /**
    * Emitted upon a user reacting on the instance.
    * @event
    */
   public on (event: 'react', listener: ListenerReact): this;

   /**
    * Emitted when the awaiting timeout is reached.
    * @event
    */
   // tslint:disable-next-line: unified-signatures
   public on (event: 'expire', listener: () => void): this;

   /**
    * Emitted upon an occurance of error.
    * @event
    */
   // @ts-ignore
   public on (event: 'error', listener: ListenerError): this;

   /** @event */
   public once (event: 'finish', listener: ListenerUser): this;
   /** @event */
   public once (event: 'start' | 'expire', listener: () => void): this;
   /** @event */
   public once (event: 'react', listener: ListenerReact): this;
   /** @event */
   // @ts-ignore
   public once (event: 'error', listener: ListenerError): this;
}

/**  @param user The user who responded to the instance. */
type ListenerUser = (user: User) => void;

/**
 * @param user The user who responded to the instance.
 * @param emoji The emoji that was reacted to the instance.
 */
type ListenerReact = (user: User, emoji: Emoji) => void;

/** @param err The error object. */
type ListenerError = (err: Error) => void;

/** Options for [[PaginationEmbed.disabledNavigationEmojis]]. */
export type DisabledNavigationEmojis = NavigationEmojiIdentifier[];

/** An object containing emojis to use as navigation emojis. */
export interface INavigationEmojis {
  back: string | '◀';
  jump: string | '↗';
  forward: string | '▶';
  delete: string | '🗑';
}

/** Assets for the client (message). */
export interface IClientAssets {
  /** The message object. */
  message?: Message;
  /** The text during initialisation of the pagination. Default: `"Preparing..."` */
  prepare?: string;
  /**
   * The text during a prompt for page jump.
   *
   * To include a user mention in the text, use `{{user}}` as placeholder.
   *
   * Default: `"{{user}}, To what page would you like to jump? Say 'cancel' or '0' to cancel the prompt."`
   */
  prompt?: string;
}

export type NavigationEmojiIdentifier = 'BACK' | 'JUMP' | 'FORWARD' | 'DELETE' | 'ALL';

export interface IFunctionEmoji<Element> {
  [emojiNameOrID: string]: (user: User, instance: Embeds | FieldsEmbed<Element>) => any;
}
