import * as vscode from 'vscode';
import Formatter from './formatter';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.bold', () => {Formatter.bold();}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.italic', () => {Formatter.italic();}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.outline', () => {Formatter.outline();}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.underline', () => {Formatter.underline();}));
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.superscript', () => { Formatter.superscript();}));	
	context.subscriptions.push(vscode.commands.registerCommand('commentFormatter.bullet', () => { Formatter.bullet();}));	
}

export function deactivate() {}
