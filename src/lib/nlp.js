!function(window, $, undefined) {

    window.NLP = {}

    NLP.unique = function (unordered) {
        var result = [];
        var object = {};
        unordered.forEach(function (item) {
            object[item] = null;
        });
        result = Object.keys(object);
        return result;
    }

    NLP.stop = function (arr) {
        return arr.filter(function (i) {
            return (!(i in stopWords) && isNaN(Number(i)))
        })
    }

    // English stop words
    var stopWords = {
        "a": 0,
        "about": 0,
        "above": 0,
        "after": 0,
        "again": 0,
        "against": 0,
        "all": 0,
        "am": 0,
        "an": 0,
        "and": 0,
        "any": 0,
        "are": 0,
        "arent": 0,
        "as": 0,
        "at": 0,
        "be": 0,
        "because": 0,
        "been": 0,
        "before": 0,
        "being": 0,
        "below": 0,
        "between": 0,
        "both": 0,
        "but": 0,
        "by": 0,
        "cant": 0,
        "cannot": 0,
        "could": 0,
        "couldnt": 0,
        "did": 0,
        "didnt": 0,
        "do": 0,
        "does": 0,
        "doesnt": 0,
        "doing": 0,
        "dont": 0,
        "down": 0,
        "during": 0,
        "each": 0,
        "few": 0,
        "for": 0,
        "from": 0,
        "further": 0,
        "fwd": 0,
        "had": 0,
        "hadnt": 0,
        "has": 0,
        "hasnt": 0,
        "have": 0,
        "havent": 0,
        "having": 0,
        "he": 0,
        "hed": 0,
        "hell": 0,
        "hes": 0,
        "her": 0,
        "here": 0,
        "heres": 0,
        "hers": 0,
        "herself": 0,
        "him": 0,
        "himself": 0,
        "his": 0,
        "how": 0,
        "hows": 0,
        "i": 0,
        "id": 0,
        "ill": 0,
        "im": 0,
        "ive": 0,
        "if": 0,
        "in": 0,
        "into": 0,
        "is": 0,
        "isnt": 0,
        "it": 0,
        "its": 0,
        "itself": 0,
        "lets": 0,
        "me": 0,
        "more": 0,
        "most": 0,
        "mustnt": 0,
        "my": 0,
        "myself": 0,
        "no": 0,
        "nor": 0,
        "not": 0,
        "of": 0,
        "off": 0,
        "on": 0,
        "once": 0,
        "only": 0,
        "or": 0,
        "other": 0,
        "ought": 0,
        "our": 0,
        "ours": 0,
        "ourselves": 0,
        "out": 0,
        "over": 0,
        "own": 0,
        "same": 0,
        "shant": 0,
        "she": 0,
        "shed": 0,
        "shell": 0,
        "shes": 0,
        "should": 0,
        "shouldnt": 0,
        "so": 0,
        "some": 0,
        "such": 0,
        "than": 0,
        "that": 0,
        "thats": 0,
        "the": 0,
        "their": 0,
        "theirs": 0,
        "them": 0,
        "themselves": 0,
        "then": 0,
        "there": 0,
        "theres": 0,
        "these": 0,
        "they": 0,
        "theyd": 0,
        "theyll": 0,
        "theyre": 0,
        "theyve": 0,
        "this": 0,
        "those": 0,
        "through": 0,
        "to": 0,
        "too": 0,
        "under": 0,
        "until": 0,
        "up": 0,
        "very": 0,
        "was": 0,
        "wasnt": 0,
        "we": 0,
        "wed": 0,
        "well": 0,
        "were": 0,
        "weve": 0,
        "were": 0,
        "werent": 0,
        "what": 0,
        "whats": 0,
        "when": 0,
        "whens": 0,
        "where": 0,
        "wheres": 0,
        "which": 0,
        "while": 0,
        "who": 0,
        "whos": 0,
        "whom": 0,
        "why": 0,
        "whys": 0,
        "with": 0,
        "wont": 0,
        "would": 0,
        "wouldnt": 0,
        "you": 0,
        "youd": 0,
        "youll": 0,
        "youre": 0,
        "youve": 0,
        "your": 0,
        "yours": 0,
        "yourself": 0,
        "yourselves": 0,
        "www": 0,
        "com": 0,
        "org": 0,
        "net": 0,
        "co": 0,
        "io": 0,
        "cc": 0,
        'a':0, 'b':0, 'c':0, 'd':0, 'e':0, 'f':0, 'g':0, 'h':0, 'i':0, 'j':0, 'k':0, 'l':0, 'm':0, 'n':0,
        'o':0, 'p':0, 'q':0, 'r':0, 's':0, 't':0, 'u':0, 'v':0, 'w':0, 'x':0, 'y':0, 'z':0, '$':0, '1':0,
        '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0, '0':0
    }

    // most common

    // most common English words
    NLP.exactMatchStop = {
        "one": 0,
        "every": 0,
        "least": 0,
        "less": 0,
        "many": 0,
        "now": 0,
        "ever": 0,
        "never": 0,
        "say": 0,
        "says": 0,
        "said": 0,
        "also": 0,
        "get": 0,
        "go": 0,
        "goes": 0,
        "just": 0,
        "made": 0,
        "make": 0,
        "put": 0,
        "see": 0,
        "seen": 0,
        "whether": 0,
        "like": 0,
        "well": 0,
        "back": 0,
        "even": 0,
        "still": 0,
        "way": 0,
        "take": 0,
        "since": 0,
        "another": 0,
        "however": 0,
        "two": 0,
        "three": 0,
        "four": 0,
        "five": 0,
        "first": 0,
        "second": 0,
        "new": 0,
        "old": 0,
        "high": 0,
        "long": 0
    }

    // stemmer
    var step2list = {
            "ational" : "ate",
            "tional" : "tion",
            "enci" : "ence",
            "anci" : "ance",
            "izer" : "ize",
            "bli" : "ble",
            "alli" : "al",
            "entli" : "ent",
            "eli" : "e",
            "ousli" : "ous",
            "ization" : "ize",
            "ation" : "ate",
            "ator" : "ate",
            "alism" : "al",
            "iveness" : "ive",
            "fulness" : "ful",
            "ousness" : "ous",
            "aliti" : "al",
            "iviti" : "ive",
            "biliti" : "ble",
            "logi" : "log"
        },

        step3list = {
            "icate" : "ic",
            "ative" : "",
            "alize" : "al",
            "iciti" : "ic",
            "ical" : "ic",
            "ful" : "",
            "ness" : ""
        },

        c = "[^aeiou]",          // consonant
        v = "[aeiouy]",          // vowel
        C = c + "[^aeiouy]*",    // consonant sequence
        V = v + "[aeiou]*",      // vowel sequence

        mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
        meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
        mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
        s_v = "^(" + C + ")?" + v;                   // vowel in stem

    function dummyDebug() {}

    function realDebug() {
        console.log(Array.prototype.slice.call(arguments).join(' '));
    }

    NLP.stem = function(w, debug) {
        var
            stem,
            suffix,
            firstch,
            re,
            re2,
            re3,
            re4,
            debugFunction,
            origword = w;

        if (debug) {
            debugFunction = realDebug;
        } else {
            debugFunction = dummyDebug;
        }

        if (w.length < 3) { return w; }

        firstch = w.substr(0,1);
        if (firstch == "y") {
            w = firstch.toUpperCase() + w.substr(1);
        }

        // Step 1a
        re = /^(.+?)(ss|i)es$/;
        re2 = /^(.+?)([^s])s$/;

        if (re.test(w)) {
            w = w.replace(re,"$1$2");
            debugFunction('1a',re, w);

        } else if (re2.test(w)) {
            w = w.replace(re2,"$1$2");
            debugFunction('1a',re2, w);
        }

        // Step 1b
        re = /^(.+?)eed$/;
        re2 = /^(.+?)(ed|ing)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            re = new RegExp(mgr0);
            if (re.test(fp[1])) {
                re = /.$/;
                w = w.replace(re,"");
                debugFunction('1b',re, w);
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1];
            re2 = new RegExp(s_v);
            if (re2.test(stem)) {
                w = stem;
                debugFunction('1b', re2, w);

                re2 = /(at|bl|iz)$/;
                re3 = new RegExp("([^aeiouylsz])\\1$");
                re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");

                if (re2.test(w)) {
                    w = w + "e";
                    debugFunction('1b', re2, w);

                } else if (re3.test(w)) {
                    re = /.$/;
                    w = w.replace(re,"");
                    debugFunction('1b', re3, w);

                } else if (re4.test(w)) {
                    w = w + "e";
                    debugFunction('1b', re4, w);
                }
            }
        }

        // Step 1c
        re = new RegExp("^(.*" + v + ".*)y$");
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            w = stem + "i";
            debugFunction('1c', re, w);
        }

        // Step 2
        re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step2list[suffix];
                debugFunction('2', re, w);
            }
        }

        // Step 3
        re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step3list[suffix];
                debugFunction('3', re, w);
            }
        }

        // Step 4
        re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
        re2 = /^(.+?)(s|t)(ion)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            if (re.test(stem)) {
                w = stem;
                debugFunction('4', re, w);
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1] + fp[2];
            re2 = new RegExp(mgr1);
            if (re2.test(stem)) {
                w = stem;
                debugFunction('4', re2, w);
            }
        }

        // Step 5
        re = /^(.+?)e$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            re2 = new RegExp(meq1);
            re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
            if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
                w = stem;
                debugFunction('5', re, re2, re3, w);
            }
        }

        re = /ll$/;
        re2 = new RegExp(mgr1);
        if (re.test(w) && re2.test(w)) {
            re = /.$/;
            w = w.replace(re,"");
            debugFunction('5', re, re2, w);
        }

        // and turn initial Y back to y
        if (firstch == "y") {
            w = firstch.toLowerCase() + w.substr(1);
        }


        return w;
    }

}(window, undefined)

