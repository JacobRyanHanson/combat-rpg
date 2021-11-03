const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');
// Properties: roundNumber, isPlayerTurn, enemies, currentEnemy, and player.
class Game { 
    constructor() {
        this.roundNumber = 0;
        this.isPlayerTurn = false;
        this.enemies = [];
        this.currentEnemy;
        this.player;
    }
    // Creates enemy array and obtains player name.
    initializeGame() {
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));

        this.currentEnemy = this.enemies[0];

        inquirer.prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        }).then(({ name }) => {
            this.player = new Player(name);
            this.startNewBattle();
        });
    }
    // Starts a new battle, determins turn order based on agility stat and logs stats/enemy description before beginning battle.
    startNewBattle() {
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }

        console.log('Your stats are as follows:');
        console.table(this.player.getStats());
        console.log(this.currentEnemy.getDescription());

        this.battle();
    }
    // Runs the battle loop.
    battle() {
        // On the player's turn, choices attack or use potion are offered.
        if (this.isPlayerTurn) {
            inquirer.prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            }).then(({ action }) => {
                // If the player has no potions and chose to consume one their turn is skipped.
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return this.checkEndOfBattle();
                    }
                    // Player is allowed to choose a potion.
                    inquirer.prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map(function (item, index) {
                            return `${index + 1}: ${item.name}`;
                        })
                    // Player uses potion (effects applied).
                    }).then(({action}) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            this.checkEndOfBattle();
                        });
                // If the player chose to attack the enemy is attacked.
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            });
        // Otherwise it's the enemy's turn and it attacks.
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());

            this.checkEndOfBattle();
        }
    }
    // Checks the status of the player and enemy to determine...
    checkEndOfBattle() {
        // The battle should continue...
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerTurn = !this.isPlayerTurn;
            this.battle();
        // The next enemy should be faced...
        } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`);

            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

            this.roundNumber++;

            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle();
            // The player had defeated all enemies.
            } else {
                console.log('You win!');
            }
        // The player has died.
        } else {
            console.log("You've been defeated!");
        }
    }
}

module.exports = Game;