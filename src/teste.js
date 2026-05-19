const correct_awnser = 1;
const myAwnser = 2;
let lives = 5;
if (correct_awnser != myAwnser) {
  lives--;
  console.log("Errado:" + lives);
} else {
  console.log("certo");
}
