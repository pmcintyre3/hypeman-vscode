import * as vscode from "vscode";
import { addPhrase, removePhrases } from "./hype";
import { HypeService } from "./hypeService";
import { PhraseStore } from "./settings";

export function registerCommands(service: HypeService, phrases: PhraseStore): vscode.Disposable[] {
  return [
    vscode.commands.registerCommand("hypeman.hypeMe", () => {
      if (!service.hype()) {
        void vscode.window.showInformationMessage("Hype Man has no phrases. Add one with 'Hype Man: Add Hype Phrase'.");
      }
    }),

    vscode.commands.registerCommand("hypeman.addPhrase", async () => {
      const input = await vscode.window.showInputBox({
        prompt: "New hype phrase",
        validateInput: (v) => (v.trim() === "" ? "Enter a phrase" : undefined),
      });
      if (input === undefined) {
        return;
      }
      const updated = addPhrase(phrases.getAll(), input);
      if (updated === null) {
        void vscode.window.showInformationMessage("That phrase is already in your list.");
        return;
      }
      await phrases.setAll(updated);
      void vscode.window.showInformationMessage(`Added: ${input.trim()}`);
    }),

    vscode.commands.registerCommand("hypeman.removePhrase", async () => {
      const current = phrases.getAll();
      if (current.length === 0) {
        void vscode.window.showInformationMessage("There are no hype phrases to remove.");
        return;
      }
      const picked = await vscode.window.showQuickPick(current, {
        canPickMany: true,
        placeHolder: "Select phrases to remove",
      });
      if (picked && picked.length > 0) {
        await phrases.setAll(removePhrases(current, picked));
      }
    }),

    vscode.commands.registerCommand("hypeman.resetPhrases", async () => {
      const choice = await vscode.window.showWarningMessage(
        "Reset hype phrases to the defaults? Your custom list will be lost.",
        { modal: true },
        "Reset",
      );
      if (choice === "Reset") {
        await phrases.reset();
      }
    }),
  ];
}
