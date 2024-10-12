import Phaser from 'phaser';
import { GameState } from '../models/GameState';  
import { AutoClickSystem } from '../systems/AutoClickSystem';  
import { UpgradeSystem } from '../systems/UpgradeSystem';
import { EventSystem } from '../systems/EventSystem';
import { GameUIHelper } from '../helpers/GameUIHelper';

import { ClickEffectHelper } from '../helpers/ClickEffectHelper';  // クリックエフェクトヘルパーをインポート
import { EventEffectHelper } from '../helpers/EventEffectHelper';  // イベントエフェクトヘルパーをインポート
import { UpgradeEffectHelper } from '../helpers/UpgradeEffectHelper';  // アップグレードエフェクトヘルパーをインポート


import { GameConfig } from '../config/GameConfig';


export default class GameScene extends Phaser.Scene {
    private gameState: GameState;  
    private autoClickSystem: AutoClickSystem; 
    private upgradeSystem: UpgradeSystem;
    private eventSystem: EventSystem; 

    private pointsText!: Phaser.GameObjects.Text;  // ポイント表示用のテキスト
    private upgradeButtons: { [key: string]: Phaser.GameObjects.Text } = {};  // 複数のアップグレードボタンを管理

    constructor() {
        super({ key: 'GameScene' });

        // GameStateの初期化
        this.gameState = new GameState();


        this.upgradeSystem = new UpgradeSystem(this.gameState, this);  // UpgradeSystemを初期化
        this.eventSystem = new EventSystem(this.gameState);  // EventSystemを初期化

        // AutoClickSystemを初期化し、GameSceneインスタンスを渡す
        this.autoClickSystem = new AutoClickSystem(this.gameState, this, this.upgradeSystem);  // AutoClickSystemを初期化
    }

    create() {
        
        // ゲームの状態をロード
        this.gameState.loadGame();

        console.log(this.gameState)


        const { width, height } = this.game.canvas;

        // 背景画像の追加
        const background = this.add.image(width / 2, 320, 'background');
        background.setOrigin(0.5);
        background.setDisplaySize(width, height/2);  // 画面全体に表示


        // ターゲット画像を追加
        const target = this.add.image(width / 2, 300, 'target').setInteractive();
        target.setScale(1);  // 画像のサイズを調整


        // クリックでポイント加算
        target.on('pointerdown', () => {
            ClickEffectHelper.applyClickEffect(this, target);
            this.gameState.addPoints(1 + this.gameState.upgrades.doublePoints.level);  // 1ポイント加算
            GameUIHelper.updatePointsText(this.pointsText, this.gameState);
        });


        // ポイント表示
        this.pointsText = this.add.text(240, 40, `Points: ${this.gameState.points}`, 
            GameConfig.pointFontStyle)
            .setOrigin(0.5);



        // アップグレードボタンの作成
        this.createUpgradeButton('autoClicker', 100, 600);
        this.createUpgradeButton('fasterClicks', 240, 600);
        this.createUpgradeButton('doublePoints', 400, 600);

        // アップグレード購入イベントをリッスン
        this.events.on('upgradePurchased', (type: string, level: number, cost: number) => {
            this.updateUpgradeButton(type, level, cost);
            GameUIHelper.updatePointsText(this.pointsText, this.gameState);
            UpgradeEffectHelper.applyUpgradeEffect(this)
        });


        // 自動クリックシステムの開始
        this.autoClickSystem.start();  // AutoClickSystemを開始

        // ポイント更新イベントをリッスン
        this.events.on('autoClickCompleted', () => {
            if (this.gameState.upgrades.autoClicker.level > 0){
                ClickEffectHelper.applyClickEffect(this, target);
            } 
            GameUIHelper.updatePointsText(this.pointsText, this.gameState);
        });
    }

    update(){
        // アップデート時に自動セーブ
        this.gameState.saveGame();
        // イベントのチェック
        const events = this.eventSystem.checkEvents();
        events.forEach(event => {

            console.log(this.gameState.triggeredEvents.size)
            // イベント通知を表示
            EventEffectHelper.showNotification(this, event.message, event.color);

            for (let i = 0; i < this.gameState.triggeredEvents.size; i++){
                EventEffectHelper.displayEventImage(this, 'eventImage', i*100);
            }
        });
    }

    // アップグレードボタンのテキストを更新
    updateUpgradeButton(type: string, level: number, cost: number) {
        const buttonText = `${type}\n(Lv ${level})\nCost: ${cost}`;
        this.upgradeButtons[type].setText(buttonText);
    }


    // アップグレードボタンの作成
    createUpgradeButton(type: string, x: number, y: number) {
        const upgradeInfo = this.upgradeSystem.getUpgradeInfo(type);
        const buttonText = `${type}\n(Lv ${upgradeInfo.level})\nCost: ${upgradeInfo.cost}`;

        const button = this.add.text(x, y, buttonText, GameConfig.upgradeFontStyle)
            .setOrigin(0.5).setInteractive().on('pointerdown', () => {
            if (this.upgradeSystem.purchaseUpgrade(type)) {
                GameUIHelper.updatePointsText(this.pointsText, this.gameState);
            } else {
                console.log(`Not enough points to upgrade ${type}.`);
            }
        });

        this.upgradeButtons[type] = button;  // ボタンを保存して後で更新できるように
    }


}
