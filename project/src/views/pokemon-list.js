import { html, render } from "lit";
import { onNavigation } from "suunta";
import { router } from "../routing/router";
import { getPokemonImage, getPokemonImageByUrl, getPokemonList } from "../service/pokeapi";

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
                    <li>
                        <label>${poke.name}</label>
                        <img src="${getPokemonImageByUrl(poke.url)}" />
                    </li>
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
