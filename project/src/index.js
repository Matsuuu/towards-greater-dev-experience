import { debugBubble } from "debug-bubble";
import { router } from "./routing/router.js";

router.start();

setTimeout(() => {
    // @ts-ignore
    if (window.__WDS_WEB_SOCKET__) {
        debugBubble("Loaded", "Project loaded in development mode", 2);
    }
});
