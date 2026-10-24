const rollButton = document.getElementById("rollButton");
const diceCount = document.getElementById("diceCount");
const diceType = document.getElementById("diceType");
const diceContainer = document.getElementById("diceContainer");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");
const historyEmpty = document.getElementById("historyEmpty");

const rollHistory = [];
let rollNumber = 0;

const dicePatterns = [
    [],
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8]
];

function displayDice(die, value, sides) {
    if (sides === 6) {
        const pips = die.querySelectorAll(".pip");

        for (let i = 0; i < pips.length; i++) {
            pips[i].classList.remove("visible");

            if (dicePatterns[value].includes(i)) {
                pips[i].classList.add("visible");
            }
        }
    } else {
        die.textContent = value;
    }

    die.setAttribute(
        "aria-label",
        "d" + sides + " showing " + value
    );
}

function createDice() {
    const count = Number(diceCount.value);
    const sides = Number(diceType.value);

    diceContainer.replaceChildren();

    for (let i = 0; i < count; i++) {
        const die = document.createElement("div");

        die.classList.add("dice");
        die.setAttribute("role", "img");

        if (sides === 6) {
            for (let j = 0; j < 9; j++) {
                const pip = document.createElement("span");

                pip.classList.add("pip");
                die.appendChild(pip);
            }
        } else {
            die.classList.add("numbered", "d" + sides);
        }

        displayDice(die, 1, sides);
        diceContainer.appendChild(die);
    }

    result.textContent = "Click the button to roll.";
}

function addToHistory(rolls, total, sides) {
    rollNumber++;

    const entry = {
        number: rollNumber,
        values: rolls,
        total: total,
        sides: sides
    };

    rollHistory.unshift(entry);

    if (rollHistory.length > 10) {
        rollHistory.pop();
    }

    historyEmpty.hidden = true;
    historyList.replaceChildren();

    for (let i = 0; i < rollHistory.length; i++) {
        const record = rollHistory[i];
        const item = document.createElement("li");

        const label =
            "Roll " + record.number +
            " (" + record.values.length + "d" + record.sides + "): ";

        if (record.values.length === 1) {
            item.textContent = label + record.values[0];
        } else {
            item.textContent =
                label + record.values.join(" + ") +
                " = " + record.total;
        }

        historyList.appendChild(item);
    }
}

function rollDice() {
    if (rollButton.disabled) {
        return;
    }

    rollButton.disabled = true;
    diceCount.disabled = true;
    diceType.disabled = true;

    rollButton.textContent = "Rolling...";
    result.textContent = "Rolling the dice...";

    const dice = diceContainer.querySelectorAll(".dice");
    const sides = Number(diceType.value);

    for (let i = 0; i < dice.length; i++) {
        dice[i].classList.add("shaking");
    }

    setTimeout(function () {
        const rolls = [];
        let total = 0;

        for (let i = 0; i < dice.length; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;

            dice[i].classList.remove("shaking");
            displayDice(dice[i], roll, sides);

            rolls.push(roll);
            total += roll;
        }

        if (rolls.length === 1) {
            result.textContent = "You rolled " + rolls[0] + "!";
        } else {
            result.textContent =
                "You rolled " + rolls.join(" + ") +
                " = " + total + "!";
        }

        addToHistory(rolls, total, sides);

        rollButton.disabled = false;
        diceCount.disabled = false;
        diceType.disabled = false;

        rollButton.textContent = "Roll Dice";
    }, 500);
}

rollButton.addEventListener("click", rollDice);
diceCount.addEventListener("change", createDice);
diceType.addEventListener("change", createDice);

createDice();