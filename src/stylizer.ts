import { Code, Color, ControlChars } from './types';
import * as vscode from 'vscode';
import { Rules } from './config';

class Stylizer {

    myDecorations = new Map();
    currentColor = Color.default;

    constructor() {
        this.init();
    }
    init() {

        const rules = Object.keys(Rules);
        rules.forEach(rule => {
            let types: vscode.TextEditorDecorationType[] = [];
            const stylePerGroup = Rules[rule as keyof typeof Rules].stylePerGroup;
            stylePerGroup.forEach(style => {
                let type = vscode.window.createTextEditorDecorationType(style as vscode.DecorationRenderOptions);
                types.push(type);
            });
            this.myDecorations.set(rule, types);
        });
    }

    applyRules() {

        if (this.myDecorations.size==0) {
            return;
        }

        this.clearDecorations();
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const text = document.getText();

            let decorations = new Map();


            const rules = Object.keys(Rules);
            rules.forEach(rule => {
                let types = this.myDecorations.get(rule);                
                let rx = new RegExp(rule, "gus");
                try {
                    let instances = text.matchAll(rx);
                    Array.from(instances, m => {
                        let startIdx = m.index || 0;
                        let endIdx = startIdx;

                        for (let i = 1; i < m.length; i++) {
                            let startPos = document.positionAt(startIdx);
                            endIdx = startIdx + m[i].length;
                            let endPos = document.positionAt(endIdx);
                            let range = new vscode.Range(startPos, endPos);

                            let val = decorations.get(types[i - 1]) || [];
                            val.push(range);
                            decorations.set(types[i - 1], val);

                            startIdx = endIdx;
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            });
            decorations.forEach((range, type) => {
                editor.setDecorations(type, range);
            })
        }
    }
    clearDecorations() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            this.myDecorations.forEach((types, rule) => {
                types.forEach((type: any) => {
                    editor.setDecorations(type, []);
                });
            });
        }
    }


    mark(color: Color) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            let text = document.getText(selection);
            if (!text) {                
                vscode.window.showInformationMessage("Please select some text before performing this operation.");
                return;
            }

            //vscode.commands.executeCommand('setContext', 'commentFormatter.color', color);

            let c = "";
            switch (color) {
                case Color.red: c = Code.RED; break;
                case Color.blue: c = Code.BLUE; break;
                case Color.yellow: c = Code.YELLOW; break;
                case Color.green: c = Code.GREEN; break;
                case Color.default: c = ""; break;
            }

            // First, clear existing control characters from the text
            let re=RegExp("["+ControlChars+"]","ug");
            text = text.replace(re, '');
            
            const resultStr = (c) ? Code.END + c + text + Code.END : text;
            try {
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, resultStr);
                }).then(success => {
                    if (success) {
                        this.applyRules();
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
}

const stylizer = new Stylizer();

export default stylizer;