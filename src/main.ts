import Phaser from 'phaser';
import BootScene from './scenes/BootScene.ts';
import TitleScene from './scenes/TitleScene.ts';
import GameScene from './scenes/GameScene.ts';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT, // フィットするように自動調整
    autoCenter: Phaser.Scale.CENTER_BOTH, // 中央に配置
  },
  parent: 'game-app',  
  scene: [BootScene, TitleScene, GameScene],
};

new Phaser.Game(config);