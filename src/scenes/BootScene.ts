import Phaser from 'phaser';
import { AssetLoader } from '../assets/AssetLoader';  // AssetLoaderをインポート



export default class BootScene extends Phaser.Scene {
    private assetLoader!: AssetLoader;
    
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // AssetLoaderを使ってアセットをロード
        this.assetLoader = new AssetLoader(this);
        this.assetLoader.preload();  // すべてのアセットをロード
    }

    create() {
        console.log("boot")
        // タイトルシーンに移行
        this.scene.start('TitleScene');
    }
}