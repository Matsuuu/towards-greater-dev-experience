import { SetActivePokemonEvent } from "./set-active-pokemon-event.js";

class EventBus extends EventTarget {
}

export const Events = new EventBus();

class ActivePokemonState {

    #state = {};

    constructor() {
        Events.addEventListener(SetActivePokemonEvent.eventName, (/** @type SetActivePokemonEvent */ e) => {
            this.#state.activePokemon = { name: e.pokemonName, url: e.pokemonImage };
            console.log("Active pokemon set to ", this.#state.activePokemon);
        })
    }

    getActivePokemon() {
        return this.#state.activePokemon;
    }
}

export const PokemonState = new ActivePokemonState();
