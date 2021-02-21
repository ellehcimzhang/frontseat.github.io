import Diagram from "./js/diagram.js";
import InputManager from "./js/inputmanager.js";
import Animator from "./js/animator.js";
import WebClient from "./js/webclient.js";

//Pretend like this came from a database request.
const testData = [
    {
        class: "furniture",
        drawType: "furn_chair",
        name: "chair",
        color: "gray",
        color2: "darkgray", //https://i.redd.it/kngwbr8svar31.jpg
        posX: -4,
        posY: -2.5,
        size: 1.4,
        angle: Math.PI * 0.25
        //visible?
        //offstage?
    },
    {
        class: "furniture",
        drawType: "furn_chair",
        name: "chair",
        color: "gray",
        color2: "darkgray",
        posX: 4,
        posY: -2.5,
        size: 1.4,
        angle: Math.PI * 0.75
    },
    {
        class: "actor",
        drawType: "actor",
        name: "Jane Doe",
        initials: "JD",
        color: "green",
        color2: "darkgreen",
        posX: 3,
        posY: 0,
        size: 0.75,
        angle: Math.PI
    },
    {
        class: "actor",
        drawType: "actor",
        name: "John Smith",
        initials: "JS",
        color: "blue",
        color2: "darkblue",
        posX: -3,
        posY: 0,
        size: 0.75,
        angle: 0
    }
];

//Bare JSON is easy to feed into Diagram
const diagram = new Diagram("diagram", testData);
diagram.width = window.innerWidth;
diagram.height = window.innerHeight;
diagram.windowX = diagram.width / diagram.scale / 2;
diagram.windowY = diagram.height / diagram.scale / 2;

const inputmanager = new InputManager(diagram);

const animator = new Animator(diagram);
animator.animateCross(diagram.entities[3], 2000, 0, -3, Math.PI, 500);
animator.animatePath(diagram.entities[2], 2000, [1, 3, 2], [3, 2, 1], 0, (x) => Math.pow(x, 3));

new WebClient("ws://localhost:3000/webclient", function () { }, function () { }, {
    diagram, inputmanager, animator
});

diagram.draw();