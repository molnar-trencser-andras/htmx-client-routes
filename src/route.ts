import { addRoute } from "./shared/utils/routes";
import { loadReactComponent, setLoader } from "./shared/utils/htmx-react";
import React from "react";
import { callMockApi } from "./api";
import type { ParamType, RouteHandler } from "./shared/utils/types";

interface ClickedParams extends ParamType {
  index: number;
}

// return string
addRoute("/hello", "Hello");

// return function result
addRoute<ClickedParams>(
  "/clicked/{index}",
  ({ params }): RouteHandler<ClickedParams> => {
    const { index } = params;

    return `<button hx-get="/clicked/${index + 1}" hx-swap="outerHTML">
        Hey, you clicked me! (${index})
    </button>`;
  },
);

// return async function result that loads a React component
addRoute("/load/DemoComp", async ({ elt }) => {
  setLoader(elt);

  const { resultText } = await callMockApi();

  return loadReactComponent(
    "DemoComp",
    React.lazy(() => import("./DemoComp")),
    { fetchResult: resultText },
    // false,
  );
});
