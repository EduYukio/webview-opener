import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	let openWebviewCommand = vscode.commands.registerCommand('extension.openWebview', (htmlFileName: string) => {

		const panel = vscode.window.createWebviewPanel(
			'webviewSample',
			`${htmlFileName} Documentation`,
			vscode.ViewColumn.Two,
			{ enableScripts: true }
		);

		const htmlFilePath = vscode.Uri.file(path.join(context.extensionPath, 'docs', `${htmlFileName}.html`));

		var cssFileName = "ldoc";
		panel.webview.html = getWebviewContent(htmlFilePath, cssFileName);

		function getWebviewContent(htmlFilePath: vscode.Uri, cssFileName: string): string {
			let htmlContent = fs.readFileSync(htmlFilePath.fsPath, 'utf-8');

			if (htmlFileName == "luaManual") {
				htmlContent = fs.readFileSync(htmlFilePath.fsPath, 'latin1');

				var cssUriLuaManual = vscode.Uri.file(path.join(context.extensionPath, 'docs', `${htmlFileName}_files`, `manual.css`));
				var cssWebviewUriLuaManual = panel.webview.asWebviewUri(cssUriLuaManual);
				htmlContent = htmlContent.replace(`<link rel="stylesheet" type="text/css" href="./${htmlFileName}_files/manual.css">`, `<link rel="stylesheet" href="${cssWebviewUriLuaManual}">`);

				cssUriLuaManual = vscode.Uri.file(path.join(context.extensionPath, 'docs', `${htmlFileName}_files`, `lua.css`));
				cssWebviewUriLuaManual = panel.webview.asWebviewUri(cssUriLuaManual);
				htmlContent = htmlContent.replace(`<link rel="stylesheet" type="text/css" href="./${htmlFileName}_files/lua.css">`, `<link rel="stylesheet" href="${cssWebviewUriLuaManual}">`);

			} else {
				const cssUri = vscode.Uri.file(path.join(context.extensionPath, 'docs', `${htmlFileName}_files`, `${cssFileName}.css`));
				const cssWebviewUri = panel.webview.asWebviewUri(cssUri);

				htmlContent = htmlContent.replace(`<link rel="stylesheet" href="./${htmlFileName}_files/${cssFileName}.css" type="text/css">`, `<link rel="stylesheet" href="${cssWebviewUri}" type="text/css">`);
			}

			return htmlContent;
		}
	});

	context.subscriptions.push(openWebviewCommand);
}
