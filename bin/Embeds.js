"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const r = require("discord.js"), t = require("./base");

exports.Embeds = class extends t.PaginationEmbed {
  get currentEmbed() {
    return this.array[this.page - 1];
  }
  addField(r, t, s = !1) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const e of this.array) e.addField(r, t, s);
    return this;
  }
  addFields(...r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.addFields(...r);
  }
  attachFiles(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.attachFiles(r);
    return this;
  }
  async build() {
    return this.pages = this.array.length, await this._verify(), this._loadList();
  }
  setArray(t) {
    if (!Array.isArray(t) || !Boolean(t.length)) throw new TypeError("Cannot invoke Embeds class without a valid array to paginate.");
    for (const [s, e] of t.entries()) {
      if (!Boolean(e) || e.constructor !== Object || !Object.keys(e).length) {
        if (e instanceof r.MessageEmbed) continue;
        throw new TypeError(`(MessageEmbeds[${s}]) Cannot invoke Embeds class with an invalid MessageEmbed instance.`);
      }
      t[s] = new r.MessageEmbed(e);
    }
    return this.array = t, this;
  }
  setAuthor(r, t, s) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const e of this.array) e.setAuthor(r, t, s);
    return this;
  }
  setColor(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.setColor(r);
    return this;
  }
  setDescription(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.setDescription(r);
    return this;
  }
  setFooter(r, t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const s of this.array) s.setFooter(r, t);
    return this;
  }
  setImage(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.setImage(r);
    return this;
  }
  setThumbnail(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
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
    for (const t of this.array) t.setTitle(r);
    return this;
  }
  setURL(r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const t of this.array) t.setURL(r);
    return this;
  }
  spliceFields(r, t, s, e, i) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const a of this.array) a.spliceFields(r, t, s, e, i);
    return this;
  }
  toJSON() {
    if (!this.array) throw new TypeError("this.array must be set first.");
    return this.array.map(r => r.toJSON());
  }
  async _loadList(t = !0) {
    this.listenerCount("pageUpdate") && this.emit("pageUpdate");
    const s = new r.MessageEmbed(this.currentEmbed), e = "footer" === this.usePageIndicator, i = this.usePageIndicator && !e ? 1 === this.pages ? void 0 : this.pageIndicator : void 0;
    return e && s.setFooter(this.pageIndicator, s.footer.iconURL), this.clientAssets.message ? await this.clientAssets.message.edit(i, {
      embed: s
    }) : this.clientAssets.message = await this.channel.send(i, {
      embed: s
    }), super._loadList(t);
  }
};