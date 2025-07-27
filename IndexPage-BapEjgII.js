import { r as relayRuntime, a as reactRelay, S as Snackbar } from "./index-CvS5YflC.js";
import { N as Nav, s as style, S as Starter } from "./index.module-Bmrk9OR-.js";
import React__default from "react";
const IndexPageQueryNode = relayRuntime.graphql`
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
  const queryRef = reactRelay.usePreloadedQuery(IndexPageQueryNode, prepared);
  const totalDatasets = queryRef.allDatasets;
  return /* @__PURE__ */ React__default.createElement(Nav, { fragment: queryRef, hasDataset: false }, /* @__PURE__ */ React__default.createElement("div", { className: style.page, "data-cy": "index-page" }, /* @__PURE__ */ React__default.createElement(
    Starter,
    {
      mode: totalDatasets === 0 ? "ADD_DATASET" : "SELECT_DATASET"
    }
  )), /* @__PURE__ */ React__default.createElement(Snackbar, null));
};
export {
  IndexPage as default
};
