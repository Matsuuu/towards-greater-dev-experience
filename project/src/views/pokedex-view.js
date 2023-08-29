import { html, render } from "lit";
import { onNavigation } from "suunta";
import { PokemonState } from "../events/state";
import { router } from "../routing/router";
import { getPokemon } from "../service/pokeapi";

export function PokedexView() {

    onNavigation(async () => {
        const currentRoute = router.getCurrentView();
        const pokemonName = currentRoute.properties.pokemonName.toString();
        const pokemon = await getPokemon(pokemonName);
        /** @type { HTMLElement } */
        const pokedex = document.querySelector("#pokedex");

        console.log(pokemon);

    });
    //TODO: Make pokedex image alive?

    return html`
        <a href="/">Back</a>
        <section id="pokedex">
            <img class="pokemon-sprite" src="${PokemonState.getActivePokemon().url}" />
        </section>
    `;
}
