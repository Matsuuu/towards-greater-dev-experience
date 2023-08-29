import { html, render } from "lit";
import { getPokemonList } from "../service/pokeapi";
import "./pokemon-list-entry.js";

export async function PokemonList() {

    const pokemons = await getPokemonList();
    console.log(pokemons);

    return html`
        <p>Pokemans</p>
        <section id="pokemon-listing">
            <ul>
                ${pokemons.map(poke => html`
                    <pokemon-list-entry .pokemon=${poke}></pokemon-list-entry>
                `)}
            </ul>
        </section>
    `;
}
