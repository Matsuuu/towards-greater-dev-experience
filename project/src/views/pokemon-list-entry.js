import { css, html, LitElement } from "lit";
import { getPokemonImageByUrl } from "../service/pokeapi";

export class PokemonListEntry extends LitElement {

    static properties = {
        pokemon: { type: Object }
    }

    /**
     * @type {object}
     */
    pokemon = undefined;

    addTransitionClass(e) {
        // TODO: Do this via event
        this.parentElement.querySelectorAll(".main-sprite").forEach(el => el.classList.remove("main-sprite"));

        const link = e.target.closest("a")
        const target = link.querySelector("img");
        target.classList.add("main-sprite");
        // @ts-ignore
        window.targetPokemonName = link.querySelector("label").innerText.toLowerCase();
        // @ts-ignore
        window.targetPokemonSprite = target.src;
    }

    render() {
        return html`
            <a href="/${this.pokemon.name}" @click=${this.addTransitionClass}>
                <label>${this.pokemon.name}</label>
                <img class="${window.targetPokemonName === this.pokemon.name ? 'main-sprite' : ''}" src="${getPokemonImageByUrl(this.pokemon.url)}" />
            </a>
        `;
    }

    static styles = css`
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
