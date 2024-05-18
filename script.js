let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterName;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]
const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Fanged Beast",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
]
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"store.\""
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "Battle commence!"
    },
    {
        name: "killedMonster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: "The monster screams \"ARGHH\" as it dies."
    },
    {
        name: "defeat",
        "button text": ["Restart?", "Restart?", "Restart?"],
        "button functions": [restart, restart, restart],
        text: "Defeat..."
    },
    {
        name: "winGame",
        "button text": ["Restart?", "Restart?", "Restart?"],
        "button functions": [restart, restart, restart],
        text: "You win!"
    },
    {
        name: "easterEgg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game! Pick a number above. Ten numbers will be ranmdomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
]
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown() {
    update(locations[0]);
    xpText.innerText = xp
}
function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "You bought 10 health.";
    }
    else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}
function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = "You now have a " + newWeapon + ".";
            text.innerText += " In your inventory you have: " + inventory + ".";
        }
        else {
            text.innerText = "You do not have enough gold to by this weapon.";
        }
    }
    else {
        text.innerText = "You already have the most powerful weapon.";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory + ".";
    }
    else {
        text.innerText = "Don't sell your only weapon!";
    }
}
function getMonsterAttack(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    if (hit < 1) {
        hit = 1;
    }
    console.log(hit);
    return hit;
}
function isMonsterHit() {
    return Math.random() > .2 || health <= 20;
}
function attack() {
    let damageDelt;
    let damageTaken;

    text.innerText = "You attack the " + monsterName + " with your " + weapons[currentWeapon].name + "!";

    damageDelt = (weapons[currentWeapon].power + xp * .5);
    damageTaken = getMonsterAttack(monsters[fighting].level);

    if (isMonsterHit()) {
        if (monsterHealth - damageDelt < 0) {
            monsterHealth = 0;
        }
        else {
            monsterHealth -= damageDelt;
        }
        text.innerText = " You delt " + damageDelt + " damage!";
    }
    else {
        damageDelt = 0;
        text.innerText = "You missed!";
    }

    if (health - damageTaken < 0) {
        health = 0;
    }
    else {
        health -= damageTaken;
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if (health <= 0) {
        lose();
    }

    if (Math.random() >= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " broke!";
        currentWeapon--;
    }
}
function dodge() {
    text.innerText = "You dodged the attack from the " + monsterName + "!";
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterName = monsters[fighting].name;
    text.innerText = "The " + monsterName + " attacks!";
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsterName;
    monsterHealthText.innerText = monsterHealth;
}
function lose() {
    update(locations[5]);
}
function restart() {
    let xp = 0;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let fighting;
    let monsterName;
    let monsterHealth;
    let inventory = ["stick"];
    goTown();
}
function defeatMonster() {
    text.innerText = "The " + monsterName + " was defeated!";
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function winGame() {
    update(locations[6]);
}
function easterEgg() {
    update(locations[7]);
}
function pickTwo() {
    let guess = 2;
    pick(guess);
}
function pickEight() {
    let guess = 8;
    pick(guess);
}
function pick(guess) {
    let numbers = [];
    let correct = false;

    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < numbers.length - 1; i++) {
        text.innerText += numbers[i] + "\n";
        if (numbers[i] === guess) {
            correct = true;
        }
    }

    /* (if (numbers.indexOf(guess) !== -1) {
        text.innerText += " You guessed correctly!";
    }
    else {
        text.innerText += " You guessed incorrectly.";
    }
    */

    if (correct) {
        text.innerText += " You guessed correctly!";
        text.innerText += " You win 10 gold!";
        gold += 10;
        goldText.innerText = gold;
    }
    else {
        text.innerText += " You guessed incorrectly.";
        text.innerText += " You lose 10 health!";

        health -= 10;
        if (health < 0) {
            health = 0;
        }

        healthText.innerText = health;

        if (health === 0) {
            lose();
        }
    }
}
