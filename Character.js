import {
  getDicePlaceholderHtml,
  getDiceRollArray,
  getPercentage,
} from "./utils.js";

class Character {
  constructor(data) {
    Object.assign(this, data);
    this.maxHealth = this.health;
    this.diceHtml = getDicePlaceholderHtml(this.diceCount);
  }

  setDiceHtml() {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceHtml = this.currentDiceScore
      .map((num) => `<div class="dice">${num}</div>`)
      .join("");
  }
  takeDamage(attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce(
      (total, number) => total + number
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.health = 0;
      this.dead = true;
    }
  }

  getHealthBarHtml() {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${
                      percent < 26 ? "danger" : ""
                    }" 
                            style="width:${percent}%;">
                    </div>
                </div>`;
  }
  getCharacterHtml() {
    const { name, avatar, transparent, health, diceCount, diceHtml, title } =
      this;
    const healthBar = this.getHealthBarHtml();

    return `
 <div class="card-holder">
     <div class="card">
           <div class="wrapper">
             <img src="${avatar}" class="cover-image" />
           </div>
         ${title ? "<img src='./images/title.png' class='title' /> " : " "}
           <img src="${transparent}" class="character" />
         </div>
       <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
        </div>   
 </div>
   `;
  }
}

export default Character;
