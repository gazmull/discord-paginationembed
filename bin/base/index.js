"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PaginationEmbed = void 0;

const t = require("discord.js"), e = require("events");

class i extends e.EventEmitter {
  constructor() {
    super(), this.authorizedUsers = [], this.channel = null, this.clientAssets = {}, 
    this.content = {
      separator: "\n"
    }, this.usePageIndicator = !1, this.deleteOnTimeout = !1, this.page = 1, this.timeout = 3e4, 
    this.navigationEmojis = {
      back: "◀",
      jump: "↗",
      forward: "▶",
      delete: "🗑"
    }, this.functionEmojis = {}, this.disabledNavigationEmojis = [], this.emojisFunctionAfterNavigation = !1, 
    this._disabledNavigationEmojiValues = [], this._defaultNavigationEmojis = {
      back: "◀",
      jump: "↗",
      forward: "▶",
      delete: "🗑"
    };
    const t = (t, e) => `${"○ ".repeat(t - 1)}● ${"○ ".repeat(e - t)}`.trim();
    this._defaultPageIndicators = {
      text: (t, e) => `Page ${t} of ${e}`,
      textcompact: (t, e) => `${t}/${e}`,
      circle: (e, i) => t(e, i),
      hybrid: (e, i) => `[${e}/${i}] ${t(e, i)}`
    }, this._pageIndicator = this._defaultPageIndicators.text;
  }
  get pageIndicator() {
    return this._pageIndicator(this.page, this.pages);
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
    if (!(Array.isArray(t) && Boolean(t.length))) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array to paginate.");
    return this.array = t, this;
  }
  setAuthorizedUsers(t) {
    if (!Array.isArray(t) && "string" != typeof t) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array.");
    return this.authorizedUsers = Array.isArray(t) ? t : [ t ], this;
  }
  setChannel(t) {
    return this.channel = t, this;
  }
  setClientAssets(t) {
    const e = typeof t;
    if ("object" !== e || null === e) throw new TypeError("setClientAssets() only accepts object type.");
    let {prompt: i} = t;
    return i || (i = "{{user}}, To what page would you like to jump? Say `cancel` or `0` to cancel the prompt."), 
    Object.assign(this.clientAssets, Object.assign(Object.assign({}, t), {
      prompt: i
    })), this;
  }
  setDisabledNavigationEmojis(t) {
    if (!Array.isArray(t)) throw new TypeError("Cannot invoke PaginationEmbed class without a valid array.");
    const e = [], i = [];
    for (const s of t) {
      [ "back", "jump", "forward", "delete", "all" ].includes(s) ? i.push(s) : e.push(s);
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
  setPageIndicator(t, e) {
    if ("boolean" != typeof t && ("string" != typeof t || "footer" !== t)) throw new TypeError("setPageIndicator()'s `enabled` parameter only accepts boolean/string type.");
    if (this.usePageIndicator = t, e) {
      const t = [ "text", "textcompact", "circle", "hybrid" ];
      if ("string" == typeof e && t.includes(e)) this._pageIndicator = this._defaultPageIndicators[e]; else {
        if ("function" != typeof e) throw new TypeError("setPageIndicator()'s `fn` parameter only accepts function/string type.");
        this._pageIndicator = e;
      }
    }
    return this;
  }
  setDeleteOnTimeout(t) {
    if ("boolean" != typeof t) throw new TypeError("deleteOnTimeout() only accepts boolean type.");
    return this.deleteOnTimeout = t, this;
  }
  setContent(t, e = "\n") {
    if ("string" != typeof e) throw new TypeError("setContent()'s `separator` parameter only accepts string type.");
    return Object.assign(this.content, {
      text: t,
      separator: e
    }), this;
  }
  async _verify() {
    if (this.setClientAssets(this.clientAssets), !this.channel) throw new Error("Cannot invoke PaginationEmbed class without a channel object set.");
    if (!(this.page >= 1 && this.page <= this.pages)) throw new RangeError(`Page number is out of bounds. Max pages: ${this.pages}`);
    return this._checkPermissions();
  }
  async _checkPermissions() {
    const e = this.channel;
    if (e.guild) {
      const i = e.permissionsFor(e.client.user).missing([ t.Permissions.FLAGS.ADD_REACTIONS, t.Permissions.FLAGS.EMBED_LINKS, t.Permissions.FLAGS.VIEW_CHANNEL, t.Permissions.FLAGS.READ_MESSAGE_HISTORY, t.Permissions.FLAGS.SEND_MESSAGES ]);
      if (i.length) throw new Error(`Cannot invoke PaginationEmbed class without required permissions: ${i.join(", ")}`);
    }
    return !0;
  }
  _enabled(t) {
    return !this.disabledNavigationEmojis.includes("all") && !this.disabledNavigationEmojis.includes(t);
  }
  async _drawEmojis() {
    return this.emojisFunctionAfterNavigation ? (await this._drawNavigationEmojis(), 
    await this._drawFunctionEmojis()) : (await this._drawFunctionEmojis(), await this._drawNavigationEmojis()), 
    this._emit("start"), this._awaitResponse();
  }
  async _drawFunctionEmojis() {
    if (Object.keys(this.functionEmojis).length) for (const t of Object.keys(this.functionEmojis)) await this.clientAssets.message.react(t);
  }
  async _drawNavigationEmojis() {
    this._enabled("back") && this.pages > 1 && await this.clientAssets.message.react(this.navigationEmojis.back), 
    this._enabled("jump") && this.pages > 2 && await this.clientAssets.message.react(this.navigationEmojis.jump), 
    this._enabled("forward") && this.pages > 1 && await this.clientAssets.message.react(this.navigationEmojis.forward), 
    this._enabled("delete") && await this.clientAssets.message.react(this.navigationEmojis.delete);
  }
  _loadList(t = !0) {
    if (t) return this._drawEmojis();
  }
  async _loadPage(t = 1) {
    return this.setPage(t), await this._loadList(!1), this._awaitResponse();
  }
  async _awaitResponse() {
    const e = Object.values(this.navigationEmojis), i = this.clientAssets.message.channel, s = (t, i) => {
      const s = !!this._enabled("all") && (!this._disabledNavigationEmojiValues.length || this._disabledNavigationEmojiValues.some((e => ![ t.emoji.name, t.emoji.id ].includes(e)))) && (e.includes(t.emoji.name) || e.includes(t.emoji.id)) || t.emoji.name in this.functionEmojis || t.emoji.id in this.functionEmojis;
      return this.authorizedUsers.length ? this.authorizedUsers.includes(i.id) && s : !i.bot && s;
    }, a = this.clientAssets.message;
    try {
      const e = (await a.awaitReactions({
        filter: s,
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), n = e.users.cache.last(), o = [ e.emoji.name, e.emoji.id ];
      if (this._emit("react", n, e.emoji), a.guild) {
        i.permissionsFor(i.client.user).missing(t.Permissions.FLAGS.MANAGE_MESSAGES).length || await e.users.remove(n);
      }
      switch (o[0] || o[1]) {
       case this.navigationEmojis.back:
        return 1 === this.page ? this._awaitResponse() : this._loadPage("back");

       case this.navigationEmojis.jump:
        return this.pages <= 2 ? this._awaitResponse() : this._awaitResponseEx(n);

       case this.navigationEmojis.forward:
        return this.page === this.pages ? this._awaitResponse() : this._loadPage("forward");

       case this.navigationEmojis.delete:
        return await a.delete(), void this._emit("finish", n);

       default:
        {
          const t = this.functionEmojis[o[0]] || this.functionEmojis[o[1]];
          try {
            await t(n, this);
          } catch (t) {
            return this._cleanUp(t, a, !1, n);
          }
          return this._loadPage(this.page);
        }
      }
    } catch (t) {
      return this._cleanUp(t, a);
    }
  }
  async _cleanUp(e, i, s = !0, a) {
    const n = this.clientAssets.message.channel;
    if (this.deleteOnTimeout && i.deletable && (await i.delete(), i.deleted = !0), i.guild && !i.deleted) {
      n.permissionsFor(n.client.user).missing(t.Permissions.FLAGS.MANAGE_MESSAGES).length || await i.reactions.removeAll();
    }
    if (e instanceof Error) return void this._emit("error", e);
    const o = s ? "expire" : "finish";
    this._emit(o, a);
  }
  async _awaitResponseEx(t) {
    const e = [ "0", "cancel" ], i = i => {
      const s = parseInt(i.content);
      return i.author.id === t.id && (!isNaN(Number(i.content)) && s !== this.page && s >= 1 && s <= this.pages || e.includes(i.content.toLowerCase()));
    }, s = this.clientAssets.message, a = s.channel, n = this.clientAssets.prompt.replace(/\{\{user\}\}/g, t.toString()), o = await a.send({
      content: n,
      reply: {
        messageReference: s,
        failIfNotExists: !1
      }
    });
    try {
      const t = (await a.awaitMessages({
        filter: i,
        max: 1,
        time: this.timeout,
        errors: [ "time" ]
      })).first(), s = t.content;
      return this.clientAssets.message.deleted || await o.delete(), t.deletable && await t.delete(), 
      e.includes(s) ? this._awaitResponse() : this._loadPage(parseInt(s));
    } catch (t) {
      if (o.deletable && await o.delete(), t instanceof Error) return void this._emit("error", t);
      this._emit("expire");
    }
  }
  _emit(t, ...e) {
    if (this.listenerCount(t)) return this.emit(t, ...e, this);
  }
}

exports.PaginationEmbed = i;