import { DOMWindow, JSDOM } from "jsdom";
import { ForgoRenderArgs, mount, rerender, setCustomEnv } from "../../../dist";

let window: DOMWindow;
let document: HTMLDocument;
let counter = 0;

function Component() {
  return {
    render(props: any, args: ForgoRenderArgs) {
      window.renderAgain = () => rerender(args.element);
      counter++;
      return counter === 1 ? (
        <>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </>
      ) : counter === 2 ? (
        <p>4</p>
      ) : (
        <>
          <p>5</p>
          <p>6</p>
          <p>7</p>
        </>
      );
    },
    unmount() {
      window.unmountCounter++;
    },
  };
}

export function run(dom: JSDOM) {
  window = dom.window;
  document = window.document;
  window.unmountCounter = 0;
  setCustomEnv({ window, document });

  window.addEventListener("load", () => {
    mount(<Component />, window.document.getElementById("root"));
  });
}
