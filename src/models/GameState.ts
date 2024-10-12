export class GameState {
    public points: number;
    public upgrades: { [key: string]: { level: number, cost: number } };
    public triggeredEvents: Set<string>;

    constructor() {
        this.points = 0;
        // アップグレードの初期値を設定
        this.upgrades =  {
            autoClicker: { level: 0, cost: 20 },
            fasterClicks: { level: 0, cost: 50 },
            doublePoints: { level: 0, cost: 100 },
        };
        this.triggeredEvents = new Set();
    }

    // ポイントを追加する
    addPoints(amount: number) {
        this.points += amount;
    }

    // ポイントを減らす
    deductPoints(amount: number) {
        if (this.points >= amount) {
            this.points -= amount;
        }
    }

    // アップグレードのコストが十分かどうかを確認する
    hasSufficientPoints(cost: number): boolean {
        return this.points >= cost;
    }

    // 特定のアップグレードをレベルアップする
    upgrade(type: string) {
        const upgrade = this.upgrades[type];
        upgrade.level++;
        upgrade.cost = Math.ceil(upgrade.cost * 1.5);
    }

    // イベントが発生済みかどうかを確認
    isEventTriggered(eventName: string): boolean {
        return this.triggeredEvents.has(eventName);
    }

    // イベントをトリガー
    triggerEvent(eventName: string) {
        this.triggeredEvents.add(eventName);
    }    


    // ゲームの状態をlocalStorageに保存
    saveGame() {
        const gameStateData = {
            points: this.points,
            upgrades: this.upgrades,
            triggeredEvents: Array.from(this.triggeredEvents), // Setを配列に変換して保存
        };
        localStorage.setItem('gameState', JSON.stringify(gameStateData));
    }

    // ゲームの状態をlocalStorageからロード
    loadGame() {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            const gameStateData = JSON.parse(savedState);
            this.points = gameStateData.points;
            this.upgrades = gameStateData.upgrades;
            this.triggeredEvents = new Set(gameStateData.triggeredEvents); // 配列をSetに戻す
        }
    }
}
