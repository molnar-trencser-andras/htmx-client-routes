import htmx from "htmx.org";
import type { HtmxEventDetail } from "./types";
import { clearParams, getRoute, getRouteParams } from "./routes";

type HtmxEvent = CustomEvent & {
  detail: HtmxEventDetail;
};

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

const onConfigRequest: EventListener = async (evt) => {
  const { ctx } = (evt as HtmxEvent).detail;
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

const initHtmxClientRoutes = (): void => {
  document.body.addEventListener("htmx:config:request", onConfigRequest);
};

initHtmxClientRoutes();
