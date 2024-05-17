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
    }
]
function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown() {
    monsterStats.style.display = "none";
    update(locations[0]);
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
sellWeapon()
{
    if (inventory.length > 1) {
        gold += 15;
        gold.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText = "In your inventory you have: " + inventory + ".";
    }
    else {
        text.innerText = "Don't sell your only weapon!";
    }
}
function attack() {
    text.innerText = "You attack the " + monsterName + " with your " + weapons[currentWeapon].name + "!";
    let damageDelt = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    if (monsterHealth - damageDelt < 0) {
        monsterHealth = 0;
    }
    else {
        monsterHealth -= damageDelt;
    }
    text.innerText = " You delt " + damageDelt + " damage!";
    health -= monsters[fighting].level;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    }
    else if (monsterHealth <= 0) {
        defeatMonster();
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

}
function defeatMonster() {
    text.innerText = "The " + monsterName + " was defeated!";
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
