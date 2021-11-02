const Potion = require("../lib/Potion.js")

class Player {
    // Default parameter example.
    constructor(name = "") {
        this.name = name;
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
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

    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    }

    isAlive() {
        return this.health > 0;
    }

    reduceHealth(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    }

    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;
        return Math.floor(Math.random() * (max - min) + min);
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