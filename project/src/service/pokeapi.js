const API_URL = "https://pokeapi.co/api/v2/";
const ASSET_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

// ASSET https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png

// https://pokeapi.co/docs/v2

export function getPokemonList(limit = 20, offset = 0) {
    const target = new URL("pokemon", API_URL);
    target.search = new URLSearchParams({ limit: limit + '', offset: offset + '' }).toString();

    return fetch(target).then(res => res.json()).then(json => json.results);
}

/**
 * @param {string | number} [index]
 */
export function getPokemonImage(index) {
    return ASSET_URL + leftPad(index) + ".png";
}

export function getPokemonImageByUrl(url = "") {
    console.log(url.split("/").filter(s => s.length).at(-1));
    return getPokemonImage(url.split("/").filter(s => s.length).at(-1));
}

/**
 * @param {string | number} number
 */
function leftPad(number) {
    return number.toString().padStart(3, "0");
}
