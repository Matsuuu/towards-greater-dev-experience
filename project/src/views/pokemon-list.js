import { html, render } from "lit";
import { onNavigation } from "suunta";
import { getPokemonImage, getPokemonImageByUrl, getPokemonIndexFromUrl, getPokemonList } from "../service/pokeapi";

export async function PokemonList() {

    const pokemons = await getPokemonList();
    console.log(pokemons);

    /** @type { HTMLElement } */
    const listing = (document.querySelector("#pokemon-listing"));

    return html`
        <p>Pokemans</p>
        <section id="pokemon-listing">
            <ul>
                ${pokemons.map(poke => html`
                        <a href="/${poke.name}" @click=${addTransitionClass} >
                            <li>
                                    <label>${poke.name}</label>
                                    <img class="${window.targetPokemonName === poke.name ? 'main-sprite' : ''}" src="${getPokemonImageByUrl(poke.url)}" />
                            </li>
                        </a>
                `)}
            </ul>
        </section>
    `;
}

function addTransitionClass(e) {
    document.querySelectorAll(".main-sprite").forEach(el => el.classList.remove("main-sprite"));

    const link = e.target.closest("a")
    const target = link.querySelector("img");
    target.classList.add("main-sprite");
    // @ts-ignore
    window.targetPokemonName = link.querySelector("label").innerText.toLowerCase();
    // @ts-ignore
    window.targetPokemonSprite = target.src;
}
