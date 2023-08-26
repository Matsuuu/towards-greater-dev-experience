import { LitElement, html, css } from "https://esm.run/lit";

class CalcElem extends LitElement {

    static get properties() {
        return {
            result: { type: String }
        }
    }

    firstUpdated() {
        const equation = this.innerText;
        this.result = eval(equation);
    }

    render() {
        return html`
            <slot></slot><span> = ${this.result}</span>
        `
    }

    static styles = css`
        :host {
            display: block;
        }

        span {
            font-weight: bold;
        }
    `
}

customElements.define("calc-elem", CalcElem);
