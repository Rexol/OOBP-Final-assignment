/**
 * This file contains description of user and mobs in the game.
 * Author: Vladimir Surtaev
 * Date: 28.01.2022
 * 
 * TODO: add stats view
 * TODO: add droping items
 */

class character {
    constructor(healthPoint, damagePoint, attackChance, name) {
        this.name = name;
        this.hp = healthPoint;
        this.dp = damagePoint;
        this.ac = attackChance;
        this.alive = true;
    }

    attack() {
        return Math.random() < this.ac ? this.dp : 0;
    }

    getDamage(val) {
        this.hp -= val;
        if (this.hp <= 0) {
            this.alive = false;
            this.hp = 0;
        }
        return this.alive;
    }
}

/**
 * Class for the user's character.
 * Can be extended to have inventory, other points.
 */
class Player extends character {
    constructor(room, name = "user") {
        super(10, 2, 0.75, name);
        this.room = room;
        this.kills = {};
    }
    
    changeRoom(newRoom) {
        this.room = newRoom;
    }
}

/**
 * Class for the enemy characters.
 * At the moment does nothing but can be used to add
 * some new features to enemies separatly from user.
 */
class Mob extends character {
    constructor(healthPoint, damagePoint, attackChance, name) {
        super(healthPoint, damagePoint, attackChance, name);
    }
}
/**
 * Default game enemies.
 */
class SewerRat extends Mob {
    constructor() {
        super(2, 1, 0.5, "Sewer Rat");
    }
}

class GiantDragon extends Mob {
    constructor() {
        super(4, 8, 0.9, "Giant Dragon");
    }
}

module.exports = { Player, Mob, SewerRat, GiantDragon };