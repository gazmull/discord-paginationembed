const { MessageEmbed } = require('discord.js');

/**
 * Callback for a function emoji.
 * @typedef {Function} EmojiCallback
 * @param {User} user - The user who triggered the function emoji.
 * @param {PaginationEmbed} embed - The current instance of PaginationEmbed.
 */

/**
 * An Emoji character or a custom Emoji ID (Guild Emojis).
 * @see [Discord.JS: EmojiIdentifier]{@link https://discord.js.org/#/docs/main/master/typedef/EmojiIdentifierResolvable}
 * @typedef {string} EmojiIdentifier
 */

/**
 * Data that resolves as colour. e.g: <b>0xFF00AE</b>, <b>'PURPLE'</b>, <b>[255, 0, 255]</b>
 * @see [Discord.JS: ColorResolvable]{@link https://discord.js.org/#/docs/main/master/typedef/ColorResolvable}
 * @typedef {string|number|Array<number>} ColorResolvable
 */

/**
 * A Message object.
 * @see [Discord.JS: Message]{@link https://discord.js.org/#/docs/main/master/class/Message}
 * @typedef {Object} Message
 */

/**
 * A User object.
 * @see [Discord.JS: User]{@link https://discord.js.org/#/docs/main/master/class/User}
 * @typedef {Object} User
 */

/**
 * A TextChannel Object.
 * @see [Discord.JS: TextChannel]{@link https://discord.js.org/#docs/main/master/class/TextChannel}
 * @typedef {Object} TextChannel
 */

/**
 * Unique ID for an object (e.g. User).
 * @see [Discord.JS: Snowflake]{@link https://discord.js.org/#/docs/main/master/typedef/Snowflake}
 * @typedef {string} Snowflake
 */

/**
 * @description Extends [MessageEmbed]{@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
class PaginationEmbed extends MessageEmbed {
  /**
   * Options for PaginationEmbed.clientMessage.
   * @typedef {Object} ClientMessageOptions
   * @property {Message} [message=null] - The message object sent by the client, if there is any.
   * @property {string} [content='Preparing...'] - The custom message content while preparing the embed.
   */

  /**
   * Options for PaginationEmbed.navigationEmojis.
   * @typedef {Object} NavigationEmojis
   * @property {EmojiIdentifier} [back='◀'] - The back emoji.
   * @property {EmojiIdentifier} [jump='↗'] - The jump emoji.
   * @property {EmojiIdentifier} [forward='▶'] - The forward emoji.
   * @property {EmojiIdentifier} [delete='🗑'] - The delete emoji.
   */

  /**
   * Options for PaginationEmbed.functionEmojis.
   * @typedef {Object} FunctionEmoji
   * @property {EmojiCallback} emojiNameOrID
   */

  /**
   * Options for the constructor.
   * @typedef {Object} PaginationEmbedOptions
   * @property {Array<User<Snowflake>>} [authorizedUsers=[]] - The authorized users to navigate the pages.
   * @property {TextChannel} channel - The channel where to send the embed.
   * @property {ClientMessageOptions} [clientMessage=null] - Settings for the message sent by the client.
   * @property {Array<*>} array - An array of elements to paginate.
   * @property {boolean} [pageIndicator=true] - Whether page number indicator on client's message is shown or not.
   * @property {boolean} [deleteOnTimeout=false] - The boolean determining if the message will be deleted on timeout.
   * @property {number|string} [page=1] - Jumps to a certain page upon PaginationEmbed.build().
   * @property {number} [timeout=30000] - The time for awaiting a user action before timeout in ms.
   * @property {NavigationEmojis} [navigationEmojis={back:'◀',jump:'↗',forward:'▶',delete:'🗑'}] - The emojis used for navigation emojis.
   * @property {Object<FunctionEmoji>} [functionEmojis={}] - The emojis used for function emojis.
   * @property {Array<string>} [disabledNavigationEmojis=[]] - The disabled navigation emojis.
   */

  /**
   * @param {PaginationEmbedOptions} [options={}] Options for PaginationEmbed.
   */
  constructor(options = {}) {
    if (!(options instanceof Object)) throw new Error('Cannot invoke PaginationEmbed class without an actual options object.');

    super(options);

    /**
     * The authorized users to navigate the pages.
     * @type {Array<User<Snowflake>>}
     */
    this.authorizedUsers = options.authorizedUsers || [];

    /**
     * The channel where to send the embed.
     * @type {TextChannel}
     */
    this.channel = options.channel || null;

    /**
     * Settings for the message sent by the client.
     * @type {ClientMessageOptions}
     */
    this.clientMessage = options.clientMessage || { message: null, content: null };

    /**
     * An array of elements to paginate.
     * @type {Array<*>}
     */
    this.array = options.array || [];

    /**
     * Whether page number indicator on client's message is shown or not.
     * @type {boolean}
     */
    this.pageIndicator = options.pageIndicator || true;

    /**
     * Whether the client's message will be deleted upon timeout or not.
     * @type {boolean}
     */
    this.deleteOnTimeout = options.deleteOnTimeout || false;

    /**
     * Jumps to a certain page upon PaginationEmbed.build().
     * @type {number|string}
     */
    this.page = options.page || 1;

    /**
     * The time for awaiting a user action before timeout in ms.
     * @type {number}
     */
    this.timeout = options.timeout || 30000;

    /**
     * The emojis used for navigation emojis.
     * @type {NavigationEmojis}
     */
    this.navigationEmojis = options.navigationEmojis || {
      back: '◀',
      jump: '↗',
      forward: '▶',
      delete: '🗑'
    };

    /**
     * The emojis used for function emojis.
     * @type {Array<FunctionEmoji>}
     */
    this.functionEmojis = options.functionEmojis || {};

    /**
     * The disabled navigation emojis.
     * Available navigation emojis to disable:
     * - 'BACK'
     * - 'JUMP'
     * - 'FORWARD'
     * - 'DELETE'
     * - 'ALL'
     * @type {Array<string>}
     */
    this.disabledNavigationEmojis = options.disabledNavigationEmojis || [];

    /**
     * Number of pages for this instance.
     * @type {number}
     * @private
     */
    this.pages = null;

    /**
     * The disabled navigation emojis (in values).
     * @type {Array<string>}
     * @private
     */
    this.disabledNavigationEmojiValues = [];

    /**
     * The default navigation emojis. Used for resetting the navigation emojis.
     * @type {NavigationEmojis}
     */
    this.defaultNavigationEmojis = {
      back: '◀',
      jump: '↗',
      forward: '▶',
      delete: '🗑'
    };
  }

  build() {
    throw new Error('Cannot invoke this class. Invoke with [PaginationEmbed.Embeds] or [PaginationEmbed.FieldsEmbed] instead.');
  }

  /**
   * Adds a Function Emoji to the embed.
   * @param {EmojiIdentifier} emoji - The emoji to use as the function's emoji.
   * @param {EmojiCallback} callback - The function to call upon pressing the function emoji.
   * @returns {PaginationEmbed}
   *
   * @example
   *
   * <PaginationEmbed>.addFunctionEmoji('🅱', (_, instance) => {
   *  const field = instance.fields[0];
   *
   *  if (field.name.includes('🅱'))
   *    field.name = 'Name';
   *  else
   *    field.name = 'Na🅱e';
   * });
   */
  addFunctionEmoji(emoji, callback) {
    if (!(callback instanceof Function))
      throw new TypeError(`Callback for ${emoji} must be a function type.`);

    Object.assign(this.functionEmojis, { [emoji]: callback });

    return this;
  }

  /**
   * Sets the array of elements to paginate.
   * @param {Array<*>} array - An array of elements to paginate.
   * @returns {PaginationEmbed}
   */
  setArray(array) {
    const isValidArray = array instanceof Array && Boolean(array.length);

    if (!isValidArray) throw new Error('Cannot invoke PaginationEmbed class without initializing the array to paginate.');

    this.array = array;

    return this;
  }

  /**
   * Set the authorized users to navigate the pages.
   * @param {Array<User<Snowflake>>} users - An array of user IDs.
   * @returns {PaginationEmbed}
   */
  setAuthorizedUsers(users) {
    if (!(users instanceof Array)) throw new Error('Cannot invoke PaginationEmbed class without initializing the authorized users properly.');

    this.authorizedUsers = users;

    return this;
  }

  /**
   * The channel where to send the embed.
   * @param {TextChannel} channel - The channel object.
   * @returns {PaginationEmbed}
   */
  setChannel(channel) {
    this.channel = channel;

    return this;
  }

  /**
   * Sets the settings for the message sent by the client.
   * @param {Message} message - The message object sent by the client.
   * @param {string} [content='Preparing...'] - The custom message content while preparing the embed.
   * @returns {PaginationEmbed}
   */
  setClientMessage(message, content = null) {
    if (!content) content = 'Preparing...';

    Object.assign(this.clientMessage, { message, content });

    return this;
  }

  /**
   * Sets the disabled navigation emojis.
   * @param {Array<string>} emojis  - An array of navigation emojis to disable.
   * @returns {PaginationEmbed}
   * @example
   *
   * // Disable specific navigation emojis
   * <PaginationEmbed>.setDisabledNavigationEmojis(['delete', 'jump']);
   *
   * // Disable all navigation emojis
   * <PaginationEmbed>.setDisabledNavigationEmojis(['all']);
   */
  setDisabledNavigationEmojis(emojis) {
    if (!(emojis instanceof Array)) throw new Error('Cannot invoke PaginationEmbed class without initialising disabledNavigationEmojis properly.');

    const invalid = [];
    const sanitised = [];

    for (let emoji of emojis) {
      emoji = typeof emoji === 'string' ? emoji.toUpperCase() : emoji;
      const validEmojis = ['BACK', 'JUMP', 'FORWARD', 'DELETE', 'ALL'];

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

      emoji = emoji.toLowerCase();

      this.disabledNavigationEmojiValues.push(this.navigationEmojis[emoji]);

      this.navigationEmojis[emoji] = null;
    }

    if (invalid.length) throw new Error(`Cannot invoke PaginationEmbed class with invalid navigation emoji(s): ${invalid.join(', ')}.`);

    this.disabledNavigationEmojis = sanitised;

    return this;
  }

  /**
   * Sets the emojis used for function emojis.
   * @param {Object<FunctionEmoji>} emojis - An object containing customised emojis to use as function emojis.
   * @returns {PaginationEmbed}
   * @example
   *
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
   */
  setFunctionEmojis(emojis) {
    for (const emoji in emojis) {
      const fn = emojis[emoji];

      this.addFunctionEmoji(emoji, fn);
    }

    return this;
  }

  /**
   * Sets the emojis used for navigation emojis.
   * @param {NavigationEmojis} emojis - An object containing customised emojis to use as navigation emojis.
   * @returns {PaginationEmbed}
   */
  setNavigationEmojis(emojis) {
    Object.assign(this.navigationEmojis, emojis);

    return this;
  }

  /**
   * Sets to jump to a certain page upon calling PaginationEmbed.build().
   * @param {number|string} param - The page number to jump to. As String: 'back', 'forward'
   * @returns {PaginationEmbed}
   */
  setPage(param) {
    const isString = typeof param === 'string';

    if (!(!isNaN(param) || isString)) throw new Error('setPage() only accepts number/string type.');

    const navigator = param === 'back'
      ? this.page === 1 ? this.page : this.page - 1
      : this.page === this.pages ? this.pages : this.page + 1;

    this.page = isString ? navigator : param;

    return this;
  }

  /**
   * Sets the time for awaiting a user action before timeout in ms.
   * @param {number} timeout Timeout value in ms.
   * @returns {PaginationEmbed}
   */
  setTimeout(timeout) {
    if (typeof timeout !== 'number') throw new Error('setTimeout() only accepts number type.');

    this.timeout = timeout;

    return this;
  }

  /**
   * Sets whether page number indicator on client's message is shown or not.
   * @param {boolean} boolean - Show page indicator?
   * @returns {PaginationEmbed}
   */
  showPageIndicator(boolean) {
    if (typeof boolean !== 'boolean') throw new Error('showPageIndicator() only accepts boolean type.');

    this.pageIndicator = boolean;

    return this;
  }

  /**
   * Sets whether the client's message will be deleted upon timeout or not.
   * @param {boolean} boolean - Delete client's message upon timeout?
   * @returns {PaginationEmbed}
   */
  setDeleteOnTimeout(boolean) {
    if (typeof boolean !== 'boolean') throw new Error('deleteOnTimeout() only accepts boolean type.');

    this.deleteOnTimeout = boolean;

    return this;
  }

  /**
   * Evaluates the constructor and the client.
   * @private
   * @param {number} pages - The number of pages in this instance.
   */
  async _verify(pages) {
    this
      .setChannel(this.channel)
      .setAuthorizedUsers(this.authorizedUsers)
      .setClientMessage(this.clientMessage.message, this.clientMessage.content)
      .setArray(this.array)
      .showPageIndicator(this.pageIndicator)
      .setDeleteOnTimeout(this.deleteOnTimeout)
      .setTimeout(this.timeout)
      .setNavigationEmojis(this.navigationEmojis)
      .setFunctionEmojis(this.functionEmojis)
      .setDisabledNavigationEmojis(this.disabledNavigationEmojis);

    this.pages = pages;
    this.setPage(this.page);

    if (!(this.page >= 1 && this.page <= this.pages)) throw new Error('Invalid page.');

    const message = this.clientMessage.message
      ? await this.clientMessage.message.edit(this.clientMessage.content)
      : await this.channel.send(this.clientMessage.content);
    this.setClientMessage(message, this.clientMessage.content);

    if (message.guild) {
      const permissions = ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'EMBED_LINKS'];
      const missing = message.channel.permissionsFor(message.client.user).missing(permissions);

      if (missing.length)
        throw new Error(`Cannot invoke PaginationEmbed class without required permissions: ${missing.join(', ')}`);
    }
  }

  /**
   * Returns whether the given navigation emoji is enabled or not.
   * @private
   * @param {string} emoji The navigation emoji to search.
   * @returns {boolean}
   */
  _enabled(emoji) {
    return this.disabledNavigationEmojis.includes('ALL')
      ? false
      : !this.disabledNavigationEmojis.includes(emoji);
  }

  /**
   * Deploys emoji reacts for the message sent by the client.
   * @private
   */
  async _drawNavigation() {
    if (Object.keys(this.functionEmojis).length)
      for (const emoji in this.functionEmojis)
        await this.clientMessage.message.react(emoji);

    if (this._enabled('BACK') && this.pages > 1) await this.clientMessage.message.react(this.navigationEmojis.back);
    if (this._enabled('JUMP') && this.pages > 2) await this.clientMessage.message.react(this.navigationEmojis.jump);
    if (this._enabled('FORWARD') && this.pages > 1) await this.clientMessage.message.react(this.navigationEmojis.forward);
    if (this._enabled('DELETE')) await this.clientMessage.message.react(this.navigationEmojis.delete);

    this._awaitResponse();
  }

  /**
   * Helper for intialising the MessageEmbed.
   * [For sub-class] Initialises the MessageEmbed.
   * @private
   * @param {boolean} [callNavigation=true] - Whether to call _drawNavigation() or not.
   */
  _loadList(callNavigation = true) {
    if (callNavigation) return this._drawNavigation();
  }

  /**
   * Calls PaginationEmbed.setPage().
   * @private
   * @param {number} param - The page number to jump to. As String: 'back', 'forward'
   */
  async _loadPage(param = 1) {
    this.setPage(param);
    await this._loadList(false);

    this._awaitResponse();
  }

  /**
   * Awaits the reaction from the user.
   * @private
   */
  async _awaitResponse() {
    const emojis = Object.values(this.navigationEmojis);
    const filter = (r, u) => {
      const enabledEmoji = this._enabled('ALL')
        ? this.disabledNavigationEmojiValues.length <= 0 || this.disabledNavigationEmojiValues.some(e => ![r.emoji.name, r.emoji.id].includes(e))
        : false;
      const passedEmoji =
        (enabledEmoji && (emojis.includes(r.emoji.name) || emojis.includes(r.emoji.id))) ||
        r.emoji.name in this.functionEmojis || r.emoji.id in this.functionEmojis;

      if (this.authorizedUsers.length)
        return this.authorizedUsers.includes(u.id) && passedEmoji;

      return !u.bot && passedEmoji;
    };
    const clientMessage = this.clientMessage.message;

    try {
      const responses = await clientMessage.awaitReactions(filter, { max: 1, time: this.timeout, errors: ['time'] });
      const response = responses.first();
      const user = response.users.last();
      const emoji = [response.emoji.name, response.emoji.id];

      if (clientMessage.guild)
        await response.users.remove(user);

      switch (emoji[0] || emoji[1]) {
        case this.navigationEmojis.back:
          if (this.page === 1) return this._awaitResponse();

          this._loadPage('back');
          break;

        case this.navigationEmojis.jump:
          if (this.pages <= 2) return this._awaitResponse();

          this._awaitResponseEx(user);
          break;

        case this.navigationEmojis.forward:
          if (this.page === this.pages) return this._awaitResponse();

          this._loadPage('forward');
          break;

        case this.navigationEmojis.delete:
          clientMessage.delete();
          break;

        default:
          const cb = this.functionEmojis[emoji[0]] || this.functionEmojis[emoji[1]];

          await cb(user, this); // eslint-disable-line callback-return

          this._loadPage(this.page);
      }
    } catch (c) {
      if (clientMessage.guild)
        await clientMessage.reactions.removeAll();
      if (this.deleteOnTimeout)
        await clientMessage.delete();

      if (c instanceof Error) throw c;
    }
  }

  /**
   * Awaits the custom page input from the user.
   * @private
   * @param {User} user - The user who reacted to jump on a certain page.
   */
  async _awaitResponseEx(user) {
    const cancel = ['0', 'cancel'];
    const filter = m => {
      const supposedPage = parseInt(m.content);

      return (
        m.author.id === user.id && (
          (!isNaN(m.content) && supposedPage !== this.page && supposedPage >= 1 && supposedPage <= this.pages) ||
          cancel.includes(m.content.toLowerCase())
        )
      );
    };
    const channel = this.clientMessage.message.channel;
    const prompt = await channel.send(`${user.toString()}, To what page would you like to jump? Say \`cancel\` or \`0\` to cancel the prompt.`);

    try {
      const responses = await channel.awaitMessages(filter, { max: 1, time: this.timeout, errors: ['time'] });
      const response = responses.first();
      const content = response.content;

      await prompt.delete();

      if (this.clientMessage.message.guild)
        await response.delete();

      if (cancel.includes(content)) return this._awaitResponse();

      this._loadPage(parseInt(content));
    } catch (c) {
      await prompt.delete();

      if (c instanceof Error) throw c;
    }
  }
}

module.exports = PaginationEmbed;
