
export const Rules = {   
    "(\\u2062\\u2062\\u2062)(.*?)(\\u2061)": {
        "stylePerGroup": [{}, { "color": "green" }, {}]
    },
    "(\\u2062\\u2062\\u2063)(.*?)(\\u2061)": {
        "stylePerGroup": [{}, { "color": "purple" }, {}]
    },
    "(\\u2062\\u2063\\u2062)(.*?)(\\u2061)": {
        "stylePerGroup": [{}, { "color": "red" }, {}]
    },
    "(\\u2062\\u2063\\u2063)(.*?)(\\u2061)": {
        "stylePerGroup": [{}, { "color": "orange" }, {}]    
    },
    "(\\u2063\\u2062\\u2062)(.*?)(\\u2061)": {
        "stylePerGroup": [{}, { "color": "blue" }, {}]
    },
    "(\\u2063\\u2062\\u2063)(.*?)(\\u2061)": {
        "stylePerGroup": [{}, { "color": "cyan" }, {}]
    },
    "(\\u2063\\u2063\\u2062)(.*?)(\\u2061)": {
        "stylePerGroup": [{},{"color": "yellow"},{}]
    },
    "(\\u200C\\u200C\\u200C)(.*?)(\\u200B)": {
        "stylePerGroup": [{},{"textDecoration": ";font-size:2em"},{}]
    },
    "(\\u200C\\u200C\\u200D)(.*?)(\\u200B)": {
        "stylePerGroup": [{}, { "textDecoration": ";font-size:1.5em" }, {}]
    },
    "(\\u200C\\u200D\\u200C)(.*?)(\\u200B)": {
        "stylePerGroup": [{}, { "textDecoration": ";font-size:1.25em" }, {}]
    },
    "(\\u200C\\u200D\\u200D)(.*?)(\\u200B)": {
        "stylePerGroup": [{}, { "textDecoration": ";font-size:0.75em" }, {}]    
    },
    "(\\u200D\\u200C\\u200C)(.*?)(\\u200B)": {
        "stylePerGroup": [{}, { "textDecoration": ";font-size:0.5em" }, {}]
    }
    
}


