import {
  __commonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/pure-color/parse/hex.js
var require_hex = __commonJS({
  "node_modules/pure-color/parse/hex.js"(exports, module) {
    function expand(hex2) {
      var result = "#";
      for (var i = 1; i < hex2.length; i++) {
        var val = hex2.charAt(i);
        result += val + val;
      }
      return result;
    }
    function hex(hex2) {
      if (hex2.length === 4 || hex2.length === 5) {
        hex2 = expand(hex2);
      }
      var rgb = [
        parseInt(hex2.substring(1, 3), 16),
        parseInt(hex2.substring(3, 5), 16),
        parseInt(hex2.substring(5, 7), 16)
      ];
      if (hex2.length === 9) {
        var alpha = parseFloat((parseInt(hex2.substring(7, 9), 16) / 255).toFixed(2));
        rgb.push(alpha);
      }
      return rgb;
    }
    module.exports = hex;
  }
});

// node_modules/pure-color/convert/rgb2hsv.js
var require_rgb2hsv = __commonJS({
  "node_modules/pure-color/convert/rgb2hsv.js"(exports, module) {
    function rgb2hsv(rgb) {
      var r = rgb[0], g = rgb[1], b = rgb[2], min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, v;
      if (max == 0)
        s = 0;
      else
        s = delta / max * 1e3 / 10;
      if (max == min)
        h = 0;
      else if (r == max)
        h = (g - b) / delta;
      else if (g == max)
        h = 2 + (b - r) / delta;
      else if (b == max)
        h = 4 + (r - g) / delta;
      h = Math.min(h * 60, 360);
      if (h < 0)
        h += 360;
      v = max / 255 * 1e3 / 10;
      return [h, s, v];
    }
    module.exports = rgb2hsv;
  }
});

// node_modules/pure-color/util/clamp.js
var require_clamp = __commonJS({
  "node_modules/pure-color/util/clamp.js"(exports, module) {
    function clamp(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }
    module.exports = clamp;
  }
});

// node_modules/pure-color/convert/rgb2hex.js
var require_rgb2hex = __commonJS({
  "node_modules/pure-color/convert/rgb2hex.js"(exports, module) {
    var clamp = require_clamp();
    function componentToHex(c) {
      var value = Math.round(clamp(c, 0, 255));
      var hex = value.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    function rgb2hex(rgb) {
      var alpha = rgb.length === 4 ? componentToHex(rgb[3] * 255) : "";
      return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]) + alpha;
    }
    module.exports = rgb2hex;
  }
});

// node_modules/pure-color/convert/hsv2rgb.js
var require_hsv2rgb = __commonJS({
  "node_modules/pure-color/convert/hsv2rgb.js"(exports, module) {
    function hsv2rgb(hsv) {
      var h = hsv[0] / 60, s = hsv[1] / 100, v = hsv[2] / 100, hi = Math.floor(h) % 6;
      var f = h - Math.floor(h), p = 255 * v * (1 - s), q = 255 * v * (1 - s * f), t = 255 * v * (1 - s * (1 - f)), v = 255 * v;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    }
    module.exports = hsv2rgb;
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module) {
    module.exports = function(obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
    };
    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
    }
  }
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports, module) {
    var isBuffer = require_is_buffer();
    var toString = Object.prototype.toString;
    module.exports = function kindOf(val) {
      if (typeof val === "undefined") {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      if (val === true || val === false || val instanceof Boolean) {
        return "boolean";
      }
      if (typeof val === "string" || val instanceof String) {
        return "string";
      }
      if (typeof val === "number" || val instanceof Number) {
        return "number";
      }
      if (typeof val === "function" || val instanceof Function) {
        return "function";
      }
      if (typeof Array.isArray !== "undefined" && Array.isArray(val)) {
        return "array";
      }
      if (val instanceof RegExp) {
        return "regexp";
      }
      if (val instanceof Date) {
        return "date";
      }
      var type = toString.call(val);
      if (type === "[object RegExp]") {
        return "regexp";
      }
      if (type === "[object Date]") {
        return "date";
      }
      if (type === "[object Arguments]") {
        return "arguments";
      }
      if (type === "[object Error]") {
        return "error";
      }
      if (isBuffer(val)) {
        return "buffer";
      }
      if (type === "[object Set]") {
        return "set";
      }
      if (type === "[object WeakSet]") {
        return "weakset";
      }
      if (type === "[object Map]") {
        return "map";
      }
      if (type === "[object WeakMap]") {
        return "weakmap";
      }
      if (type === "[object Symbol]") {
        return "symbol";
      }
      if (type === "[object Int8Array]") {
        return "int8array";
      }
      if (type === "[object Uint8Array]") {
        return "uint8array";
      }
      if (type === "[object Uint8ClampedArray]") {
        return "uint8clampedarray";
      }
      if (type === "[object Int16Array]") {
        return "int16array";
      }
      if (type === "[object Uint16Array]") {
        return "uint16array";
      }
      if (type === "[object Int32Array]") {
        return "int32array";
      }
      if (type === "[object Uint32Array]") {
        return "uint32array";
      }
      if (type === "[object Float32Array]") {
        return "float32array";
      }
      if (type === "[object Float64Array]") {
        return "float64array";
      }
      return "object";
    };
  }
});

// node_modules/rename-keys/index.js
var require_rename_keys = __commonJS({
  "node_modules/rename-keys/index.js"(exports, module) {
    (function() {
      "use strict";
      function rename2(obj, fn) {
        if (typeof fn !== "function") {
          return obj;
        }
        var res = {};
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[fn(key, obj[key]) || key] = obj[key];
          }
        }
        return res;
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = rename2;
      } else {
        if (typeof define === "function" && define.amd) {
          define([], function() {
            return rename2;
          });
        } else {
          window.rename = rename2;
        }
      }
    })();
  }
});

// node_modules/deep-rename-keys/index.js
var require_deep_rename_keys = __commonJS({
  "node_modules/deep-rename-keys/index.js"(exports, module) {
    "use strict";
    var typeOf = require_kind_of();
    var rename2 = require_rename_keys();
    module.exports = function renameDeep(obj, cb) {
      var type = typeOf(obj);
      if (type !== "object" && type !== "array") {
        throw new Error("expected an object");
      }
      var res = [];
      if (type === "object") {
        obj = rename2(obj, cb);
        res = {};
      }
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var val = obj[key];
          if (typeOf(val) === "object" || typeOf(val) === "array") {
            res[key] = renameDeep(val, cb);
          } else {
            res[key] = val;
          }
        }
      }
      return res;
    };
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event, exists) {
      var evt = prefix ? prefix + event : event, available = this._events[evt];
      if (exists) return !!available;
      if (!available) return [];
      if (available.fn) return [available.fn];
      for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
        ee[i] = available[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      var listener = new EE(fn, context || this), evt = prefix ? prefix + event : event;
      if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
      else if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [this._events[evt], listener];
      return this;
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      var listener = new EE(fn, context || this, true), evt = prefix ? prefix + event : event;
      if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
      else if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [this._events[evt], listener];
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        if (--this._eventsCount === 0) this._events = new Events();
        else delete this._events[evt];
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          if (--this._eventsCount === 0) this._events = new Events();
          else delete this._events[evt];
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else if (--this._eventsCount === 0) this._events = new Events();
        else delete this._events[evt];
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) {
          if (--this._eventsCount === 0) this._events = new Events();
          else delete this._events[evt];
        }
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
      return this;
    };
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter;
    }
  }
});

// node_modules/xml-lexer/dist/lexer.js
var require_lexer = __commonJS({
  "node_modules/xml-lexer/dist/lexer.js"(exports, module) {
    "use strict";
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var EventEmitter = require_eventemitter3();
    var noop = function noop2() {
    };
    var State = {
      data: "state-data",
      cdata: "state-cdata",
      tagBegin: "state-tag-begin",
      tagName: "state-tag-name",
      tagEnd: "state-tag-end",
      attributeNameStart: "state-attribute-name-start",
      attributeName: "state-attribute-name",
      attributeNameEnd: "state-attribute-name-end",
      attributeValueBegin: "state-attribute-value-begin",
      attributeValue: "state-attribute-value"
    };
    var Action = {
      lt: "action-lt",
      gt: "action-gt",
      space: "action-space",
      equal: "action-equal",
      quote: "action-quote",
      slash: "action-slash",
      char: "action-char",
      error: "action-error"
    };
    var Type = {
      text: "text",
      openTag: "open-tag",
      closeTag: "close-tag",
      attributeName: "attribute-name",
      attributeValue: "attribute-value"
    };
    var charToAction = {
      " ": Action.space,
      "	": Action.space,
      "\n": Action.space,
      "\r": Action.space,
      "<": Action.lt,
      ">": Action.gt,
      '"': Action.quote,
      "'": Action.quote,
      "=": Action.equal,
      "/": Action.slash
    };
    var getAction = function getAction2(char) {
      return charToAction[char] || Action.char;
    };
    var create2 = function create3(options2) {
      var _State$data, _State$tagBegin, _State$tagName, _State$tagEnd, _State$attributeNameS, _State$attributeName, _State$attributeNameE, _State$attributeValue, _State$attributeValue2, _lexer$stateMachine;
      options2 = Object.assign({ debug: false }, options2);
      var lexer = new EventEmitter();
      var state = State.data;
      var data = "";
      var tagName = "";
      var attrName = "";
      var attrValue = "";
      var isClosing = "";
      var openingQuote = "";
      var emit = function emit2(type, value) {
        if (tagName[0] === "?" || tagName[0] === "!") {
          return;
        }
        var event = { type, value };
        if (options2.debug) {
          console.log("emit:", event);
        }
        lexer.emit("data", event);
      };
      lexer.stateMachine = (_lexer$stateMachine = {}, _defineProperty2(_lexer$stateMachine, State.data, (_State$data = {}, _defineProperty2(_State$data, Action.lt, function() {
        if (data.trim()) {
          emit(Type.text, data);
        }
        tagName = "";
        isClosing = false;
        state = State.tagBegin;
      }), _defineProperty2(_State$data, Action.char, function(char) {
        data += char;
      }), _State$data)), _defineProperty2(_lexer$stateMachine, State.cdata, _defineProperty2({}, Action.char, function(char) {
        data += char;
        if (data.substr(-3) === "]]>") {
          emit(Type.text, data.slice(0, -3));
          data = "";
          state = State.data;
        }
      })), _defineProperty2(_lexer$stateMachine, State.tagBegin, (_State$tagBegin = {}, _defineProperty2(_State$tagBegin, Action.space, noop), _defineProperty2(_State$tagBegin, Action.char, function(char) {
        tagName = char;
        state = State.tagName;
      }), _defineProperty2(_State$tagBegin, Action.slash, function() {
        tagName = "";
        isClosing = true;
      }), _State$tagBegin)), _defineProperty2(_lexer$stateMachine, State.tagName, (_State$tagName = {}, _defineProperty2(_State$tagName, Action.space, function() {
        if (isClosing) {
          state = State.tagEnd;
        } else {
          state = State.attributeNameStart;
          emit(Type.openTag, tagName);
        }
      }), _defineProperty2(_State$tagName, Action.gt, function() {
        if (isClosing) {
          emit(Type.closeTag, tagName);
        } else {
          emit(Type.openTag, tagName);
        }
        data = "";
        state = State.data;
      }), _defineProperty2(_State$tagName, Action.slash, function() {
        state = State.tagEnd;
        emit(Type.openTag, tagName);
      }), _defineProperty2(_State$tagName, Action.char, function(char) {
        tagName += char;
        if (tagName === "![CDATA[") {
          state = State.cdata;
          data = "";
          tagName = "";
        }
      }), _State$tagName)), _defineProperty2(_lexer$stateMachine, State.tagEnd, (_State$tagEnd = {}, _defineProperty2(_State$tagEnd, Action.gt, function() {
        emit(Type.closeTag, tagName);
        data = "";
        state = State.data;
      }), _defineProperty2(_State$tagEnd, Action.char, noop), _State$tagEnd)), _defineProperty2(_lexer$stateMachine, State.attributeNameStart, (_State$attributeNameS = {}, _defineProperty2(_State$attributeNameS, Action.char, function(char) {
        attrName = char;
        state = State.attributeName;
      }), _defineProperty2(_State$attributeNameS, Action.gt, function() {
        data = "";
        state = State.data;
      }), _defineProperty2(_State$attributeNameS, Action.space, noop), _defineProperty2(_State$attributeNameS, Action.slash, function() {
        isClosing = true;
        state = State.tagEnd;
      }), _State$attributeNameS)), _defineProperty2(_lexer$stateMachine, State.attributeName, (_State$attributeName = {}, _defineProperty2(_State$attributeName, Action.space, function() {
        state = State.attributeNameEnd;
      }), _defineProperty2(_State$attributeName, Action.equal, function() {
        emit(Type.attributeName, attrName);
        state = State.attributeValueBegin;
      }), _defineProperty2(_State$attributeName, Action.gt, function() {
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        data = "";
        state = State.data;
      }), _defineProperty2(_State$attributeName, Action.slash, function() {
        isClosing = true;
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        state = State.tagEnd;
      }), _defineProperty2(_State$attributeName, Action.char, function(char) {
        attrName += char;
      }), _State$attributeName)), _defineProperty2(_lexer$stateMachine, State.attributeNameEnd, (_State$attributeNameE = {}, _defineProperty2(_State$attributeNameE, Action.space, noop), _defineProperty2(_State$attributeNameE, Action.equal, function() {
        emit(Type.attributeName, attrName);
        state = State.attributeValueBegin;
      }), _defineProperty2(_State$attributeNameE, Action.gt, function() {
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        data = "";
        state = State.data;
      }), _defineProperty2(_State$attributeNameE, Action.char, function(char) {
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        attrName = char;
        state = State.attributeName;
      }), _State$attributeNameE)), _defineProperty2(_lexer$stateMachine, State.attributeValueBegin, (_State$attributeValue = {}, _defineProperty2(_State$attributeValue, Action.space, noop), _defineProperty2(_State$attributeValue, Action.quote, function(char) {
        openingQuote = char;
        attrValue = "";
        state = State.attributeValue;
      }), _defineProperty2(_State$attributeValue, Action.gt, function() {
        attrValue = "";
        emit(Type.attributeValue, attrValue);
        data = "";
        state = State.data;
      }), _defineProperty2(_State$attributeValue, Action.char, function(char) {
        openingQuote = "";
        attrValue = char;
        state = State.attributeValue;
      }), _State$attributeValue)), _defineProperty2(_lexer$stateMachine, State.attributeValue, (_State$attributeValue2 = {}, _defineProperty2(_State$attributeValue2, Action.space, function(char) {
        if (openingQuote) {
          attrValue += char;
        } else {
          emit(Type.attributeValue, attrValue);
          state = State.attributeNameStart;
        }
      }), _defineProperty2(_State$attributeValue2, Action.quote, function(char) {
        if (openingQuote === char) {
          emit(Type.attributeValue, attrValue);
          state = State.attributeNameStart;
        } else {
          attrValue += char;
        }
      }), _defineProperty2(_State$attributeValue2, Action.gt, function(char) {
        if (openingQuote) {
          attrValue += char;
        } else {
          emit(Type.attributeValue, attrValue);
          data = "";
          state = State.data;
        }
      }), _defineProperty2(_State$attributeValue2, Action.slash, function(char) {
        if (openingQuote) {
          attrValue += char;
        } else {
          emit(Type.attributeValue, attrValue);
          isClosing = true;
          state = State.tagEnd;
        }
      }), _defineProperty2(_State$attributeValue2, Action.char, function(char) {
        attrValue += char;
      }), _State$attributeValue2)), _lexer$stateMachine);
      var step = function step2(char) {
        if (options2.debug) {
          console.log(state, char);
        }
        var actions = lexer.stateMachine[state];
        var action = actions[getAction(char)] || actions[Action.error] || actions[Action.char];
        action(char);
      };
      lexer.write = function(str) {
        var len = str.length;
        for (var i = 0; i < len; i++) {
          step(str[i]);
        }
      };
      return lexer;
    };
    module.exports = {
      State,
      Action,
      Type,
      create: create2
    };
  }
});

// node_modules/xml-reader/dist/reader.js
var require_reader = __commonJS({
  "node_modules/xml-reader/dist/reader.js"(exports, module) {
    "use strict";
    var EventEmitter = require_eventemitter3();
    var Lexer = require_lexer();
    var Type = Lexer.Type;
    var NodeType = {
      element: "element",
      text: "text"
    };
    var createNode = function createNode2(params) {
      return Object.assign({
        name: "",
        type: NodeType.element,
        value: "",
        parent: null,
        attributes: {},
        children: []
      }, params);
    };
    var create2 = function create3(options2) {
      options2 = Object.assign({
        stream: false,
        parentNodes: true,
        doneEvent: "done",
        tagPrefix: "tag:",
        emitTopLevelOnly: false,
        debug: false
      }, options2);
      var lexer = void 0, rootNode = void 0, current = void 0, attrName = void 0;
      var reader = new EventEmitter();
      var handleLexerData = function handleLexerData2(data) {
        switch (data.type) {
          case Type.openTag:
            if (current === null) {
              current = rootNode;
              current.name = data.value;
            } else {
              var node = createNode({
                name: data.value,
                parent: current
              });
              current.children.push(node);
              current = node;
            }
            break;
          case Type.closeTag:
            var parent = current.parent;
            if (!options2.parentNodes) {
              current.parent = null;
            }
            if (current.name !== data.value) {
              break;
            }
            if (options2.stream && parent === rootNode) {
              rootNode.children = [];
              current.parent = null;
            }
            if (!options2.emitTopLevelOnly || parent === rootNode) {
              reader.emit(options2.tagPrefix + current.name, current);
              reader.emit("tag", current.name, current);
            }
            if (current === rootNode) {
              lexer.removeAllListeners("data");
              reader.emit(options2.doneEvent, current);
              rootNode = null;
            }
            current = parent;
            break;
          case Type.text:
            if (current) {
              current.children.push(createNode({
                type: NodeType.text,
                value: data.value,
                parent: options2.parentNodes ? current : null
              }));
            }
            break;
          case Type.attributeName:
            attrName = data.value;
            current.attributes[attrName] = "";
            break;
          case Type.attributeValue:
            current.attributes[attrName] = data.value;
            break;
        }
      };
      reader.reset = function() {
        lexer = Lexer.create({ debug: options2.debug });
        lexer.on("data", handleLexerData);
        rootNode = createNode();
        current = null;
        attrName = "";
        reader.parse = lexer.write;
      };
      reader.reset();
      return reader;
    };
    var parseSync2 = function parseSync3(xml2, options2) {
      options2 = Object.assign({}, options2, { stream: false, tagPrefix: ":" });
      var reader = create2(options2);
      var res = void 0;
      reader.on("done", function(ast) {
        res = ast;
      });
      reader.parse(xml2);
      return res;
    };
    module.exports = {
      parseSync: parseSync2,
      create: create2,
      NodeType
    };
  }
});

// node_modules/@dicebear/avatars/dist/index.es.js
var import_hex = __toESM(require_hex());
var import_rgb2hsv = __toESM(require_rgb2hsv());
var import_rgb2hex = __toESM(require_rgb2hex());
var import_hsv2rgb = __toESM(require_hsv2rgb());

// node_modules/svgson/dist/svgson.esm.js
var import_deep_rename_keys = __toESM(require_deep_rename_keys());
var import_xml_reader = __toESM(require_reader());
var parseInput = function parseInput2(input) {
  var parsed = (0, import_xml_reader.parseSync)("<root>".concat(input, "</root>"), {
    parentNodes: false
  });
  var isValid = parsed.children && parsed.children.length > 0 && parsed.children.every(function(node) {
    return node.name === "svg";
  });
  if (isValid) {
    return parsed.children.length === 1 ? parsed.children[0] : parsed.children;
  } else {
    throw Error("nothing to parse");
  }
};
var camelize = function camelize2(node) {
  return (0, import_deep_rename_keys.default)(node, function(key) {
    if (!notCamelcase(key)) {
      return toCamelCase(key);
    }
    return key;
  });
};
var toCamelCase = function toCamelCase2(prop) {
  return prop.replace(/[-|:]([a-z])/gi, function(all, letter) {
    return letter.toUpperCase();
  });
};
var notCamelcase = function notCamelcase2(prop) {
  return /^(data|aria)(-\w+)/.test(prop);
};
var escapeText = function escapeText2(text) {
  if (text) {
    var str = String(text);
    return /[&<>]/.test(str) ? "<![CDATA[".concat(str.replace(/]]>/, "]]]]><![CDATA[>"), "]]>") : str;
  }
  return "";
};
var escapeAttr = function escapeAttr2(attr) {
  return String(attr).replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
var svgsonSync = function svgsonSync2(input) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$transformNode = _ref.transformNode, transformNode = _ref$transformNode === void 0 ? function(node) {
    return node;
  } : _ref$transformNode, _ref$camelcase = _ref.camelcase, camelcase = _ref$camelcase === void 0 ? false : _ref$camelcase;
  var applyFilters = function applyFilters2(input2) {
    var n;
    n = transformNode(input2);
    if (camelcase) {
      n = camelize(n);
    }
    return n;
  };
  return applyFilters(parseInput(input));
};
var stringify = function stringify2(_ast) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$transformAttr = _ref.transformAttr, transformAttr = _ref$transformAttr === void 0 ? function(key, value, escape2) {
    return "".concat(key, '="').concat(escape2(value), '"');
  } : _ref$transformAttr, _ref$transformNode = _ref.transformNode, transformNode = _ref$transformNode === void 0 ? function(node) {
    return node;
  } : _ref$transformNode, _ref$selfClose = _ref.selfClose, selfClose = _ref$selfClose === void 0 ? true : _ref$selfClose;
  if (Array.isArray(_ast)) {
    return _ast.map(function(ast2) {
      return stringify2(ast2, {
        transformAttr,
        selfClose,
        transformNode
      });
    }).join("");
  }
  var ast = transformNode(_ast);
  if (ast.type === "text") {
    return escapeText(ast.value);
  }
  var attributes = "";
  for (var attr in ast.attributes) {
    var attrStr = transformAttr(attr, ast.attributes[attr], escapeAttr, ast.name);
    attributes += attrStr ? " ".concat(attrStr) : "";
  }
  return ast.children && ast.children.length > 0 || !selfClose ? "<".concat(ast.name).concat(attributes, ">").concat(stringify2(ast.children, {
    transformAttr,
    transformNode,
    selfClose
  }), "</").concat(ast.name, ">") : "<".concat(ast.name).concat(attributes, "/>");
};

// node_modules/@dicebear/avatars/dist/index.es.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
var MIN = -2147483648;
var MAX = 2147483647;
function xorshift(value) {
  value ^= value << 13;
  value ^= value >> 17;
  value ^= value << 5;
  return value;
}
function hashSeed(seed) {
  var hash = 0;
  for (var i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i) | 0;
    hash = xorshift(hash);
  }
  return hash;
}
function randomSeed() {
  return MIN + Math.floor((MAX - MIN) * Math.random()).toString();
}
function create(seed) {
  var _seed;
  seed = (_seed = seed) !== null && _seed !== void 0 ? _seed : randomSeed();
  var value = hashSeed(seed) || 1;
  var next = function next2() {
    return value = xorshift(value);
  };
  var _integer = function integer(min, max) {
    return Math.floor((next() - MIN) / (MAX - MIN) * (max + 1 - min) + min);
  };
  return {
    seed,
    bool: function bool() {
      var likelihood = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 50;
      return _integer(0, 100) < likelihood;
    },
    integer: function integer(min, max) {
      return _integer(min, max);
    },
    pick: function pick(arr) {
      return arr[_integer(0, arr.length - 1)];
    }
  };
}
var prng = Object.freeze({
  __proto__: null,
  create
});
var Random = function() {
  function Random2(seed) {
    _classCallCheck(this, Random2);
    _defineProperty(this, "prng", void 0);
    _defineProperty(this, "seed", void 0);
    this.prng = create(seed);
    this.seed = this.prng.seed;
  }
  _createClass(Random2, [{
    key: "bool",
    value: function bool() {
      var likelihood = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 50;
      return this.prng.bool(likelihood);
    }
  }, {
    key: "integer",
    value: function integer(min, max) {
      return this.prng.integer(min, max);
    }
  }, {
    key: "pickone",
    value: function pickone(arr) {
      return this.prng.pick(arr);
    }
  }]);
  return Random2;
}();
var color$i = {
  50: "#FFF8E1",
  100: "#FFECB3",
  200: "#FFE082",
  300: "#FFB74D",
  400: "#FFCA28",
  500: "#FFC107",
  600: "#FFB300",
  700: "#FFA000",
  800: "#FF8F00",
  900: "#FF6F00"
};
var color$h = {
  50: "#E3F2FD",
  100: "#BBDEFB",
  200: "#90CAF9",
  300: "#64B5F6",
  400: "#42A5F5",
  500: "#2196F3",
  600: "#1E88E5",
  700: "#1976D2",
  800: "#1565C0",
  900: "#0D47A1"
};
var color$g = {
  50: "#ECEFF1",
  100: "#CFD8DC",
  200: "#B0BEC5",
  300: "#90A4AE",
  400: "#78909C",
  500: "#607D8B",
  600: "#546E7A",
  700: "#455A64",
  800: "#37474F",
  900: "#263238"
};
var color$f = {
  50: "#EFEBE9",
  100: "#D7CCC8",
  200: "#BCAAA4",
  300: "#A1887F",
  400: "#8D6E63",
  500: "#795548",
  600: "#6D4C41",
  700: "#5D4037",
  800: "#4E342E",
  900: "#3E2723"
};
var color$e = {
  50: "#E0F7FA",
  100: "#B2EBF2",
  200: "#80DEEA",
  300: "#4DD0E1",
  400: "#26C6DA",
  500: "#00BCD4",
  600: "#00ACC1",
  700: "#0097A7",
  800: "#00838F",
  900: "#006064"
};
var color$d = {
  50: "#FBE9E7",
  100: "#FFCCBC",
  200: "#FFAB91",
  300: "#A1887F",
  400: "#FF7043",
  500: "#FF5722",
  600: "#F4511E",
  700: "#E64A19",
  800: "#D84315",
  900: "#BF360C"
};
var color$c = {
  50: "#EDE7F6",
  100: "#D1C4E9",
  200: "#B39DDB",
  300: "#9575CD",
  400: "#7E57C2",
  500: "#673AB7",
  600: "#5E35B1",
  700: "#512DA8",
  800: "#4527A0",
  900: "#311B92"
};
var color$b = {
  50: "#E8F5E9",
  100: "#C8E6C9",
  200: "#A5D6A7",
  300: "#81C784",
  400: "#66BB6A",
  500: "#4CAF50",
  600: "#43A047",
  700: "#388E3C",
  800: "#2E7D32",
  900: "#1B5E20"
};
var color$a = {
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#EEEEEE",
  300: "#E0E0E0",
  400: "#BDBDBD",
  500: "#9E9E9E",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121"
};
var color$9 = {
  50: "#E8EAF6",
  100: "#C5CAE9",
  200: "#9FA8DA",
  300: "#7986CB",
  400: "#5C6BC0",
  500: "#3F51B5",
  600: "#3949AB",
  700: "#303F9F",
  800: "#283593",
  900: "#1A237E"
};
var color$8 = {
  50: "#E1F5FE",
  100: "#B3E5FC",
  200: "#81D4FA",
  300: "#4FC3F7",
  400: "#29B6F6",
  500: "#03A9F4",
  600: "#039BE5",
  700: "#0288D1",
  800: "#0277BD",
  900: "#01579B"
};
var color$7 = {
  50: "#F1F8E9",
  100: "#DCEDC8",
  200: "#C5E1A5",
  300: "#AED581",
  400: "#9CCC65",
  500: "#8BC34A",
  600: "#7CB342",
  700: "#689F38",
  800: "#558B2F",
  900: "#33691E"
};
var color$6 = {
  50: "#F9FBE7",
  100: "#F0F4C3",
  200: "#E6EE9C",
  300: "#DCE775",
  400: "#D4E157",
  500: "#CDDC39",
  600: "#C0CA33",
  700: "#AFB42B",
  800: "#9E9D24",
  900: "#827717"
};
var color$5 = {
  50: "#FFF3E0",
  100: "#FFE0B2",
  200: "#FFCC80",
  300: "#FF8A65",
  400: "#FFA726",
  500: "#FF9800",
  600: "#FB8C00",
  700: "#F57C00",
  800: "#EF6C00",
  900: "#E65100"
};
var color$4 = {
  50: "#FCE4EC",
  100: "#F8BBD0",
  200: "#F48FB1",
  300: "#F06292",
  400: "#EC407A",
  500: "#E91E63",
  600: "#D81B60",
  700: "#C2185B",
  800: "#AD1457",
  900: "#880E4F"
};
var color$3 = {
  50: "#F3E5F5",
  100: "#E1BEE7",
  200: "#CE93D8",
  300: "#BA68C8",
  400: "#AB47BC",
  500: "#9C27B0",
  600: "#8E24AA",
  700: "#7B1FA2",
  800: "#6A1B9A",
  900: "#4A148C"
};
var color$2 = {
  50: "#FFEBEE",
  100: "#FFCDD2",
  200: "#EF9A9A",
  300: "#E57373",
  400: "#EF5350",
  500: "#F44336",
  600: "#E53935",
  700: "#D32F2F",
  800: "#C62828",
  900: "#B71C1C"
};
var color$1 = {
  50: "#E0F2F1",
  100: "#B2DFDB",
  200: "#80CBC4",
  300: "#4DB6AC",
  400: "#26A69A",
  500: "#009688",
  600: "#00897B",
  700: "#00796B",
  800: "#00695C",
  900: "#004D40"
};
var color = {
  50: "#FFFDE7",
  100: "#FFF9C4",
  200: "#FFF59D",
  300: "#FFF176",
  400: "#FFEE58",
  500: "#FFEB3B",
  600: "#FDD835",
  700: "#FBC02D",
  800: "#F9A825",
  900: "#F57F17"
};
var collection = {
  amber: color$i,
  blue: color$h,
  blueGrey: color$g,
  brown: color$f,
  cyan: color$e,
  deepOrange: color$d,
  deepPurple: color$c,
  green: color$b,
  grey: color$a,
  indigo: color$9,
  lightBlue: color$8,
  lightGreen: color$7,
  lime: color$6,
  orange: color$5,
  pink: color$4,
  purple: color$3,
  red: color$2,
  teal: color$1,
  yellow: color
};
var Color = function() {
  function Color2() {
    var color2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "#000";
    _classCallCheck(this, Color2);
    _defineProperty(this, "alpha", 1);
    _defineProperty(this, "color", {});
    if (color2[0] == "#") {
      this.hex = color2;
    } else {
      var match = /^(rgb|rgba|hsv)\(([0-9\%\,\.\s]+)\)$/.exec(color2.trim());
      if (match) {
        var values = match[2].split(",").map(function(val) {
          return parseInt(val.trim());
        });
        switch (match[1]) {
          case "rgb":
            this.rgb = values;
            break;
          case "rgba":
            this.rgba = values;
            break;
          case "hsv":
            this.hsv = values;
            break;
          default:
            throw new Error("Unsupported color format: " + color2);
        }
      } else {
        throw new Error("Unknown color format: " + color2);
      }
    }
  }
  _createClass(Color2, [{
    key: "clone",
    value: function clone() {
      return new Color2("rgb(" + this.rgb.join(",") + ")");
    }
  }, {
    key: "rgb",
    get: function get() {
      return this.color.rgb = this.color.rgb || (this.color.hex ? this.hexToRgb(this.hex) : this.hsvToRgb(this.hsv));
    },
    set: function set(rgb) {
      if (rgb.length != 3) {
        throw new Error("An array with a length of 3 is expected.");
      }
      this.alpha = 1;
      this.color = {
        rgb
      };
    }
  }, {
    key: "rgba",
    get: function get() {
      return [this.rgb[0], this.rgb[1], this.rgb[2], this.alpha];
    },
    set: function set(rgba) {
      if (rgba.length != 4) {
        throw new Error("An array with a length of 3 is expected.");
      }
      this.rgb = [rgba[0], rgba[1], rgba[2]];
      this.alpha = rgba[3];
    }
  }, {
    key: "hsv",
    get: function get() {
      return (this.color.hsv = this.color.hsv || this.rgbToHsv(this.rgb)).slice(0);
    },
    set: function set(hsv) {
      if (hsv.length != 3) {
        throw new Error("An array with a length of 3 is expected.");
      }
      this.alpha = 1;
      this.color = {
        hsv
      };
    }
  }, {
    key: "hex",
    get: function get() {
      return (this.color.hex = this.color.hex || this.rgbToHex(this.rgb)).slice(0);
    },
    set: function set(hex) {
      this.alpha = 1;
      this.color = {
        hex
      };
    }
  }, {
    key: "brighterThan",
    value: function brighterThan(color2, difference) {
      var primaryColorHsv = this.hsv;
      var secondaryColorHsv = color2.hsv;
      if (primaryColorHsv[2] >= secondaryColorHsv[2] + difference) {
        return this;
      }
      primaryColorHsv[2] = secondaryColorHsv[2] + difference;
      if (primaryColorHsv[2] > 360) {
        primaryColorHsv[2] = 360;
      }
      this.hsv = primaryColorHsv;
      return this;
    }
  }, {
    key: "darkerThan",
    value: function darkerThan(color2, difference) {
      var primaryColorHsv = this.hsv;
      var secondaryColorHsv = color2.hsv;
      if (primaryColorHsv[2] <= secondaryColorHsv[2] - difference) {
        return this;
      }
      primaryColorHsv[2] = secondaryColorHsv[2] - difference;
      if (primaryColorHsv[2] < 0) {
        primaryColorHsv[2] = 0;
      }
      this.hsv = primaryColorHsv;
      return this;
    }
  }, {
    key: "brighterOrDarkerThan",
    value: function brighterOrDarkerThan(color2, difference) {
      var primaryColorHsv = this.hsv;
      var secondaryColorHsv = color2.hsv;
      if (primaryColorHsv[2] <= secondaryColorHsv[2]) {
        return this.darkerThan(color2, difference);
      } else {
        return this.brighterThan(color2, difference);
      }
    }
  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      return (0, import_rgb2hex.default)(rgb);
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      return (0, import_hex.default)(hex).map(function(val) {
        return Math.round(val);
      });
    }
  }, {
    key: "rgbToHsv",
    value: function rgbToHsv(rgb) {
      return (0, import_rgb2hsv.default)(rgb).map(function(val) {
        return Math.round(val);
      });
    }
  }, {
    key: "hsvToRgb",
    value: function hsvToRgb(hsv) {
      return (0, import_hsv2rgb.default)(hsv).map(function(val) {
        return Math.round(val);
      });
    }
  }]);
  return Color2;
}();
_defineProperty(Color, "collection", collection);
var index$1 = Object.freeze({
  __proto__: null,
  collection,
  "default": Color
});
var Parser = function() {
  function Parser2() {
    _classCallCheck(this, Parser2);
  }
  _createClass(Parser2, null, [{
    key: "parse",
    value: function parse(svg2) {
      return typeof svg2 === "string" ? svgsonSync(svg2) : svg2;
    }
  }, {
    key: "stringify",
    value: function stringify$1(svg2) {
      return typeof svg2 === "string" ? svg2 : stringify(svg2);
    }
  }]);
  return Parser2;
}();
function xml(attr) {
  return attr.replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var escape = Object.freeze({
  __proto__: null,
  xml
});
var schema$1 = {
  "type": "object",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Options",
  "properties": {
    "seed": {
      "title": "Seed",
      "type": "string"
    },
    "s": {
      "title": "Seed",
      "type": "string"
    },
    "base64": {
      "title": "Base64",
      "description": "@deprecated use dataUri instead",
      "type": "boolean",
      "default": false
    },
    "dataUri": {
      "title": "Data URI",
      "type": "boolean",
      "default": false
    },
    "userAgent": {
      "title": "User Agent",
      "description": "@deprecated",
      "type": "string"
    },
    "flip": {
      "title": "Flip",
      "type": "boolean",
      "default": false
    },
    "rotate": {
      "title": "Rotate",
      "type": "integer",
      "minimum": 0,
      "maximum": 360,
      "default": 0
    },
    "scale": {
      "title": "Scale",
      "type": "integer",
      "minimum": 0,
      "maximum": 200,
      "default": 100
    },
    "radius": {
      "title": "Radius",
      "type": "integer",
      "minimum": 0,
      "maximum": 50,
      "default": 0
    },
    "r": {
      "title": "Radius",
      "type": "integer",
      "minimum": 0,
      "maximum": 50,
      "default": 0
    },
    "width": {
      "title": "Width",
      "description": "@deprecated use size instead",
      "type": "integer",
      "minimum": 1
    },
    "w": {
      "title": "Width",
      "description": "@deprecated use size instead",
      "type": "integer",
      "minimum": 1
    },
    "height": {
      "title": "Height",
      "description": "@deprecated use size instead",
      "type": "integer",
      "minimum": 1
    },
    "h": {
      "title": "Height",
      "description": "@deprecated use size instead",
      "type": "integer",
      "minimum": 1
    },
    "size": {
      "title": "Size",
      "type": "integer",
      "minimum": 1
    },
    "margin": {
      "title": "Margin",
      "description": "@deprecated use scale instead",
      "type": "integer",
      "minimum": 0,
      "maximum": 25,
      "default": 0
    },
    "m": {
      "title": "Margin",
      "description": "@deprecated use scale instead",
      "type": "integer",
      "minimum": 0,
      "maximum": 25,
      "default": 0
    },
    "backgroundColor": {
      "title": "Background Color",
      "anyOf": [{
        "type": "string",
        "pattern": "^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$"
      }, {
        "type": "string",
        "pattern": "^[0-9a-zA-Z]+$"
      }, {
        "type": "array",
        "items": {
          "anyOf": [{
            "type": "string",
            "pattern": "^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$"
          }, {
            "type": "string",
            "pattern": "^[0-9a-zA-Z]+$"
          }]
        }
      }]
    },
    "background": {
      "title": "Background Color",
      "anyOf": [{
        "type": "string",
        "pattern": "^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$"
      }, {
        "type": "string",
        "pattern": "^[0-9a-zA-Z]+$"
      }, {
        "type": "array",
        "items": {
          "anyOf": [{
            "type": "string",
            "pattern": "^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$"
          }, {
            "type": "string",
            "pattern": "^[0-9a-zA-Z]+$"
          }]
        }
      }],
      "description": "@deprecated use backgroundColor instead"
    },
    "b": {
      "title": "Background Color",
      "anyOf": [{
        "type": "string",
        "pattern": "^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$"
      }, {
        "type": "string",
        "pattern": "^[0-9a-zA-Z]+$"
      }, {
        "type": "array",
        "items": {
          "anyOf": [{
            "type": "string",
            "pattern": "^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$"
          }, {
            "type": "string",
            "pattern": "^[0-9a-zA-Z]+$"
          }]
        }
      }]
    },
    "translateX": {
      "title": "Translate X%",
      "type": "integer",
      "minimum": -100,
      "maximum": 100,
      "default": 0
    },
    "translateY": {
      "title": "Translate Y%",
      "type": "integer",
      "minimum": -100,
      "maximum": 100,
      "default": 0
    }
  },
  "additionalProperties": false
};
function properties(schema2) {
  return schema2.properties || {};
}
function defaults(schema2) {
  var result = {};
  var props = properties(schema2);
  Object.keys(props).forEach(function(key) {
    var val = props[key];
    if (_typeof(val) === "object" && void 0 !== val.default) {
      if (Array.isArray(val.default)) {
        result[key] = _toConsumableArray(val.default);
      } else if (_typeof(val.default) === "object") {
        result[key] = _objectSpread2({}, val.default);
      } else {
        result[key] = val.default;
      }
    }
  });
  return result;
}
function aliases(schema2) {
  var result = {};
  var props = properties(schema2);
  Object.keys(props).forEach(function(key) {
    var val = props[key];
    if (_typeof(val) === "object") {
      var title = val.title;
      if (title) {
        result[title] = result[title] || [];
        result[title].push(key);
      }
    }
  });
  return Object.values(result).filter(function(keys) {
    return keys.length > 1;
  }).map(function(keys) {
    return keys.sort().sort(function(a, b) {
      if (a.length === b.length) {
        return 0;
      }
      return a.length > b.length ? 1 : -1;
    });
  });
}
function aliasesMap(schema2) {
  var result = /* @__PURE__ */ new Map();
  var _iterator = _createForOfIteratorHelper(aliases(schema2)), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var row = _step.value;
      var _row$reverse = row.reverse(), _row$reverse2 = _toArray(_row$reverse), key = _row$reverse2[0], values = _row$reverse2.slice(1);
      var _iterator2 = _createForOfIteratorHelper(values), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var val = _step2.value;
          result.set(val, key);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}
var schema = Object.freeze({
  __proto__: null,
  properties,
  defaults,
  aliases,
  aliasesMap
});
function omit(obj, key) {
  obj[key];
  var result = _objectWithoutProperties(obj, [key].map(_toPropertyKey));
  return result;
}
var helper = Object.freeze({
  __proto__: null,
  omit
});
function merge(style2, options2) {
  var optionSources = [{
    seed: Math.random().toString(),
    /** @ts-ignore @deprecated - will be removed with version 5.0 */
    userAgent: typeof window !== "undefined" && window.navigator && window.navigator.userAgent
  }, defaults(schema$1), defaults(style2.schema), options2];
  var result = createAliasProxy(style2);
  optionSources.forEach(function(optionSource) {
    result = Object.assign(result, omit(optionSource, "_aliases"));
  });
  return result;
}
function createAliasProxy(style2) {
  var aliasMap = new Map([].concat(_toConsumableArray(Array.from(aliasesMap(schema$1))), _toConsumableArray(Array.from(aliasesMap(style2.schema)))));
  return new Proxy({
    _aliases: aliasMap
  }, {
    get: function get(obj, key) {
      var _obj$_aliases$get;
      var originalKey = (_obj$_aliases$get = obj._aliases.get(key)) !== null && _obj$_aliases$get !== void 0 ? _obj$_aliases$get : key;
      return obj[originalKey];
    },
    set: function set(obj, key, value) {
      var _obj$_aliases$get2;
      var originalKey = (_obj$_aliases$get2 = obj._aliases.get(key)) !== null && _obj$_aliases$get2 !== void 0 ? _obj$_aliases$get2 : key;
      obj[originalKey] = value;
      return true;
    },
    deleteProperty: function deleteProperty(obj, key) {
      var _obj$_aliases$get3;
      var originalKey = (_obj$_aliases$get3 = obj._aliases.get(key)) !== null && _obj$_aliases$get3 !== void 0 ? _obj$_aliases$get3 : key;
      delete obj[originalKey];
      return true;
    }
  });
}
var options = Object.freeze({
  __proto__: null,
  merge,
  createAliasProxy
});
var ccLicenses = {
  by: {
    permits: ["Reproduction", "Distribution", "DerivativeWorks"],
    requires: ["Notice", "Attribution"],
    prohibits: []
  },
  "by-sa": {
    permits: ["Reproduction", "Distribution", "DerivativeWorks"],
    requires: ["Notice", "Attribution", "ShareAlike"],
    prohibits: []
  },
  "by-nd": {
    permits: ["Reproduction", "Distribution"],
    requires: ["Notice", "Attribution"],
    prohibits: []
  },
  "by-nc": {
    permits: ["Reproduction", "Distribution", "DerivativeWorks"],
    requires: ["Notice", "Attribution"],
    prohibits: ["CommercialUse"]
  },
  "by-nc-sa": {
    permits: ["Reproduction", "Distribution", "DerivativeWorks"],
    requires: ["Notice", "Attribution", "ShareAlike"],
    prohibits: ["CommercialUse"]
  },
  "by-nc-nd": {
    permits: ["Reproduction", "Distribution"],
    requires: ["Notice", "Attribution"],
    prohibits: ["CommercialUse"]
  },
  zero: {
    permits: ["Reproduction", "Distribution", "DerivativeWorks"],
    requires: [],
    prohibits: []
  }
};
function createGroup(_ref) {
  var children = _ref.children, x = _ref.x, y = _ref.y;
  return '<g transform="translate('.concat(x, ", ").concat(y, ')">').concat(children, "</g>");
}
function getXmlnsAttributes() {
  return {
    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
    "xmlns:cc": "http://creativecommons.org/ns#",
    "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "xmlns:svg": "http://www.w3.org/2000/svg",
    xmlns: "http://www.w3.org/2000/svg"
  };
}
function getMetadata(style2) {
  return '\n<metadata>\n<rdf:RDF>\n<cc:Work>\n<dc:format>image/svg+xml</dc:format>\n<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\n'.concat(getMetadataWorkTitle(style2), "\n").concat(getMetadataWorkCreator(style2), "\n").concat(getMetadataWorkSource(style2), "\n").concat(getMetadataWorkLicense(style2), "\n").concat(getMetadataWorkContributor(style2), "\n</cc:Work>\n").concat(getMetadataLicense(style2), "\n</rdf:RDF>\n</metadata>\n");
}
function getMetadataWorkTitle(style2) {
  if (style2.meta.title) {
    return "<dc:title>".concat(style2.meta.title, "</dc:title>");
  }
  return "";
}
function getMetadataWorkCreator(style2) {
  if (style2.meta.creator) {
    var creators = Array.isArray(style2.meta.creator) ? style2.meta.creator : [style2.meta.creator];
    return "\n<dc:creator>\n".concat(getMetadataWorkAgents(creators), "\n</dc:creator>\n");
  }
  return "";
}
function getMetadataWorkSource(style2) {
  if (style2.meta.source) {
    return "<dc:source>".concat(style2.meta.source, "</dc:source>");
  }
  return "";
}
function getMetadataWorkLicense(style2) {
  if (style2.meta.license) {
    return '<cc:license rdf:resource="'.concat(style2.meta.license.url, '" />');
  }
  return "";
}
function getMetadataWorkContributor(style2) {
  if (style2.meta.contributor) {
    var contributors = Array.isArray(style2.meta.contributor) ? style2.meta.contributor : [style2.meta.contributor];
    return "\n<dc:contributor>\n".concat(getMetadataWorkAgents(contributors), "\n</dc:contributor>\n");
  }
  return "";
}
function getMetadataWorkAgents(agents) {
  return agents.map(function(agent) {
    return "\n<cc:Agent>\n<dc:title>".concat(agent, "</dc:title>\n</cc:Agent>\n");
  });
}
function getMetadataLicense(style2) {
  var _style$meta$license;
  var match = (_style$meta$license = style2.meta.license) === null || _style$meta$license === void 0 ? void 0 : _style$meta$license.url.match(/^https?:\/\/creativecommons.org\/(?:licenses|publicdomain)\/([a-z\-]+)\/\d.\d\//);
  if (match) {
    var license = ccLicenses[match[1]];
    if (license) {
      var _style$meta$license2;
      var result = "";
      license.permits.forEach(function(permits) {
        result += '<cc:permits rdf:resource="https://creativecommons.org/ns#'.concat(permits, '" />');
      });
      license.requires.forEach(function(requires) {
        result += '<cc:requires rdf:resource="https://creativecommons.org/ns#'.concat(requires, '" />');
      });
      license.prohibits.forEach(function(prohibits) {
        result += '<cc:prohibits rdf:resource="https://creativecommons.org/ns#'.concat(prohibits, '" />');
      });
      return '\n<cc:License rdf:about="'.concat((_style$meta$license2 = style2.meta.license) === null || _style$meta$license2 === void 0 ? void 0 : _style$meta$license2.url, '">\n').concat(result, "\n</cc:License>\n");
    }
  }
  return "";
}
function getViewBox(result) {
  var viewBox = result.attributes["viewBox"].split(" ");
  var x = parseInt(viewBox[0]);
  var y = parseInt(viewBox[1]);
  var width = parseInt(viewBox[2]);
  var height = parseInt(viewBox[3]);
  return {
    x,
    y,
    width,
    height
  };
}
function addMargin(result, options2) {
  var _options$margin;
  var margin = typeof options2 === "number" ? options2 : (_options$margin = options2.margin) !== null && _options$margin !== void 0 ? _options$margin : 0;
  return addScale(result, 100 - margin * 2);
}
function addRadius(result, options2) {
  if (void 0 === options2.radius) {
    return result.body;
  }
  return addViewboxMask(result, options2.radius);
}
function addBackgroundColor(result, options2) {
  var _options$backgroundCo;
  var _getViewBox = getViewBox(result), width = _getViewBox.width, height = _getViewBox.height, x = _getViewBox.x, y = _getViewBox.y;
  var backgroundColor = typeof options2 === "string" ? options2 : (_options$backgroundCo = options2.backgroundColor) !== null && _options$backgroundCo !== void 0 ? _options$backgroundCo : "transparent";
  return '\n<rect fill="'.concat(backgroundColor, '" width="').concat(width, '" height="').concat(height, '" x="').concat(x, '" y="').concat(y, '" />\n').concat(result.body, "\n");
}
function addScale(result, scale) {
  var _getViewBox2 = getViewBox(result), width = _getViewBox2.width, height = _getViewBox2.height, x = _getViewBox2.x, y = _getViewBox2.y;
  var percent = scale ? (scale - 100) / 100 : 0;
  var translateX = (width / 2 + x) * percent * -1;
  var translateY = (height / 2 + y) * percent * -1;
  return '\n<g transform="translate('.concat(translateX, " ").concat(translateY, ") scale(").concat(scale / 100, ')">\n').concat(result.body, "\n</g>\n");
}
function addTranslate(result, x, y) {
  var viewBox = getViewBox(result);
  var translateX = (viewBox.width + viewBox.x * 2) * ((x !== null && x !== void 0 ? x : 0) / 100);
  var translateY = (viewBox.height + viewBox.y * 2) * ((y !== null && y !== void 0 ? y : 0) / 100);
  return '\n<g transform="translate('.concat(translateX, " ").concat(translateY, ')">\n').concat(result.body, "\n</g>\n");
}
function addRotate(result, rotate) {
  var _getViewBox3 = getViewBox(result), width = _getViewBox3.width, height = _getViewBox3.height, x = _getViewBox3.x, y = _getViewBox3.y;
  return '\n<g transform="rotate('.concat(rotate, ", ").concat(width / 2 + x, ", ").concat(height / 2 + y, ')">\n').concat(result.body, "\n</g>\n");
}
function addFlip(result) {
  var _getViewBox4 = getViewBox(result), width = _getViewBox4.width, x = _getViewBox4.x;
  return '\n<g transform="scale(-1 1) translate('.concat(width * -1 - x * 2, ' 0)">\n').concat(result.body, "\n</g>\n");
}
function addViewboxMask(result, radius) {
  var _getViewBox5 = getViewBox(result), width = _getViewBox5.width, height = _getViewBox5.height, x = _getViewBox5.x, y = _getViewBox5.y;
  var rx = radius ? width * radius / 100 : 0;
  var ry = radius ? height * radius / 100 : 0;
  return '\n<mask id="avatarsRadiusMask">\n<rect width="'.concat(width, '" height="').concat(height, '" rx="').concat(rx, '" ry="').concat(ry, '" x="').concat(x, '" y="').concat(y, '" fill="#fff" />\n</mask>\n<g mask="url(#avatarsRadiusMask)">').concat(result.body, "</g>\n");
}
function createAttrString(attributes) {
  attributes = _objectSpread2(_objectSpread2({}, getXmlnsAttributes()), attributes);
  return Object.keys(attributes).map(function(attr) {
    return "".concat(xml(attr), '="').concat(xml(attributes[attr]), '"');
  }).join(" ");
}
function removeWhitespace(svg2) {
  return svg2.trim().replace(/\n/g, " ").replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").replace(/<([^\/>]+)><\/[^>]+>/gi, "<$1/>").replace(/\s(\/?>)/g, "$1");
}
var svg = Object.freeze({
  __proto__: null,
  createGroup,
  getXmlnsAttributes,
  getMetadata,
  getMetadataWorkTitle,
  getMetadataWorkCreator,
  getMetadataWorkSource,
  getMetadataWorkLicense,
  getMetadataWorkContributor,
  getMetadataWorkAgents,
  getMetadataLicense,
  getViewBox,
  addMargin,
  addRadius,
  addBackgroundColor,
  addScale,
  addTranslate,
  addRotate,
  addFlip,
  addViewboxMask,
  createAttrString,
  removeWhitespace
});
function createLegacyWrapper(style2) {
  return function(random, options2) {
    var _result$head;
    options2 = Object.assign(options2, merge(style2, options2));
    var result = style2.create({
      prng: create(random.seed),
      options: options2
    });
    return "\n<svg ".concat(createAttrString(result.attributes), ">\n").concat(getMetadata(style2), "\n").concat((_result$head = result.head) !== null && _result$head !== void 0 ? _result$head : "", "\n").concat(result.body, "\n</svg>\n");
  };
}
var style = Object.freeze({
  __proto__: null,
  createLegacyWrapper
});
var index = Object.freeze({
  __proto__: null,
  escape,
  options,
  prng,
  svg,
  style,
  schema,
  helper
});
function createAvatar(style2) {
  var _options$radius, _result$head, _result$head2;
  var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  options2 = merge(style2, options2);
  var prngInstance = create(options2.seed);
  var result = style2.create({
    prng: prngInstance,
    options: options2
  });
  if (options2.size) {
    result.attributes.width = options2.size.toString();
    result.attributes.height = options2.size.toString();
  } else {
    if (options2.width) {
      result.attributes.width = options2.width.toString();
    }
    if (options2.height) {
      result.attributes.height = options2.height.toString();
    }
  }
  if (options2.scale !== void 0 && options2.scale !== 100) {
    result.body = addScale(result, options2.scale);
  } else if (options2.margin) {
    result.body = addMargin(result, options2);
  }
  if (options2.flip) {
    result.body = addFlip(result);
  }
  if (options2.rotate) {
    result.body = addRotate(result, options2.rotate);
  }
  if (options2.translateX || options2.translateY) {
    result.body = addTranslate(result, options2.translateX, options2.translateY);
  }
  if (options2.backgroundColor) {
    var backgroundColor = Array.isArray(options2.backgroundColor) ? prngInstance.pick(options2.backgroundColor) : options2.backgroundColor;
    result.body = addBackgroundColor(result, backgroundColor);
  }
  result.body = addViewboxMask(result, (_options$radius = options2.radius) !== null && _options$radius !== void 0 ? _options$radius : 0);
  var hasMetadata = Boolean((_result$head = result.head) === null || _result$head === void 0 ? void 0 : _result$head.match(/<metadata([^>]*)>/));
  var avatar = removeWhitespace("\n<svg ".concat(createAttrString(result.attributes), ">\n").concat(hasMetadata ? "" : getMetadata(style2), "\n").concat((_result$head2 = result.head) !== null && _result$head2 !== void 0 ? _result$head2 : "", "\n").concat(result.body, "\n</svg>\n"));
  if (options2.dataUri) {
    return "data:image/svg+xml;utf8,".concat(encodeURIComponent(avatar));
  }
  if (options2.base64) {
    var encoded = encodeURIComponent(avatar).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt("0x".concat(p1)));
    });
    return "data:image/svg+xml;base64,".concat(btoa(encoded));
  }
  return avatar;
}
var Avatars = function() {
  function Avatars2(spriteCollection, defaultOptions) {
    _classCallCheck(this, Avatars2);
    _defineProperty(this, "spriteCollection", void 0);
    _defineProperty(this, "defaultOptions", void 0);
    this.spriteCollection = spriteCollection;
    this.defaultOptions = defaultOptions;
  }
  _createClass(Avatars2, [{
    key: "create",
    value: function create2(seed, options2) {
      var _this = this;
      var style2 = {
        meta: {},
        schema: {},
        create: function create3(_ref) {
          var prng2 = _ref.prng, styleOptions = _ref.options;
          var svg2 = Parser.parse(_this.spriteCollection(new Random(prng2.seed), styleOptions));
          var head = [];
          var body = [];
          svg2.children.forEach(function(child) {
            if (_this.isBody(child)) {
              body.push(child);
            } else {
              head.push(child);
            }
          });
          return {
            attributes: svg2.attributes,
            head: head.map(function(v) {
              return Parser.stringify(v);
            }).join(""),
            body: body.map(function(v) {
              return Parser.stringify(v);
            }).join("")
          };
        }
      };
      return createAvatar(style2, _objectSpread2(_objectSpread2(_objectSpread2({}, this.defaultOptions), options2), {}, {
        seed
      }));
    }
  }, {
    key: "isBody",
    value: function isBody(element) {
      return element.type === "element" && ["title", "desc", "defs", "metadata"].indexOf(element.name) === -1;
    }
  }]);
  return Avatars2;
}();
_defineProperty(Avatars, "random", Random);
_defineProperty(Avatars, "color", Color);
_defineProperty(Avatars, "parser", Parser);

export {
  index$1,
  schema$1,
  index,
  createAvatar,
  Avatars
};
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

deep-rename-keys/index.js:
  (*!
   * deep-rename-keys <https://github.com/jonschlinkert/deep-rename-keys>
   *
   * Copyright (c) 2015 Jon Schlinkert, contributors.
   * Licensed under the MIT license.
   *)
*/
//# sourceMappingURL=chunk-MRQ7WMKE.js.map
