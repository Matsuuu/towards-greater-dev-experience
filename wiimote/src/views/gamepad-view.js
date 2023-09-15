import { html } from "lit"
import { onNavigation } from "suunta";
import "../components/gamepad-diag.js";

export const GamepadView = () => {

    console.log("Loaded");

    return html`
        <h1>Game Pad API</h1>

        <a href="/">Home</a>
        <gamepad-diagnostic></gamepad-diagnostic>
    `;
}
