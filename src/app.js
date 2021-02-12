import MainController from "./controllers/MainController.js";
import "./main.css";

document.addEventListener("DOMContentLoaded", () => {
  new MainController();
});


console.log(process.env.NODE_ENV); // webpack mode 출력
console.log(TWO); // 2 
console.log(TWO_STRING); // 1+1
console.log(api.domain); // http://dev.api.domain.com