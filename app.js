new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsruning: false,
    specialAttachCount: 3,
    healCount: 3,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsruning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.specialAttachCount = 3;
      this.healCount=3;
      this.turns = []
    },

    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for  ${damage}`
      });
      if(this.checkWin()) {
        return
      }
      this.monsterAttacks()
      this.checkWin();
    },

    specialAttack: function() {
      if(this.specialAttachCount <= 0) {
        return
      }
        var damage = this.calculateDamage(10, 20);
        this.monsterHealth -= damage
        this.specialAttachCount--;
        this.turns.unshift({
          isPlayer: true,
          text: `Player hits Monster hard for  ${damage}`
        });
      
      if(this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },

    heal: function() {
      if(this.healCount <= 0 || this.playerHealth === 100) {
        return
      }
      if(this.playerHealth <= 90) {
        this.playerHealth += 10;
      }else {
        this.playerHealth = 100
      }
      this.healCount--;
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for 10`
      });
      this.monsterAttacks()
    },

    giveUp: function() {
      this.gameIsruning = false;
    },

    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for  ${damage}`
      });
    },

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("Congretulations,You won!!! Do you want start new game?")) {
          this.startGame();
        } else {
          this.gameIsruning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("Game Over,You Lost!!! Do you want start new game?")) {
          this.startGame();
        } else {
          this.gameIsruning = false;
        }
        return true;
      }
      return false;
    }
  }
});
