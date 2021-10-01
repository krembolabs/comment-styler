import * as vscode from 'vscode';
import Formatter from './formatter';
import { BulletType, Style, Color, Size } from './types';
import Stylizer from './stylizer';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(


		vscode.commands.registerCommand('commentStyler.openDrawer', () => {drawer(true);}),
		vscode.commands.registerCommand('commentStyler.closeDrawer', () => {drawer(false);}),
		
		vscode.commands.registerCommand('commentStyler.bold', () => {Formatter.toggleMode(Style.bold)}),
		vscode.commands.registerCommand('commentStyler.boldOff', () => { Formatter.toggleMode(Style.bold) }),
		vscode.commands.registerCommand('commentStyler.italic', () => { Formatter.toggleMode(Style.italic) }),
		vscode.commands.registerCommand('commentStyler.italicOff', () => { Formatter.toggleMode(Style.italic) }),
		vscode.commands.registerCommand('commentStyler.outline', () => { Formatter.stylizeSelection(Style.outline) }),
		vscode.commands.registerCommand('commentStyler.outlineOff', () => { Formatter.toggleMode(Style.outline) }),		
		vscode.commands.registerCommand('commentStyler.superscript', () => { Formatter.toggleMode(Style.superscript);}),
		vscode.commands.registerCommand('commentStyler.superscriptOff', () => { Formatter.toggleMode(Style.superscript);}),
		vscode.commands.registerCommand('commentStyler.underline', () => { Formatter.stylizeSelection(Style.underline)}),
		vscode.commands.registerCommand('commentStyler.bullet', () => { Formatter.bullet(BulletType.circle);}),
		vscode.commands.registerCommand('commentStyler.bulletTriangle', () => { Formatter.bullet(BulletType.triangle); }),
		vscode.commands.registerCommand('commentStyler.colorRed', () => { Stylizer.markColor(Color.red)}),
		vscode.commands.registerCommand('commentStyler.colorBlue', () => { Stylizer.markColor(Color.blue)}),
		vscode.commands.registerCommand('commentStyler.colorGreen', () => { Stylizer.markColor(Color.green)}),
		vscode.commands.registerCommand('commentStyler.colorYellow', () => { Stylizer.markColor(Color.yellow)}),
		vscode.commands.registerCommand('commentStyler.colorPurple', () => { Stylizer.markColor(Color.purple)}),
		vscode.commands.registerCommand('commentStyler.colorOrange', () => { Stylizer.markColor(Color.orange)}),
		vscode.commands.registerCommand('commentStyler.colorCyan', () => { Stylizer.markColor(Color.cyan)}),
		vscode.commands.registerCommand('commentStyler.colorDefault', () => { Stylizer.markColor(Color.default) }),

		vscode.commands.registerCommand('commentStyler.size100', () => { Stylizer.markSize(Size.size100) }),
		vscode.commands.registerCommand('commentStyler.size200', () => { Stylizer.markSize(Size.size200) }),
		vscode.commands.registerCommand('commentStyler.size50', () => { Stylizer.markSize(Size.size50) }),
		vscode.commands.registerCommand('commentStyler.size75', () => { Stylizer.markSize(Size.size75) }),
		vscode.commands.registerCommand('commentStyler.size150', () => { Stylizer.markSize(Size.size150) }),
		vscode.commands.registerCommand('commentStyler.size125', () => { Stylizer.markSize(Size.size125) }),
		
		vscode.commands.registerCommand('commentStyler.stylizeDoc', () => { Stylizer.applyRules(); }),
		vscode.window.onDidChangeActiveTextEditor(() => Stylizer.applyRules()),

		// Due to VSCode bug registering 'type' event results in slowness: 
		// https://github.com/microsoft/vscode/issues/65876
		// One option is to remove other colorizing extensions like "𝘉𝘳𝘢𝘤𝘬𝘦𝘵 𝘊𝘰𝘭𝘰𝘳𝘪𝘻𝘦𝘳".
		vscode.commands.registerCommand("type", Formatter.onType.bind(Formatter)),
		vscode.commands.registerCommand("paste", Formatter.onPaste.bind(Formatter)),
		

	);
	Stylizer.applyRules();
}

function drawer(open:boolean) {
	vscode.commands.executeCommand('setContext', 'commentStyler.drawerOpen', open);
}

export function deactivate() {}
