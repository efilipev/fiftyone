import s from "./IndexPageQuery.graphql-CvdlA7Vz.mjs";
import { r as o, S as l } from "./index-DhESz6lu.mjs";
import { N as n, s as m, S as c } from "./index.module-FsAl3M7A.mjs";
import e from "react";
const d = s, D = ({
  prepared: t
}) => {
  const a = o.usePreloadedQuery(d, t), r = a.allDatasets;
  return /* @__PURE__ */ e.createElement(n, {
    fragment: a,
    hasDataset: !1
  }, /* @__PURE__ */ e.createElement("div", {
    className: m.page,
    "data-cy": "index-page"
  }, /* @__PURE__ */ e.createElement(c, {
    mode: r === 0 ? "ADD_DATASET" : "SELECT_DATASET"
  })), /* @__PURE__ */ e.createElement(l, null));
};
export {
  D as default
};
