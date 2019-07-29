"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("events"), i = "Client's message was deleted before being processed.";

exports.PaginationEmbed = class extends t.EventEmitter {
  constructor() {
    super(), this.authorizedUsers = [], this.channel = null, this.clientAssets = {}, 
    this.pageIndicator = !0, this.deleteOnTimeout = !1, this.page = 1, this.timeout = 3e4, 
    this.navigationEmojis = {
      back: "◀",
      jump: "↗",
      forward: "▶",
      delete: "🗑"
    }, this.functionEmojis = {}, this.disabledNavigationEmojis = [], this.emojisFunctionAfterNavigation = !1, 
    this.pages = null, this._disabledNavigationEmojiValues = [], this._defaultNavigationEmojis = {
      back: "◀",
      jump: "↗",
      forward: "▶",
      delete: "🗑"
    };
  }
  build() {
    throw new Error("Cannot invoke this class. Invoke with [PaginationEmbed.Embeds] or [PaginationEmbed.FieldsEmbed] instead.");
  }
  addFunctionEmoji(t, i) {
    if (!(i instanceof Function)) throw new TypeError(`Callback for ${t} must be a function type.`);
    return Object.assign(this.functionEmojis, {
      [t]: i
    }), this;
  }
  deleteFunctionEmoji(t) {
    if (!(t in this.functionEmojis)) throw new Error(`${t} function emoji does not exist.`);
    return delete this.functionEmojis[t], this;
  }
  resetEmojis() {
    for (const t of Object.keys(this.functionEmojis)) delete this.functionEmojis[t];
    return this.navigationEmojis = this._defaultNavigationEmojis, this;
  }
  setArray(t) {
    if (!Array.isArray(t) || !Boolean(t.length)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array to paginate.");
    return this.array = t, this;
  }
  setAuthorizedUsers(t) {
    if (!Array.isArray(t)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array.");
    return this.authorizedUsers = t, this;
  }
  setChannel(t) {
    return this.channel = t, this;
  }
  setClientAssets(t) {
    if (!t) throw new TypeError("Cannot accept assets options as a non-object type.");
    const {message: i} = t;
    let {prompt: e} = t;
    return e || (e = "{{user}}, To what page would you like to jump? Say `cancel` or `0` to cancel the prompt."), 
    Object.assign(this.clientAssets, {
      message: i,
      prompt: e
    }), this;
  }
  setDisabledNavigationEmojis(t) {
    if (!Array.isArray(t)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array.");
    const i = [], e = [];
    for (let s of t) {
      if (s = "string" == typeof s ? s.toUpperCase() : s, [ "BACK", "JUMP", "FORWARD", "DELETE", "ALL" ].includes(s) || i.push(s), 
      "ALL" === s) {
        this.navigationEmojis = {
          back: null,
          jump: null,
          forward: null,
          delete: null
        }, e.push("ALL");
        break;
      }
      e.push(s), s = s.toLowerCase(), this._disabledNavigationEmojiValues.push(this.navigationEmojis[s]), 
      this.navigationEmojis[s] = null;
    }
    if (i.length) throw new TypeError(`Cannot invoke PaginationEmbed class with invalid navigation emoji(s): ${i.join(", ")}.`);
    return this.disabledNavigationEmojis = e, this;
  }
  setEmojisFunctionAfterNavigation(t) {
    if ("boolean" != typeof t) throw new TypeError("setEmojisFunctionAfterNavigation() only accepts boolean type.");
    return this.emojisFunctionAfterNavigation = t, this;
  }
  setFunctionEmojis(t) {
    for (const i of Object.keys(t)) {
      const e = t[i];
      this.addFunctionEmoji(i, e);
    }
    return this;
  }
  setNavigationEmojis(t) {
    return Object.assign(this.navigationEmojis, t), this;
  }
  setPage(t) {
    const i = "string" == typeof t;
    if (isNaN(t) && !i) throw new TypeError("setPage() only accepts number/string type.");
    const e = "back" === t ? 1 === this.page ? this.page : this.page - 1 : this.page === this.pages ? this.pages : this.page + 1;
    return this.page = i ? e : t, this;
  }
  setTimeout(t) {
    if ("number" != typeof t) throw new TypeError("setTimeout() only accepts number type.");
    return this.timeout = t, this;
  }
  setPageIndicator(t) {
    if ("boolean" != typeof t) throw new TypeError("setPageIndicator() only accepts boolean type.");
    return this.pageIndicator = t, this;
  }
  setDeleteOnTimeout(t) {
    if ("boolean" != typeof t) throw new TypeError("deleteOnTimeout() only accepts boolean type.");
    return this.deleteOnTimeout = t, this;
  }
  async _verify() {
    if (this.setClientAssets(this.clientAssets), !this.channel) throw new Error("Cannot invoke PaginationEmbed class without a channel object set.");
    if (!(this.page >= 1 && this.page <= this.pages)) throw new RangeError(`Page number is out of bounds. Max pages: ${this.pages}`);
    return this._checkPermissions();
  }
  async _checkPermissions() {
    const t = this.channel;
    if (t.guild) {
      const i = t.permissionsFor(t.client.user).missing([ "ADD_REACTIONS", "MANAGE_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "SEND_MESSAGES" ]);
      if (i.length) throw new Error(`Cannot invoke PaginationEmbed class without required permissions: ${i.join(", ")}`);
    }
    return !0;
  }
  _enabled(t) {
    return !this.disabledNavigationEmojis.includes("ALL") && !this.disabledNavigationEmojis.includes(t);
  }
  async _drawEmojis() {
    return this.emojisFunctionAfterNavigation ? (await this._drawNavigationEmojis(), 
    await this._drawFunctionEmojis()) : (await this._drawFunctionEmojis(), await this._drawNavigationEmojis()), 
    this._awaitResponse();
  }
  async _drawFunctionEmojis() {
    if (Object.keys(this.functionEmojis).length) for (const t of Object.keys(this.functionEmojis)) await this.clientAssets.message.react(t);
  }
  async _drawNavigationEmojis() {
    this._enabled("BACK") && this.pages > 1 && await this.clientAssets.message.react(this.navigationEmojis.back), 
    this._enabled("JUMP") && this.pages > 2 && await this.clientAssets.message.react(this.navigationEmojis.jump), 
    this._enabled("FORWARD") && this.pages > 1 && await this.clientAssets.message.react(this.navigationEmojis.forward), 
    this._enabled("DELETE") && await this.clientAssets.message.react(this.navigationEmojis.delete);
  }
  _loadList(t = !0) {
    if (t) return this._drawEmojis();
  }
  async _loadPage(t = 1) {
    return this.setPage(t), await this._loadList(!1), this._awaitResponse();
  }
  async _awaitResponse() {
    const t = Object.values(this.navigationEmojis), i = (i, e) => {
      const s = !!this._enabled("ALL") && (!this._disabledNavigationEmojiValues.length || this._disabledNavigationEmojiValues.some(t => ![ i.emoji.name, i.emoji.id ].includes(t))) && (t.includes(i.emoji.name) || t.includes(i.emoji.id)) || i.emoji.name in this.functionEmojis || i.emoji.id in this.functionEmojis;
      return this.authorizedUsers.length ? this.authorizedUsers.includes(e.id) && s : !e.bot && s;
    }, e = this.clientAssets.message;
    try {
      const t = (await e.awaitReactions(i, {
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), s = t.users.last(), a = [ t.emoji.name, t.emoji.id ];
      switch (this.listenerCount("react") && this.emit("react", s, t.emoji), e.guild && await t.remove(s), 
      a[0] || a[1]) {
       case this.navigationEmojis.back:
        return 1 === this.page ? this._awaitResponse() : this._loadPage("back");

       case this.navigationEmojis.jump:
        return this.pages <= 2 ? this._awaitResponse() : this._awaitResponseEx(s);

       case this.navigationEmojis.forward:
        return this.page === this.pages ? this._awaitResponse() : this._loadPage("forward");

       case this.navigationEmojis.delete:
        return await e.delete(), void (this.listenerCount("finish") && this.emit("finish", s));

       default:
        const i = this.functionEmojis[a[0]] || this.functionEmojis[a[1]];
        try {
          await i(s, this);
        } catch (t) {
          return this._cleanUp(t, e, !1, s);
        }
        return this._loadPage(this.page);
      }
    } catch (t) {
      return this._cleanUp(t, e);
    }
  }
  async _cleanUp(t, i, e = !0, s) {
    if (this.deleteOnTimeout && i.deletable && await i.delete(), i.guild && !i.deleted && await i.clearReactions(), 
    t instanceof Error) return void (this.listenerCount("error") && this.emit("error", t));
    const a = e ? "expire" : "finish";
    this.listenerCount(a) && this.emit(a, s);
  }
  async _awaitResponseEx(t) {
    const e = [ "0", "cancel" ], s = i => {
      const s = parseInt(i.content);
      return i.author.id === t.id && (!isNaN(Number(i.content)) && s !== this.page && s >= 1 && s <= this.pages || e.includes(i.content.toLowerCase()));
    }, a = this.clientAssets.message.channel, n = await a.send(this.clientAssets.prompt.replace(/\{\{user\}\}/g, t.toString()));
    try {
      const t = (await a.awaitMessages(s, {
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), o = t.content;
      return this.clientAssets.message.deleted ? void (this.listenerCount("error") && this.emit("error", new Error(i))) : (await n.delete(), 
      t.deletable && await t.delete(), e.includes(o) ? this._awaitResponse() : this._loadPage(parseInt(o)));
    } catch (t) {
      if (n.deletable && await n.delete(), t instanceof Error) return void (this.listenerCount("error") && this.emit("error", t));
      this.listenerCount("expire") && this.emit("expire");
    }
  }
};