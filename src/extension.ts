import * as vscode from 'vscode';
import Formatter from './formatter';
import { BulletType, Style, Color } from './types';
import Stylizer from './stylizer';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.bold', () => {Formatter.stylizeSelection(Style.bold)}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.italic', () => { Formatter.stylizeSelection(Style.italic);}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.outline', () => { Formatter.stylizeSelection(Style.outline);}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.underline', () => { Formatter.stylizeSelection(Style.underline);}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.superscript', () => { Formatter.stylizeSelection(Style.superscript);}));
	
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.bullet', () => { Formatter.bullet(BulletType.circle);}));	
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.bulletTriangle', () => { Formatter.bullet(BulletType.triangle); }));

	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.colorRed', () => { Stylizer.mark(Color.red)}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.colorBlue', () => { Stylizer.mark(Color.blue)}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.colorGreen', () => { Stylizer.mark(Color.green)}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.colorYellow', () => { Stylizer.mark(Color.yellow)}));

	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.stylizeDoc', () => { Stylizer.applyRules(); }));

	vscode.window.onDidChangeActiveTextEditor(() => Stylizer.applyRules());


}

export function deactivate() {}
