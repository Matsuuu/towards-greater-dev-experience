import { debugBubble } from "debug-bubble";
import { html } from "lit"
import { WiiMote } from "../util";

export const HomeView = () => {
    const aa = new WiiMote(() => debugBubble("SWING", "WOO"));
    return html`
        <h2>Hello world!</h2>
        <a href="/foo">Foo</a>
        <a href="/gamepad">Gamepad API</a>
        <button @click=${() => aa.addMote()}>Add Mote</button>
    

    `;
}
