import Phaser from 'phaser';
import { GameState } from '../models/GameState';

export class UpgradeSystem {
    private gameState: GameState;
    private scene: Phaser.Scene;

    constructor(gameState: GameState, scene: Phaser.Scene) {
        this.gameState = gameState;
        this.scene = scene;
    }

    // 特定のアップグレードを取得
    getUpgradeInfo(type: string) {
        return this.gameState.upgrades[type];
    }

    // アップグレードの購入処理
    purchaseUpgrade(type: string) {
        const upgrade = this.gameState.upgrades[type];
        if (this.gameState.hasSufficientPoints(upgrade.cost)) {
            this.gameState.deductPoints(upgrade.cost);
            upgrade.level++;
            upgrade.cost = Math.ceil(upgrade.cost * 1.5);  // コストを増加

            // アップグレードが成功したことを通知
            this.scene.events.emit('upgradePurchased', type, upgrade.level, upgrade.cost);
            return true;  // 購入成功
        }
        return false;  // 購入失敗
    }

    // アップグレードのレベルを取得
    getUpgradeLevel(type: string): number {
        return this.gameState.upgrades[type].level;
    }

    // アップグレードのコストを取得
    getUpgradeCost(type: string): number {
        return this.gameState.upgrades[type].cost;
    }
}
