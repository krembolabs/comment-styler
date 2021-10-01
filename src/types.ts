export enum Style {
    bold = "Bold",
    italic = "Italic",
    boldItalic = "BoldItalic",
    underline = "Underline",
    superscript = "Superscript",
    outline = "Outline"
}

export enum BulletType {
    circle,
    triangle
}

export enum Color {
    default = "Default",
    red = "Red",
    blue = "Blue",
    green = "Green",
    yellow = "Yellow",
    purple = "Purple",
    cyan = "Cyan",
    orange = "Orange"
}

export enum Size {
    size200 = "200",
    size150 = "150",
    size125 = "125",
    size100 = "100",
    size75 = "75",
    size50 = "50"
}

export const ControlChars = "\u2061\u2062\u2063\u200B\u200C\u200D";
export const ControlColors = "\u2061\u2062\u2063";
export const ControlSizes = "\u200B\u200C\u206D";

export enum Code {
    GREEN = "\u2062\u2062\u2062",
    PURPLE = "\u2062\u2062\u2063",
    RED = "\u2062\u2063\u2062",
    ORANGE = "\u2062\u2063\u2063",
    BLUE = "\u2063\u2062\u2062",
    CYAN = "\u2063\u2062\u2063",
    YELLOW = "\u2063\u2063\u2062",
    END_COLOR = "\u2061",

    size200 = "\u200C\u200C\u200C",
    size150 = "\u200C\u200C\u200D",
    size125 = "\u200C\u200D\u200C",
    size75 = "\u200C\u200D\u200D",
    size50 = "\u200D\u200C\u200C",


    END_SIZE = "\u200B"

}