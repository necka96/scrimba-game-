import Character from "./Character.js";
import characterData from "./data.js";
const btn = document.getElementById("attack-button");
let villains = ["loki", "hela", "thanos"];
let avengers = ["ironMan", "thor", "ronin"];
let isWaiting = false;
const getNewVillain = () => {
  const nextVillainData = characterData[villains.shift()];
  return nextVillainData ? new Character(nextVillainData) : {};
};

const getNewAvengers = () => {
  const nextAvengersData = characterData[avengers.shift()];
  return nextAvengersData ? new Character(nextAvengersData) : {};
};

const attack = () => {
  if (!isWaiting) {
    avenger.setDiceHtml();
    villain.setDiceHtml();
    avenger.takeDamage(villain.currentDiceScore);
    villain.takeDamage(avenger.currentDiceScore);
    rendner();
    setTimeout(() => {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => card.classList.add("active"));
      document.querySelector(".game").classList.add("active");
    }, 100);
    if (avenger.dead) {
      isWaiting = true;
      btn.disabled = true;
      if (avengers.length > 0) {
        setTimeout(() => {
          avenger = getNewAvengers();
          rendner();
          isWaiting = false;
          btn.disabled = false;
        }, 1500);
      } else {
        endGame();
      }
    } else if (villain.dead) {
      isWaiting = true;
      btn.disabled = true;
      if (villains.length > 0) {
        setTimeout(() => {
          villain = getNewVillain();
          rendner();
          isWaiting = false;
          btn.disabled = false;
        }, 1500);
      } else {
        endGame();
      }
    }
  }
};

const endGame = () => {
  isWaiting = true;

  const endMessage =
    avenger.health === 0 && villain.health === 0
      ? "No victors - all creatures are dead"
      : avenger.health > 0
      ? "Avengers wins"
      : "Villains vins";

  setTimeout(() => {
    document.body.innerHTML = `
   <div class="end-game">
       <h2>Game Over</h2> 
       <h3>${endMessage}</h3>
       
   </div>
  `;
  }, 1500);

  setTimeout(() => {
    location.reload();
  }, 4500);
};

btn.addEventListener("click", attack);
const rendner = () => {
  document.getElementById("avenger").innerHTML = avenger.getCharacterHtml();
  document.getElementById("villain").innerHTML = villain.getCharacterHtml();
};

let avenger = getNewAvengers();
let villain = getNewVillain();
rendner();
