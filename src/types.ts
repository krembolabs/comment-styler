export enum Style {
    bold="Bold",
    italic="Italic",
    boldItalic="BoldItalic",
    underline="Underline",
    superscript="Superscript",
    outline="Outline"
}

export enum BulletType {
    circle,
    triangle
}

export enum Color {
    default="",
    red="Red",
    blue="Blue",
    green="Green",
    yellow="Yellow",
    purple="Purple",
    lightblue="LightBlue",
    orange="Orange"
}

export enum Size {    
    sizeX1="100",
    sizeX15 = "150",
    sizeX2="200",
    sizeX075 = "75",
    sizeX05="50"
}

export const ControlChars  = "\u2061\u2062\u2063\u200B\u200C\u200D";
export const ControlColors = "\u2061\u2062\u2063";
export const ControlSizes  = "\u200B\u200C\u206D";

export enum Code {
    GREEN = "\u2062\u2062\u2062",
    PURPLE = "\u2062\u2062\u2063",
    RED = "\u2062\u2063\u2062",
    ORANGE ="\u2062\u2063\u2063",    
    BLUE = "\u2063\u2062\u2062",
    LIGHTBLUE ="\u2063\u2062\u2063",
    YELLOW = "\u2063\u2063\u2062",
    END_COLOR = "\u2061",

    SIZEx2 = "\u200C\u200C\u200C",
    SIZEx05 = "\u200C\u200C\u200D",
    SIZEx075 = "\u200C\u200D\u200C",
    SIZEx15 = "\u200C\u200D\u200D",
    END_SIZE = "\u200B"

}