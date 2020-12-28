"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsEmbed = void 0;
const discord_js_1 = require("discord.js");
const base_1 = require("./base");
/**
 * A pagination mode that uses a MessageEmbed with a field(s) containing the elements to paginate.
 * @extends [[PaginationEmbed]]
 * @noInheritDoc
 */
class FieldsEmbed extends base_1.PaginationEmbed {
    constructor() {
        super();
        this.elementsPerPage = 10;
        this.embed = new discord_js_1.MessageEmbed();
    }
    /** Elements in the current page. */
    get elementList() {
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
    async build() {
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
    formatField(name, value, inline = true) {
        if (typeof value !== 'function')
            throw new TypeError('formatField() value parameter only takes a function.');
        // @ts-ignore
        this.embed.fields.push({ name, value, inline });
        return this;
    }
    /**
     * Sets the maximum number of elements to be displayed per page.
     * @param max - Maximum number of elements to be displayed per page.
     */
    setElementsPerPage(max) {
        if (typeof max !== 'number')
            throw new TypeError('setElementsPerPage() only accepts number type.');
        this.elementsPerPage = max;
        return this;
    }
    async _drawList() {
        const embed = new discord_js_1.MessageEmbed(this.embed);
        embed.fields = [];
        for (const field of this.embed.fields)
            embed.addField(field.name, typeof field.value === 'function'
                ? this.elementList.map(field.value).join('\n')
                : field.value, field.inline);
        return embed;
    }
    /** @ignore */
    async _loadList(callNavigation = true) {
        if (this.listenerCount('pageUpdate'))
            this.emit('pageUpdate');
        const embed = await this._drawList();
        const isFooter = this.usePageIndicator === 'footer';
        const shouldIndicate = this.usePageIndicator && !isFooter
            ? this.pages === 1
                ? undefined
                : this.pageIndicator
            : undefined;
        if (isFooter)
            embed.setFooter(this.pageIndicator, embed.footer.iconURL);
        if (this.clientAssets.message)
            await this.clientAssets.message.edit(shouldIndicate, { embed });
        else
            this.clientAssets.message = await this.channel.send(shouldIndicate, { embed });
        return super._loadList(callNavigation);
    }
}
exports.FieldsEmbed = FieldsEmbed;
