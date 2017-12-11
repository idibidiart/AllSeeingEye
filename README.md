AllSeeingEye
============

[![Backers on Open Collective](https://opencollective.com/allseeingeye/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/allseeingeye/sponsors/badge.svg)](#sponsors)

Google Chrome Extension. Record All Browsing in Screenshots & Full Text. Search For Anything At Any Time. Never Forget Where You Read Something. Saves Everything To Your Machine, Not the Cloud, So Your Web History Stays With You.

![Alt text](/../screenshots/screenshot01.png?raw=true "sample")

![Alt text](/../screenshots/screenshot02.png?raw=true "sample")

[click for youtube video of me playing with it, late at night :)](https://www.youtube.com/watch?v=zEEWF4HxCtE)

###Installing
[Click here to install it from Chrome Web Store]
(https://chrome.google.com/webstore/detail/all-seeing-eye/kiopjipnmfcpdambegpfmggaffjmhnkd "All Seeing Eye")

As a developer, it's recommended that you load it from chrome://extensions URL in Chrome browser by choosing "Load unpacked extension" and selecting the root folder of this project.

I've only tested this extension with Google Chrome on a Mac. If you use Windows you'll be the first to test it. Please report any issues you find. 

###Usage
After you install it from the link above you start browsing like you normally do and when you want to search for something you simply go to Chrome-->History and select Show All History at the bottom of the menu. NEW: Checkout the "Options" tab as I've added a way to prevent capturing certain sites like your bank or Gmail etc.


###Storage Limit
Since this extension stores everything on your personal computer, using IndexedDB in the browser, the number of items that can be stored has been limited to 10,000, so it will delete older items to stay within this limit. This is about 5 Gigabytes. You can change that easily in the code (look for the variable 'total' in background.js and change it from 10000 to any number but beware that each page takes about 500Kb average because we're storing the screenshot with all its glory, no compression. This can be made more efficient by making use of Blob storage. Look for dataURIToBlob function in background.js)


## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/allseeingeye/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/allseeingeye#backer)]

<a href="https://opencollective.com/allseeingeye#backers" target="_blank"><img src="https://opencollective.com/allseeingeye/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/allseeingeye#sponsor)]

<a href="https://opencollective.com/allseeingeye/sponsor/0/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/1/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/2/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/3/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/4/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/5/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/6/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/7/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/8/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/allseeingeye/sponsor/9/website" target="_blank"><img src="https://opencollective.com/allseeingeye/sponsor/9/avatar.svg"></a>


