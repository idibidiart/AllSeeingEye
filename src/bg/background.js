!function(window, $, undefined) {

    var     exactMatchHTML = "<div class='exact-match-tag rotate-left'>\
                            <div class='exact-match-bottom'>\
                                <div class='exact-match-text'>\
                                Exact Match\
                                </div>\
                            </div>\
                            <div class='exact-match-top'>\
                            </div>\
                            <i class='icon icon-pushpin'></i>\
                         </div>"
        ,   isActive = {}
        ,   done = true

    chrome.runtime.onMessage.addListener(function (msg, sender, respond) {

        if (msg.from = "history") {

            if (msg.action === "showAll") {
                showAll(sender.tab.id, function(r) {
                     respond(r)
                })
            }

            if (msg.action === "search") {
                search(msg.tags, msg.text, msg.numWords, sender.tab.id, function(r) {
                    respond(r)
                })
            }
        }

        if (msg.from = "content") {

            if (msg.action === "store") {
                var     url = sender.tab.url
                    ,   text = msg.text
                    ,   tags = msg.tags
                    ,   date = msg.date
                    ,   title = msg.title

                // async control loop, start by capturing sender.tab in self executing closure
                !function(t) {

                    // timeout is needed here because bug in Chrome that causes capture API to fail
                    // if fired immediately upon tab becoming visible
                    function captureActive() {

                        // is the we're after tab really active right at this precise time?
                        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

                            // if not, and another tab is active right now, re-send capture request to tab and return
                            // The tab will respond when it's visible
                            if (!tabs[0] || t.id !== tabs[0].id) {
                                capture(t.id)
                                return
                            }

                            // tell the tab that we got it
                            respond(true)

                            // when the tab that invoked this function is active (visible at this precise time)
                            chrome.tabs.captureVisibleTab(
                                chrome.windows.WINDOW_ID_CURRENT, {format: "png"},
                                function (src) {
                                    if (!src) {
                                        return
                                    }

                                    var transaction = db.transaction(["links"], "readwrite");
                                    var objectStore = transaction.objectStore("links");
                                    var req = objectStore.add(
                                        {
                                            date: new Date().toLocaleString(),
                                            title: title,
                                            tags: tags,
                                            text: text,
                                            url: url,
                                            img: src
                                        }
                                    )

                                    // see if we need to free up disk space
                                    req.onsuccess = function () {
                                        console.log(url);
                                        console.log(text);
                                        console.log(tags.sort());

                                        var total = 10000

                                        function freeSpace() {

                                            if (!done) return

                                            done = false

                                            var transaction = db.transaction(["links"], "readwrite");
                                            var objectStore = transaction.objectStore("links");

                                            var count = objectStore.count();

                                            count.onsuccess = function(e) {
                                                var numItems = e.target.result

                                                // if ~> 10Gb, assuming a generous 1Mb per page
                                                if (numItems > total) {
                                                    var transaction = db.transaction(["links"], "readwrite");
                                                    var objectStore = transaction.objectStore("links");
                                                    var request = objectStore.openCursor()

                                                    var n = numItems / 10 >> 0

                                                    request.onsuccess = function (e) {
                                                        var cursor = e.target.result;

                                                        if (cursor) {

                                                            console.log('freeing up space... very lazily')
                                                            objectStore.delete(cursor.primaryKey);
                                                            if (n) {
                                                                n--
                                                                cursor.continue()
                                                            } else {
                                                                done = true
                                                            }

                                                        } else {
                                                            done = true
                                                        }
                                                    }
                                                } else {
                                                    done = true
                                                }
                                            }

                                        }

                                        freeSpace()
                                    }
                                }
                            )

                        })
                    }
                    setTimeout(captureActive, 500)
                }(sender.tab)
            }
        }
        return true
    });

    function capture(tabId) {
            chrome.tabs.executeScript(tabId, {file: "vendor/jquery-2.1.0.min.js", runAt: "document_start"}, function (result) {
                if (chrome.runtime.lastError) {
                    return;
                }
            })
            chrome.tabs.executeScript(tabId, {file: "src/lib/nlp.js", runAt: "document_start"}, function (result) {
                if (chrome.runtime.lastError) {
                    return;
                }
            })

            chrome.tabs.executeScript(tabId, {file: "src/inject/addHistoryItem.js", runAt: "document_start"}, function (result) {
                if (chrome.runtime.lastError) {
                    return;
                }
            })
    }

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === "loading") {
            delete isActive[tabId]
            return
        }

        if (tab.url.indexOf("chrome://history") === 0) {
            if (changeInfo.status === "complete") {
                isActive[tabId] = true
                return
            }
        }
        capture(tabId)
    })

    chrome.tabs.onReplaced.addListener(function(tabId, removedTabId){
        delete isActive[tabId]
        capture(tabId)
    });

    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        delete isActive[tabId]
    })

    var openRequest = indexedDB.open("AllMyHistory", 1)
        , db;

    openRequest.onupgradeneeded = function (e) {

        var thisDb = e.target.result;

        //Create objectStore
        if (!thisDb.objectStoreNames.contains("links")) {
            var objectStore = thisDb.createObjectStore("links", { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("date", "date", {unique: false});
            objectStore.createIndex("tags", "tags", {unique: false, multiEntry: true});
        }

    }

    openRequest.onsuccess = function (e) {
        db = e.target.result;
        db.onerror = function (event) {
            // Generic error handler for all errors targeted at this database' requests!
            console.log("database error");
        };
    }

    function showAll(tabId, cb) {
        var transaction = db.transaction("links", "readonly");
        var objectStore = transaction.objectStore("links");
        var request = objectStore.openCursor(null,"prev");

        request.onsuccess = function (e) {

            var found = false
            var cursor = e.target.result;

            if (cursor) {
                chrome.tabs.sendMessage(tabId,
                    {
                        from: "bg",
                        action: "append",
                        data: {
                            title: cursor.value.title,
                            date:  cursor.value.date,
                            img: cursor.value.img,
                            url: cursor.value.url,
                        }
                    }
                )

                found = true
                cb(true)

                if (isActive[tabId]) {
                    cursor.continue()
                    return
                }
            } else {
                if (!found) cb()
            }
        }
    }


    function search(tags, text, multi, tabId, cb) {

        var transaction = db.transaction("links", "readonly");
        var objectStore = transaction.objectStore("links");
        var index = objectStore.index("tags");

        //  matches substring but only at start, e.g. fight in fighting but not in infighting
        var range = IDBKeyRange.only(tags[tags.length - 1], "prev")
        var cursor = index.openCursor(range)

        cursor.onsuccess = function(e) {

            var     cursor = e.target.result
                ,   found = false
                ,   isExactMatch = false

            if (cursor) {

                found = true;

                var len = tags.length > 1 ? tags.length - 1 : 0;
                var _tags = cursor.value.tags

                while(len--) {
                    if (_tags.indexOf(tags[len]) === -1) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    var exactTest = cursor.value.text.indexOf(text)
                    if (multi && exactTest !== -1) {
                        isExactMatch = true
                    }
                }

                if (found) {
                    cb({result: "found"})

                    chrome.tabs.sendMessage(tabId,
                        {
                            from: "bg",
                            action: isExactMatch ? "prepend": "append",
                            data: {
                                title: cursor.value.title,
                                date: cursor.value.date,
                                exactMatch: isExactMatch ? exactMatchHTML : undefined,
                                img: cursor.value.img,
                                url: cursor.value.url
                            }
                        }
                    )
                }

                if (isActive[tabId]) {
                    cursor.continue();
                    return;
                }

            } else {
                if (!found) {
                    var transaction = db.transaction("links", "readonly");
                    var objectStore = transaction.objectStore("links");
                    var cursor = objectStore.openCursor();

                    cursor.onsuccess = function(e) {
                        var cursor = e.target.result

                        if (!cursor) {
                            cb({result: "no items"})
                        } else {
                            cb({result: "not found"})
                        }
                    }
                }
            }
        }
    }


    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob
        var bb;
        if ( typeof BlobBuilder != 'undefined' )
            bb = new BlobBuilder();
        else
            bb = new WebKitBlobBuilder();
        bb.append(ab);
        return bb.getBlob(mimeString);
    }

}(window,jQuery)
