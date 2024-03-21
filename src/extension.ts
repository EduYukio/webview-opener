import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.openWebview', (htmlFileName: string) => {
		// let disposable = vscode.commands.registerCommand('extension.openWebview', (htmlFileName: string, cssFileName: string) => {
		const htmlFilePath = vscode.Uri.file(
			path.join(context.extensionPath, 'docs', `${htmlFileName}.html`)
		);

		const panel = vscode.window.createWebviewPanel(
			'webviewSample',
			'Documentation',
			vscode.ViewColumn.Two,
			{
				enableScripts: true
			}
		);

		// Set the HTML content for the webview to the specified HTML file
		panel.webview.html = getWebviewContent(htmlFilePath);
		// panel.webview.html = getWebviewContent(htmlFilePath, cssFileName);
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(htmlFilePath: vscode.Uri): string {
	// Read the contents of the HTML file
	const htmlContent = fs.readFileSync(htmlFilePath.fsPath, 'utf-8');
	return htmlContent;
}

// function getWebviewContent(htmlFilePath: vscode.Uri, cssFolderPath: string, cssFileName: string): string {
// 	// Read the contents of the HTML file
// 	let htmlContent = fs.readFileSync(htmlFilePath.fsPath, 'utf-8');

// 	// Replace the CSS link with the webview URI
// 	const cssUri = vscode.Uri.file(path.join(context.extensionPath, 'downloads', cssFolderPath, cssFileName));
// 	const cssWebviewUri = panel.webview.asWebviewUri(cssUri);
// 	htmlContent = htmlContent.replace('<link rel="stylesheet" href="styles.css">', `<link rel="stylesheet" href="${cssWebviewUri}">`);

// 	return htmlContent;
// }


export function deactivate() { }
