import Phaser from 'phaser';
import { GameState } from '../models/GameState';
import { UpgradeSystem } from './UpgradeSystem';


export class AutoClickSystem {
    private gameState: GameState;
    private scene: Phaser.Scene;
    private upgradeSystem: UpgradeSystem;

    constructor(gameState: GameState, scene: Phaser.Scene, upgradeSystem: UpgradeSystem) {
        this.gameState = gameState;
        this.scene = scene;
        this.upgradeSystem = upgradeSystem;
    }

    // 自動クリック処理を開始
    start() {
        this.scene.time.addEvent({
            delay: this.getClickInterval(),  // 自動クリックの速度をアップグレードに応じて調整
            callback: this.autoClick,
            callbackScope: this,
            loop: true,
        });
    }

    // 自動クリックによってポイントを増加させ、表示を更新
    private autoClick() {
        let pointsToAdd = this.upgradeSystem.getUpgradeLevel('autoClicker');  // 自動クリックレベルに応じたポイント
        if (this.upgradeSystem.getUpgradeLevel('doublePoints') > 0) {
            pointsToAdd *= 2;  // ポイント倍増の効果
        }
        this.gameState.addPoints(pointsToAdd);


        // 自動クリックが完了したことを通知
        this.scene.events.emit('autoClickCompleted', pointsToAdd);

 
    }
    // 自動クリックの速度をアップグレードに基づいて調整
    private getClickInterval(): number {
        const baseInterval = 1000;  // 基本のクリック間隔（1秒）
        const fasterClicksLevel = this.upgradeSystem.getUpgradeLevel('fasterClicks');
        return baseInterval / (1 + fasterClicksLevel);  // クリック速度がアップグレードされると速くなる
    }

}