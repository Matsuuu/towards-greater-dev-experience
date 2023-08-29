import { getPokemonImageByUrl } from "../service/pokeapi";

export class SetActivePokemonEvent extends Event {
    static eventName = "set-active-pokemon-event";

    /**
     * @param {object} pokemon
     */
    constructor(pokemon) {
        super(SetActivePokemonEvent.eventName);
        this.pokemonName = pokemon.name;
        this.pokemonImage = getPokemonImageByUrl(pokemon.url);
        this.pokemonUrl = pokemon.url;
    }
}
