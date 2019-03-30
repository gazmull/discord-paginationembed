"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("events"), t = "Client's message was deleted before being processed.";

exports.PaginationEmbed = class extends e.EventEmitter {
  constructor() {
    super(), this.authorizedUsers = [], this.channel = null, this.clientAssets = {}, 
    this.pageIndicator = !0, this.deleteOnTimeout = !1, this.page = 1, this.timeout = 3e4, 
    this.navigationEmojis = {
      back: "◀",
      jump: "↗",
      forward: "▶",
      delete: "🗑"
    }, this.functionEmojis = {}, this.disabledNavigationEmojis = [], this.pages = null, 
    this._disabledNavigationEmojiValues = [], this._defaultNavigationEmojis = {
      back: "◀",
      jump: "↗",
      forward: "▶",
      delete: "🗑"
    };
  }
  build() {
    throw new Error("Cannot invoke this class. Invoke with [PaginationEmbed.Embeds] or [PaginationEmbed.FieldsEmbed] instead.");
  }
  addFunctionEmoji(e, t) {
    if (!(t instanceof Function)) throw new TypeError(`Callback for ${e} must be a function type.`);
    return Object.assign(this.functionEmojis, {
      [e]: t
    }), this;
  }
  deleteFunctionEmoji(e) {
    if (!(e in this.functionEmojis)) throw new Error(`${e} function emoji does not exist.`);
    return delete this.functionEmojis[e], this;
  }
  resetEmojis() {
    for (const e in this.functionEmojis) delete this.functionEmojis[e];
    return this.navigationEmojis = this._defaultNavigationEmojis, this;
  }
  setArray(e) {
    if (!Array.isArray(e) || !Boolean(e.length)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array to paginate.");
    return this.array = e, this;
  }
  setAuthorizedUsers(e) {
    if (!Array.isArray(e)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array.");
    return this.authorizedUsers = e, this;
  }
  setChannel(e) {
    return this.channel = e, this;
  }
  setClientAssets(e) {
    if (!e) throw new TypeError("Cannot accept assets options as a non-object type.");
    const {message: t} = e;
    let {prepare: i, prompt: s} = e;
    return i || (i = "Preparing..."), s || (s = "{{user}}, To what page would you like to jump? Say `cancel` or `0` to cancel the prompt."), 
    Object.assign(this.clientAssets, {
      message: t,
      prepare: i,
      prompt: s
    }), this;
  }
  setDisabledNavigationEmojis(e) {
    if (!Array.isArray(e)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array.");
    const t = [], i = [];
    for (let s of e) {
      if (s = "string" == typeof s ? s.toUpperCase() : s, [ "BACK", "JUMP", "FORWARD", "DELETE", "ALL" ].includes(s) || t.push(s), 
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
    if (t.length) throw new TypeError(`Cannot invoke PaginationEmbed class with invalid navigation emoji(s): ${t.join(", ")}.`);
    return this.disabledNavigationEmojis = i, this;
  }
  setFunctionEmojis(e) {
    for (const t in e) {
      if (!t) continue;
      const i = e[t];
      this.addFunctionEmoji(t, i);
    }
    return this;
  }
  setNavigationEmojis(e) {
    return Object.assign(this.navigationEmojis, e), this;
  }
  setPage(e) {
    const t = "string" == typeof e;
    if (isNaN(e) && !t) throw new TypeError("setPage() only accepts number/string type.");
    const i = "back" === e ? 1 === this.page ? this.page : this.page - 1 : this.page === this.pages ? this.pages : this.page + 1;
    return this.page = t ? i : e, this;
  }
  setTimeout(e) {
    if ("number" != typeof e) throw new TypeError("setTimeout() only accepts number type.");
    return this.timeout = e, this;
  }
  setPageIndicator(e) {
    if ("boolean" != typeof e) throw new TypeError("setPageIndicator() only accepts boolean type.");
    return this.pageIndicator = e, this;
  }
  setDeleteOnTimeout(e) {
    if ("boolean" != typeof e) throw new TypeError("deleteOnTimeout() only accepts boolean type.");
    return this.deleteOnTimeout = e, this;
  }
  async _verify() {
    if (this.setClientAssets(this.clientAssets), !this.clientAssets.message && !this.channel) throw new Error("Cannot invoke PaginationEmbed class without either a message object or a channel object set.");
    if (!(this.page >= 1 && this.page <= this.pages)) throw new Error(`Page number is out of bounds. Max pages: ${this.pages}`);
    const e = this.clientAssets.message ? await this.clientAssets.message.edit(this.clientAssets.prepare) : await this.channel.send(this.clientAssets.prepare);
    if (this.clientAssets.message = e, this.setClientAssets(this.clientAssets), e.guild) {
      const t = e.channel.permissionsFor(e.client.user).missing([ "ADD_REACTIONS", "MANAGE_MESSAGES", "EMBED_LINKS" ]);
      if (t.length) throw new Error(`Cannot invoke PaginationEmbed class without required permissions: ${t.join(", ")}`);
    }
    return !0;
  }
  _enabled(e) {
    return !this.disabledNavigationEmojis.includes("ALL") && !this.disabledNavigationEmojis.includes(e);
  }
  async _drawNavigation() {
    if (Object.keys(this.functionEmojis).length) for (const e in this.functionEmojis) await this.clientAssets.message.react(e);
    return this._enabled("BACK") && this.pages > 1 && await this.clientAssets.message.react(this.navigationEmojis.back), 
    this._enabled("JUMP") && this.pages > 2 && await this.clientAssets.message.react(this.navigationEmojis.jump), 
    this._enabled("FORWARD") && this.pages > 1 && await this.clientAssets.message.react(this.navigationEmojis.forward), 
    this._enabled("DELETE") && await this.clientAssets.message.react(this.navigationEmojis.delete), 
    this._awaitResponse();
  }
  _loadList(e = !0) {
    if (e) return this._drawNavigation();
  }
  async _loadPage(e = 1) {
    return this.setPage(e), await this._loadList(!1), this._awaitResponse();
  }
  async _awaitResponse() {
    const e = Object.values(this.navigationEmojis), t = (t, i) => {
      const s = !!this._enabled("ALL") && (!this._disabledNavigationEmojiValues.length || this._disabledNavigationEmojiValues.some(e => ![ t.emoji.name, t.emoji.id ].includes(e))) && (e.includes(t.emoji.name) || e.includes(t.emoji.id)) || t.emoji.name in this.functionEmojis || t.emoji.id in this.functionEmojis;
      return this.authorizedUsers.length ? this.authorizedUsers.includes(i.id) && s : !i.bot && s;
    }, i = this.clientAssets.message;
    try {
      const e = (await i.awaitReactions(t, {
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), s = e.users.last(), a = [ e.emoji.name, e.emoji.id ];
      switch (this.emit("react", s, e.emoji), i.guild && await e.users.remove(s), a[0] || a[1]) {
       case this.navigationEmojis.back:
        return 1 === this.page ? this._awaitResponse() : this._loadPage("back");

       case this.navigationEmojis.jump:
        return this.pages <= 2 ? this._awaitResponse() : this._awaitResponseEx(s);

       case this.navigationEmojis.forward:
        return this.page === this.pages ? this._awaitResponse() : this._loadPage("forward");

       case this.navigationEmojis.delete:
        return this.emit("finish", s), i.delete();

       default:
        const t = this.functionEmojis[a[0]] || this.functionEmojis[a[1]];
        return await t(s, this), this._loadPage(this.page);
      }
    } catch (e) {
      return i.guild && !i.deleted && await i.reactions.removeAll(), this.deleteOnTimeout && i.deletable && await i.delete(), 
      e instanceof Error ? this.emit("error", e) : (this.emit("expire"), !0);
    }
  }
  async _awaitResponseEx(e) {
    const i = [ "0", "cancel" ], s = t => {
      const s = parseInt(t.content);
      return t.author.id === e.id && (!isNaN(Number(t.content)) && s !== this.page && s >= 1 && s <= this.pages || i.includes(t.content.toLowerCase()));
    }, a = this.clientAssets.message.channel, n = await a.send(this.clientAssets.prompt.replace(/\{\{user\}\}/g, e.toString()));
    try {
      const e = (await a.awaitMessages(s, {
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), o = e.content;
      return this.clientAssets.message.deleted ? this.emit("error", new Error(t)) : (await n.delete(), 
      e.deletable && await e.delete(), i.includes(o) ? this._awaitResponse() : this._loadPage(parseInt(o)));
    } catch (e) {
      return n.deletable && await n.delete(), e instanceof Error ? this.emit("error", e) : (this.emit("expire"), 
      !0);
    }
  }
};