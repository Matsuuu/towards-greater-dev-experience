import { html, render } from "lit";
import { onNavigation } from "suunta";
import { getPokemonImage, getPokemonImageByUrl, getPokemonIndexFromUrl, getPokemonList } from "../service/pokeapi";

export function PokemonList() {

    onNavigation(async () => {
        const pokemons = await getPokemonList();
        console.log(pokemons);

        /** @type { HTMLElement } */
        const listing = (document.querySelector("#pokemon-listing"));

        console.log(listing);
        render(html`
            <ul>
                ${pokemons.map(poke => html`
                        <a href="/${poke.name}" @mouseenter=${addTransitionClass} @mouseleave=${removeTransitionClass}>
                            <li>
                                    <label>${poke.name}</label>
                                    <img src="${getPokemonImageByUrl(poke.url)}" />
                            </li>
                        </a>
                `)}
            </ul>
        `, listing);
    })

    return html`
        <p>Pokemans</p>
        <section id="pokemon-listing">

        </section>
    `;
}

function addTransitionClass(e) {
    const target = e.target.querySelector("img");
    target.classList.add("main-sprite");
    // @ts-ignore
    window.targetPokemonSprite = target.src;
}

function removeTransitionClass(e) {
    const target = e.target.querySelector("img");
    target.classList.remove("main-sprite");
}
