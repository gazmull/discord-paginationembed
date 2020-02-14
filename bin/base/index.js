"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("events"), e = "Client's message was deleted before being processed.";

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
  addFunctionEmoji(t, e) {
    if (!(e instanceof Function)) throw new TypeError(`Callback for ${t} must be a function type.`);
    return Object.assign(this.functionEmojis, {
      [t]: e
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
    const {message: e} = t;
    let {prompt: i} = t;
    return i || (i = "{{user}}, To what page would you like to jump? Say `cancel` or `0` to cancel the prompt."), 
    Object.assign(this.clientAssets, {
      message: e,
      prompt: i
    }), this;
  }
  setDisabledNavigationEmojis(t) {
    if (!Array.isArray(t)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array.");
    const e = [], i = [];
    for (let s of t) {
      if (s = "string" == typeof s ? s.toUpperCase() : s, [ "BACK", "JUMP", "FORWARD", "DELETE", "ALL" ].includes(s) || e.push(s), 
      "ALL" === s) {
        this.navigationEmojis = {
          back: null,
          jump: null,
          forward: null,
          delete: null
        }, i.push("ALL");
        break;
      }
      i.push(s), s = s.toLowerCase(), this._disabledNavigationEmojiValues.push(this.navigationEmojis[s]), 
      this.navigationEmojis[s] = null;
    }
    if (e.length) throw new TypeError(`Cannot invoke PaginationEmbed class with invalid navigation emoji(s): ${e.join(", ")}.`);
    return this.disabledNavigationEmojis = i, this;
  }
  setEmojisFunctionAfterNavigation(t) {
    if ("boolean" != typeof t) throw new TypeError("setEmojisFunctionAfterNavigation() only accepts boolean type.");
    return this.emojisFunctionAfterNavigation = t, this;
  }
  setFunctionEmojis(t) {
    for (const e of Object.keys(t)) {
      const i = t[e];
      this.addFunctionEmoji(e, i);
    }
    return this;
  }
  setNavigationEmojis(t) {
    return Object.assign(this.navigationEmojis, t), this;
  }
  setPage(t) {
    const e = "string" == typeof t;
    if (isNaN(t) && !e) throw new TypeError("setPage() only accepts number/string type.");
    const i = "back" === t ? 1 === this.page ? this.page : this.page - 1 : this.page === this.pages ? this.pages : this.page + 1;
    return this.page = e ? i : t, this;
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
      const e = t.permissionsFor(t.client.user).missing([ "ADD_REACTIONS", "MANAGE_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "SEND_MESSAGES" ]);
      if (e.length) throw new Error(`Cannot invoke PaginationEmbed class without required permissions: ${e.join(", ")}`);
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
    return this.setPage(t), this.listenerCount("pageUpdate") && this.emit("pageUpdate"), 
    await this._loadList(!1), this._awaitResponse();
  }
  async _awaitResponse() {
    const t = Object.values(this.navigationEmojis), e = (e, i) => {
      const s = !!this._enabled("ALL") && (!this._disabledNavigationEmojiValues.length || this._disabledNavigationEmojiValues.some(t => ![ e.emoji.name, e.emoji.id ].includes(t))) && (t.includes(e.emoji.name) || t.includes(e.emoji.id)) || e.emoji.name in this.functionEmojis || e.emoji.id in this.functionEmojis;
      return this.authorizedUsers.length ? this.authorizedUsers.includes(i.id) && s : !i.bot && s;
    }, i = this.clientAssets.message;
    try {
      const t = (await i.awaitReactions(e, {
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), s = t.users.cache.last(), a = [ t.emoji.name, t.emoji.id ];
      switch (this.listenerCount("react") && this.emit("react", s, t.emoji), i.guild && await t.users.remove(s), 
      a[0] || a[1]) {
       case this.navigationEmojis.back:
        return 1 === this.page ? this._awaitResponse() : this._loadPage("back");

       case this.navigationEmojis.jump:
        return this.pages <= 2 ? this._awaitResponse() : this._awaitResponseEx(s);

       case this.navigationEmojis.forward:
        return this.page === this.pages ? this._awaitResponse() : this._loadPage("forward");

       case this.navigationEmojis.delete:
        return await i.delete(), void (this.listenerCount("finish") && this.emit("finish", s));

       default:
        const e = this.functionEmojis[a[0]] || this.functionEmojis[a[1]];
        try {
          await e(s, this);
        } catch (t) {
          return this._cleanUp(t, i, !1, s);
        }
        return this._loadPage(this.page);
      }
    } catch (t) {
      return this._cleanUp(t, i);
    }
  }
  async _cleanUp(t, e, i = !0, s) {
    if (this.deleteOnTimeout && e.deletable && (await e.delete(), e.deleted = !0), e.guild && !e.deleted && await e.reactions.removeAll(), 
    t instanceof Error) return void (this.listenerCount("error") && this.emit("error", t));
    const a = i ? "expire" : "finish";
    this.listenerCount(a) && this.emit(a, s);
  }
  async _awaitResponseEx(t) {
    const i = [ "0", "cancel" ], s = e => {
      const s = parseInt(e.content);
      return e.author.id === t.id && (!isNaN(Number(e.content)) && s !== this.page && s >= 1 && s <= this.pages || i.includes(e.content.toLowerCase()));
    }, a = this.clientAssets.message.channel, n = await a.send(this.clientAssets.prompt.replace(/\{\{user\}\}/g, t.toString()));
    try {
      const t = (await a.awaitMessages(s, {
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), o = t.content;
      return this.clientAssets.message.deleted ? void (this.listenerCount("error") && this.emit("error", new Error(e))) : (await n.delete(), 
      t.deletable && await t.delete(), i.includes(o) ? this._awaitResponse() : this._loadPage(parseInt(o)));
    } catch (t) {
      if (n.deletable && await n.delete(), t instanceof Error) return void (this.listenerCount("error") && this.emit("error", t));
      this.listenerCount("expire") && this.emit("expire");
    }
  }
};