import htmx from "htmx.org";
import { debounce } from "./debounce";

export const watchAfterRendered = (
  targetElement?: HTMLElement,
  ms = 100,
): void => debounce(() => htmx.process(targetElement || document.body), ms)();
