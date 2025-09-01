import { createRoot } from "react-dom/client";
import { watchAfterRendered } from "./htmx-functions";

type ComponentType = React.ComponentType<Record<string, string>>;

const loaderSVG = `<p class="text-center">
          <svg
            class="fs-1 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path
              d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
            ></path>
          </svg>
        </p> `;

export const loadReactComponent = (
  componentName: string,
  Component: ComponentType,
  componentProps: Record<string, unknown> = {},
  loader = true,
): string => {
  const id = crypto.randomUUID().toString();
  // actual content or empty
  const starterContent: string =
    document.querySelector(`[data-react-component-name="${componentName}"]`)
      ?.innerHTML || (loader ? loaderSVG : "");

  setTimeout(() => {
    const newElement = document.querySelector(`[data-react-id="${id}"]`);
    if (!newElement) {
      console.error(
        `New element not found:[data-react-id="${id}"] for ${componentName}`,
      );
      return;
    }
    const props = { ...componentProps, parentId: id };
    const newRoot = createRoot(newElement);
    newRoot.render(<Component {...props} />);
    // after rendered
    watchAfterRendered(undefined, 500);
  });

  return `<div data-react-id="${id}" data-react-component-name="${componentName}" data-testid="${componentName}">${starterContent}</div>`;
};

export const setLoader = (element: HTMLElement): void => {
  element.innerHTML = loaderSVG;
};
