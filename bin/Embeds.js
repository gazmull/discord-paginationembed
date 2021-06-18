"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embeds = void 0;
const discord_js_1 = require("discord.js");
const base_1 = require("./base");
/**
 * A pagination mode that uses an array of MessageEmbed to paginate.
 * @extends [[PaginationEmbed]]
 * @noInheritDoc
 */
class Embeds extends base_1.PaginationEmbed {
    /** Embed in the current page. */
    get currentEmbed() {
        return this.array[this.page - 1];
    }
    get pages() {
        return this.array.length;
    }
    /**
     * Adds a field to the fields of all embeds.
     * @param name - The name of the field.
     * @param value - The value of the field.
     * @param inline - Whether the field is inline to the other fields.
     */
    addField(name, value, inline = false) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.addField(name, value, inline);
        return this;
    }
    addFields(...fields) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.addFields(...fields);
        return this;
    }
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
    async build() {
        await this._verify();
        return this._loadList();
    }
    /**
     * Sets the array of MessageEmbed to paginate.
     * @param array - An array of MessageEmbed to paginate.
     */
    setArray(array) {
        const isValidArray = Array.isArray(array) && Boolean(array.length);
        if (!isValidArray)
            throw new TypeError('Cannot invoke Embeds class without a valid array to paginate.');
        for (const [i, v] of array.entries())
            if (Boolean(v) && v.constructor === Object && Object.keys(v).length)
                array[i] = new discord_js_1.MessageEmbed(v);
            else if (v instanceof discord_js_1.MessageEmbed)
                continue;
            else
                throw new TypeError(`(MessageEmbeds[${i}]) Cannot invoke Embeds class with an invalid MessageEmbed instance.`);
        this.array = array;
        return this;
    }
    /**
     * Set the author of all embeds.
     * @param name - The name of the author.
     * @param iconURL - The icon URL of the author.
     * @param url - The URL of the author.
     */
    setAuthor(name, iconURL, url) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setAuthor(name, iconURL, url);
        return this;
    }
    /**
     * Sets the color of all embeds.
     * @param color - The color of all embeds.
     */
    setColor(color) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setColor(color);
        return this;
    }
    /**
     * Sets the description of all embeds.
     * @param description - The description of all embeds.
     */
    setDescription(description) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setDescription(description);
        return this;
    }
    /**
     * Sets the footer of all embeds.
     * @param text - The footer text.
     * @param iconURL - URL for the footer's icon.
     */
    setFooter(text, iconURL) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setFooter(text, iconURL);
        return this;
    }
    /**
     * Sets the image of all embeds.
     * @param url - The image of all embeds.
     */
    setImage(url) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setImage(url);
        return this;
    }
    /**
     * Sets the thumbnail of all embeds.
     * @param url - The thumbnail of all embeds.
     */
    setThumbnail(url) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setThumbnail(url);
        return this;
    }
    /**
     * Sets the timestamp of all embeds.
     * @param timestamp - The timestamp or date.
     */
    setTimestamp(timestamp) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setTimestamp(timestamp);
        return this;
    }
    /**
     * Sets the title of all embeds.
     * @param title - The title of all embeds.
     */
    setTitle(title) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setTitle(title);
        return this;
    }
    /**
     * Sets the URL of all embeds.
     * @param url - The URL of all embeds.
     */
    setURL(url) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.setURL(url);
        return this;
    }
    /**
     * Removes, replaces, and inserts fields in all embeds (max 25).
     * @param index - The index to start at.
     * @param deleteCount - The number of fields to remove.
     * @param name - The name of the field.
     * @param value - The value of the field.
     * @param inline - Set the field to display inline.
     */
    spliceFields(index, deleteCount, name, value, inline) {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        for (const el of this.array)
            el.spliceFields(index, deleteCount, [{ name, value, inline }]);
        return this;
    }
    /** Transforms all embeds to plain objects. */
    toJSON() {
        if (!this.array)
            throw new TypeError('this.array must be set first.');
        return this.array.map(m => m.toJSON());
    }
    /** @ignore */
    async _loadList(callNavigation = true) {
        if (this.listenerCount('pageUpdate'))
            this.emit('pageUpdate');
        const embed = new discord_js_1.MessageEmbed(this.currentEmbed);
        const isFooter = this.usePageIndicator === 'footer';
        const shouldIndicate = this.usePageIndicator && !isFooter
            ? this.pages === 1
                ? ''
                : this.pageIndicator
            : '';
        const { separator, text } = this.content;
        // Fixes no-argument TS error
        const content = `${text ? `${discord_js_1.Util.verifyString(text)}${separator}` : ''}${shouldIndicate}`;
        const opt = { content, embeds: [embed] };
        if (isFooter)
            embed.setFooter(this.pageIndicator, embed.footer.iconURL);
        if (this.clientAssets.message)
            await this.clientAssets.message.edit(opt);
        else
            this.clientAssets.message = await this.channel.send(opt);
        return super._loadList(callNavigation);
    }
}
exports.Embeds = Embeds;
