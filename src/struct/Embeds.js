/*
  Also known as 'Static Mode'
*/

const PaginationEmbed = require('./base/PaginationEmbed');
const { RichEmbed } = require('discord.js');

/**
 * @description Extends {@link PaginationEmbed}
 */
class Embeds extends PaginationEmbed {

  /**
   * Options for the constructor.
   * @typedef {Object} EmbedsOptions
   * @property {string} [title=null] - The title of all embeds.
   * @property {string} [description=null] - The description of all embeds.
   * @property {string} [url=null] - The URL of all embeds.
   * @property {number} [color=null] - The color of all embeds.
   * @property {boolean} [timestamp=null] - Whether to show timestamp to all embeds or not.
   * @property {Array<Object>} [fields=null] - The fields of all embeds.
   * @property {string} [thumbnail=null] - The thumbnail of all embeds.
   * @property {{}} [image=null] - The image of all embeds.
   * @property {{}} [author=null] - The author of all embeds.
   * @property {{}} [footer=null] - The footer of all embeds.
   */

  /**
   * @param {EmbedsOptions} [options={}] Options for Embeds.
   */
  constructor(options = {}) {
    if (!(options instanceof Object)) throw new Error('Cannot invoke Embeds class without an actual options object.');

    super(options);
    this.options = options;

    /**
     * The title of all embeds.
     * @type {string}
     */
    this.title = options.title || null;

    /**
     * The description of all embeds.
     * @type {string}
     */
    this.description = options.description || null;

    /**
     * The URL of all embeds.
     * @type {string}
     */
    this.url = options.url || null;

    /**
     * The color of all embeds.
     * @type {number}
     */
    this.color = options.color || null;

    /**
     * Whether to show timestamp to all embeds or not.
     * @type {boolean}
     */
    this.timestamp = options.timestamp || null;

    /**
     * The fields of all embeds.
     * @type {Object[]}
     */
    this.fields = options.fields || [];

    /**
     * The thumbnail of all embeds.
     * @type {string}
     */
    this.thumbnail = options.thumbnail || null;

    /**
     * The image of all embeds.
     * @type {Object}
     */
    this.image = options.image || null;

    /**
     * The author of all embeds.
     * @type {Object}
     */
    this.author = options.author || null;

    /**
     * The footer of all embeds.
     * @type {Object}
     */
    this.footer = options.footer || null;
  }

  /**
   * Embed in the current page.
   * @type {RichEmbed}
   */
  get currentEmbed() {
    return this.array[this.page - 1];
  }

  /**
   * Adds a blank field to the fields of all embeds.
   * @param {boolean} [inline=false] - Whether the field is inline or not to the other fields.
   * @returns {PaginationEmbed}
   */
  addBlankField(inline = false) {
    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].addBlankField(inline);

    return this;
  }

  /**
   * Adds a field to the fields of all embeds.
   * @param {string} name - The name of the field.
   * @param {string} value - The value of the field.
   * @param {boolean} [inline=false] - Whether the field is inline or not to the other fields.
   * @returns {PaginationEmbed}
   */
  addField(name, value, inline = false) {
    if (!name && !value) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].addField(name, value, inline);

    return this;
  }

  /**
   * Build the Pagination Embeds.
   *
   * @example
   *
   * // Object as constructor.
   * const { Embeds } = require('discord-paginationembed');
   * const { RichEmbed } = require('discord.js');
   *
   * // Under message event.
   * const embeds = [];
   *
   * for (let i = 0; i < 5; ++i)
   *  embeds.push(new RichEmbed().addField('Page', i + 1));
   *
   * new Embeds({
   *  authorizedUsers: [message.author.id],
   *  channel: message.channel,
   *  clientMessage: { content: 'Preparing the embed...' },
   *  array: embeds,
   *  pageIndicator: false,
   *  page: 1,
   *  timeout: 69000,
   *  navigationEmojis: {
   *    back: '◀',
   *    jump: '↗',
   *    forward: '▶',
   *    delete: '🗑'
   *  },
   *  functionEmojis: {
   *    '⬆': (_, instance) => {
   *      for (const embed of instance.array)
   *        embed.fields[0].value++;
   *    },
   *    '⬇': (_, instance) => {
   *      for (const embed of instance.array)
   *        embed.fields[0].value--;
   *    }
   *  }
   *  description: 'This is one of my embeds with this message!',
   *  color: 0xFF00AE,
   *  timestamp: true
   * }).build();
   *
   * @example
   *
   * // Methods as constructor.
   * const { Embeds } = require('discord-paginationembed');
   * const { RichEmbed } = require('discord.js');
   *
   * // Under message event.
   * const embeds = [];
   *
   * for (let i = 0; i < 5; ++i)
   *  embeds.push(new RichEmbed().addField('Page', i + 1));
   *
   * new Embeds()
   *  .setAuthorizedUsers([message.author.id])
   *  .setChannel(message.channel)
   *  .setClientMessage(null, 'Preparing the embed...')
   *  .setArray(embeds)
   *  .showPageIndicator(false)
   *  .setPage(1)
   *  .setTimeout(69000)
   *  .setNavigationEmojis({
   *    back: '◀',
   *    jump: '↗',
   *    forward: '▶',
   *    delete: '🗑'
   *  })
   *  .setFunctionEmojis({
   *    '⬆': (_, instance) => {
   *      for (const embed of instance.array)
   *        embed.fields[0].value++;
   *      },
   *    '⬇': (_, instance) => {
   *       for (const embed of instance.array)
   *         embed.fields[0].value--;
   *      }
   *  })
   *  .setDescription('This is one of my embeds with this message!')
   *  .setColor(0xFF00AE)
   *  .setTimestamp()
   *  .build();
   */
  async build() {
    this.pages = this.array.length;

    await this._verify(this.pages);

    this
      .setTitle(this.title)
      .setDescription(this.description)
      .setURL(this.url)
      .setColor(this.color)
      .setThumbnail(this.thumbnail)
      .setImage(this.image)
      .setAuthor(this.author)
      .setFooter(this.footer);

    if (this.fields.length) {
      const fields = this.fields;
      this.fields = [];

      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];

        this.addField(field.name, field.value, field.inline);
      }
    }

    if (this.options.timestamp !== null && this.options.timestamp)
      this.setTimestamp();

    await this._loadList();
  }

  /**
   * Sets the array of embeds to paginate.
   * @param {Array} array - An array of embeds to paginate.
   * @returns {PaginationEmbed}
   */
  setArray(array) {
    const isValidArray = array instanceof Array && Boolean(array.length);

    if (!isValidArray) throw new Error('Cannot invoke Embeds class without initialising the array to paginate.');

    for (let i = 0; i < array.length; i++)
      if (array[i] instanceof RichEmbed) continue;
      else throw new Error(`(RichEmbeds[${i}]) Cannot invoke Embeds class with an invalid RichEmbed instance.`);

    this.array = array;

    return this;
  }

  /**
   * Set the author of all embeds.
   * @param {string} name - The name of the author.
   * @param {string} [iconURL=null] - The icon URL of the author.
   * @param {string} [url=null] - The URL of the author.
   * @returns {PaginationEmbed}
   */
  setAuthor(name, iconURL = null, url = null) {
    if (!name) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setAuthor(name, iconURL, url);

    return this;
  }

  /**
   * Sets the color of all embeds.
   * @param {ColorResolvable} color - The color of all embeds.
   * @returns {PaginationEmbed}
   */
  setColor(color) {
    if (!color) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setColor(color);

    return this;
  }

  /**
   * Sets the description of all embeds.
   * @param {string} description - The description of all embeds.
   * @returns {PaginationEmbed}
   */
  setDescription(description) {
    if (!description) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setDescription(description);

    return this;
  }

  /**
   * Sets the footer of all embeds.
   * @param {string} text - The footer text.
   * @param {string} [iconURL=null] - URL for the footer's icon.
   * @returns {PaginationEmbed}
   */
  setFooter(text, iconURL = null) {
    if (!text) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setFooter(text, iconURL);

    return this;
  }

  /**
   * Sets the image of all embeds.
   * @param {string} image - The image of all embeds.
   * @returns {PaginationEmbed}
   */
  setImage(image) {
    if (!image) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setImage(image);

    return this;
  }

  /**
   * Sets the thumbnail of all embeds.
   * @param {string} thumbnail - The thumbnail of all embeds.
   * @returns {PaginationEmbed}
   */
  setThumbnail(thumbnail) {
    if (!thumbnail) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setThumbnail(thumbnail);

    return this;
  }

  /**
   * Sets the timestamp of all embeds.
   * @returns {PaginationEmbed}
   */
  setTimestamp() {
    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].timestamp = new Date().getTime();

    return this;
  }

  /**
   * Sets the title of all embeds.
   * @param {string} title - The title of all embeds.
   * @returns {PaginationEmbed}
   */
  setTitle(title) {
    if (!title) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setTitle(title);

    return this;
  }

  /**
   * Sets the URL of all embeds.
   * @param {string} url - The URL of all embeds.
   * @returns {PaginationEmbed}
   */
  setURL(url) {
    if (!url) return this;

    const arr = this.array;

    for (let i = 0; i < arr.length; i++)
      arr[i].setURL(url);

    return this;
  }

  async _loadList(callNavigation = true) {
    const shouldIndicate = this.pageIndicator
      ? this.pages === 1
        ? null
        : `Page ${this.page} of ${this.pages}${
          this.clientMessage.content
            ? `\n\n${this.clientMessage.content}`
            : ''}`
      : this.clientMessage.content;

    await this.clientMessage.message.edit(shouldIndicate, { embed: this.currentEmbed });

    super._loadList(callNavigation);
  }
}

module.exports = Embeds;
