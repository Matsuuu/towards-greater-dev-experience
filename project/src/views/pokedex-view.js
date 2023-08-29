import { html, render } from "lit";
import { onNavigation } from "suunta";
import { PokemonState } from "../events/state.js";
import { router } from "../routing/router.js";
import { getPokemon } from "../service/pokeapi.js";

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
        sprite.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;

        /** @type { HTMLElement } */
        const content = document.querySelector(".pokedex-content");

        render(html`
            <h2>${pokemon.name}</h2>
            <ul>
                ${pokemon.stats.map(stat => html`
                    <li>${stat.stat.name}: ${stat.base_stat}</li>
                `)}
            </ul>
        `, content);

    });

    return html`
        <section id="pokedex">
            <a href="/"><</a>
            <div class="pokedex-display">
                <img class="pokemon-sprite" src="${PokemonState.getActivePokemon()?.url}" />
            </div>

            <div class="pokedex-content">

            </div>
        </section>
    `;
}
