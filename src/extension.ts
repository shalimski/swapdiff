import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const documentScheme = /^(file|untitled|clipboardCompare\d+)$/;

  let disposable = vscode.commands.registerCommand("swapdiff.swapdiff", () => {
    const files: vscode.Uri[] = [];
    for (let editor of vscode.window.visibleTextEditors) {
      if (documentScheme.test(editor.document.uri.scheme)) {
        files.push(editor.document.uri);
      }
    }

    const opened = files.length;

    if (opened <= 1) {
      vscode.window.showWarningMessage("Nothing to swap :(");
    } else if (opened === 2) {
      const closePrevious = vscode.workspace
        .getConfiguration()
        .get("swapdiff.ClosePreviousDiff");
      if (closePrevious) {
        vscode.commands.executeCommand("workbench.action.closeActiveEditor");
      }

      vscode.commands.executeCommand("vscode.diff", files[1], files[0]);
    } else {
      vscode.window.showWarningMessage(
        "More than 2 visible files, can`t swap it :("
      );
    }
  });

  context.subscriptions.push(disposable);
}
