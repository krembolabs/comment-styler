import { Color } from './types';
import * as vscode from 'vscode';
import { Rules } from './config';

class Stylizer {

    myDecorations = new Map();

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
        this.clearDecorations();
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const text = document.getText();

            let decorations=new Map();


            const rules = Object.keys(Rules);
            rules.forEach(rule => {
                let types = this.myDecorations.get(rule);
                const stylePerGroup = Rules[rule as keyof typeof Rules].stylePerGroup;

                let rx = new RegExp(rule, "gu");
                try {
                    let instances = text.matchAll(rx);
                    Array.from(instances, m => {
                        let startIdx = m.index || 0;
                        let endIdx = startIdx;

                        for (let i = 1; i < m.length; i++) {
                            let startPos = document.positionAt(startIdx);
                            endIdx = startIdx + m[i].length;
                            let endPos = document.positionAt(endIdx);

                            console.log(`Value ${m[i]} => ${stylePerGroup[i - 1]}`);

                            let range = new vscode.Range(startPos, endPos);


                            let val=decorations.get(types[i-1])||[];
                            val.push(range);
                            decorations.set(types[i-1],val);
                            //editor.setDecorations(types[i - 1], [range]);

                            startIdx = endIdx;
                        }

                    });


                } catch (err) {
                    console.log(err);
                }
            });
            decorations.forEach((range,type)=>{
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
            const text = document.getText(selection);

            const RED   = "\u2062\u2063\u2062";
            const GREEN = "\u2062\u2062\u2062";
            const BLUE  = "\u2063\u2062\u2062";
            const YELLOW = "\u2063\u2063\u2062";
            const END = "\u2061";
            
            let c="";
            switch (color){
                case Color.red: c=RED; break;
                case Color.blue: c = BLUE; break;
                case Color.yellow: c = YELLOW; break;
                case Color.green: c = GREEN; break;
            }
            const resultStr=c+text+END+c;

            editor.edit(editBuilder => {
                editBuilder.replace(selection, resultStr);
            }).then(success => {
                if (success) {
                    this.applyRules();
                }
            });
              
            
        }

    }

}

const stylizer = new Stylizer();

export default stylizer;