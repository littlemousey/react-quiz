export default async function Sound(isAnswerCorrect) {
  let audio = null;
  if (isAnswerCorrect) {
    audio = new Audio(require("../static/sounds/right.mp3"));
  } else {
    audio = new Audio(require("../static/sounds/wrong.mp3"));
  }

  try {
    await audio.play();
  } catch (error) {
    console.log(error);
  }
}
