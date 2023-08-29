import { css, html, LitElement } from "lit";
import { SetActivePokemonEvent } from "../events/set-active-pokemon-event.js";
import { Events, PokemonState } from "../events/state.js";
import { getPokemonImageByUrl } from "../service/pokeapi.js";
// @ts-ignore
//
//
import Styles from "../../main.css" assert { type: "css" };

export class PokemonListEntry extends LitElement {
    static properties = {
        pokemon: { type: Object },
        activePokemon: { type: Boolean, attribute: "active-pokemon", reflect: true, },
    };

    constructor() {
        super();
        this.pokemon = undefined;
        this.activePokemon = false;
    }

    onSelect() {
        Events.dispatchEvent(new CustomEvent("clear-selections"));
        Events.dispatchEvent(new SetActivePokemonEvent(this.pokemon));
        this.activePokemon = true;
    }

    firstUpdated() {
        Events.addEventListener("clear-selections", () => {
            this.activePokemon = false;
        });
        if (PokemonState.getActivePokemon()?.name === this.pokemon.name) {
            this.activePokemon = true;
        }
    }

    render() {
        return html`
          <a href="/${this.pokemon.name}" @click=${this.onSelect}>
            <label>${this.pokemon.name}</label>
            <img src="${getPokemonImageByUrl(this.pokemon.url)}" />
          </a>
    `;
    }

    static styles = [Styles, css`

    :host([active-pokemon]) {
      view-transition-name: pokemon-sprite;
    }

    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      padding: 0.2rem;
      border-radius: 2px;
      transition: 100ms ease-in-out;
    }

    :host(:hover) {
      background: rgba(255, 255, 255, 0.1);
      cursor: pointer;
    }

  `,];
}

customElements.define("pokemon-list-entry", PokemonListEntry);
