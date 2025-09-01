import { addRoute } from "./shared/utils/routes";
import { loadReactComponent, setLoader } from "./shared/utils/htmx-react";
import React from "react";
import { callMockApi } from "./api";
import type { ParamType, RouteHandler } from "./shared/utils/types";

interface clickedParams extends ParamType {
  index: number;
}

addRoute<clickedParams>(
  "/clicked/{index}",
  ({ params }): RouteHandler<clickedParams> => {
    const { index } = params;

    return `<button hx-get="/clicked/${index + 1}" hx-swap="outerHTML">
        Hey, you clicked me! (${index})
    </button>`;
  },
);

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
