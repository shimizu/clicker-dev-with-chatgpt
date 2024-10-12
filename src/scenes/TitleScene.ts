import Phaser from 'phaser';


export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
        
    }

    create() {
        const { width, height } = this.game.canvas

        //背景色設定
        this.cameras.main.setBackgroundColor('#251d2d');

        // logoの表示 (この場合は表示されない場合があるので確認用)
        const logo = this.add.image(width / 2, height/3, 'logo');
        logo.setScale(0.5);  // ロゴのサイズ調整（大きすぎる場合）


        // フォントの設定
        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'BestTen-DOT',
            fontSize: '32px',
        };

        // スタートボタン
        const startButton = this.add.text(width / 2, 600, 'Start', {...textStyle, color:"#ffffff"})
            .setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');  // ゲームシーンへ遷移
        })

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');  // ゲームシーンへ遷移
        });


        // セーブデータのクリアボタン
        const clearDataButton = this.add.text(width / 2, 700, 'Clear Save Data', { ...textStyle, color: "#ff0000" }).setOrigin(0.5).setInteractive();


        clearDataButton.on('pointerdown', () => {
            localStorage.clear();  // localStorageをクリア
            this.add.text(width / 2, 740, 'Save Data Cleared!', {
                fontSize: '24px',
                color: '#ffffff',
            }).setOrigin(0.5);

            console.log('Save data has been cleared.');
        });

    }
}