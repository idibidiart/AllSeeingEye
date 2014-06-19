if (window.scriptURL !== window.location.href) {

    window.scriptURL = window.location.href

    var beenVisible = false

    var getText = getText || function () {
        var n
            , text = window.location.hostname + " " + document.title + " "
            , walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

        while (n = walk.nextNode()) {
            var ignore = { "STYLE": 0, "CODE": 0, "SCRIPT": 0, "NOSCRIPT": 0, "IFRAME": 0, "OBJECT": 0 }
            if (n.parentNode.tagName in ignore || n.parentNode instanceof HTMLUnknownElement) {
                continue;
            }
            text += n.textContent + " "
        }

        text = text
                    .toLowerCase()
                    .replace(new RegExp("[ \\f\\n\\r\\t\\v\\u00A0\\u2028\\u2029\"_\\-\']+", "gm"), " ") || ""

        console.time("tags")
        var tags = text && NLP.unique(NLP.stop(text.match(/([\w]+)/g))).map(function(v, i) { return NLP.stem(v)}) || []
        console.timeEnd("tags")

        return {text: text, tags: tags}

    }

    var visible = visible || function () {

        if (document.visibilityState === "visible") {

            if (beenVisible) {
                return
            }

            chrome.runtime.sendMessage({
                from: "content",
                action: "allow",
                hostname: window.location.hostname
            }, function (r) {
                    if (r) {
                       store()
                    }
               }
            )

            function store() {
                var content = getText()

                chrome.runtime.sendMessage({
                    from: "content",
                    action: "store",
                    title: document.title,
                    text: content.text,
                    tags: content.tags
                }, function (r) {
                    if (r) {
                        beenVisible = true;
                        document.removeEventListener('visibilitychange', visible, false)
                    }
                })
            }
        }
    }

    $(document).ready(function() {

       // allow page render time
       var t = setTimeout(function() {
            if (document.visibilityState === "visible") {
                visible()
            } else {
                document.addEventListener('visibilitychange', visible, false)
            }
       }, 3500)
    })
}


