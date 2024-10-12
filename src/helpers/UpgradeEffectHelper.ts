import Phaser from 'phaser';

export class UpgradeEffectHelper {
    static applyUpgradeEffect(scene: Phaser.Scene) {
        // クリック音の再生
        scene.sound.play('upgradeSfx');
    }
}
