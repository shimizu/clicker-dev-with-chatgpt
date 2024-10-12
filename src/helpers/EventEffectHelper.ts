import Phaser from 'phaser';
import { GameConfig } from '../config/GameConfig';


export class EventEffectHelper {


    static displayEventImage(scene: Phaser.Scene, imageKey: string, timeout: number) {
        const { width, height } = scene.game.canvas;

        setTimeout(() => {
            // クリック音の再生
            scene.sound.play('eventSfx');

            // イベント画像を表示
            const eventImage = scene.add.image(width / 2, 0, imageKey);


            eventImage.setOrigin(0.5);
            eventImage.setScale(1);
            eventImage.setAlpha(0);  // 最初は透明

            // フェードインし、数秒後にフェードアウト
            scene.tweens.add({
                targets: eventImage,
                y: height / 2,  // 画面中央まで降りる
                alpha: 1, // フェードイン
                duration: 500,  // アニメーションの時間
                ease: 'Bounce.easeOut',
                onComplete: () => {

                    // 数秒間保持してからフェードアウト
                    scene.tweens.add({
                        targets: eventImage,
                        alpha: 0,  // フェードアウト
                        duration: 250,
                        delay: 500,  // 2秒間保持
                        onComplete: () => {
                            eventImage.destroy();  // アニメーション完了後に画像を削除
                        }
                    });

                }
            });

        }, timeout)

    }

    // イベント/報酬表示の処理
    static showNotification(scene: Phaser.Scene, message: string, color: string) {
        const notificationText = scene.add.text(240, 100, message, {
            ...GameConfig.evnetFontStyle,
            color,
        }).setOrigin(0.5);

        // 3秒後にフェードアウト
        scene.time.delayedCall(3000, () => {
            scene.tweens.add({
                targets: notificationText,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    notificationText.destroy();
                },
            });
        });
    }

}
