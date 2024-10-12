import { GameState } from '../models/GameState';


export class EventSystem {
    private gameState: GameState;

    // イベントの定義を配列で管理
    private eventsData = [
        { points: 10, id: '10_points', message: 'You reached 10 points!', color: '#ee7800' },
        { points: 50, id: '50_points', message: '50 points! Great Job!', color: '#ee7800' },
        { points: 100, id: '100_points', message: 'Amazing! 100 points reached!', color: '#ee7800' },
        { points: 250, id: '250_points', message: 'Amazing! 250 points reached!', color: '#ee7800' },
        { points: 500, id: '500_points', message: 'Amazing! 500 points reached!', color: '#ee7800' },
        { points: 1000, id: '1000_points', message: 'Amazing! 1000 points reached!', color: '#ee7800' }
    ];

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    // ポイントに基づくイベントのチェック
    checkEvents(): { id: string, message: string, color: string }[] {
        const events: { id: string, message: string, color: string }[] = [];  // 明示的に型を指定


        // 定義されたイベントを順にチェック
        this.eventsData.forEach(eventData => {
            if (this.gameState.points >= eventData.points && !this.gameState.triggeredEvents.has(eventData.id)) {
                this.gameState.triggeredEvents.add(eventData.id);
                events.push(this.createEvent(eventData.id, eventData.message, eventData.color));
            }
        });

        return events;
    }

    // イベントを生成
    private createEvent(id: string, message: string, color: string) {
        return { id, message, color };
    }
}
