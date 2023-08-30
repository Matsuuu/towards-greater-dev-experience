import { debugBubble } from "debug-bubble";
import { router } from "./routing/router.js";

/**
 * @param {any[]} someArray
 */
function printArray(someArray) {
    someArray.forEach(value => console.log(value));
}

printArray([1, 2, 3]);
// printArray("Foo");

router.start();

setTimeout(() => {
    // @ts-ignore
    if (window.__WDS_WEB_SOCKET__) {
        debugBubble("Loaded", "Project loaded in development mode", 2);
    }
});
