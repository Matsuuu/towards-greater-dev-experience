import { debugBubble } from "debug-bubble";

export class WiiMote {
    constructor(onSwing) {
        this.controllers = [];
        this.controllerHID = null;
        this.HIDInfo = {
            accelerometer: {
                x: 0,
                y: 0,
                z: 0
            }
        };
        this.swung = false;
        this.onSwing = onSwing;


        this.listen();
        navigator.hid.getDevices().then(res => {
            if (res.length > 0) {
                this.handleMote(res[0]);
            }
        })
    }

    async addMote() {
        const devices = await navigator.hid.requestDevice({
            filters: [{ vendorId: 0x057e }],
        });

        const device = devices[0];
        this.handleMote(device);
    }

    async handleMote(mote) {
        this.controllerHID = mote;
        await this.controllerHID.open();
        this.controllerHID.oninputreport = (e) => this.readHID(e);

        console.log(mote);
    }

    listen() {
        setInterval(() => {
            this.controllers = navigator.getGamepads().filter(gamepad => gamepad !== null);
            this.checkSwing();
        }, 50);
    }

    checkSwing() {
        if (this.HIDInfo.accelerometer.x < 50 && this.HIDInfo.accelerometer.x > 0 && !this.swung) {
            this.swung = true;
            setTimeout(() => {
                this.swung = false;
            }, 100);
            console.log("Swing");
            this.onSwing();
        }
    }

    readHID(event) {
        var data = new Uint8Array(event.data.buffer);
        const [byte1, byte2,    // buttons
            accX, accY, accZ,   // ACC
            ir1, ir2, ir3, ir4, ir5, ir6, ir7, ir8, ir9, ir10, ir11, ir12   // IR Camera
        ] = data;

        this.HIDInfo = {
            accelerometer: {
                x: accX,
                y: accY,
                z: accZ
            }
        }
    }

}
