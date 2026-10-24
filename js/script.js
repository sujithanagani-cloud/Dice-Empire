const rollButton = document.getElementById("rollButton");
const diceCount = document.getElementById("diceCount");
const diceContainer = document.getElementById("diceContainer");
const result = document.getElementById("result");

const dicePatterns = [
    [],
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8]
];

function displayDice(die, value) {
    const pips = die.querySelectorAll(".pip");

    for (let i = 0; i < pips.length; i++) {
        pips[i].classList.remove("visible");

        if (dicePatterns[value].includes(i)) {
            pips[i].classList.add("visible");
        }
    }

    die.setAttribute("aria-label", "Die showing " + value);
}

function createDice() {
    const count = Number(diceCount.value);

    diceContainer.replaceChildren();

    for (let i = 0; i < count; i++) {
        const die = document.createElement("div");

        die.classList.add("dice");
        die.setAttribute("role", "img");

        for (let j = 0; j < 9; j++) {
            const pip = document.createElement("span");

            pip.classList.add("pip");
            die.appendChild(pip);
        }

        displayDice(die, 1);
        diceContainer.appendChild(die);
    }

    result.textContent = "Click the button to roll.";
}

function rollDice() {
    const dice = diceContainer.querySelectorAll(".dice");
    const rolls = [];
    let total = 0;

    for (let i = 0; i < dice.length; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;

        displayDice(dice[i], roll);
        rolls.push(roll);
        total += roll;
    }

    if (rolls.length === 1) {
        result.textContent = "You rolled " + rolls[0] + "!";
    } else {
        result.textContent =
            "You rolled " + rolls.join(" + ") + " = " + total + "!";
    }
}

rollButton.addEventListener("click", rollDice);
diceCount.addEventListener("change", createDice);

createDice();