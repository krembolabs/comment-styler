import * as vscode from 'vscode';
import { BulletType, Style } from './types';
import Stylizer from './stylizer';
import { hasControlCodes, isControlChar } from './utils';
import Settings from './config';
class FontAttributes {

    name: string;
    charSize: number;
    charPoints: number;
    isUnicode: boolean;
    letters: string;


    constructor(name: string, charSize: number, charPoints: number, isUnicode: boolean, letters: string) {
        this.name = name;
        this.charSize = charSize;
        this.charPoints = charPoints;
        this.isUnicode = isUnicode;
        this.letters = letters;
    }
}

const Dictionary = {

    simple: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    bold: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
    boldSerif: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
    italic: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡0\u00001\u00002\u00003\u00004\u00005\u00006\u00007\u00008\u00009\u0000",
    italicSerif: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ\u0000𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍0\u00001\u00002\u00003\u00004\u00005\u00006\u00007\u00008\u00009\u0000",
    boldItalic: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
    boldItalicSerif: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
    outline: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ\u0000𝔻𝔼𝔽𝔾ℍ\u0000𝕀𝕁𝕂𝕃𝕄ℕ\u0000𝕆ℙ\u0000ℚ\u0000ℝ\u0000𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ\u0000𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡", //<= Some outlines are 16bit (e.g. C) while others 20bit.
    underline: "a͟b͟c͟d͟e͟f͟g͟h͟i͟j͟k͟l͟m͟n͟o͟p͟q͟r͟s͟t͟u͟v͟w͟x͟y͟z͟A͟B͟C͟D͟E͟F͟G͟H͟I͟J͟K͟L͟M͟N͟O͟P͟Q͟R͟S͟T͟U͟V͟W͟X͟Y͟Z͟0͟1͟2͟3͟4͟5͟6͟7͟8͟9͟",
    superscript: "ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹",

};

const FontType = {
    simple: new FontAttributes("simple", 1, 1, false, Dictionary.simple),
    bold: new FontAttributes("bold", 2, 1, true, (Settings.serifFont) ? Dictionary.boldSerif : Dictionary.bold),
    italic: new FontAttributes("italic", 2, 1, true, (Settings.serifFont) ? Dictionary.italicSerif : Dictionary.italic),
    boldItalic: new FontAttributes("boldItalic", 2, 1, true, (Settings.serifFont) ? Dictionary.boldItalicSerif : Dictionary.boldItalic),
    outline: new FontAttributes("outline", 2, 1, true, Dictionary.outline),
    underline: new FontAttributes("underline", 2, 2, true, Dictionary.underline),
    superscript: new FontAttributes("superscript", 1, 1, false, Dictionary.superscript),
};

class Formatter {
    ignoreNextEdit = false;
    isBoldActive = false;
    isItalicActive = false;
    isUnderlineActive = false;
    isOutlineActive = false;
    isSuperscriptActive = false;
    edits: any[] = [];

    regexFont = new Map();

    stylizeSelection(style: Style) {
        if (this.isSelected()) {
            switch (style) {
                case Style.bold: this.formatSelection(FontType.bold); break;
                case Style.italic: this.formatSelection(FontType.italic); break;
                case Style.outline: this.formatSelection(FontType.outline); break;
                case Style.underline: this.formatSelection(FontType.underline); break;
                case Style.superscript: this.formatSelection(FontType.superscript); break;
            }
        } else {
            vscode.window.showInformationMessage("Please select some text before performing this operation.");
            return;
        }
    }

    bullet(type: BulletType = BulletType.circle) {
        const editor = vscode.window.activeTextEditor;

        if (editor) {

            const position = editor.selection.active;

            let bulletStr: string = (type == BulletType.circle) ? "• " : "► ";

            editor.edit(editBuilder => {
                editBuilder.insert(position, bulletStr);
            });
        }
    }

    isSelected(): boolean {

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const word = editor.document.getText(editor.selection);
            if (word) {
                return true;
            }
        }
        return false;
    }

    toggleMode(style: Style) {

        if (this.isSelected()) {
            // Apply the operation on the selected text if exists, in this case do not toggle to sticky mode

            this.isBoldActive = this.isItalicActive = this.isUnderlineActive = this.isOutlineActive = false;
            vscode.commands.executeCommand('setContext', 'commentStyler.boldON', this.isBoldActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.italicON', this.isItalicActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.underlineON', this.isUnderlineActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.outlineON', this.isOutlineActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.superscriptON', this.isSuperscriptActive);

            this.stylizeSelection(style);


        } else {
            switch (style) {
                case Style.bold:
                    this.isBoldActive = !this.isBoldActive;
                    this.isOutlineActive = this.isUnderlineActive = this.isSuperscriptActive = false;
                    break;
                case Style.italic:
                    this.isItalicActive = !this.isItalicActive;
                    this.isOutlineActive = this.isUnderlineActive = this.isSuperscriptActive = false;
                    break;
                case Style.underline:
                    this.isUnderlineActive = !this.isUnderlineActive;
                    this.isBoldActive = this.isItalicActive = this.isOutlineActive = this.isSuperscriptActive = false;
                    break;
                case Style.outline:
                    this.isOutlineActive = !this.isOutlineActive;
                    this.isBoldActive = this.isItalicActive = this.isUnderlineActive = this.isSuperscriptActive = false;
                    break;
                case Style.superscript:
                    this.isSuperscriptActive = !this.isSuperscriptActive;
                    this.isBoldActive = this.isItalicActive = this.isUnderlineActive = this.isOutlineActive = false;
                    break;
            }
            vscode.commands.executeCommand('setContext', 'commentStyler.boldON', this.isBoldActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.italicON', this.isItalicActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.underlineON', this.isUnderlineActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.outlineON', this.isOutlineActive);
            vscode.commands.executeCommand('setContext', 'commentStyler.superscriptON', this.isSuperscriptActive);

        }
    }


    // Receives a sample string and determines which font it uses.
    // 𝗡𝗼𝘁𝗲: The function assumes the string uses a single font thus the test is performed o͟n͟l͟y on the first character.
    getCurFont(sample: String): FontAttributes {

        // If selection is only a single character, base the decision upon it
        // Otherwise, base decision on the second character - the unicode "special" character.
        let firstCharIndex = 1;

        if (sample.length == 1) {
            firstCharIndex = 0;
        } else {
            // Has only color/size
            if (sample.length >= 4 && isControlChar(sample.charAt(0))) {
                firstCharIndex = 4;
                // Has both color and size
                if (sample.length >= 8 && isControlChar(sample.charAt(4))) {
                    firstCharIndex = 8;
                }
            }
        }
        if ((sample.codePointAt(firstCharIndex) || 0) <= 255) {
            return FontType.simple;
        }

        let compareCh = String.fromCodePoint(sample.codePointAt(firstCharIndex+1)||0);

        // This is probably not a simple font, go over registered fonts and look for appropriate one
        for (const f in FontType) {
            const font = FontType[f as keyof typeof FontType];            
            if (font.letters.indexOf(compareCh) >= 0) {
                return font;
            }
        }
        return FontType.simple;
    }

    // Retrieves the requested format type based on the current and target formats
    // For example, if current format is "𝗯𝗼𝗹𝗱" and the target is "𝘪𝘵𝘢𝘭𝘪𝘤", result will be "𝘽𝙤𝙡𝙙𝙄𝙩𝙖𝙡𝙞𝙘"
    actualFormat(curFormat: FontAttributes, targetFormat: FontAttributes): FontAttributes {

        if (curFormat == targetFormat) {
            return FontType.simple;
        } else
            if (curFormat == FontType.boldItalic && targetFormat == FontType.bold) {
                return FontType.italic;
            } else
                if (curFormat == FontType.boldItalic && targetFormat == FontType.italic) {
                    return FontType.bold;
                } else
                    if ((curFormat == FontType.bold && targetFormat == FontType.italic) ||
                        (curFormat == FontType.italic && targetFormat == FontType.bold)) {
                        return FontType.boldItalic;
                    }
        return targetFormat;
    }

    // Apply the requested formatting 
    formatSelection(type: FontAttributes) {

        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            const word = document.getText(selection);
            if (!word) {
                vscode.window.showInformationMessage("Please select some text before performing this operation.");
                return;
            }


            let curFont = this.getCurFont(word);
            let actualTarget = this.actualFormat(curFont, type);

            let resultStr = this.translate(word, curFont, actualTarget);
            let hasControls = hasControlCodes(resultStr);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, resultStr);
            }).then(success => {
                if (success) {
                    if (hasControls) {
                        Stylizer.applyRules();
                    }
                }
            });
        }
    }

    formatEdit(type: FontAttributes, doc?: vscode.TextDocument) {
        if (this.edits.length) {
            console.log("formatEdit, length=" + this.edits.length);
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                editor.edit(editBuilder => {
                    this.edits.forEach(edit => {
                        try {
                            if (edit.text) {
                                let curFont = this.getCurFont(edit.text);
                                let actualTarget = this.actualFormat(curFont, type);
                                let resultStr = this.translate(edit.text, curFont, actualTarget);

                                if (resultStr == edit.text) {
                                    console.log("No change, exiting");
                                    return; // No change is needed
                                }

                                this.ignoreNextEdit = true; // next edit event will be the replace operation we're about to perform
                                let startPos = edit.range.start;
                                let endPos = startPos.translate(0, edit.text.length);
                                let range = new vscode.Range(startPos, endPos);

                                editBuilder.replace(range, resultStr);
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    })
                    this.edits = [];
                }).then(success => {

                    // Clear the selection
                    var pos = editor.selection.end;
                    console.log(`Done replacing, clearing selection at [L:${pos.line},C:${pos.character}]`);
                    editor.selection = new vscode.Selection(pos, pos);
                });
            }
        }
    }

    isSupportsUnderline(ch: string): boolean {
        return (!ch.match(/[,.;\n\r ]/));
    }

    toggleUnderline(text: string): string {
        const UNDERSCORE = "͟";

        let noUS = text.replace(/͟/g, '');
        if (noUS.length < text.length) {
            return noUS;
        }
        if (text.length==1) {
            return UNDERSCORE+text;
        }

        let result = "";
        let next = "";

        for (let c of text) {
            let cp = c.codePointAt(0);
            let ch = String.fromCodePoint(cp || 0);

            if (!isControlChar(ch) && this.isSupportsUnderline(ch)) { //ch!=" "&&ch!=","&&ch!="."&&ch!=";"&&cp!=10&&cp!=13) {            
                result += next + ch;
                next = UNDERSCORE; // Add this on the next iteration (not relevant to the last character)
            } else {
                result += ch;
                next = "";
            }
        }
        // Special case: single letter can have an underline although it's the "last" letter
        result = result.replace(/(^|\s)(.)(\s)/gmu, '$1' + UNDERSCORE + '$2$3');
        return result;
    }

    translate(word: string, curFont: FontAttributes, actualTarget: FontAttributes): string {

        let re = this.regexFont.get(curFont.name);
        if (!re) {
            re = new RegExp("[" + curFont.letters + "]", "gu");
            this.regexFont.set(curFont.name, re);
        }

        if (actualTarget == FontType.underline || (actualTarget == FontType.simple && curFont == FontType.underline)) {
            return this.toggleUnderline(word);
        }

        if (curFont == FontType.underline) {
            word = this.toggleUnderline(word);
        }

        let resultStr = word.replace(re, chr => {
            let x = (re.source.indexOf(chr) - 1) / curFont.charSize;
            let z = "";
            for (let j = 0; j < actualTarget.charPoints; j++) {
                // If the element at pos is a UTF-16 high surrogate, we want the code point of the surrogate pair so we skip the low surrogate point
                let y = actualTarget.letters.codePointAt(x * actualTarget.charSize + j);
                z += String.fromCodePoint(y || 0);
            }
            return z;
        })
        if (curFont == FontType.underline) {
            resultStr = this.toggleUnderline(resultStr);
        }
        return resultStr;
    }

isStickyModeActive() {
    return (this.isBoldActive || this.isItalicActive || this.isOutlineActive || this.isUnderlineActive || this.isSuperscriptActive);
}

getCurFontAttr(): FontAttributes {
    if (this.isBoldActive && this.isItalicActive) {
        return FontType.boldItalic;
    } else
        if (this.isBoldActive) {
            return FontType.bold;
        } else
            if (this.isItalicActive) {
                return FontType.italic;
            } else
                if (this.isOutlineActive) {
                    return FontType.outline;
                } else
                    if (this.isUnderlineActive) {
                        return FontType.underline;
                    } else
                        if (this.isSuperscriptActive) {
                            return FontType.superscript;
                        }
    return FontType.simple;

}

onType(args: { text: string }) {

    if (this.isStickyModeActive()) {
        let curFont = FontType.simple;
        let actualTarget = this.actualFormat(curFont, this.getCurFontAttr());
        let resultStr = this.translate(args.text, curFont, actualTarget);
        args.text = resultStr;
    }

    return vscode.commands.executeCommand("default:type", args);
}

onPaste(args: { text: string, pasteOnNewLine: boolean }) {

    return vscode.commands.executeCommand("default:paste", args).then(() => {

        setTimeout(Stylizer.applyRules.bind(Stylizer), 10);
    });



}

}

const formatter = new Formatter();

export default formatter;