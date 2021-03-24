"use strict";

var e = this && this.__createBinding || (Object.create ? function(e, r, t, i) {
  void 0 === i && (i = t), Object.defineProperty(e, i, {
    enumerable: !0,
    get: function() {
      return r[t];
    }
  });
} : function(e, r, t, i) {
  void 0 === i && (i = t), e[i] = r[t];
}), r = this && this.__exportStar || function(r, t) {
  for (var i in r) "default" === i || Object.prototype.hasOwnProperty.call(t, i) || e(t, r, i);
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.version = void 0, r(require("./Embeds"), exports), r(require("./FieldsEmbed"), exports), 
r(require("./base"), exports), exports.version = require("../package.json").version;