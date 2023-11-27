// RPG Combat illustrating passing functions

// Player
class Player {
    constructor(name, skill, stamina, weapon, armor) {
        this.name = name;
        this.skill = skill;
        this.stamina = stamina;
        this.weapon = weapon;
        this.armor = armor;
        console.log("Created player ",this.name," with skill ",this.skill," and stamina ",this.stamina);
        console.log("Armed with ",this.weapon.name," and armored with ",this.armor.name);
    }

    isDead() {
        return this.stamina <= 0;
    }

    hitOpponent() {
        return (Math.floor(Math.random()*12)+1) <= this.skill;
    }

    takeHit(hitWith) {
        let damage = this.armor(hitWith);
        if (damage<0) {
            this.stamina = this.stamina + damage;
            console.log("Player ",this.name," took ",(0-damage)," damage.")
        }
    }
}

// Weapons
const Weapons = {
    dagger: function() {
        return Math.floor(Math.random()*4)+1;
    },

    sword: function() {
        return Math.floor(Math.random()*8)+1;
    },

    club: function() {
        return Math.floor(Math.random()*6)+1;
    },

    greatsword: function() {
        return Math.floor(Math.random()*10)+1;
    }
}

// Armor
const Armors = {
    none: function(func) {
        return 0-func();
    },

    padded: function(func) {
        return (Math.floor(Math.random()*6)+1)-func();
    },

    chain: function(func) {
        return (Math.floor(Math.random()*8)+1)-func();
    }
}

// Main Loop
const PlayerA = new Player("A",Math.floor(Math.random()*12)+1,Math.floor(Math.random()*12)+1,Weapons.sword,Armors.chain);
const PlayerB = new Player("B",Math.floor(Math.random()*12)+1,Math.floor(Math.random()*12)+1,Weapons.greatsword,Armors.padded);

let done = false;
while(!done) {
    // Both players get a swing
    if(PlayerA.hitOpponent()) PlayerB.takeHit(PlayerA.weapon);
    if(PlayerB.hitOpponent()) PlayerA.takeHit(PlayerB.weapon);

    // Check for loop exit of either player dying
    if(PlayerA.isDead()) {
        console.log("Player ", PlayerA.name, " was slain.");
        done = true;
    }

    if(PlayerB.isDead()) {
        console.log("Player ", PlayerB.name, " was slain.");
        done = true;
    }
}