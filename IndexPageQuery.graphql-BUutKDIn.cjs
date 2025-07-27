"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const node = /* @__PURE__ */ function() {
  var v0 = {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  }, v1 = {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }, v2 = {
    "defaultValue": "",
    "kind": "LocalArgument",
    "name": "search"
  }, v3 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "colorBy",
    "storageKey": null
  }, v4 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "colorPool",
    "storageKey": null
  }, v5 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "colorscale",
    "storageKey": null
  }, v6 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "multicolorKeypoints",
    "storageKey": null
  }, v7 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "showSkeletons",
    "storageKey": null
  }, v8 = {
    "alias": "allDatasets",
    "args": null,
    "kind": "ScalarField",
    "name": "estimatedDatasetCount",
    "storageKey": null
  }, v9 = [
    {
      "kind": "Variable",
      "name": "after",
      "variableName": "cursor"
    },
    {
      "kind": "Variable",
      "name": "first",
      "variableName": "count"
    },
    {
      "kind": "Variable",
      "name": "search",
      "variableName": "search"
    }
  ];
  return {
    "fragment": {
      "argumentDefinitions": [
        v0,
        v1,
        v2
      ],
      "kind": "Fragment",
      "metadata": null,
      "name": "IndexPageQuery",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AppConfig",
          "kind": "LinkedField",
          "name": "config",
          "plural": false,
          "selections": [
            v3,
            v4,
            v5,
            v6,
            v7
          ],
          "storageKey": null
        },
        v8,
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NavFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "configFragment"
        }
      ],
      "type": "Query",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": [
        v2,
        v0,
        v1
      ],
      "kind": "Operation",
      "name": "IndexPageQuery",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AppConfig",
          "kind": "LinkedField",
          "name": "config",
          "plural": false,
          "selections": [
            v3,
            v4,
            v5,
            v6,
            v7,
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "disableFrameFiltering",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "gridZoom",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lightningThreshold",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "loopVideos",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mediaFallback",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "notebookHeight",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "plugins",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "showConfidence",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "showIndex",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "showLabel",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "showTooltip",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "sidebarMode",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "theme",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "timezone",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "useFrameNumber",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        v8,
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "context",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dev",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "doNotTrack",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "uid",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "version",
          "storageKey": null
        },
        {
          "alias": null,
          "args": v9,
          "concreteType": "DatasetStrConnection",
          "kind": "LinkedField",
          "name": "datasets",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "total",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "DatasetStrEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Dataset",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "DatasetStrPageInfo",
              "kind": "LinkedField",
              "name": "pageInfo",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endCursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": v9,
          "filters": [
            "search"
          ],
          "handle": "connection",
          "key": "DatasetsList_query_datasets",
          "kind": "LinkedHandle",
          "name": "datasets"
        },
        v5
      ]
    },
    "params": {
      "cacheID": "05f56de90a0cbfbb66f3a07626559761",
      "id": null,
      "metadata": {},
      "name": "IndexPageQuery",
      "operationKind": "query",
      "text": 'query IndexPageQuery(\n  $search: String = ""\n  $count: Int\n  $cursor: String\n) {\n  config {\n    colorBy\n    colorPool\n    colorscale\n    multicolorKeypoints\n    showSkeletons\n  }\n  allDatasets: estimatedDatasetCount\n  ...NavFragment\n  ...configFragment\n}\n\nfragment Analytics on Query {\n  context\n  dev\n  doNotTrack\n  uid\n  version\n}\n\nfragment NavDatasets on Query {\n  datasets(search: $search, first: $count, after: $cursor) {\n    total\n    edges {\n      cursor\n      node {\n        name\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment NavFragment on Query {\n  ...Analytics\n  ...NavDatasets\n}\n\nfragment configFragment on Query {\n  config {\n    colorBy\n    colorPool\n    colorscale\n    disableFrameFiltering\n    gridZoom\n    lightningThreshold\n    loopVideos\n    mediaFallback\n    multicolorKeypoints\n    notebookHeight\n    plugins\n    showConfidence\n    showIndex\n    showLabel\n    showSkeletons\n    showTooltip\n    sidebarMode\n    theme\n    timezone\n    useFrameNumber\n  }\n  colorscale\n}\n'
    }
  };
}();
node.hash = "0e29568fa34b45baaa1d820d64dbe63f";
exports.default = node;
