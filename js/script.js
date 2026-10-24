const rollButton = document.getElementById("rollButton");
const dice = document.getElementById("dice");
const result = document.getElementById("result");
const pips = dice.querySelectorAll(".pip");

const dicePatterns = [
    [],
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8]
];

function displayDice(value) {
    for (let i = 0; i < pips.length; i++) {
        pips[i].classList.remove("visible");

        if (dicePatterns[value].includes(i)) {
            pips[i].classList.add("visible");
        }
    }

    dice.setAttribute("aria-label", "Die showing " + value);
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;

    displayDice(roll);
    result.textContent = "You rolled " + roll + "!";
}

rollButton.addEventListener("click", rollDice);

displayDice(1);