import { Code, Color, ControlChars, ControlColors, ControlSizes, Size } from './types';
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
            let types: (vscode.TextEditorDecorationType|null)[] = [];
            const stylePerGroup = Rules[rule as keyof typeof Rules].stylePerGroup;
            stylePerGroup.forEach(style => {
                let type;
                if (Object.keys(style).length==0) {
                    type = null;
                } else {
                    style = this.addDefaultStyles(style);
                    type = vscode.window.createTextEditorDecorationType(style as vscode.DecorationRenderOptions);
                }
                types.push(type);
            });
            this.myDecorations.set(rule, types);
        });
    }

    addDefaultStyles(style:any):any {
        style.rangeBehavior = 1
        return style;
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
                if (type) {
                    editor.setDecorations(type, range);
                }
            })
        }
    }
    clearDecorations() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            this.myDecorations.forEach((types, rule) => {
                types.forEach((type: any) => {
                    if (type) {
                        editor.setDecorations(type, []);
                    }
                });
            });
        }
    }

    markSize(size:Size) {
        this.mark(null, size);
    }

    markColor(color:Color) {
        this.mark(color,null);
    }

    mark(color: Color|null,size: Size|null) {

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            let text = document.getText(selection);
            if (!text) {                
                vscode.window.showInformationMessage("Please select some text before performing this operation.");
                return;
            }

            let c = "";
            switch (color) {                
                case Color.red: c = Code.RED; break;
                case Color.blue: c = Code.BLUE; break;
                case Color.yellow: c = Code.YELLOW; break;
                case Color.green: c = Code.GREEN; break;
                case Color.orange: c = Code.ORANGE; break;
                case Color.purple: c = Code.PURPLE; break;
                case Color.cyan: c = Code.CYAN; break;
                case Color.default: c = ""; break;
            }

            let s = "";
            switch (size) {
                case Size.size100 : s = ""; break;
                case Size.size200 : s = Code.size200; break;
                case Size.size50: s = Code.size50; break;
                case Size.size75: s = Code.size75; break;
                case Size.size150: s = Code.size150; break;
                case Size.size125: s = Code.size125; break;
            }

            // First, clear existing control characters from the text
            if (color) {
                let re = RegExp("[" + ControlColors+"]","ug");
                text = text.replace(re, '');
            }
            if (size) {
                let re = RegExp("[" + ControlSizes + "]", "ug");
                text = text.replace(re, '');
            }

            let prefix = (c)? Code.END_COLOR+c:"";
            prefix+=(s)?Code.END_SIZE+s:"";
            let suffix = (c)? Code.END_COLOR:"";
            suffix+=(s)?Code.END_SIZE:"";
            
            const resultStr = prefix + text + suffix;
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