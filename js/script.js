const rollButton = document.getElementById("rollButton");
const dice = document.getElementById("dice");
const result = document.getElementById("result");

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;

    dice.textContent = roll;
    result.textContent = "You rolled " + roll + "!";
}

rollButton.addEventListener("click", rollDice);