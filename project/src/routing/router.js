import { Suunta } from "suunta";
import { HomeView } from "../views/home-view.js";
import { PokemonList } from "../views/pokemon-list.js";

/**
 * @type { import("suunta").Route[] }
 * */
const routes = [
    {
        path: "/",
        name: "Home",
        view: HomeView,
        children: [
            {
                path: "/",
                name: "PokemonList",
                view: PokemonList
            },
            {
                path: "/<pokemonIndex>{\d+}",
                name: "PokemonList",
                view: PokemonList
            }
        ]
    },
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
        actualRenderer(...args);
        return;
    }
    // @ts-ignore
    document.startViewTransition(() => actualRenderer(...args));
}
