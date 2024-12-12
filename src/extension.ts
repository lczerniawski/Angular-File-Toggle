import * as vscode from 'vscode';

const possibleCssExtensions = ['scss', 'sass', 'less', 'css', 'styl'];

export function activate(context: vscode.ExtensionContext) {
	const toggleTs = vscode.commands.registerCommand('angular-file-toggle.toggleTs', async () => {
		await toggleFile('ts');
	});

	const toggleHtml = vscode.commands.registerCommand('angular-file-toggle.toggleHtml', async () => {
		await toggleFile('html');
	});

	const toggleCss = vscode.commands.registerCommand('angular-file-toggle.toggleCss', async () => {
		await toggleCssFile();
	});

	context.subscriptions.push(toggleTs, toggleHtml, toggleCss);
}

export function deactivate() {}

async function toggleFile(targetExtension: string) {
	const editor = getCurrentEditor();
	if(!editor) {
		return;
	}

	const newFileToOpen = getNewFileToOpen(editor, targetExtension);
	if(!newFileToOpen) {
		return;
	}

	if(showFileIfAlreadyOpened(newFileToOpen)) {
		return;
	}

	try {
		await openFileInSplitScreen(editor, newFileToOpen);
	} catch {
		vscode.window.showErrorMessage(`File ${newFileToOpen} does not exists.`);
	}
};


async function toggleCssFile() {
	const editor = getCurrentEditor();
	if(!editor) {
		return;
	}

	let isFileFound = false;
	for(const extension of possibleCssExtensions) {
		const newFileToOpen = getNewFileToOpen(editor, extension);
		if(!newFileToOpen) {
			return;
		}

		if(showFileIfAlreadyOpened(newFileToOpen))
		{
			return;
		}	

		try {
			await openFileInSplitScreen(editor, newFileToOpen);
            isFileFound = true;
            break;
		} catch{}
	}

	if(!isFileFound)
	{
		vscode.window.showErrorMessage(`None of the CSS files with extensions ${possibleCssExtensions.join(', ')} exist for selected component.`);	
	}
};

function getCurrentEditor(): vscode.TextEditor | null {
	const editor = vscode.window.activeTextEditor;
	if(!editor) {
		return null;
	}

	return editor;
}

function getNewFileToOpen(editor: vscode.TextEditor, targetExtension: string): string | null {
	const currentFile = editor.document.fileName;
	const newFileToOpen = currentFile.replace(/\.(ts|html|scss|sass|less|css|styl)$/, `.${targetExtension}`);

	if(currentFile === newFileToOpen) {
		return null;
	}

	return newFileToOpen;
}

function showFileIfAlreadyOpened(newFileToOpen: string): boolean {
	const activeTabGroup = vscode.window.tabGroups.activeTabGroup;
	const existingTabInActiveGroup = activeTabGroup.tabs.find(x => (x.input as vscode.TabInputText).uri.path === newFileToOpen);

	if(existingTabInActiveGroup) {
		const tabInput = existingTabInActiveGroup.input as vscode.TabInputText;
		vscode.window.showTextDocument(tabInput.uri);
		return true;
	}

	return false;
}

async function openFileInSplitScreen(editor: vscode.TextEditor, newFileToOpen: string) {
	const doc = await vscode.workspace.openTextDocument(newFileToOpen);
	const column = editor.viewColumn === vscode.ViewColumn.One ? vscode.ViewColumn.Two : vscode.ViewColumn.One;
	await vscode.window.showTextDocument(doc, column);
}