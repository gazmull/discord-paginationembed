"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Embeds = void 0;

const t = require("discord.js"), r = require("./base");

class s extends r.PaginationEmbed {
  get currentEmbed() {
    return this.array[this.page - 1];
  }
  get pages() {
    return this.array.length;
  }
  addField(t, r, s = !1) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const e of this.array) e.addField(t, r, s);
    return this;
  }
  addFields(...t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.addFields(...t);
    return this;
  }
  async build() {
    return await this._verify(), this._loadList();
  }
  setArray(r) {
    if (!(Array.isArray(r) && Boolean(r.length))) throw new TypeError("Cannot invoke Embeds class without a valid array to paginate.");
    for (const [s, e] of r.entries()) {
      if (!Boolean(e) || e.constructor !== Object || !Object.keys(e).length) {
        if (e instanceof t.MessageEmbed) continue;
        throw new TypeError(`(MessageEmbeds[${s}]) Cannot invoke Embeds class with an invalid MessageEmbed instance.`);
      }
      r[s] = new t.MessageEmbed(e);
    }
    return this.array = r, this;
  }
  setAuthor(t, r, s) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const e of this.array) e.setAuthor(t, r, s);
    return this;
  }
  setColor(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setColor(t);
    return this;
  }
  setDescription(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setDescription(t);
    return this;
  }
  setFooter(t, r) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const s of this.array) s.setFooter(t, r);
    return this;
  }
  setImage(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setImage(t);
    return this;
  }
  setThumbnail(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setThumbnail(t);
    return this;
  }
  setTimestamp(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setTimestamp(t);
    return this;
  }
  setTitle(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setTitle(t);
    return this;
  }
  setURL(t) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const r of this.array) r.setURL(t);
    return this;
  }
  spliceFields(t, r, s, e, i) {
    if (!this.array) throw new TypeError("this.array must be set first.");
    for (const a of this.array) a.spliceFields(t, r, [ {
      name: s,
      value: e,
      inline: i
    } ]);
    return this;
  }
  toJSON() {
    if (!this.array) throw new TypeError("this.array must be set first.");
    return this.array.map((t => t.toJSON()));
  }
  async _loadList(r = !0) {
    this.listenerCount("pageUpdate") && this.emit("pageUpdate");
    const s = new t.MessageEmbed(this.currentEmbed), e = "footer" === this.usePageIndicator, i = this.usePageIndicator && !e ? 1 === this.pages ? "" : this.pageIndicator : "", {separator: a, text: o} = this.content, n = {
      embeds: [ s ],
      content: `${o ? `${o}${a}` : ""}${i}` || null
    };
    return e && s.setFooter(this.pageIndicator, s.footer.iconURL), this.clientAssets.message ? await this.clientAssets.message.edit(n) : this.clientAssets.message = await this.channel.send(n), 
    super._loadList(r);
  }
}

exports.Embeds = s;