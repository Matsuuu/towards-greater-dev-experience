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
        console.log(pokemon);

        /**
          * @type { HTMLImageElement }
          */
        const sprite = document.querySelector(".pokemon-sprite");
        console.log(pokemon.sprites.versions["generation-v"])
        sprite.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;

    });
    //TODO: Make pokedex image alive?

    return html`
        <a href="/">Back</a>
        <section id="pokedex">
            <img class="pokemon-sprite" src="${PokemonState.getActivePokemon()?.url}" />
        </section>
    `;
}
