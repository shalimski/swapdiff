import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("swapdiff.swapdiff", () => {
    const tab = vscode.window.tabGroups.activeTabGroup.activeTab;
    const input = tab?.input;
    const isDiffTab =
      input instanceof vscode.TabInputTextDiff ||
      input instanceof vscode.TabInputNotebookDiff;

    if (!tab || !isDiffTab) {
      vscode.window.showWarningMessage("Nothing to swap :(");
      return;
    }

    const newLabel = tab.label.split(" ↔ ").reverse().join(" ↔ ");

    vscode.commands.executeCommand(
      "vscode.diff",
      input.modified,
      input.original,
      newLabel
    );

    const closePrevious = vscode.workspace
      .getConfiguration()
      .get("swapdiff.ClosePreviousDiff");

    if (closePrevious) {
      vscode.window.tabGroups.close(tab);
    }
  });

  context.subscriptions.push(disposable);
}
