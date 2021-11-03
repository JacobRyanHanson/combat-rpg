const Character = require('./Character.js');
const Potion = require("../lib/Potion.js")

class Player extends Character {
    constructor(name = "") {
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }

    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        }
    }

    getInventory() {
        if (this.inventory.length) {
            return this.inventory
        }
        return false;
    }

    addPotion(potion) {
        this.inventory.push(potion);
    }

    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        if (potion.name === "agility") {
            this.agility += potion.value;
        } else if (potion.name === "health") {
            this.health += potion.value;
        } else if (potion.name === "strength") {
            this.strength += potion.value;
        }
    }
}

module.exports = Player;