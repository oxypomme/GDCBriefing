import hljs from "highlight.js/lib/core";
import sqf from "highlight.js/lib/languages/sqf";
import "highlight.js/styles/vs2015.css";

hljs.registerLanguage("sqf", sqf);

export default hljs;
