import Phaser from 'phaser';

export class ClickEffectHelper {
    static applyClickEffect(scene: Phaser.Scene, target: Phaser.GameObjects.Image) {
        
        // クリック音の再生
        scene.sound.play('clickSfx');

        if (!scene.tweens.isTweening(target)) {
            // ターゲットのスケールを小さくしてから元に戻す
            scene.tweens.add({
                targets: target,
                scaleX: 0.9,  // 少し小さくする
                scaleY: 0.9,
                duration: 1,
                yoyo: true,  // 元の大きさに戻す
                ease: 'Power1',
            });
        }
    }
}
