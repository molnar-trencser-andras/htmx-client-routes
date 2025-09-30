interface Props {
  fetchResult?: string;
}

const DemoComp = ({ fetchResult }: Props) => {
  return (
    <div data-testid="DemoComp">
      <h2>This is a React Component loaded by htmx!</h2>
      {fetchResult && <p>Fetch result: {fetchResult}</p>}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <button hx-get="/clicked/0" hx-swap="outerHTML" data-testid="demo-replace-button">
        Click to replace!
      </button>
    </div>
  );
};

export default DemoComp;
