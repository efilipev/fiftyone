import s from "./IndexPageQuery.graphql-CvdlA7Vz.mjs";
import { r as n, R as e, S as o } from "./index-CP_g3VwS.mjs";
import { N as l, s as c, S as m } from "./index.module-B_Zjnccx.mjs";
const d = s, D = ({
  prepared: t
}) => {
  const a = n.usePreloadedQuery(d, t), r = a.allDatasets;
  return /* @__PURE__ */ e.createElement(l, {
    fragment: a,
    hasDataset: !1
  }, /* @__PURE__ */ e.createElement("div", {
    className: c.page,
    "data-cy": "index-page"
  }, /* @__PURE__ */ e.createElement(m, {
    mode: r === 0 ? "ADD_DATASET" : "SELECT_DATASET"
  })), /* @__PURE__ */ e.createElement(o, null));
};
export {
  D as default
};
