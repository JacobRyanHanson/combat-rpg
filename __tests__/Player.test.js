const Player = require("../lib/Player.js");
const Potion = require('../lib/Potion.js');
jest.mock("../lib/Potion.js");

test("creates a player object", function() {
    const player = new Player();

    expect(player.name).toBe("");
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));  
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});