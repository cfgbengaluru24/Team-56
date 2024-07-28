import {
  Avatars,
  index
} from "./chunk-MRQ7WMKE.js";
import {
  __commonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/initials/lib/initials.js
var require_initials = __commonJS({
  "node_modules/initials/lib/initials.js"(exports, module) {
    module.exports = initials2;
    initials2.addTo = addInitialsTo;
    initials2.parse = parse;
    initials2.find = initials2;
    var defaultLength = 2;
    var nonLetters = " -\\/:-@\\[-`\\{-\\~";
    var uppercaseLettersOnlyPattern = /^[A-Z]+$/;
    var initialsInNamePattern = /\(([^)]+)\)/;
    var nameIsEmailPattern = /^[^\s]+@[^\s]+$/;
    var findDomainInEmailPattern = /@[^\s]+/;
    var findEmailPattern = /[\w._-]+@[\w.-]+[\w]/g;
    var findFirstLettersOfWordsPattern = new RegExp("(^|[" + nonLetters + "])[^" + nonLetters + "]", "g");
    var findAllNonCharactersPattern = new RegExp("[" + nonLetters + "]", "g");
    function initials2(nameOrNames, options) {
      if (!nameOrNames) return "";
      if (typeof nameOrNames === "string") return initialsForSingleName(nameOrNames, normalize(options));
      return initialsForMultipleNames(nameOrNames, normalize(options));
    }
    function addInitialsTo(nameOrNames, options) {
      if (!nameOrNames) return "";
      if (typeof nameOrNames === "string") return addInitialsToSingleName(nameOrNames, normalize(options));
      return addInitialsToMultipleNames(nameOrNames, normalize(options));
    }
    function parse(nameOrNames, options) {
      if (!nameOrNames) return {};
      if (typeof nameOrNames === "string") return parseSingleName(nameOrNames, normalize(options));
      return parseMultipleNames(nameOrNames, normalize(options));
    }
    function initialsForSingleName(name, options) {
      var matches;
      var result;
      var initials3;
      var length = options.length || 2;
      initials3 = findPreferredInitials(name, options);
      if (initials3) return initials3;
      name = cleanupName(name);
      if (!name) return "";
      matches = name.match(findFirstLettersOfWordsPattern).map(function(match) {
        return match[match.length - 1];
      });
      if (matches.length < 2) {
        if (name.length > length) {
          return name.substr(0, length);
        } else {
          return name;
        }
      } else {
        result = matches.join("");
      }
      if (result.length >= length) {
        return result;
      }
      var possibleInitials = getPossibleInitialsForName(name);
      var option;
      for (var i = 0; i < possibleInitials.length; i++) {
        if (possibleInitials[i].length >= length) return possibleInitials[i];
      }
      ;
      return option;
    }
    function initialsForMultipleNames(names, options) {
      var optionsForNames = [];
      var optionsCountForNames;
      var map = {};
      var duplicatesMap = {};
      var initialsForNamesMap = {};
      var initials3;
      var possibleInitials;
      var length = options.length || 2;
      names.forEach(function(name) {
        if (!name) name = "";
        if (initialsForNamesMap[name]) return;
        if (name.length < length) {
          initialsForNamesMap[name] = [name];
          return;
        }
        initials3 = findPreferredInitials(name, options);
        if (initials3) {
          map[initials3] = 1;
          initialsForNamesMap[name] = [initials3];
          return;
        }
        possibleInitials = getPossibleInitialsForName(name).filter(function(initials4) {
          if (initials4.length !== length) return false;
          if (map[initials4]) duplicatesMap[initials4] = 1;
          map[initials4] = 1;
          return true;
        });
        initialsForNamesMap[name] = possibleInitials;
      });
      var keys = [];
      for (var k in initialsForNamesMap) {
        keys.unshift(k);
      }
      for (var c = keys.length, n = 0; n < c; n++) {
        possibleInitials = initialsForNamesMap[keys[n]];
        optionsForNames.push(possibleInitials);
        for (var i = 0; i < possibleInitials.length; i++) {
          if (duplicatesMap[possibleInitials[i]] > 0) {
            duplicatesMap[possibleInitials[i]]--;
            possibleInitials.splice(i, 1);
          }
        }
      }
      optionsCountForNames = optionsForNames.map(function(options2) {
        return options2.length;
      });
      if (optionsCountForNames.length === 0) return names;
      if (Math.min.apply(null, optionsCountForNames) === 0) {
        options.length++;
        return initialsForMultipleNames(names, options);
      }
      return names.map(function(name) {
        return initialsForNamesMap[name][0];
      });
    }
    function addInitialsToSingleName(name, options) {
      var parts = parseSingleName(name, options);
      return format(parts);
    }
    function addInitialsToMultipleNames(names, options) {
      return parseMultipleNames(names, options).map(format);
    }
    function parseSingleName(name, options) {
      var initials3;
      var email;
      var matches;
      var parts = {};
      if (!name) return {};
      initials3 = findPreferredInitials(name, options);
      if (initials3) {
        name = name.replace(uppercaseLettersOnlyPattern, "");
        name = name.replace(initialsInNamePattern, "");
      }
      if (options.initials) initials3 = options.initials;
      if (!initials3) initials3 = initialsForSingleName(name, options);
      matches = name.match(findEmailPattern);
      if (matches != null) email = matches.pop();
      if (email) {
        name = name.replace(email, "");
        if (name.trim() === "<" + email + ">") {
          name = "";
          if (!initials3) {
            initials3 = initialsForSingleName(email, options);
          }
        }
      }
      name = name.replace(findAllNonCharactersPattern, " ").trim();
      if (name) parts.name = name;
      if (initials3) parts.initials = initials3;
      if (email) parts.email = email;
      return parts;
    }
    function parseMultipleNames(names, options) {
      var initialsArray = initialsForMultipleNames(names, options);
      return names.map(function(name, i) {
        options.existing[name] = initialsArray[i];
        return parseSingleName(name, options);
      });
    }
    function format(parts) {
      if (!parts.name && !parts.email) return parts.initials;
      if (!parts.email) return parts.name + " (" + parts.initials + ")";
      if (!parts.name) return parts.email + " (" + parts.initials + ")";
      return parts.name + " (" + parts.initials + ") <" + parts.email + ">";
    }
    function cleanupName(name) {
      if (nameIsEmailPattern.test(name)) {
        name = name.replace(findDomainInEmailPattern, "");
      } else {
        name = name.replace(findEmailPattern, "");
      }
      name = name.replace(findAllNonCharactersPattern, " ").trim();
      return name;
    }
    function findPreferredInitials(name, options) {
      var matches;
      if (options.existing[name]) return options.existing[name];
      if (uppercaseLettersOnlyPattern.test(name)) {
        return name;
      }
      matches = name.match(initialsInNamePattern);
      if (matches != null) {
        return matches.pop();
      }
    }
    var cache = {};
    function getPossibleInitialsForName(name) {
      var parts;
      var partsPossibilities;
      var options = [];
      name = cleanupName(name);
      if (cache[name]) {
        return cache[name].slice(0);
      }
      parts = name.split(" ");
      partsPossibilities = parts.map(getPossibleInitialsForWord);
      options = combineAll(partsPossibilities);
      options = options.sort(function(a, b) {
        return a.length - b.length || options.indexOf(a) - options.indexOf(b);
      });
      cache[name] = options;
      return options.slice(0);
    }
    function combineAll(array) {
      var current = array.shift();
      var temp;
      var results;
      if (array.length > 0) {
        results = [];
        temp = combineAll(array);
        current.forEach(function(value1) {
          temp.forEach(function(value2) {
            results.push(value1 + value2);
          });
        });
        return results;
      } else {
        return current;
      }
    }
    function getPossibleInitialsForWord(word) {
      var options = [];
      while (word.length) {
        options.unshift(word);
        word = word.substr(0, word.length - 1);
      }
      return options;
    }
    function normalize(options) {
      if (!options) options = { length: defaultLength };
      if (typeof options === "number") options = { length: options };
      options.length = Math.max(options.length || 0, defaultLength);
      options.existing = options.existing || {};
      return options;
    }
  }
});

// node_modules/initials/index.js
var require_initials2 = __commonJS({
  "node_modules/initials/index.js"(exports, module) {
    module.exports = require_initials();
  }
});

// node_modules/@dicebear/avatars-initials-sprites/dist/index.es.js
var import_initials = __toESM(require_initials2());
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
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
var schema$1 = {
  "title": "Options",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "backgroundColors": {
      "title": "Background Colors",
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["amber", "blue", "blueGrey", "brown", "cyan", "deepOrange", "deepPurple", "green", "grey", "indigo", "lightBlue", "lightGreen", "lime", "orange", "pink", "purple", "red", "teal", "yellow"]
      }
    },
    "backgroundColorLevel": {
      "title": "Background Color Level",
      "default": 600,
      "type": "integer",
      "enum": [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    "fontSize": {
      "title": "Font Size",
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 50
    },
    "chars": {
      "title": "Chars",
      "type": "number",
      "minimum": 0,
      "maximum": 2,
      "default": 2
    },
    "bold": {
      "title": "Bold",
      "type": "boolean"
    }
  },
  "additionalProperties": false
};
var style = {
  meta: {
    title: "Initials",
    creator: "Florian Körner",
    source: "https://github.com/dicebear/dicebear",
    license: {
      name: "CC0 1.0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/"
    }
  },
  schema: schema$1,
  create: function create(_ref) {
    var _options$chars, _options$fontSize;
    var prng = _ref.prng, options = _ref.options;
    var defaults = index.schema.defaults(schema$1);
    var backgroundColors = [];
    if (options.background) {
      if (Array.isArray(options.background)) {
        backgroundColors.push.apply(backgroundColors, _toConsumableArray(options.background));
      } else {
        backgroundColors.push(options.background);
      }
      options.background = void 0;
    } else {
      Object.keys(Avatars.color.collection).forEach(function(backgroundColor2) {
        if (options.backgroundColors === void 0 || options.backgroundColors.length === 0 || options.backgroundColors.indexOf(backgroundColor2) !== -1) {
          var _options$backgroundCo;
          var colorCollection = Avatars.color.collection[backgroundColor2];
          backgroundColors.push(colorCollection[(_options$backgroundCo = options.backgroundColorLevel) !== null && _options$backgroundCo !== void 0 ? _options$backgroundCo : defaults.backgroundColorLevel]);
        }
      });
    }
    var backgroundColor = prng.pick(backgroundColors);
    var seedInitials = (0, import_initials.default)(prng.seed.trim()).toLocaleUpperCase().slice(0, (_options$chars = options.chars) !== null && _options$chars !== void 0 ? _options$chars : defaults.chars);
    var fontFamily = "Arial,sans-serif";
    var fontSize = ((_options$fontSize = options.fontSize) !== null && _options$fontSize !== void 0 ? _options$fontSize : defaults.fontSize) / 100;
    var svg = ['<rect width="1" height="1" fill="'.concat(backgroundColor, '"></rect>'), options.margin ? '<g transform="translate('.concat(options.margin / 100, ", ").concat(options.margin / 100, ')">') : "", options.margin ? '<g transform="scale('.concat(1 - options.margin * 2 / 100, ')">') : "", '<text x="50%" y="50%" style="'.concat(options.bold ? "font-weight: bold;" : "", " font-family: ").concat(fontFamily, "; font-size: ").concat(fontSize, 'px" fill="#FFF" text-anchor="middle" dy="').concat((fontSize * 0.356).toFixed(3), '">').concat(seedInitials, "</text>"), options.margin ? "</g>" : "", options.margin ? "</g>" : ""].join("");
    options.margin = void 0;
    return {
      attributes: {
        viewBox: "0 0 1 1"
      },
      body: svg
    };
  }
};
var create2 = style.create;
var meta = style.meta;
var schema = style.schema;
var index2 = index.style.createLegacyWrapper({
  create: create2,
  meta,
  schema
});
export {
  create2 as create,
  index2 as default,
  meta,
  schema
};
/*! Bundled license information:

@dicebear/avatars-initials-sprites/dist/index.es.js:
  (*!
   * DiceBear Initials (@dicebear/avatars-initials-sprites)
   *
   * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/v4/packages/avatars-initials-sprites/LICENSE)
   * Copyright (c) 2021 Florian Körner
   *)
*/
//# sourceMappingURL=@dicebear_avatars-initials-sprites.js.map
