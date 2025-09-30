import "./App.css";
import "./route";

function App() {
  return (
    <>
      <h1 hx-get="/hello" hx-trigger="load" data-testid="hello-title">
        ..........
      </h1>

      <button hx-get="/clicked/0" hx-swap="outerHTML" data-testid="replace-button">
        Click to replace!
      </button>

      <p>The DemoComp below is loaded by htmx when you scroll down to it.</p>

      <div
        style={{ marginTop: "100vh" }}
        hx-get="/load/DemoComp"
        hx-swap="innerHTML"
        hx-trigger="revealed"
        data-testid="demo-placeholder"
      >
        Component placeholder
      </div>
    </>
  );
}

export default App;
