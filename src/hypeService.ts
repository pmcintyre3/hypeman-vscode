import * as vscode from "vscode";
import { pickPhrase, shouldHype } from "./hype";
import { PhraseStore, readSettings } from "./settings";
import { HypeStatusBar } from "./statusBar";

export class HypeService implements vscode.Disposable {
  private lastPhrase: string | undefined;
  private lastShownMs: number | undefined;
  private readonly saveSubscription: vscode.Disposable;

  constructor(
    private readonly phrases: PhraseStore,
    private readonly statusBar: HypeStatusBar,
  ) {
    this.saveSubscription = vscode.workspace.onDidSaveTextDocument(() => this.onSave());
  }

  // Returns false when there are no phrases to show.
  hype(): boolean {
    const phrase = pickPhrase(this.phrases.getAll(), this.lastPhrase);
    if (phrase === undefined) {
      return false;
    }

    this.lastPhrase = phrase;
    this.lastShownMs = Date.now();
    this.statusBar.show(phrase, readSettings().displaySeconds);
    return true;
  }

  dispose(): void {
    this.saveSubscription.dispose();
  }

  private onSave(): void {
    const settings = readSettings();
    if (shouldHype(settings.enabled, Date.now(), this.lastShownMs, settings.cooldownSeconds)) {
      this.hype();
    }
  }
}
