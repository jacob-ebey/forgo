import { JSDOM } from "jsdom";
import htmlFile from "../htmlFile";
import { run } from "./script";
import * as should from "should";

export default function componentMount() {
  it("runs afterRender() after render()", async () => {
    const dom = new JSDOM(htmlFile(), {
      runScripts: "outside-only",
      resources: "usable",
    });
    const window = dom.window;

    run(dom);

    await new Promise<void>((resolve) => {
      window.addEventListener("load", () => {
        resolve();
      });
    });

    should.equal((window as any).componentCounter, 10);
    (window as any).renderAgain();
    should.equal((window as any).componentCounter, 20);
    (window as any).renderAgain();
    should.equal((window as any).componentCounter, 30);
  });
}