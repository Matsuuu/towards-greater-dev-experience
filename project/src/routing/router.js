// @ts-nocheck
import { Suunta } from "suunta";
import { PokedexView } from "../views/pokedex-view.js";
import { PokemonList } from "../views/pokemon-list.js";

/**
 * @type { import("suunta").Route[] }
 * */
const routes = [
    {
        path: "/",
        name: "PokemonList",
        view: PokemonList
    },
    {
        path: "/{pokemonName}",
        name: "PokemonList",
        view: PokedexView
    }
];

/**
 * @type { import("suunta").SuuntaInitOptions }
 * */
const options = {
    routes
}

export const router = new Suunta(options);

// Add view transitions
// // TODO: Make Suunta expose options
// @ts-ignore
const actualRenderer = router.options.renderer;
// @ts-ignore
router.options.renderer = (...args) => {
    // @ts-ignore
    if (!document.startViewTransition) {
        // @ts-ignore
        actualRenderer(...args);
        return;
    }
    // @ts-ignore
    document.startViewTransition(async () => {
        // @ts-ignore
        actualRenderer(...args);
    });
}
