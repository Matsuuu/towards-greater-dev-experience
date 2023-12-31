import { Suunta } from "suunta";
import { FooView } from "../views/foo-view.js";
import { GamepadView } from "../views/gamepad-view.js";
import { HomeView } from "../views/home-view.js";

/**
 * @type { import("suunta").Route[] }
 * */
const routes = [
    {
        path: "/",
        name: "Home",
        view: HomeView
    },
    {
        path: "/foo",
        name: "FooView",
        view: FooView
    }, {
        path: "/gamepad",
        name: "GamePad",
        view: GamepadView
    }
];

/**
 * @type { import("suunta").SuuntaInitOptions }
 * */
const options = {
    routes
}

export const router = new Suunta(options);
