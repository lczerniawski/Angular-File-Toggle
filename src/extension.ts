import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const toggleTs = vscode.commands.registerCommand('angular-file-toggle.toggleTs', () => {
		toggleFile('ts');
	});

	const toggleHtml = vscode.commands.registerCommand('angular-file-toggle.toggleHtml', () => {
		toggleFile('html');
	});

	const toggleCss = vscode.commands.registerCommand('angular-file-toggle.toggleCss', () => {
		toggleCssFile();
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
	const newFileToOpen = currentFile.replace(/\.(ts|html|scss|sass|less|css|styl)$/, `.${targetExtension}`);

	if(currentFile === newFileToOpen) {
		return;
	}

	const activeTabGroup = vscode.window.tabGroups.activeTabGroup;
	const existingTabInActiveGroup = activeTabGroup.tabs.find(x => (x.input as vscode.TabInputText).uri.path === newFileToOpen);
	if(existingTabInActiveGroup) {
		const tabInput = existingTabInActiveGroup.input as vscode.TabInputText;
		vscode.window.showTextDocument(tabInput.uri);
		return;
	}

	vscode.workspace.openTextDocument(newFileToOpen).then(doc => {
		const column = editor.viewColumn === vscode.ViewColumn.One ? vscode.ViewColumn.Two : vscode.ViewColumn.One;
		vscode.window.showTextDocument(doc, column);
	}, () => {
		vscode.window.showErrorMessage(`File ${newFileToOpen} does not exists.`);
	});
};


async function toggleCssFile() {
	const editor = vscode.window.activeTextEditor;
	if(!editor) {
		return;
	}
	
	let isFileFound = false;
	const possibleExtensions = ['scss', 'sass', 'less', 'css', 'styl'];

	for(const extension of possibleExtensions) {
		const currentFile = editor.document.fileName;
		const newFileToOpen = currentFile.replace(/\.(ts|html|scss|sass|less|css|styl)$/, `.${extension}`);

		if(currentFile === newFileToOpen) {
			return;
		}

		const activeTabGroup = vscode.window.tabGroups.activeTabGroup;
		const existingTabInActiveGroup = activeTabGroup.tabs.find(x => (x.input as vscode.TabInputText).uri.path === newFileToOpen);
		if(existingTabInActiveGroup) {
			const tabInput = existingTabInActiveGroup.input as vscode.TabInputText;
			vscode.window.showTextDocument(tabInput.uri);
			return;
		}

		try {
			await vscode.workspace.fs.stat(vscode.Uri.file(newFileToOpen));
            const doc = await vscode.workspace.openTextDocument(newFileToOpen);
			const column = editor.viewColumn === vscode.ViewColumn.One ? vscode.ViewColumn.Two : vscode.ViewColumn.One;
            await vscode.window.showTextDocument(doc, column);
            isFileFound = true;
            break;
			
		} catch{}
	}

	if(!isFileFound)
	{
		vscode.window.showErrorMessage(`None of the CSS files with extensions ${possibleExtensions.join(', ')} exist for selected component.`);	
	}
};