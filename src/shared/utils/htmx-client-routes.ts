import htmx, { type HtmxSwapSpecification } from "htmx.org";
import type { HtmxEventDetail } from "./types";
import { clearParams, getRoute, getRouteParams } from "./routes";

type HtmxEvent = CustomEvent & {
  detail: HtmxEventDetail;
};

const initHtmxClientRoutes = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (document.body as any).addEventListener(
    "htmx:configRequest",
    async (evt: HtmxEvent) => {
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
          } as HtmxSwapSpecification);
        }
      }
    },
  );
};

initHtmxClientRoutes();
