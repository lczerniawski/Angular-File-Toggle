import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// TODO Have shortcuts configurable
	const toggleTs = vscode.commands.registerCommand('angular-file-toggle.toggleTs', () => {
		toggleFile('ts');
	});

	const toggleHtml = vscode.commands.registerCommand('angular-file-toggle.toggleHtml', () => {
		toggleFile('html');
	});

	const toggleCss = vscode.commands.registerCommand('angular-file-toggle.toggleCss', () => {
		toggleFile('scss');
	});

	context.subscriptions.push(toggleTs, toggleHtml, toggleCss);
}

export function deactivate() {}

function toggleFile(targetExtension: string) {
	const editor = vscode.window.activeTextEditor;
	if(!editor) {
		return;
	}

	const currentFile = editor.document.fileName;
	// TODO make scss selectable from config or search for all the extensions possible
	const newFileToOpen = currentFile.replace(/\.(ts|html|scss)$/, `.${targetExtension}`);
	vscode.workspace.openTextDocument(newFileToOpen).then(doc => {
		vscode.window.showTextDocument(doc);
	}, () => {
		// TODO add better error message
		vscode.window.showErrorMessage(`File ${newFileToOpen} does not exists.`);
	});
};