class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.cursors = null;
    this.player = null;
    this.groundGroup = null;
    this.coins = null;
    this.resumeData = null;
    this.collectedCount = 0;
    this.totalCount = 0;
    this.infoBox = null;
    this.resumeEntries = [];
  }

  preload() {
    this.load.image('background', 'assets/tilesets/background.png');
    this.load.spritesheet('hero', 'assets/sprites/hero.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('coin', 'assets/sprites/coin.png');
    this.load.json('resume', 'resumeData.json');
  }

  create() {
    this.resumeData = this.cache.json.get('resume');
    this.resumeEntries = this.resumeData.experience || [];
    this.totalCount = this.resumeEntries.length;

    this.infoBox = document.getElementById('info-box');

    const viewportWidth = this.scale.width;
    const viewportHeight = this.scale.height;
    const worldWidth = this.totalCount * 300 + viewportWidth;
    const worldHeight = viewportHeight;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    const bg = this.add.tileSprite(0, 0, worldWidth, viewportHeight, 'background');
    bg.setOrigin(0, 0);

    this.groundGroup = this.physics.add.staticGroup();
    const segments = Math.ceil(worldWidth / 64);
    for (let i = 0; i < segments; i++) {
      const ground = this.add.rectangle(i * 64 + 32, viewportHeight - 16, 64, 32, 0x854c30);
      this.physics.add.existing(ground, true);
      this.groundGroup.add(ground);
    }

    this.player = this.physics.add.sprite(64, viewportHeight - 80, 'hero', 0);
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(600);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    });

    this.coins = this.physics.add.group();
    const startX = 200;
    const spacing = 300;

    this.resumeEntries.forEach((entry, index) => {
      const coin = this.coins.create(startX + spacing * index, viewportHeight - 100, 'coin');
      coin.setScale(1.5);
      coin.body.setAllowGravity(false);
      coin.dataIndex = index;
      coin.collected = false;

      this.tweens.add({
        targets: coin,
        y: coin.y - 10,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });

    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

    this.cameras.main.setBounds(0, 0, worldWidth, viewportHeight);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  collectCoin(player, coin) {
    if (coin.collected) return;

    coin.collected = true;
    coin.disableBody(true, true);

    const entry = this.resumeEntries[coin.dataIndex];
    this.collectedCount += 1;
    this.showInfo(entry);

    if (this.collectedCount === this.totalCount) {
      this.time.delayedCall(7000, () => {
        const summaryHtml = `
          <h2>Thanks for Playing!</h2>
          <p>${this.resumeData.summary}</p>
          <p>📧 ${this.resumeData.contact.email}<br>📱 ${this.resumeData.contact.phone}</p>
        `;
        this.infoBox.innerHTML = summaryHtml;
        this.infoBox.style.display = 'block';
      });
    }
  }

  showInfo(entry) {
    const html = `
      <h2>${entry.title} @ ${entry.company}</h2>
      <p><strong>${entry.duration}</strong></p>
      ${entry.achievements.map(line => `<p>${line}</p>`).join('')}
    `;
    this.infoBox.innerHTML = html;
    this.infoBox.style.display = 'block';

    clearTimeout(this.infoTimeout);
    this.infoTimeout = setTimeout(() => {
      this.infoBox.style.display = 'none';
    }, 6000);
  }

  update() {
    if (!this.cursors) return;

    const speed = 160;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('walk', true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('walk', true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop();
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-350);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#140c1c',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: MainScene,
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
