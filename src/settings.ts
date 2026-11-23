import * as vscode from "vscode";

const SECTION = "hypeman";

export interface HypeSettings {
  enabled: boolean;
  cooldownSeconds: number;
  displaySeconds: number;
}

export function readSettings(): HypeSettings {
  const cfg = vscode.workspace.getConfiguration(SECTION);
  return {
    enabled: cfg.get<boolean>("enabled", true),
    cooldownSeconds: cfg.get<number>("cooldownSeconds", 30),
    displaySeconds: cfg.get<number>("displaySeconds", 5),
  };
}

export class PhraseStore {
  private get config(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(SECTION);
  }

  getAll(): string[] {
    return this.config.get<string[]>("phrases", []);
  }

  async setAll(phrases: string[]): Promise<void> {
    await this.config.update("phrases", phrases, vscode.ConfigurationTarget.Global);
  }

  async reset(): Promise<void> {
    await this.config.update("phrases", undefined, vscode.ConfigurationTarget.Global);
  }
}
