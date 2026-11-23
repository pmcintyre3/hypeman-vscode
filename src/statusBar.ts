import * as vscode from "vscode";

export class HypeStatusBar implements vscode.Disposable {
  private readonly item: vscode.StatusBarItem;
  private hideTimer: NodeJS.Timeout | undefined;

  constructor() {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    this.item.name = "Hype Man";
  }

  show(phrase: string, displaySeconds: number): void {
    this.clearTimer();
    this.item.text = `$(megaphone) ${phrase}`;
    this.item.tooltip = "Hype Man";
    this.item.accessibilityInformation = { label: phrase };
    this.item.show();
    this.hideTimer = setTimeout(() => this.item.hide(), displaySeconds * 1000);
  }

  dispose(): void {
    this.clearTimer();
    this.item.dispose();
  }

  private clearTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }
}
