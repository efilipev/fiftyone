import { ab as useOperators, R as Recoil_index_20, d as datasetName, E as Loading, a9 as OperatorCore, ac as Stack, ad as Divider, ae as scrollable, af as Typography, J as Link, ag as CodeTabs, ah as useOperatorBrowser, ai as usePromptOperatorInput, aj as useOperatorExecutor, ak as Button, W as getDefaultExportFromCjs, al as useAnalyticsInfo, am as Grid, an as Box, a as reactRelay, r as relayRuntime } from "./index-CvS5YflC.js";
import React__default, { useCallback, useMemo, useEffect, useState } from "react";
import "react-dom";
const DEFAULT_WRITE_KEYS = {
  dev: "MrAGfUuvQq2FOJIgAgbwgjMQgRNgruRa",
  // oss-dev
  prod: "SjCRPH72QTHlVhFZIT5067V9rhuq80Dl"
  // oss-prod
};
const SELECT_DATASET_CODE = `import fiftyone as fo

# Name of an existing dataset
name = "quickstart"

dataset = fo.load_dataset(name)

# Launch a new App session
session = fo.launch_app(dataset)

# If you already have an active App session
# session.dataset = dataset`;
const ADD_SAMPLE_CODE = `import fiftyone as fo

dataset = fo.load_dataset("$CURRENT_DATASET_NAME")

samples = []
for filepath, label in zip(filepaths, labels):
    sample = fo.Sample(filepath=filepath)
    sample["ground_truth"] = fo.Classification(label=label)
    samples.append(sample)

dataset.add_samples(samples)`;
const ADD_DATASET_CODE = `import fiftyone as fo

# A name for the dataset
name = "my-dataset"

# The directory containing the data to import
dataset_dir = "/path/to/data"

# The type of data being imported
dataset_type = fo.types.COCODetectionDataset

dataset = fo.Dataset.from_dir(
    dataset_dir=dataset_dir,
    dataset_type=dataset_type,
    name=name,
)`;
const CONTENT_BY_MODE = {
  SELECT_DATASET: {
    title: "No dataset selected",
    code: SELECT_DATASET_CODE,
    subtitle: "Select a dataset with dataset selector above or",
    codeTitle: "Select a dataset with code",
    codeSubtitle: "Use Python or command line tools to set dataset for the current session",
    learnMoreLink: "https://docs.voxel51.com/user_guide/app.html",
    learnMoreLabel: "about using the Fiftyone App"
  },
  ADD_SAMPLE: {
    title: "No samples yet",
    code: ADD_SAMPLE_CODE,
    subtitle: "Add samples to this dataset with code or",
    codeTitle: "Add samples with code",
    codeSubtitle: "Use Python or command line tools to add sample to this dataset",
    learnMoreLink: "https://docs.voxel51.com/user_guide/dataset_creation/index.html#custom-formats",
    learnMoreLabel: "about loading data into FiftyOne"
  },
  ADD_DATASET: {
    title: "No datasets yet",
    code: ADD_DATASET_CODE,
    subtitle: "Add a dataset to FiftyOne with code or",
    codeTitle: "Create dataset with code",
    codeSubtitle: "Use Python or command line tools to add dataset to FiftyOne",
    learnMoreLink: "https://docs.voxel51.com/user_guide/dataset_creation/index.html",
    learnMoreLabel: "about loading data into FiftyOne"
  }
};
const CREATE_DATASET_OPERATOR = "@voxel51/utils/create_dataset";
const IMPORT_SAMPLES_OPERATOR = "@voxel51/io/import_samples";
const INSTALL_UTILS_PLUGIN_LINK = "https://github.com/voxel51/fiftyone-plugins/tree/main/plugins/utils";
const INSTALL_IO_PLUGIN_LINK = "https://github.com/voxel51/fiftyone-plugins/tree/main/plugins/io";
const INSTALL_UTILS_PLUGIN_LABEL = "@voxel51/utils";
const INSTALL_IO_PLUGIN_LABEL = "@voxel51/io";
function Starter(props) {
  const { mode } = props;
  const { isLoading } = useOperators(true);
  const datasetName$1 = Recoil_index_20(datasetName);
  if (!mode) return null;
  if (isLoading) return /* @__PURE__ */ React__default.createElement(Loading, null, "Pixelating...");
  const { code, codeTitle, learnMoreLabel, learnMoreLink, title } = CONTENT_BY_MODE[mode];
  const codeWithDataset = code.replace("$CURRENT_DATASET_NAME", datasetName$1);
  const isSelectDataset = mode === "SELECT_DATASET";
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(OperatorCore, null), /* @__PURE__ */ React__default.createElement(
    Stack,
    {
      spacing: 6,
      divider: /* @__PURE__ */ React__default.createElement(Divider, { sx: { width: "100%" } }),
      sx: {
        fontWeight: "normal",
        alignItems: "center",
        width: "100%",
        py: 8,
        overflow: "auto"
      },
      className: scrollable
    },
    /* @__PURE__ */ React__default.createElement(Stack, { alignItems: "center", spacing: 1 }, /* @__PURE__ */ React__default.createElement(Typography, { sx: { fontSize: 16 } }, title), isSelectDataset && /* @__PURE__ */ React__default.createElement(Typography, { color: "text.secondary" }, "You can use the selector above to open an existing dataset"), /* @__PURE__ */ React__default.createElement(StarterSubtitle, { ...props }), !isSelectDataset && /* @__PURE__ */ React__default.createElement(Typography, { color: "text.secondary" }, /* @__PURE__ */ React__default.createElement(
      Link,
      {
        href: learnMoreLink,
        target: "_blank",
        sx: {
          textDecoration: "underline",
          ":hover": { textDecoration: "none" }
        }
      },
      "Learn more"
    ), " ", learnMoreLabel)),
    /* @__PURE__ */ React__default.createElement(Stack, { alignItems: "center" }, /* @__PURE__ */ React__default.createElement(Typography, { sx: { fontSize: 16 } }, codeTitle), /* @__PURE__ */ React__default.createElement(Typography, { sx: { pb: 2 }, color: "text.secondary" }, "You can use Python to ", mode === "ADD_DATASET" && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(InvertedUnderlineLink, { href: learnMoreLink, target: "_blank" }, "load data"), " into FiftyOne"), isSelectDataset && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, "load a dataset in the App"), mode === "ADD_SAMPLE" && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(InvertedUnderlineLink, { href: learnMoreLink, target: "_blank" }, "add samples"), " to this dataset")), /* @__PURE__ */ React__default.createElement(
      CodeTabs,
      {
        tabs: [{ id: "python", label: "Python", code: codeWithDataset }]
      }
    ))
  ));
}
function StarterSubtitle(props) {
  const { mode } = props;
  const browser = useOperatorBrowser();
  const isAddSample = mode === "ADD_SAMPLE";
  const hasOperator = useCallback(
    (uri) => {
      if (Array.isArray(browser.choices)) {
        return browser.choices.some((choice) => (choice == null ? void 0 : choice.value) === uri);
      }
      return false;
    },
    [browser]
  );
  const hasCreateDatasetOperator = useMemo(() => {
    if (!isAddSample) {
      return hasOperator(CREATE_DATASET_OPERATOR);
    }
    return false;
  }, [isAddSample, hasOperator]);
  const hasImportSamplesOperator = useMemo(() => {
    if (isAddSample) {
      return hasOperator(IMPORT_SAMPLES_OPERATOR);
    }
    return false;
  }, [isAddSample, hasOperator]);
  const hasRequiredOperator = isAddSample ? hasImportSamplesOperator : hasCreateDatasetOperator;
  const installLink = isAddSample ? INSTALL_IO_PLUGIN_LINK : INSTALL_UTILS_PLUGIN_LINK;
  const installLabel = isAddSample ? INSTALL_IO_PLUGIN_LABEL : INSTALL_UTILS_PLUGIN_LABEL;
  const clickActionLabel = isAddSample ? "add samples to this dataset" : "create a new dataset";
  const installActionLabel = isAddSample ? "add samples to datasets" : "create datasets";
  const OPERATOR_URI = isAddSample ? IMPORT_SAMPLES_OPERATOR : CREATE_DATASET_OPERATOR;
  return /* @__PURE__ */ React__default.createElement(Typography, { color: "text.secondary" }, hasRequiredOperator ? /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(OperatorLauncher, { uri: OPERATOR_URI }), "to ", clickActionLabel) : /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, "Did you know? You can ", installActionLabel, " in the App by installing the ", /* @__PURE__ */ React__default.createElement(InvertedUnderlineLink, { href: installLink, target: "_blank" }, installLabel), " plugin"), ", or ", /* @__PURE__ */ React__default.createElement(ButtonLink, { onClick: browser.toggle }, "browse operations"), " for other options");
}
function OperatorLauncher(props) {
  const { uri, prompt = true } = props;
  const promptForInput = usePromptOperatorInput();
  const { execute } = useOperatorExecutor(uri);
  const handleClick = useCallback(() => {
    if (prompt) {
      promptForInput(uri);
    } else {
      execute({});
    }
  }, [prompt, promptForInput, uri, execute]);
  return /* @__PURE__ */ React__default.createElement(ButtonLink, { onClick: handleClick }, "Click here");
}
function ButtonLink(props) {
  return /* @__PURE__ */ React__default.createElement(
    Button,
    {
      ...props,
      sx: {
        p: 0,
        textTransform: "none",
        fontSize: "inherit",
        lineHeight: "inherit",
        verticalAlign: "baseline",
        color: (theme) => theme.palette.text.primary,
        textDecoration: "underline",
        ...(props == null ? void 0 : props.sx) || {}
      }
    }
  );
}
function InvertedUnderlineLink(props) {
  return /* @__PURE__ */ React__default.createElement(
    Link,
    {
      ...props,
      sx: {
        textDecoration: "underline",
        ":hover": { textDecoration: "none" },
        ...(props == null ? void 0 : props.sx) || {}
      }
    }
  );
}
var dist = {};
var ga4 = {};
var gtag = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var gtag2 = function gtag3() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof window !== "undefined") {
      var _window;
      if (typeof window.gtag === "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag4() {
          window.dataLayer.push(arguments);
        };
      }
      (_window = window).gtag.apply(_window, args);
    }
  };
  var _default = gtag2;
  exports["default"] = _default;
})(gtag);
var format = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = format2;
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
  function toTitleCase(string) {
    return string.toString().trim().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
      if (index > 0 && index + match.length !== title.length && match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && (title.charAt(index + match.length) !== "-" || title.charAt(index - 1) === "-") && title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase();
      }
      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }
      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  }
  function mightBeEmail(s) {
    return typeof s === "string" && s.indexOf("@") !== -1;
  }
  var redacted = "REDACTED (Potential Email Address)";
  function redactEmail(string) {
    if (mightBeEmail(string)) {
      console.warn("This arg looks like an email address, redacting.");
      return redacted;
    }
    return string;
  }
  function format2() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var titleCase = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    var redactingEmail = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    var _str = s || "";
    if (titleCase) {
      _str = toTitleCase(s);
    }
    if (redactingEmail) {
      _str = redactEmail(_str);
    }
    return _str;
  }
})(format);
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = exports.GA4 = void 0;
  var _gtag = _interopRequireDefault(gtag);
  var _format = _interopRequireDefault(format);
  var _excluded = ["eventCategory", "eventAction", "eventLabel", "eventValue", "hitType"], _excluded2 = ["title", "location"], _excluded3 = ["page", "hitType"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
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
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
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
  function _objectSpread(target) {
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
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) ;
        else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var GA4 = /* @__PURE__ */ function() {
    function GA42() {
      var _this = this;
      _classCallCheck(this, GA42);
      _defineProperty(this, "reset", function() {
        _this.isInitialized = false;
        _this._testMode = false;
        _this._currentMeasurementId;
        _this._hasLoadedGA = false;
        _this._isQueuing = false;
        _this._queueGtag = [];
      });
      _defineProperty(this, "_gtag", function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (!_this._testMode) {
          if (_this._isQueuing) {
            _this._queueGtag.push(args);
          } else {
            _gtag["default"].apply(void 0, args);
          }
        } else {
          _this._queueGtag.push(args);
        }
      });
      _defineProperty(this, "_loadGA", function(GA_MEASUREMENT_ID, nonce) {
        var gtagUrl = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "https://www.googletagmanager.com/gtag/js";
        if (typeof window === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!_this._hasLoadedGA) {
          var script = document.createElement("script");
          script.async = true;
          script.src = "".concat(gtagUrl, "?id=").concat(GA_MEASUREMENT_ID);
          if (nonce) {
            script.setAttribute("nonce", nonce);
          }
          document.body.appendChild(script);
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag2() {
            window.dataLayer.push(arguments);
          };
          _this._hasLoadedGA = true;
        }
      });
      _defineProperty(this, "_toGtagOptions", function(gaOptions) {
        if (!gaOptions) {
          return;
        }
        var mapFields = {
          // Old https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#cookieUpdate
          // New https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#cookie_update
          cookieUpdate: "cookie_update",
          cookieExpires: "cookie_expires",
          cookieDomain: "cookie_domain",
          cookieFlags: "cookie_flags",
          // must be in set method?
          userId: "user_id",
          clientId: "client_id",
          anonymizeIp: "anonymize_ip",
          // https://support.google.com/analytics/answer/2853546?hl=en#zippy=%2Cin-this-article
          contentGroup1: "content_group1",
          contentGroup2: "content_group2",
          contentGroup3: "content_group3",
          contentGroup4: "content_group4",
          contentGroup5: "content_group5",
          // https://support.google.com/analytics/answer/9050852?hl=en
          allowAdFeatures: "allow_google_signals",
          allowAdPersonalizationSignals: "allow_ad_personalization_signals",
          nonInteraction: "non_interaction",
          page: "page_path",
          hitCallback: "event_callback"
        };
        var gtagOptions = Object.entries(gaOptions).reduce(function(prev, _ref) {
          var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
          if (mapFields[key]) {
            prev[mapFields[key]] = value;
          } else {
            prev[key] = value;
          }
          return prev;
        }, {});
        return gtagOptions;
      });
      _defineProperty(this, "initialize", function(GA_MEASUREMENT_ID) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (!GA_MEASUREMENT_ID) {
          throw new Error("Require GA_MEASUREMENT_ID");
        }
        var initConfigs = typeof GA_MEASUREMENT_ID === "string" ? [{
          trackingId: GA_MEASUREMENT_ID
        }] : GA_MEASUREMENT_ID;
        _this._currentMeasurementId = initConfigs[0].trackingId;
        var gaOptions = options.gaOptions, gtagOptions = options.gtagOptions, nonce = options.nonce, _options$testMode = options.testMode, testMode = _options$testMode === void 0 ? false : _options$testMode, gtagUrl = options.gtagUrl;
        _this._testMode = testMode;
        if (!testMode) {
          _this._loadGA(_this._currentMeasurementId, nonce, gtagUrl);
        }
        if (!_this.isInitialized) {
          _this._gtag("js", /* @__PURE__ */ new Date());
          initConfigs.forEach(function(config) {
            var mergedGtagOptions = _objectSpread(_objectSpread(_objectSpread({}, _this._toGtagOptions(_objectSpread(_objectSpread({}, gaOptions), config.gaOptions))), gtagOptions), config.gtagOptions);
            if (Object.keys(mergedGtagOptions).length) {
              _this._gtag("config", config.trackingId, mergedGtagOptions);
            } else {
              _this._gtag("config", config.trackingId);
            }
          });
        }
        _this.isInitialized = true;
        if (!testMode) {
          var queues = _toConsumableArray(_this._queueGtag);
          _this._queueGtag = [];
          _this._isQueuing = false;
          while (queues.length) {
            var queue = queues.shift();
            _this._gtag.apply(_this, _toConsumableArray(queue));
            if (queue[0] === "get") {
              _this._isQueuing = true;
            }
          }
        }
      });
      _defineProperty(this, "set", function(fieldsObject) {
        if (!fieldsObject) {
          console.warn("`fieldsObject` is required in .set()");
          return;
        }
        if (_typeof(fieldsObject) !== "object") {
          console.warn("Expected `fieldsObject` arg to be an Object");
          return;
        }
        if (Object.keys(fieldsObject).length === 0) {
          console.warn("empty `fieldsObject` given to .set()");
        }
        _this._gaCommand("set", fieldsObject);
      });
      _defineProperty(this, "_gaCommandSendEvent", function(eventCategory, eventAction, eventLabel, eventValue, fieldsObject) {
        _this._gtag("event", eventAction, _objectSpread(_objectSpread({
          event_category: eventCategory,
          event_label: eventLabel,
          value: eventValue
        }, fieldsObject && {
          non_interaction: fieldsObject.nonInteraction
        }), _this._toGtagOptions(fieldsObject)));
      });
      _defineProperty(this, "_gaCommandSendEventParameters", function() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        if (typeof args[0] === "string") {
          _this._gaCommandSendEvent.apply(_this, _toConsumableArray(args.slice(1)));
        } else {
          var _args$ = args[0], eventCategory = _args$.eventCategory, eventAction = _args$.eventAction, eventLabel = _args$.eventLabel, eventValue = _args$.eventValue;
          _args$.hitType;
          var rest2 = _objectWithoutProperties(_args$, _excluded);
          _this._gaCommandSendEvent(eventCategory, eventAction, eventLabel, eventValue, rest2);
        }
      });
      _defineProperty(this, "_gaCommandSendTiming", function(timingCategory, timingVar, timingValue, timingLabel) {
        _this._gtag("event", "timing_complete", {
          name: timingVar,
          value: timingValue,
          event_category: timingCategory,
          event_label: timingLabel
        });
      });
      _defineProperty(this, "_gaCommandSendPageview", function(page2, fieldsObject) {
        if (fieldsObject && Object.keys(fieldsObject).length) {
          var _this$_toGtagOptions = _this._toGtagOptions(fieldsObject), title = _this$_toGtagOptions.title, location = _this$_toGtagOptions.location, rest2 = _objectWithoutProperties(_this$_toGtagOptions, _excluded2);
          _this._gtag("event", "page_view", _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, page2 && {
            page_path: page2
          }), title && {
            page_title: title
          }), location && {
            page_location: location
          }), rest2));
        } else if (page2) {
          _this._gtag("event", "page_view", {
            page_path: page2
          });
        } else {
          _this._gtag("event", "page_view");
        }
      });
      _defineProperty(this, "_gaCommandSendPageviewParameters", function() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        if (typeof args[0] === "string") {
          _this._gaCommandSendPageview.apply(_this, _toConsumableArray(args.slice(1)));
        } else {
          var _args$2 = args[0], page2 = _args$2.page;
          _args$2.hitType;
          var rest2 = _objectWithoutProperties(_args$2, _excluded3);
          _this._gaCommandSendPageview(page2, rest2);
        }
      });
      _defineProperty(this, "_gaCommandSend", function() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        var hitType = typeof args[0] === "string" ? args[0] : args[0].hitType;
        switch (hitType) {
          case "event":
            _this._gaCommandSendEventParameters.apply(_this, args);
            break;
          case "pageview":
            _this._gaCommandSendPageviewParameters.apply(_this, args);
            break;
          case "timing":
            _this._gaCommandSendTiming.apply(_this, _toConsumableArray(args.slice(1)));
            break;
          case "screenview":
          case "transaction":
          case "item":
          case "social":
          case "exception":
            console.warn("Unsupported send command: ".concat(hitType));
            break;
          default:
            console.warn("Send command doesn't exist: ".concat(hitType));
        }
      });
      _defineProperty(this, "_gaCommandSet", function() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
        if (typeof args[0] === "string") {
          args[0] = _defineProperty({}, args[0], args[1]);
        }
        _this._gtag("set", _this._toGtagOptions(args[0]));
      });
      _defineProperty(this, "_gaCommand", function(command) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        switch (command) {
          case "send":
            _this._gaCommandSend.apply(_this, args);
            break;
          case "set":
            _this._gaCommandSet.apply(_this, args);
            break;
          default:
            console.warn("Command doesn't exist: ".concat(command));
        }
      });
      _defineProperty(this, "ga", function() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }
        if (typeof args[0] === "string") {
          _this._gaCommand.apply(_this, args);
        } else {
          var readyCallback = args[0];
          _this._gtag("get", _this._currentMeasurementId, "client_id", function(clientId) {
            _this._isQueuing = false;
            var queues = _this._queueGtag;
            readyCallback({
              get: function get(property) {
                return property === "clientId" ? clientId : property === "trackingId" ? _this._currentMeasurementId : property === "apiVersion" ? "1" : void 0;
              }
            });
            while (queues.length) {
              var queue = queues.shift();
              _this._gtag.apply(_this, _toConsumableArray(queue));
            }
          });
          _this._isQueuing = true;
        }
        return _this.ga;
      });
      _defineProperty(this, "event", function(optionsOrName, params) {
        if (typeof optionsOrName === "string") {
          _this._gtag("event", optionsOrName, _this._toGtagOptions(params));
        } else {
          var action = optionsOrName.action, category = optionsOrName.category, label = optionsOrName.label, value = optionsOrName.value, nonInteraction = optionsOrName.nonInteraction, transport = optionsOrName.transport;
          if (!category || !action) {
            console.warn("args.category AND args.action are required in event()");
            return;
          }
          var fieldObject = {
            hitType: "event",
            eventCategory: (0, _format["default"])(category),
            eventAction: (0, _format["default"])(action)
          };
          if (label) {
            fieldObject.eventLabel = (0, _format["default"])(label);
          }
          if (typeof value !== "undefined") {
            if (typeof value !== "number") {
              console.warn("Expected `args.value` arg to be a Number.");
            } else {
              fieldObject.eventValue = value;
            }
          }
          if (typeof nonInteraction !== "undefined") {
            if (typeof nonInteraction !== "boolean") {
              console.warn("`args.nonInteraction` must be a boolean.");
            } else {
              fieldObject.nonInteraction = nonInteraction;
            }
          }
          if (typeof transport !== "undefined") {
            if (typeof transport !== "string") {
              console.warn("`args.transport` must be a string.");
            } else {
              if (["beacon", "xhr", "image"].indexOf(transport) === -1) {
                console.warn("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`");
              }
              fieldObject.transport = transport;
            }
          }
          _this._gaCommand("send", fieldObject);
        }
      });
      _defineProperty(this, "send", function(fieldObject) {
        _this._gaCommand("send", fieldObject);
      });
      this.reset();
    }
    _createClass(GA42, [{
      key: "gtag",
      value: function gtag2() {
        this._gtag.apply(this, arguments);
      }
    }]);
    return GA42;
  }();
  exports.GA4 = GA4;
  var _default = new GA4();
  exports["default"] = _default;
})(ga4);
(function(exports) {
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = exports.ReactGAImplementation = void 0;
  var _ga = _interopRequireWildcard(ga4);
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { "default": obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  var ReactGAImplementation = _ga.GA4;
  exports.ReactGAImplementation = ReactGAImplementation;
  var _default = _ga["default"];
  exports["default"] = _default;
})(dist);
const ReactGA = /* @__PURE__ */ getDefaultExportFromCjs(dist);
const gaConfig = {
  app_ids: {
    prod: "G-NT3FLN0QHF",
    dev: "G-7TMZEFFWB7"
  },
  dimensions: {
    dev: "dimension1",
    version: "dimension2",
    context: "dimension3"
  }
};
const FIFTYONE_DO_NOT_TRACK_LS = "fiftyone-do-not-track";
function useAnalyticsConsent(disabled) {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const doNotTrack = window.localStorage.getItem(FIFTYONE_DO_NOT_TRACK_LS);
  useEffect(() => {
    if (disabled || doNotTrack === "true" || doNotTrack === "false") {
      setShow(false);
      setReady(true);
    } else {
      setShow(true);
    }
  }, [disabled, doNotTrack]);
  const handleDisable = useCallback(() => {
    window.localStorage.setItem(FIFTYONE_DO_NOT_TRACK_LS, "true");
    setShow(false);
    setReady(true);
  }, []);
  const handleEnable = useCallback(() => {
    window.localStorage.setItem(FIFTYONE_DO_NOT_TRACK_LS, "false");
    setReady(true);
    setShow(false);
  }, []);
  return {
    doNotTrack: doNotTrack === "true" || disabled,
    handleDisable,
    handleEnable,
    ready,
    show
  };
}
function AnalyticsConsent({
  callGA,
  info
}) {
  const [_, setAnalyticsInfo] = useAnalyticsInfo();
  const { doNotTrack, handleDisable, handleEnable, ready, show } = useAnalyticsConsent(info.doNotTrack);
  useEffect(() => {
    if (!ready) {
      return;
    }
    const buildType = info.dev ? "dev" : "prod";
    const writeKey = DEFAULT_WRITE_KEYS[buildType];
    setAnalyticsInfo({
      userId: info.uid,
      userGroup: "fiftyone-oss",
      writeKey,
      doNotTrack,
      debug: info.dev
    });
    !doNotTrack && callGA();
  }, [callGA, doNotTrack, info, ready, setAnalyticsInfo]);
  if (!show) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(PinBottom, null, /* @__PURE__ */ React__default.createElement(
    Grid,
    {
      container: true,
      direction: "column",
      alignItems: "center",
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      backgroundColor: "background.paper"
    },
    /* @__PURE__ */ React__default.createElement(Grid, { padding: 2 }, /* @__PURE__ */ React__default.createElement(Typography, { variant: "h6", marginBottom: 1 }, "Help us improve FiftyOne"), /* @__PURE__ */ React__default.createElement(Typography, { marginBottom: 1 }, "We use cookies to understand how FiftyOne is used and improve the product. You can help us by enabling anonymous analytics."), /* @__PURE__ */ React__default.createElement(Grid, { container: true, gap: 2, justifyContent: "end", direction: "row" }, /* @__PURE__ */ React__default.createElement(Grid, { item: true, alignContent: "center" }, /* @__PURE__ */ React__default.createElement(Link, { style: { cursor: "pointer" }, onClick: handleDisable }, "Disable")), /* @__PURE__ */ React__default.createElement(Grid, { item: true }, /* @__PURE__ */ React__default.createElement(Button, { variant: "contained", onClick: handleEnable }, "Enable"))))
  ));
}
function PinBottom({ children }) {
  return /* @__PURE__ */ React__default.createElement(Box, { position: "fixed", bottom: 0, width: "100%", zIndex: 51 }, children);
}
const useCallGA = (info) => {
  return useCallback(() => {
    const dev = info.dev;
    const buildType = dev ? "dev" : "prod";
    ReactGA.initialize(gaConfig.app_ids[buildType], {
      testMode: false,
      gaOptions: {
        storage: "none",
        cookieDomain: "none",
        clientId: info.uid,
        page_location: "omitted",
        page_path: "omitted",
        version: info.version,
        context: info.context,
        checkProtocolTask: null
        // disable check, allow file:// URLs
      }
    });
  }, [info]);
};
function Analytics({ fragment }) {
  const info = reactRelay.useFragment(
    reactRelay.graphql`
      fragment Analytics on Query {
        context
        dev
        doNotTrack
        uid
        version
      }
    `,
    fragment
  );
  const callGA = useCallGA(info);
  return /* @__PURE__ */ React__default.createElement(AnalyticsConsent, { callGA, info });
}
const Nav = ({ children, fragment }) => {
  const data = reactRelay.useFragment(
    relayRuntime.graphql`
      fragment NavFragment on Query {
        ...Analytics
        ...NavDatasets
      }
    `,
    fragment
  );
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, children, /* @__PURE__ */ React__default.createElement(Analytics, { fragment: data }));
};
const page = "_page_8fb7q_1";
const rest = "_rest_8fb7q_8";
const icons = "_icons_8fb7q_13";
const style = {
  page,
  rest,
  icons
};
export {
  Nav as N,
  Starter as S,
  style as s
};
