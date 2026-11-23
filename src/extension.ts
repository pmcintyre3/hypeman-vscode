import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { HypeService } from "./hypeService";
import { PhraseStore } from "./settings";
import { HypeStatusBar } from "./statusBar";

export function activate(context: vscode.ExtensionContext): void {
  const phrases = new PhraseStore();
  const statusBar = new HypeStatusBar();
  const service = new HypeService(phrases, statusBar);
  context.subscriptions.push(statusBar, service, ...registerCommands(service, phrases));
}

export function deactivate(): void {}
