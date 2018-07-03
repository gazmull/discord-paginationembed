/*
  Also known as 'Leaderboard-Embed/Dynamic Mode'
*/

const PaginationEmbed = require('./base/PaginationEmbed');
const { RichEmbed } = require('discord.js');

/**
 * Function for Formatting Fields.
 * @typedef {Function} FieldFormatFunction
 * @param {*} element - The current element.
 */

/**
 * @description Extends {@link PaginationEmbed}
 */
class FieldsEmbed extends PaginationEmbed {

  /**
   * Options for FieldsEmbed.fields.
   * @typedef {Object[]} FieldOptions
   * @property {string} name - Name of the field.
   * @property {Function} value - Value of the field. Function for Array.prototype.map().join('\n').
   * @property {boolean} [inline=true] - Whether the field is inline with other field or not.
   */

  /**
   * Options for the constructor.
   * @typedef {Object} FieldsEmbedOptions
   * @property {number} [elementsPerPage=10] - Items per page.
   * @property {FieldOptions} fields - An array formatted fields to input.
   */

  /**
   * @param {FieldsEmbedOptions} [options={}] Options for pagination utility.
   */
  constructor(options = {}) {
    if (!(options instanceof Object)) throw new Error('Cannot invoke FieldsEmbed class without an actual options object.');

    super(options);

    /**
     * Maximum number of elements to be displayed per page.
     * @type {number}
     */
    this.elementsPerPage = options.elementsPerPage || 10;
  }

  /**
   * Elements in the current page.
   * @type {Array<*>}
   */
  get elementList() {
    const begin = (this.page - 1) * this.elementsPerPage;
    const end = begin + this.elementsPerPage;

    return this.array.slice(begin, end);
  }

  /**
   * Build the Pagination Fields Embed.
   *
   * @example
   *
   * // Object as constructor.
   * const { FieldsEmbed } = require('discord-paginationembed');
   *
   * // Under message event.
   * new FieldsEmbed({
   *  authorizedUsers: [message.author.id],
   *  channel: message.channel,
   *  clientMessage: { content: 'Preparing the embed...' },
   *  array: [{ name: 'John Doe' }, { name: 'Jane Doe' }],
   *  elementsPerPage: 1,
   *  pageIndicator: false,
   *  fields: [{ name: 'Name', value: el => el.name }],
   *  page: 1,
   *  timeout: 69000,
   *  navigationEmojis: {
   *    back: '◀',
   *    jump: '↗',
   *    forward: '▶',
   *    delete: '🗑'
   *  },
   *  functionEmojis: {
   *    '🔄': (user, instance) => {
   *      const field = instance.fields[0];
   *
   *      if (field.name === 'Name')
   *        field.name = user.tag;
   *      else
   *        field.name = 'Name';
   *    }
   *  }
   * }).build();
   *
   * @example
   *
   * // Methods as constructor.
   * const { FieldsEmbed } = require('discord-paginationembed');
   *
   * // Under message event.
   * new FieldsEmbed()
   *  .setAuthorizedUsers([message.author.id])
   *  .setChannel(message.channel)
   *  .setClientMessage(null, 'Preparing the embed...')
   *  .setArray([{ name: 'John Doe' }, { name: 'Jane Doe' }])
   *  .setElementsPerPage(1)
   *  .showPageIndicator(false)
   *  .formatField('Name', el => el.name)
   *  .setPage(1)
   *  .setTimeout(69000)
   *  .setNavigationEmojis({
   *    back: '◀',
   *    jump: '↗',
   *    forward: '▶',
   *    delete: '🗑'
   *  })
   *  .setFunctionEmojis({
   *    '🔄': (user, instance) => {
   *      const field = instance.fields[0];
   *
   *      if (field.name === 'Name')
   *        field.name = user.tag;
   *      else
   *        field.name = 'Name';
   *    }
   *  })
   *  .build();
   */
  async build() {
    this.pages = Math.ceil(this.array.length / this.elementsPerPage);
    this
      .setElementsPerPage(this.elementsPerPage)
      .setPage(this.page);

    await this._verify(this.pages);

    const isValidFields = this.fields instanceof Array && Boolean(this.fields.length);

    if (!isValidFields) throw new Error('Cannot invoke FieldsEmbed class without initialising at least one field.');

    const fields = this.fields;
    this.fields = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      this.formatField(field.name, field.value, field.inline);
    }

    const hasPaginateField = this.fields.filter(f => typeof f.value === 'function');

    if (!hasPaginateField) throw new Error('Cannot invoke FieldsEmbed class without at least one field to paginate.');

    await this._loadList();
  }

  /**
   * Adds a field to the embed.
   * Same as RichEmbed.addField, but value takes a function instead.
   * @param {string} name - Name of the field.
   * @param {FieldFormatFunction} value - Value of the field. Function for Array.prototype.map().join('\n').
   * @param {boolean} [inline=true] - Whether the field is inline with other field or not.
   * @returns {PaginationEmbed}
   */
  formatField(name, value, inline = true) {
    this.fields.push({ name, value, inline });

    return this;
  }

  /**
   * Sets the maximum number of elements to be displayed per page.
   * @param {number} number - Maximum number of elements to be displayed per page.
   * @returns {PaginationEmbed}
   */
  setElementsPerPage(number) {
    if (typeof number !== 'number') throw new Error('setElementsPerPage() only accepts number type.');

    this.elementsPerPage = number;

    return this;
  }

  _drawList() {
    const embed = new RichEmbed({
      type: this.type,
      title: this.title,
      description: this.description,
      url: this.url,
      color: this.color,
      timestamp: this.timestamp,
      thumbnail: this.thumbnail,
      image: this.image,
      video: this.video,
      author: this.author,
      provider: this.provider,
      footer: this.footer,
      files: this.files
    });

    if (this.pageIndicator && this.pages > 1)
      embed.setDescription(
        this.description
          ? `${this.description}\n\nPage ${this.page} of ${this.pages}`
          : `Page ${this.page} of ${this.pages}`
      );

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];

      embed.addField(
        field.name,
        typeof field.value === 'function'
          ? this.elementList.map(field.value).join('\n')
          : field.value,
        field.inline
      );
    }

    return embed;
  }

  async _loadList(callNavigation = true) {
    const embed = this._drawList();
    await this.clientMessage.message.edit({ embed });

    super._loadList(callNavigation);
  }
}

module.exports = FieldsEmbed;
