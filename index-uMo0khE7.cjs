"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index-BpoGZlgj.cjs");
const isPlanEventEnabled = require("./is-plan-event-enabled-DtEG06tE.cjs");
function disabledActionDestinations(plan, settings) {
  var _a, _b;
  if (!plan || !Object.keys(plan)) {
    return {};
  }
  var disabledIntegrations = plan.integrations ? Object.keys(plan.integrations).filter(function(i) {
    return plan.integrations[i] === false;
  }) : [];
  var disabledRemotePlugins = [];
  ((_a = settings.remotePlugins) !== null && _a !== void 0 ? _a : []).forEach(function(p) {
    disabledIntegrations.forEach(function(int) {
      if (p.creationName == int) {
        disabledRemotePlugins.push(p.name);
      }
    });
  });
  return ((_b = settings.remotePlugins) !== null && _b !== void 0 ? _b : []).reduce(function(acc, p) {
    if (p.settings["subscriptions"]) {
      if (disabledRemotePlugins.includes(p.name)) {
        p.settings["subscriptions"].forEach(
          // @ts-expect-error parameter 'sub' implicitly has an 'any' type
          function(sub) {
            return acc["".concat(p.name, " ").concat(sub.partnerAction)] = false;
          }
        );
      }
    }
    return acc;
  }, {});
}
function schemaFilter(track, settings) {
  function filter(ctx) {
    var plan = track;
    var ev = ctx.event.event;
    if (plan && ev) {
      var planEvent = plan[ev];
      if (!isPlanEventEnabled.isPlanEventEnabled(plan, planEvent)) {
        ctx.updateEvent("integrations", index.__assign(index.__assign({}, ctx.event.integrations), { All: false, "Segment.io": true }));
        return ctx;
      } else {
        var disabledActions = disabledActionDestinations(planEvent, settings);
        ctx.updateEvent("integrations", index.__assign(index.__assign(index.__assign({}, ctx.event.integrations), planEvent === null || planEvent === void 0 ? void 0 : planEvent.integrations), disabledActions));
      }
    }
    return ctx;
  }
  return {
    name: "Schema Filter",
    version: "0.1.0",
    isLoaded: function() {
      return true;
    },
    load: function() {
      return Promise.resolve();
    },
    type: "before",
    page: filter,
    alias: filter,
    track: filter,
    identify: filter,
    group: filter
  };
}
exports.schemaFilter = schemaFilter;
