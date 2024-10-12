import Phaser from 'phaser';
import { GameState } from '../models/GameState';

export class GameUIHelper {
    // ポイント表示の更新
    static updatePointsText(pointsText: Phaser.GameObjects.Text, gameState: GameState) {
        pointsText.setText(`Points: ${gameState.points}`);
    }

    // アップグレードボタンのテキストを更新
    static updateUpgradeButton(button: Phaser.GameObjects.Text, type: string, upgradeSystem: any) {
        const upgradeInfo = upgradeSystem.getUpgradeInfo(type);
        const buttonText = `Upgrade ${type}\n(Lv ${upgradeInfo.level})\nCost: ${upgradeInfo.cost}`;
        button.setText(buttonText);
    }

}