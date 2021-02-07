import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('swapdiff.swapdiff', () => {

		const visibleEditors = vscode.window.visibleTextEditors;
		const opened = visibleEditors.length;

		if (opened <= 1) {
			vscode.window.showWarningMessage("Nothing to swap :(");
		}
		else if (opened === 2) {
			const uri1 = visibleEditors[0].document.uri;
			const uri2 = visibleEditors[1].document.uri;
			vscode.commands.executeCommand("vscode.diff", uri2, uri1);
		} else {
			vscode.window.showWarningMessage("More than 2 visible files, can`t swap it :(");
		}

	});

	context.subscriptions.push(disposable);
}
