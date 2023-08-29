import { css, html, LitElement } from "lit";
import { SetActivePokemonEvent } from "../events/set-active-pokemon-event.js";
import { Events, PokemonState } from "../events/state.js";
import { getPokemonImageByUrl } from "../service/pokeapi.js";

export class PokemonListEntry extends LitElement {

    static properties = {
        pokemon: { type: Object },
        activePokemon: { type: Boolean, attribute: "active-pokemon", reflect: true }
    };

    constructor() {
        super();
        this.pokemon = undefined;
        this.activePokemon = false;
    }

    addTransitionClass(e) {
        Events.dispatchEvent(new CustomEvent("clear-selections"));
        Events.dispatchEvent(new SetActivePokemonEvent(this.pokemon))
        this.activePokemon = true;
    }

    firstUpdated() {
        Events.addEventListener("clear-selections", () => {
            this.activePokemon = false;
        });
        if (PokemonState.getActivePokemon()?.name === this.pokemon.name) {
            this.activePokemon = true;
            console.log("Activepokemon set to true");
            console.log(this);
        }
    }

    render() {
        return html`
            <a href="/${this.pokemon.name}" @click=${this.addTransitionClass}>
                <label>${this.pokemon.name}</label>
                <img src="${getPokemonImageByUrl(this.pokemon.url)}" />
            </a>
        `;
    }

    static styles = css`
        :host([active-pokemon]) {
            view-transition-name: pokemon-sprite;
        }

:host {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    border: 1px solid #fff;
    padding: 0.2rem;
    border-radius: 2px;
    transition: 100ms ease-in-out;
}

:host(:hover) {
    background: rgba(255,255,255, 0.1);
    cursor: pointer;
}

a {
    display: flex;
    flex-direction: column;
    justify-content:center;
    color: inherit;
    text-decoration: none;
    text-align: center;
}

label {
    text-transform: capitalize;
}

    `
}

customElements.define("pokemon-list-entry", PokemonListEntry);
