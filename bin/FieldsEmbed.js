"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("discord.js"), t = require("./base");

exports.FieldsEmbed = class extends t.PaginationEmbed {
  constructor() {
    super(), this.elementsPerPage = 10, this.embed = new e.MessageEmbed();
  }
  get elementList() {
    const e = (this.page - 1) * this.elementsPerPage, t = e + this.elementsPerPage;
    return this.array.slice(e, t);
  }
  async build() {
    this.pages = Math.ceil(this.array.length / this.elementsPerPage), await this._verify();
    const e = this.embed.fields;
    this.embed.fields = [];
    for (const t of e) "function" == typeof t.value ? this.formatField(t.name, t.value, t.inline) : this.embed.addField(t.name, t.value, t.inline);
    if (!this.embed.fields.filter(e => "function" == typeof e.value).length) throw new Error("Cannot invoke FieldsEmbed class without at least one formatted field to paginate.");
    return this._loadList();
  }
  formatField(e, t, s = !0) {
    if ("function" != typeof t) throw new TypeError("formatField() value parameter only takes a function.");
    return this.embed.fields.push({
      name: e,
      value: t,
      inline: s
    }), this;
  }
  setElementsPerPage(e) {
    if ("number" != typeof e) throw new TypeError("setElementsPerPage() only accepts number type.");
    return this.elementsPerPage = e, this;
  }
  async _drawList() {
    const t = new e.MessageEmbed(this.embed);
    t.fields = [];
    for (const e of this.embed.fields) t.addField(e.name, "function" == typeof e.value ? this.elementList.map(e.value).join("\n") : e.value, e.inline);
    return t;
  }
  async _loadList(e = !0) {
    this.listenerCount("pageUpdate") && this.emit("pageUpdate");
    const t = await this._drawList(), s = "footer" === this.usePageIndicator, i = this.usePageIndicator && !s ? 1 === this.pages ? void 0 : this.pageIndicator : void 0;
    return s && t.setFooter(this.pageIndicator, t.footer.iconURL), this.clientAssets.message ? await this.clientAssets.message.edit(i, {
      embed: t
    }) : this.clientAssets.message = await this.channel.send(i, {
      embed: t
    }), super._loadList(e);
  }
};