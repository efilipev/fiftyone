"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index-BpoGZlgj.cjs");
const index_module = require("./index.module-BJmwKTiA.cjs");
const React = require("react");
const IndexPageQueryNode = index.relayRuntime.graphql`
  query IndexPageQuery($search: String = "", $count: Int, $cursor: String) {
    config {
      colorBy
      colorPool
      colorscale
      multicolorKeypoints
      showSkeletons
    }
    allDatasets: estimatedDatasetCount
    ...NavFragment
    ...configFragment
  }
`;
const IndexPage = ({ prepared }) => {
  const queryRef = index.reactRelay.usePreloadedQuery(IndexPageQueryNode, prepared);
  const totalDatasets = queryRef.allDatasets;
  return /* @__PURE__ */ React.createElement(index_module.Nav, { fragment: queryRef, hasDataset: false }, /* @__PURE__ */ React.createElement("div", { className: index_module.style.page, "data-cy": "index-page" }, /* @__PURE__ */ React.createElement(
    index_module.Starter,
    {
      mode: totalDatasets === 0 ? "ADD_DATASET" : "SELECT_DATASET"
    }
  )), /* @__PURE__ */ React.createElement(index.Snackbar, null));
};
exports.default = IndexPage;
