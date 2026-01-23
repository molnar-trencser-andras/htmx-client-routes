// htmx-client-routes npm package entry point
import htmx, { type HtmxSwapSpecification } from "htmx.org";
import type { HtmxEventDetail } from "../shared/utils/types";
import {
  clearParams,
  getRoute,
  getRouteParams,
  addRoute,
} from "../shared/utils/routes";
import { watchAfterRendered } from "../shared/utils/htmx-functions";
import { isUrlFromString, isUrl, createUrlPattern } from "../shared/utils/url";
import { debounce } from "../shared/utils/debounce";

// Note: React integration is available as a separate import:
// import { loadReactComponent } from 'htmx-client-routes/react';

// Initialize the extension
const htmxClientRoutes = {
  init: function (parentElt?: HTMLElement): void {
    const rootElt = parentElt || document.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rootElt as any).addEventListener(
      "htmx:configRequest",
      async (evt: CustomEvent & { detail: HtmxEventDetail }) => {
        const {
          detail: { path, target, elt, requestConfig },
        } = evt;

        const route = getRoute(path);
        if (route) {
          evt.preventDefault();
          const { handler } = route;
          let responseHTML;

          if (typeof handler === "function") {
            const ret = await handler({
              params: {
                ...getRouteParams(path, route),
                ...clearParams(requestConfig?.parameters || {}),
              },
              elt,
            });

            if (ret) {
              responseHTML = ret as string;
            }
          } else if (typeof handler === "string") {
            responseHTML = handler;
          }

          if (responseHTML) {
            const swap = elt.getAttribute("hx-swap") || "innerHTML";
            htmx.swap(target, responseHTML, {
              swapStyle: swap,
              swapDelay: 0,
              settleDelay: 20,
            } as HtmxSwapSpecification);
          }
        }
      },
    );

    console.log("htmx-client-routes initialized");
  },
};

// Auto-initialize if htmx is available
if (typeof window !== "undefined" && window.document) {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof htmx !== "undefined") {
      htmxClientRoutes.init();
    }
  });
}

// Register as an htmx extension
if (typeof htmx !== "undefined") {
  htmx.defineExtension("client-routes", {
    onEvent: function (name: string): boolean {
      if (name === "htmx:load") {
        htmxClientRoutes.init();
      }
      return true;
    },
  });
}

const init = htmxClientRoutes.init;

// Re-export all the types and functions
export type {
  HtmxEventDetail,
  ParamType,
  Route,
  RouteHandler,
  HandlerFunctionParams,
} from "../shared/utils/types";

export {
  clearParams,
  getRoute,
  getRouteParams,
  addRoute,
  watchAfterRendered,
  isUrlFromString,
  isUrl,
  createUrlPattern,
  debounce,
  init,
};

export default htmxClientRoutes;
