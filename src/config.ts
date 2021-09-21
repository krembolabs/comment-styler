
export const Rules = {
    "(\\u2062\\u2063\\u2062)(.*)(\\u2061\\u2062\\u2063\\u2062)": {
        "stylePerGroup": [ 
            {
               
            },
            {
                "color": "red",
                "rangeBehavior": 1
            },
            {
               
            }
        ]
    },
    "(\\u2062\\u2062\\u2062)(.*)(\\u2061\\u2062\\u2062\\u2062)": {
        "stylePerGroup": [
            {
               
            },
            {
                "color": "green",
                "rangeBehavior": 1
            },
            {
               
            }
        ]
    },
    "(\\u2063\\u2062\\u2062)(.*)(\\u2061\\u2063\\u2062\\u2062)": {
        "stylePerGroup": [
            {
               
            },
            {
                "color": "blue",
                "rangeBehavior": 1
            },
            {
               
            }
        ]
    },
    "(\\u2063\\u2063\\u2062)(.*)(\\u2061\\u2063\\u2063\\u2062)": {
        "stylePerGroup": [
            {
               
            },
            {
                "color": "yellow",
                "rangeBehavior": 1
            },
            {
               
            }
        ]
    },
    
    "(\\[z\\])(.*)(\\[/z\\])(.)": {
        "stylePerGroup": [
            {
                "opacity": "0",
                "letterSpacing": "-10px",
            },
            {
                "color": "green",
            },
            {
                "opacity": "0",
                "letterSpacing": "-10px"
            },
            {}
        ]
    },
    "(___)([^_].*)(___)": {
        "stylePerGroup": [ 
            {
                "color": "transparent",
                "opacity": "0",
                "letterSpacing": "-10px",
            }, 
            {
                "textDecoration": "underline"
            }, 
            {
                "color": "transparent",
                "opacity": "0",
                "letterSpacing": "-10px",
            }, 
        ]
    },
    "(\\*\\*\\*)([^\\*\\s].*)([\\*][\\*][\\*])": {    
        "stylePerGroup": [ 
            {
                "opacity": "0",
                "letterSpacing": "-10px",
            }, 
            {               
                "fontWeight": "bold"
            },
            {
                "opacity": "0",
                "letterSpacing": "-10px",
            }, 
        ]
    }
}
