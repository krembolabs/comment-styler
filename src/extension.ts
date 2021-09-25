import * as vscode from 'vscode';
import Formatter from './formatter';
import { BulletType, Style, Color } from './types';
import Stylizer from './stylizer';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('commentFormatter.bold', () => {Formatter.toggleMode(Style.bold)}),
		vscode.commands.registerCommand('commentFormatter.boldOff', () => { Formatter.toggleMode(Style.bold) }),
		vscode.commands.registerCommand('commentFormatter.italic', () => { Formatter.toggleMode(Style.italic) }),
		vscode.commands.registerCommand('commentFormatter.italicOff', () => { Formatter.toggleMode(Style.italic) }),
		vscode.commands.registerCommand('commentFormatter.outline', () => { Formatter.toggleMode(Style.outline) }),
		vscode.commands.registerCommand('commentFormatter.outlineOff', () => { Formatter.toggleMode(Style.outline) }),
		vscode.commands.registerCommand('commentFormatter.underline', () => { Formatter.toggleMode(Style.underline) }),
		vscode.commands.registerCommand('commentFormatter.underlineOff', () => { Formatter.toggleMode(Style.underline) }),
		vscode.commands.registerCommand('commentFormatter.superscript', () => { Formatter.toggleMode(Style.superscript);}),
		vscode.commands.registerCommand('commentFormatter.superscriptOff', () => { Formatter.toggleMode(Style.superscript);}),
		
		vscode.commands.registerCommand('commentFormatter.bullet', () => { Formatter.bullet(BulletType.circle);}),
		vscode.commands.registerCommand('commentFormatter.bulletTriangle', () => { Formatter.bullet(BulletType.triangle); }),
		vscode.commands.registerCommand('commentFormatter.colorRed', () => { Stylizer.mark(Color.red)}),
		vscode.commands.registerCommand('commentFormatter.colorBlue', () => { Stylizer.mark(Color.blue)}),
		vscode.commands.registerCommand('commentFormatter.colorGreen', () => { Stylizer.mark(Color.green)}),
		vscode.commands.registerCommand('commentFormatter.colorYellow', () => { Stylizer.mark(Color.yellow)}),
		vscode.commands.registerCommand('commentFormatter.colorDefault', () => { Stylizer.mark(Color.default) }),
		
		vscode.commands.registerCommand('commentFormatter.stylizeDoc', () => { Stylizer.applyRules(); }),
		vscode.window.onDidChangeActiveTextEditor(() => Stylizer.applyRules()),
		vscode.workspace.onDidChangeTextDocument(Formatter.onEdit.bind(Formatter)),
	);
	
}

export function deactivate() {}
