import { ControlChars } from "./types";

export function hasControlCodes(str:string):boolean {
    let re = RegExp("[" + ControlChars + "]", "ug");
    return (re.test(str));
}

export function isControlChar(chr:string) {
    return (hasControlCodes(chr));
}
