import * as vscode from 'vscode';
import Formatter from './formatter';
import { BulletType, Style, Color, Size } from './types';
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
		vscode.commands.registerCommand('commentFormatter.colorRed', () => { Stylizer.markColor(Color.red)}),
		vscode.commands.registerCommand('commentFormatter.colorBlue', () => { Stylizer.markColor(Color.blue)}),
		vscode.commands.registerCommand('commentFormatter.colorGreen', () => { Stylizer.markColor(Color.green)}),
		vscode.commands.registerCommand('commentFormatter.colorYellow', () => { Stylizer.markColor(Color.yellow)}),
		vscode.commands.registerCommand('commentFormatter.colorPurple', () => { Stylizer.markColor(Color.purple)}),
		vscode.commands.registerCommand('commentFormatter.colorOrange', () => { Stylizer.markColor(Color.orange)}),
		vscode.commands.registerCommand('commentFormatter.colorLightBlue', () => { Stylizer.markColor(Color.lightblue)}),
		
		vscode.commands.registerCommand('commentFormatter.colorDefault', () => { Stylizer.markColor(Color.default) }),

		vscode.commands.registerCommand('commentFormatter.sizeX1', () => { Stylizer.markSize(Size.sizeX1) }),
		vscode.commands.registerCommand('commentFormatter.sizeX2', () => { Stylizer.markSize(Size.sizeX2) }),
		vscode.commands.registerCommand('commentFormatter.sizeX05', () => { Stylizer.markSize(Size.sizeX05) }),
		vscode.commands.registerCommand('commentFormatter.sizeX075', () => { Stylizer.markSize(Size.sizeX075) }),
		vscode.commands.registerCommand('commentFormatter.sizeX15', () => { Stylizer.markSize(Size.sizeX15) }),
		
		vscode.commands.registerCommand('commentFormatter.stylizeDoc', () => { Stylizer.applyRules(); }),
		vscode.window.onDidChangeActiveTextEditor(() => Stylizer.applyRules()),
//		vscode.workspace.onDidChangeTextDocument(Formatter.onEdit.bind(Formatter)),

		// Due to VSCode bug registering 'type' event results in slowness: 
		// https://github.com/microsoft/vscode/issues/65876
		// One option is to remove other colorizing extensions like "𝘉𝘳𝘢𝘤𝘬𝘦𝘵 𝘊𝘰𝘭𝘰𝘳𝘪𝘻𝘦𝘳".
		vscode.commands.registerCommand("type", Formatter.onType.bind(Formatter)),
		vscode.commands.registerCommand("paste", Formatter.onPaste.bind(Formatter)),
		

	);
	Stylizer.applyRules();
}

export function deactivate() {}
