// htmx-client-routes npm package entry point
import htmx from "htmx.org";
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

// htmx 4 carries request values in `ctx.request.body` (FormData) instead of the
// old `requestConfig.parameters` proxy. Convert it to a plain object for clearParams.
const formDataToParams = (formData?: FormData): Record<string, unknown> => {
  if (!formData) return {};
  const obj: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const existing = obj[key];
      obj[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else {
      obj[key] = value;
    }
  });
  return obj;
};

// Guard against double-binding the listener if init() is called more than once.
const boundRoots = new WeakSet<EventTarget>();

// Initialize the extension
const onConfigRequest: EventListener = async (evt) => {
  const { ctx } = (evt as CustomEvent & { detail: HtmxEventDetail }).detail;
  const path = ctx.request.action;
  const target = ctx.target;
  const elt = ctx.sourceElement as HTMLElement;

  const route = getRoute(path);
  if (route) {
    evt.preventDefault();
    const { handler } = route;
    let responseHTML;

    if (typeof handler === "function") {
      const ret = await handler({
        params: {
          ...getRouteParams(path, route),
          ...clearParams(formDataToParams(ctx.request.body)),
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
      const swap = elt.getAttribute("hx-swap") || htmx.config.defaultSwap;
      await htmx.swap({
        text: responseHTML,
        sourceElement: elt,
        target,
        swap,
      });
    }
  }
};

const htmxClientRoutes = {
  init: function (parentElt?: HTMLElement): void {
    const rootElt = parentElt || document.body;
    if (boundRoots.has(rootElt)) return;
    boundRoots.add(rootElt);

    rootElt.addEventListener("htmx:config:request", onConfigRequest);

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

// Register as an htmx 4 extension. htmx 4 removed the callback-based extension
// API (onEvent/transformResponse/...) in favour of event hooks; registerExtension's
// `init()` is called by htmx when the extension loads (e.g. via `hx-ext`), which
// replaces the old `htmx:load` re-init behaviour.
if (typeof htmx !== "undefined") {
  htmx.registerExtension("client-routes", {
    init: function (): void {
      htmxClientRoutes.init();
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
