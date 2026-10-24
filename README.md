# Dice Empire

I'm building this dice rolling website for the IIT Indore Programming
Club induction using HTML, CSS and JavaScript.

The idea is a simple dice roller with a starry background, clear dice
faces and a layout that works on both phones and computers.

## What works so far

- Choose between rolling one die or two dice
- Display the results as white dice faces with dark pips
- Show each rolled value and the total when rolling two dice
- Fit the dice layout to the available screen width
- Shake the dice briefly before displaying each result
- Prevent overlapping rolls by disabling controls during the animation

## Features I plan to add

- History of the last 10 rolls
- Different dice types: d4, d8, d12 and d20
- Roll sound with a mute option
- Dark and light themes

## Tech stack

- HTML for the page structure
- CSS for the layout and dice appearance
- JavaScript for random rolls and updating the page

## Run locally

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Install Live Server by Ritwick Dey.
4. Right-click index.html and select Open with Live Server.

You can also open index.html directly in a browser.
No build step is needed.

## How the randomness works

Each roll uses Math.floor(Math.random() * 6) + 1.

Math.random() generates a value from 0 up to, but not including, 1.
Multiplying by 6 and rounding down gives an integer from 0 to 5.
Adding 1 gives a result from 1 to 6.

Each face has approximately the same chance of appearing.
Getting the same result on consecutive rolls is normal.
When rolling two dice, the random calculation runs separately for each die. Their values are then added to calculate the total.