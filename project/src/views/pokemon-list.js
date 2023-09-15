import { html } from "lit";
import { getPokemonList } from "../service/pokeapi.js";
import "./pokemon-list-entry.js";

export async function PokemonList() {

    const pokemons = await getPokemonList();

    return html`
        <p>Pokemans</p>
        <section id="pokemon-listing">
            <ul>
                ${pokemons.map((/** @type { import("../types/types.js").Pokemon } */ poke) => html`
                    <pokemon-list-entry .pokemon=${poke}></pokemon-list-entry>
                `)}
            </ul>
        </section>
    `;
}
