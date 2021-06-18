"use strict";
/** @module PaginationEmbed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationEmbed = void 0;
const events_1 = require("events");
/** @ignore */
const MESSAGE_DELETED = 'Client\'s message was deleted before being processed.';
/**
 * The base class for Pagination Modes. **Do not invoke**.
 * @extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
 * @noInheritDoc
 */
class PaginationEmbed extends events_1.EventEmitter {
    constructor() {
        super();
        this.authorizedUsers = [];
        this.channel = null;
        this.clientAssets = {};
        this.content = { separator: '\n' };
        this.usePageIndicator = false;
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
        this.emojisFunctionAfterNavigation = false;
        this._disabledNavigationEmojiValues = [];
        this._defaultNavigationEmojis = {
            back: '◀',
            jump: '↗',
            forward: '▶',
            delete: '🗑'
        };
        const makeCircles = (page, pages) => `${'○ '.repeat(page - 1)}● ${'○ '.repeat(pages - page)}`.trim();
        this._defaultPageIndicators = {
            text: (page, pages) => `Page ${page} of ${pages}`,
            textcompact: (page, pages) => `${page}/${pages}`,
            circle: (page, pages) => makeCircles(page, pages),
            hybrid: (page, pages) => `[${page}/${pages}] ${makeCircles(page, pages)}`
        };
        this._pageIndicator = this._defaultPageIndicators.text;
    }
    /** The formatted page indicator. Default format: `text` */
    get pageIndicator() {
        return this._pageIndicator(this.page, this.pages);
    }
    build() {
        throw new Error('Cannot invoke this class. Invoke with [PaginationEmbed.Embeds] or [PaginationEmbed.FieldsEmbed] instead.');
    }
    /**
     * Adds a function emoji to the embed.
     *
     * ### Example
     * ```js
     *  <PaginationEmbed>.addFunctionEmoji('🅱', (_, instance) => {
     *    const field = instance.embed.fields[0];
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
    addFunctionEmoji(emoji, callback) {
        if (!(callback instanceof Function))
            throw new TypeError(`Callback for ${emoji} must be a function type.`);
        Object.assign(this.functionEmojis, { [emoji]: callback });
        return this;
    }
    /**
     * Deletes a function emoji.
     * @param emoji - The emoji key to delete.
     */
    deleteFunctionEmoji(emoji) {
        if (!(emoji in this.functionEmojis))
            throw new Error(`${emoji} function emoji does not exist.`);
        delete this.functionEmojis[emoji];
        return this;
    }
    /** Deletes all function emojis, and then re-enables all navigation emojis. */
    resetEmojis() {
        for (const emoji of Object.keys(this.functionEmojis))
            delete this.functionEmojis[emoji];
        this.navigationEmojis = this._defaultNavigationEmojis;
        return this;
    }
    /**
     * Sets the array of elements to paginate. This must be called first before any other methods.
     * @param array - An array of elements to paginate.
     */
    setArray(array) {
        const isValidArray = Array.isArray(array) && Boolean(array.length);
        if (!isValidArray)
            throw new TypeError('Cannot invoke PaginationEmbed class without a valid array to paginate.');
        this.array = array;
        return this;
    }
    /**
     * Set the authorized users to navigate the pages.
     * @param users - A user ID or an array of user IDs.
     */
    setAuthorizedUsers(users) {
        if (!(Array.isArray(users) || typeof users === 'string'))
            throw new TypeError('Cannot invoke PaginationEmbed class without a valid array.');
        this.authorizedUsers = Array.isArray(users) ? users : [users];
        return this;
    }
    /**
     * The channel where to send the embed.
     * @param channel - The channel object.
     */
    setChannel(channel) {
        this.channel = channel;
        return this;
    }
    /**
     * Sets the settings for assets for the client.
     * @param assets - The assets for the client.
     */
    setClientAssets(assets) {
        const type = typeof assets;
        if (type !== 'object' || type === null)
            throw new TypeError('setClientAssets() only accepts object type.');
        let { prompt } = assets;
        if (!prompt)
            prompt = '{{user}}, To what page would you like to jump? Say `cancel` or `0` to cancel the prompt.';
        Object.assign(this.clientAssets, Object.assign(Object.assign({}, assets), { prompt }));
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
    setDisabledNavigationEmojis(emojis) {
        if (!Array.isArray(emojis))
            throw new TypeError('Cannot invoke PaginationEmbed class without a valid array.');
        const invalid = [];
        const verified = [];
        for (const emoji of emojis) {
            const validEmojis = ['back', 'jump', 'forward', 'delete', 'all'];
            if (validEmojis.includes(emoji))
                verified.push(emoji);
            else
                invalid.push(emoji);
        }
        if (invalid.length)
            throw new TypeError(`Cannot invoke PaginationEmbed class with invalid navigation emoji(s): ${invalid.join(', ')}.`);
        this.disabledNavigationEmojis = verified;
        return this;
    }
    /**
     * Sets whether to set function emojis after navigation emojis.
     * @param boolean - Set function emojis after navigation emojis?
     */
    setEmojisFunctionAfterNavigation(boolean) {
        if (typeof boolean !== 'boolean')
            throw new TypeError('setEmojisFunctionAfterNavigation() only accepts boolean type.');
        this.emojisFunctionAfterNavigation = boolean;
        return this;
    }
    /**
     * Sets the emojis used for function emojis.
     *
     * ### Example
     * ```js
     *  <PaginationEmbed>.setFunctionEmojis({
     *    '🔄': (user, instance) => {
     *      const field = instance.embed.fields[0];
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
    setFunctionEmojis(emojis) {
        for (const emoji of Object.keys(emojis)) {
            const fn = emojis[emoji];
            this.addFunctionEmoji(emoji, fn);
        }
        return this;
    }
    /**
     * Sets the emojis used for navigation emojis.
     * @param emojis - An object containing customised emojis to use as navigation emojis.
     */
    setNavigationEmojis(emojis) {
        Object.assign(this.navigationEmojis, emojis);
        return this;
    }
    /**
     * Sets to jump to a certain page upon calling PaginationEmbed.build().
     * @param page - The page number to jump to.
     */
    setPage(page) {
        const isString = typeof page === 'string';
        if (!(!isNaN(page) || isString))
            throw new TypeError('setPage() only accepts number/string type.');
        const navigator = page === 'back'
            ? this.page === 1 ? this.page : this.page - 1
            : this.page === this.pages ? this.pages : this.page + 1;
        this.page = isString ? navigator : page;
        return this;
    }
    /**
     * Sets the time for awaiting a user action before timeout in ms.
     * @param timeout Timeout value in ms.
     */
    setTimeout(timeout) {
        if (typeof timeout !== 'number')
            throw new TypeError('setTimeout() only accepts number type.');
        this.timeout = timeout;
        return this;
    }
    /**
     * Sets the page indicator formatting function and placement.
     * @param enabled - Whether to show page indicator.
     *   Pass `footer` to display the indicator in embed's footer text (replaces existing text) instead.
     * @param fn - Function for indicator formatting.
     */
    setPageIndicator(enabled, fn) {
        if (typeof enabled === 'boolean' || (typeof enabled === 'string' && enabled === 'footer'))
            this.usePageIndicator = enabled;
        else
            throw new TypeError('setPageIndicator()\'s `enabled` parameter only accepts boolean/string type.');
        if (fn) {
            const allowedTypes = ['text', 'textcompact', 'circle', 'hybrid'];
            if (typeof fn === 'string' && allowedTypes.includes(fn))
                this._pageIndicator = this._defaultPageIndicators[fn];
            else if (typeof fn === 'function')
                this._pageIndicator = fn;
            else
                throw new TypeError('setPageIndicator()\'s `fn` parameter only accepts function/string type.');
        }
        return this;
    }
    /**
     * Sets whether the client's message will be deleted upon timeout.
     * @param deleteOnTimeout - Delete client's message upon timeout?
     */
    setDeleteOnTimeout(boolean) {
        if (typeof boolean !== 'boolean')
            throw new TypeError('deleteOnTimeout() only accepts boolean type.');
        this.deleteOnTimeout = boolean;
        return this;
    }
    /**
     * Sets the client's message content.
     * @param text - The message content.
     * @param separator - The string to separate the content from the page indicator.
     */
    setContent(text, separator = '\n') {
        if (typeof separator !== 'string')
            throw new TypeError('setContent()\'s `separator` parameter only accepts string type.');
        Object.assign(this.content, { text, separator });
        return this;
    }
    /**
     * Evaluates the constructor and the client.
     * @ignore
     */
    async _verify() {
        this.setClientAssets(this.clientAssets);
        if (!this.channel)
            throw new Error('Cannot invoke PaginationEmbed class without a channel object set.');
        if (!(this.page >= 1 && this.page <= this.pages))
            throw new RangeError(`Page number is out of bounds. Max pages: ${this.pages}`);
        return this._checkPermissions();
    }
    /**
     * Checks the permissions of the client before sending the embed.
     * @ignore
     */
    async _checkPermissions() {
        const channel = this.channel;
        if (channel.guild) {
            const missing = channel
                .permissionsFor(channel.client.user)
                .missing(['ADD_REACTIONS', 'EMBED_LINKS', 'VIEW_CHANNEL', 'SEND_MESSAGES']);
            if (missing.length)
                throw new Error(`Cannot invoke PaginationEmbed class without required permissions: ${missing.join(', ')}`);
        }
        return true;
    }
    /**
     * Returns whether the given navigation emoji is enabled.
     * @param emoji The navigation emoji to search.
     */
    _enabled(emoji) {
        return this.disabledNavigationEmojis.includes('all')
            ? false
            : !this.disabledNavigationEmojis.includes(emoji);
    }
    /** Deploys emoji reacts for the message sent by the client. */
    async _drawEmojis() {
        if (this.emojisFunctionAfterNavigation) {
            await this._drawNavigationEmojis();
            await this._drawFunctionEmojis();
        }
        else {
            await this._drawFunctionEmojis();
            await this._drawNavigationEmojis();
        }
        if (this.listenerCount('start'))
            this.emit('start');
        return this._awaitResponse();
    }
    /** Deploys function emojis. */
    async _drawFunctionEmojis() {
        if (Object.keys(this.functionEmojis).length)
            for (const emoji of Object.keys(this.functionEmojis))
                await this.clientAssets.message.react(emoji);
    }
    /** Deploys navigation emojis. */
    async _drawNavigationEmojis() {
        if (this._enabled('back') && this.pages > 1)
            await this.clientAssets.message.react(this.navigationEmojis.back);
        if (this._enabled('jump') && this.pages > 2)
            await this.clientAssets.message.react(this.navigationEmojis.jump);
        if (this._enabled('forward') && this.pages > 1)
            await this.clientAssets.message.react(this.navigationEmojis.forward);
        if (this._enabled('delete'))
            await this.clientAssets.message.react(this.navigationEmojis.delete);
    }
    /**
     * Helper for intialising the MessageEmbed.
     * [For sub-class] Initialises the MessageEmbed.
     * @param callNavigation - Whether to call _drawEmojis().
     * @ignore
     */
    _loadList(callNavigation = true) {
        if (callNavigation)
            return this._drawEmojis();
    }
    /**
     * Calls PaginationEmbed.setPage() and then executes `_loadList()` and `_awaitResponse()`.
     * @param param - The page number to jump to.
     */
    async _loadPage(param = 1) {
        this.setPage(param);
        await this._loadList(false);
        return this._awaitResponse();
    }
    /** Awaits the reaction from the user(s). */
    async _awaitResponse() {
        const emojis = Object.values(this.navigationEmojis);
        const channel = this.clientAssets.message.channel;
        const filter = (r, u) => {
            const enabledEmoji = this._enabled('all')
                ? !this._disabledNavigationEmojiValues.length
                    || this._disabledNavigationEmojiValues.some(e => ![r.emoji.name, r.emoji.id].includes(e))
                : false;
            const passedEmoji = (enabledEmoji && (emojis.includes(r.emoji.name) || emojis.includes(r.emoji.id))) ||
                r.emoji.name in this.functionEmojis || r.emoji.id in this.functionEmojis;
            if (this.authorizedUsers.length)
                return this.authorizedUsers.includes(u.id) && passedEmoji;
            return !u.bot && passedEmoji;
        };
        const clientMessage = this.clientAssets.message;
        try {
            const responses = await clientMessage.awaitReactions(filter, { max: 1, time: this.timeout, errors: ['time'] });
            const response = responses.first();
            const user = response.users.cache.last();
            const emoji = [response.emoji.name, response.emoji.id];
            if (this.listenerCount('react'))
                this.emit('react', user, response.emoji);
            if (clientMessage.guild) {
                const missing = channel
                    .permissionsFor(channel.client.user)
                    .missing(['MANAGE_MESSAGES']);
                if (!missing.length)
                    await response.users.remove(user);
            }
            switch (emoji[0] || emoji[1]) {
                case this.navigationEmojis.back:
                    if (this.page === 1)
                        return this._awaitResponse();
                    return this._loadPage('back');
                case this.navigationEmojis.jump:
                    if (this.pages <= 2)
                        return this._awaitResponse();
                    return this._awaitResponseEx(user);
                case this.navigationEmojis.forward:
                    if (this.page === this.pages)
                        return this._awaitResponse();
                    return this._loadPage('forward');
                case this.navigationEmojis.delete:
                    await clientMessage.delete();
                    if (this.listenerCount('finish'))
                        this.emit('finish', user);
                    return;
                default: {
                    const cb = this.functionEmojis[emoji[0]] || this.functionEmojis[emoji[1]];
                    try {
                        await cb(user, this);
                    }
                    catch (err) {
                        return this._cleanUp(err, clientMessage, false, user);
                    }
                    return this._loadPage(this.page);
                }
            }
        }
        catch (err) {
            return this._cleanUp(err, clientMessage);
        }
    }
    /**
     * Only used for `_awaitResponse`:
     * Deletes the client's message, and emits either `error` or `finish` event depending on the passed parameters.
     * @param err The error object.
     * @param clientMessage The client's message.
     * @param expired Whether the clean up is for `expired` event.
     * @param user The user object (only for `finish` event).
     */
    async _cleanUp(err, clientMessage, expired = true, user) {
        const channel = this.clientAssets.message.channel;
        if (this.deleteOnTimeout && clientMessage.deletable) {
            await clientMessage.delete();
            clientMessage.deleted = true;
        }
        if (clientMessage.guild && !clientMessage.deleted) {
            const missing = channel
                .permissionsFor(channel.client.user)
                .missing(['MANAGE_MESSAGES']);
            if (!missing.length)
                await clientMessage.reactions.removeAll();
        }
        if (err instanceof Error) {
            if (this.listenerCount('error'))
                this.emit('error', err);
            return;
        }
        const eventType = expired ? 'expire' : 'finish';
        if (this.listenerCount(eventType))
            this.emit(eventType, user);
    }
    /**
     * Awaits the custom page input from the user.
     * @param user - The user who reacted to jump on a certain page.
     */
    async _awaitResponseEx(user) {
        const cancel = ['0', 'cancel'];
        const filter = (m) => {
            const supposedPage = parseInt(m.content);
            return (m.author.id === user.id && ((!isNaN(Number(m.content)) && supposedPage !== this.page && supposedPage >= 1 && supposedPage <= this.pages)
                || cancel.includes(m.content.toLowerCase())));
        };
        const channel = this.clientAssets.message.channel;
        const prompt = await channel
            .send(this.clientAssets.prompt.replace(/\{\{user\}\}/g, user.toString()));
        try {
            const responses = await channel.awaitMessages(filter, { max: 1, time: this.timeout, errors: ['time'] });
            const response = responses.first();
            const content = response.content;
            const missing = channel.permissionsFor(channel.client.user)
                .missing(['MANAGE_MESSAGES']);
            if (this.clientAssets.message.deleted) {
                if (this.listenerCount('error'))
                    this.emit('error', new Error(MESSAGE_DELETED));
                return;
            }
            await prompt.delete();
            if (response.deletable)
                if (!missing.length)
                    await response.delete();
            if (cancel.includes(content))
                return this._awaitResponse();
            return this._loadPage(parseInt(content));
        }
        catch (c) {
            if (prompt.deletable)
                await prompt.delete();
            if (c instanceof Error) {
                if (this.listenerCount('error'))
                    this.emit('error', c);
                return;
            }
            if (this.listenerCount('expire'))
                this.emit('expire');
        }
    }
}
exports.PaginationEmbed = PaginationEmbed;
