/*
 * Interactive Résumé Game
 *
 * This module implements a lightweight side‑scrolling platformer using the Phaser 3
 * framework. The player collects tokens representing career milestones. Upon
 * collection, a tooltip appears with details from resumeData.json. The camera
 * follows the player as they traverse a procedurally sized world.
 */

// Phaser will be available on the global scope via the CDN script in index.html

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
  }

  preload() {
    // Preload assets. All paths are relative to the root of the deployed site.
    this.load.image('background', 'assets/tilesets/background.png');
    this.load.spritesheet('hero', 'assets/sprites/hero.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('coin', 'assets/sprites/coin.png');
    this.load.json('resume', 'resumeData.json');
  }

  create() {
    // Load résumé data from cache
    this.resumeData = this.cache.json.get('resume');
    this.totalCount = this.resumeData.experience.length;

    // Create the info box DOM element reference
    this.infoBox = document.getElementById('info-box');

    // Set world dimensions based on number of events
    const viewportWidth = this.scale.width;
    const viewportHeight = this.scale.height;
    const worldWidth = this.totalCount * 300 + viewportWidth;
    const worldHeight = viewportHeight;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Add tiled background. Use a tile sprite so it can scroll with the camera.
    const bg = this.add.tileSprite(0, 0, worldWidth, viewportHeight, 'background');
    bg.setOrigin(0, 0);

    // Create ground as a series of static rectangles. Each segment is 64 px wide.
    const groundHeight = 32;
    this.groundGroup = this.physics.add.staticGroup();
    const segments = Math.ceil(worldWidth / 64);
    for (let i = 0; i < segments; i += 1) {
      const ground = this.add.rectangle(i * 64 + 32, viewportHeight - groundHeight / 2, 64, groundHeight, 0x854c30);
      this.physics.add.existing(ground, true); // convert to static body
      this.groundGroup.add(ground);
    }

    // Create the player
    this.player = this.physics.add.sprite(64, viewportHeight - groundHeight - 50, 'hero', 0);
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(500);

    // Player animations
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    // Create collectibles and attach résumé data
    this.coins = this.physics.add.group();
    const startX = 200;
    const spacing = 300;
    this.resumeData.experience.forEach((entry, index) => {
      const coin = this.coins.create(startX + spacing * index, viewportHeight - groundHeight - 60, 'coin');
      coin.setScale(1.5);
      coin.body.setAllowGravity(false);
      coin.dataIndex = index;
      coin.collected = false;
      // coins will slightly bounce when idle
      this.tweens.add({
        targets: coin,
        y: coin.y - 10,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    });

    // Collisions and overlaps
    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

    // Set up camera
    this.cameras.main.setBounds(0, 0, worldWidth, viewportHeight);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    // Keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  showInfo(entry) {
    // Populate and display the info box with résumé details
    const html = `
      <h2>${entry.title} @ ${entry.company}</h2>
      <p><strong>${entry.duration}</strong></p>
      ${entry.achievements.map((line) => `<p>${line}</p>`).join('')}
    `;
    this.infoBox.innerHTML = html;
    this.infoBox.style.display = 'block';

    // Auto hide after 6 seconds
    clearTimeout(this.infoTimeout);
    this.infoTimeout = setTimeout(() => {
      this.infoBox.style.display = 'none';
    }, 6000);
  }

  collectCoin(player, coin) {
    if (coin.collected) return;
    coin.collected = true;
    coin.disableBody(true, true);

    // Retrieve corresponding résumé entry
    const entry = this.resumeData.experience[coin.dataIndex];
    this.collectedCount += 1;
    this.showInfo(entry);

    // If all coins collected, display a summary at the end
    if (this.collectedCount === this.totalCount) {
      // Show final summary after small delay
      this.time.delayedCall(7000, () => {
        const summaryHtml = `
          <h2>Thank you for playing!</h2>
          <p>${this.resumeData.summary}</p>
          <p>Contact: ${this.resumeData.contact.email} | ${this.resumeData.contact.phone}</p>
        `;
        this.infoBox.innerHTML = summaryHtml;
        this.infoBox.style.display = 'block';
      });
    }
  }

  update() {
    if (!this.cursors) return;
    const speed = 160;

    // Horizontal movement
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

    // Jumping
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-350);
    }
  }
}

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#140c1c',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      // debug: true,
    },
  },
  scene: MainScene,
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

window.addEventListener('load', () => {
  // Create the game instance once the page has fully loaded
  // eslint-disable-next-line no-new
  new Phaser.Game(config);
});
