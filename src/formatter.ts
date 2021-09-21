import * as vscode from 'vscode';
import { BulletType, Style } from './types';

class FontAttributes {

    name: string;
    charSize: number;
    charPoints: number;
    isUnicode: boolean;
    letters: string;

    constructor(name: string, charSize: number, charPoints: number, isUnicode:boolean, letters:string) {
        this.name = name;
        this.charSize = charSize;
        this.charPoints = charPoints;
        this.isUnicode = isUnicode;
        this.letters = letters;
    }
}

const Dictionary= {
    simple: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    bold: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
    italic: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡0\u00001\u00002\u00003\u00004\u00005\u00006\u00007\u00008\u00009\u0000",
    boldItalic: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
    outline: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ\u0000𝔻𝔼𝔽𝔾ℍ\u0000𝕀𝕁𝕂𝕃𝕄ℕ\u0000𝕆ℙ\u0000ℚ\u0000ℝ\u0000𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ\u0000𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡", //<= Some outlines are 16bit (e.g. C) while others 20bit.
    underline: "a͟b͟c͟d͟e͟f͟g͟h͟i͟j͟k͟l͟m͟n͟o͟p͟q͟r͟s͟t͟u͟v͟w͟x͟y͟z͟A͟B͟C͟D͟E͟F͟G͟H͟I͟J͟K͟L͟M͟N͟O͟P͟Q͟R͟S͟T͟U͟V͟W͟X͟Y͟Z͟0͟1͟2͟3͟4͟5͟6͟7͟8͟9͟",
    superscript: "ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹",

    // --- [r]𝗨𝗻𝘂𝘀𝗲𝗱 𝗮𝘁 𝘁𝗵𝗲 𝗺𝗼𝗺𝗲𝗻𝘁[/r] ----
    //boldSerif: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",                 
    //italicSerif: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍0123456789",
    //boldItalicSerif: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
    //strikethrough: "a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶0̶1̶2̶3̶4̶5̶6̶7̶8̶9̶",
};

const FontType = {
    simple: new FontAttributes("simple", 1, 1, false, Dictionary.simple),
    bold: new FontAttributes("bold", 2, 1, true, Dictionary.bold),
    italic: new FontAttributes("italic", 2, 1, true, Dictionary.italic),
    boldItalic: new FontAttributes("boldItalic", 2, 1, true, Dictionary.boldItalic),
    outline: new FontAttributes("outline", 2, 1, true, Dictionary.outline),
    underline: new FontAttributes("underline", 2, 2, true, Dictionary.underline),
    superscript: new FontAttributes("superscript", 1, 1, false, Dictionary.superscript),
};

class Formatter {

    stylizeSelection(style:Style) {
        switch(style) {
            case Style.bold: this.formatSelection(FontType.bold);break;
            case Style.italic: this.formatSelection(FontType.italic);break;
            case Style.outline: this.formatSelection(FontType.outline);break;
            case Style.underline: this.formatSelection(FontType.underline);break;
            case Style.superscript: this.formatSelection(FontType.superscript);break;
        }
    }

    bullet(type:BulletType=BulletType.circle) {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            
            const position = editor.selection.active;
            
            let bulletStr: string = (type==BulletType.circle)?"• ":"► ";
            
            editor.edit(editBuilder => {
                editBuilder.insert(position, bulletStr);
            });
        }
    }

    // Receives a sample string and determines which font it uses.
    // 𝗡𝗼𝘁𝗲: The function assumes the string uses a single font thus the test is performed o͟n͟l͟y on the first character.
    getCurFont(sample:String):FontAttributes {

        // If selection is only a single character, base the decision upon it
        // Otherwise, base decision on the second character - the unicode "special" character.
        if ((sample.length==1 && (sample.codePointAt(0) || 0)<=255)||
            (sample.length > 1 && (sample.codePointAt(1) || 0) <= 255)) {
            return FontType.simple
        }        

        // This is probably not a simple font, go over registered fonts and look for appropriate one
        for (const f in FontType) {
            const font = FontType[f as keyof typeof FontType];
            if (font.letters.indexOf(sample[1])>=0) {                            
                return font;
            }
        }
        return FontType.simple;
    }

    // Retrieves the requested format type based on the current and target formats
    // For example, if current format is "𝗯𝗼𝗹𝗱" and the target is "𝘪𝘵𝘢𝘭𝘪𝘤", result will be "𝘽𝙤𝙡𝙙𝙄𝙩𝙖𝙡𝙞𝙘"
    actualFormat(curFormat: FontAttributes, targetFormat: FontAttributes): FontAttributes{
        
        if (curFormat==targetFormat) {
            return FontType.simple;
        } else
        if (curFormat == FontType.boldItalic && targetFormat == FontType.bold) {
            return FontType.italic;
        } else 
        if (curFormat == FontType.boldItalic && targetFormat == FontType.italic) {
            return FontType.bold;
        } else
        if ((curFormat == FontType.bold && targetFormat == FontType.italic)||
                (curFormat == FontType.italic && targetFormat == FontType.bold)){
                return FontType.boldItalic;
        }
        return targetFormat;
    }

    // Apply the requested formatting 
    formatSelection(type:FontAttributes) {

        const editor = vscode.window.activeTextEditor;
        
        if(editor) {
            const document = editor.document;
            const selection = editor.selection;

            const word = document.getText(selection);
            let curFont = this.getCurFont(word);
            let actualTarget = this.actualFormat(curFont,type);
            
            let resultStr = this.translate(word, curFont, actualTarget);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, resultStr);
            });
        }
    }

    translate(word:string, curFont:FontAttributes, actualTarget:FontAttributes) {
        let re = RegExp("[" + curFont.letters + "]", curFont.isUnicode ? "gu" : "g");
        let resultStr = word.replace(re, chr => {
            let x = (re.source.indexOf(chr) - 1) / curFont.charSize;
            if (chr == "͟" && actualTarget != FontType.underline) {
                return ""
            }
            let z = "";
            for (let j = 0; j < actualTarget.charPoints; j++) {
                // If the element at pos is a UTF-16 high surrogate, we want the code point of the surrogate pair so we skip the low surrogate point
                let y = actualTarget.letters.codePointAt(x * actualTarget.charSize + j);
                z += String.fromCodePoint(y || 0);
            }
            return z;
        })
        return resultStr;
    }
}

const formatter = new Formatter();

export default formatter;