export class AssetLoader {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload() {
        // フォントはすでにindex.htmlで読み込んでいるため、ここでは画像とSFXを読み込む
        // 画像
        this.scene.load.image('logo', 'assets/images/logo.png');
        this.scene.load.image('background', 'assets/images/background.png');
        this.scene.load.image('target', 'assets/images/monster.png');
        this.scene.load.image('eventImage', 'assets/images/gold.png');


        // SFX
        this.scene.load.audio('clickSfx', ['assets/sfx/hit.mp3', 'assets/sfx/hit.ogg']);
        this.scene.load.audio('upgradeSfx', ['assets/sfx/cool-thing.mp3', 'assets/sfx/cool-thing.ogg']);
        this.scene.load.audio('eventSfx', ['assets/sfx/Pickup-Coin.mp3', 'assets/sfx/Pickup-Coin.ogg']);
    }
}