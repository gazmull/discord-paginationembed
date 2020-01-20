"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const r = require("discord.js"), t = require("./base");

exports.Embeds = class extends t.PaginationEmbed {
  get currentEmbed() {
    return this.array[this.page - 1];
  }
  addBlankField(r = !1) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.addBlankField(r);
    return this;
  }
  addField(r, t, s = !1) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r && !t) return this;
    for (const e of this.array) e.addField(r, t, s);
    return this;
  }
  attachFiles(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const t of this.array) t.attachFiles(r);
    return this;
  }
  async build() {
    return this.pages = this.array.length, await this._verify(), this.listenerCount("start") && this.emit("start"), 
    this._loadList();
  }
  setArray(t) {
    if (!Array.isArray(t) || !Boolean(t.length)) throw new TypeError("Cannot invoke Embeds class without a valid array to paginate.");
    for (let s = 0; s < t.length; s++) if (!(t[s] instanceof r.MessageEmbed)) throw new TypeError(`(MessageEmbeds[${s}]) Cannot invoke Embeds class with an invalid MessageEmbed instance.`);
    return this.array = t, this;
  }
  setAuthor(r, t, s) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const e of this.array) e.setAuthor(r, t, s);
    return this;
  }
  setColor(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const t of this.array) t.setColor(r);
    return this;
  }
  setDescription(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const t of this.array) t.setDescription(r);
    return this;
  }
  setFooter(r, t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const s of this.array) s.setFooter(r, t);
    return this;
  }
  setImage(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const t of this.array) t.setImage(r);
    return this;
  }
  setThumbnail(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const t of this.array) t.setThumbnail(r);
    return this;
  }
  setTimestamp(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.setTimestamp(r);
    return this;
  }
  setTitle(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const t of this.array) t.setTitle(r);
    return this;
  }
  setURL(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    if (!r) return this;
    for (const t of this.array) t.setURL(r);
    return this;
  }
  spliceField(r, t, s, e, i) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const a of this.array) a.spliceField(r, t, s, e, i);
    return this;
  }
  async _loadList(r = !0) {
    const t = this.pageIndicator ? 1 === this.pages ? void 0 : `Page ${this.page} of ${this.pages}` : void 0;
    return this.clientAssets.message ? await this.clientAssets.message.edit(t, {
      embed: this.currentEmbed
    }) : this.clientAssets.message = await this.channel.send(t, {
      embed: this.currentEmbed
    }), super._loadList(r);
  }
};