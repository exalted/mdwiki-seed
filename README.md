README
======

First things first
------------------

Learn [Markdown](https://help.github.com/articles/github-flavored-markdown)! Then check out MDwiki's [quick start](http://dynalon.github.io/mdwiki/#!quickstart.md).

Whenever you feel stuck, go to [MDwiki's own site](http://mdwiki.info) for further information.

Fork It
-------

First off fork this repo and call it something like `<MyProject>-wiki`.

Create a New Wiki
-----------------

It all begins by creating an initial file structure for any language that you would like to support. For example, if you're interested having a wiki in English, then you will duplicate `ll_CC` folder and rename your copy to `en`. (For a complete list of languages [`ll`] and country codes [`CC`] [see here](http://msdn.microsoft.com/en-us/library/ee825488).)

`ll_CC` is a starter template folder which you shouldn't ever edit directly, since you may loose your changes when MDwiki gets updated later.

> If you want to have your wiki in more than one language, then you duplicate `ll_CC` as many times as necessary and rename each copy with the appropriate language and country code. (Country code is optional and it is only useful if you want to distinguish, for instance, American English from British English, such as: `en_US` and `en_GB`.)

Getting Started
---------------

_You should have a language wiki folder by now, if not, go back and read above to create one._

Suppose your first wiki is going to be in English, hence you must have a folder called `en`, as previously described.

1. Open `index.html` file with your favorite plain text editor (the one that is at the same level where `ll_CC` and your language folder is located, **NOT the one inside your language folder**)
1. Find where it says "Override `ll_CC` below with your default language and country code"
1. Change refresh meta tag from `url=ll_CC/` to `url=en/` **(trailing `/` is very important)**

Structure
---------

_All file references here are relative to their respective language folder._

| Name | Type | Description |
| :--- | :--- | :--- |
| `index.md` | File | Starting poing (a.k.a. "home page") for your wiki. **Note this is not the `index.html`, but `index.md`**! |
| `navigation.md` | File | Various settings of your wiki (e.g., name of your wiki, items in the navigation bar at the top, etc.) |
| `config.json` | File | If you don't know what this is for, don’t touch it. |
| `pages` | Folder | Ideally, inside this folder, you create one `*.md` file for every page inside your wiki (e.g., `foo.md`, `much-longer-names-are-also-okay.md`, etc.) You can also create as many subfolders as you need, just remember to link them accordingly. |
| `uploads` | Folder | An example folder structure where you could put other files. **Although it is best to host your files somewhere else, like Dropbox, or a CDN, etc.** |

Best Practices
--------------

### Relative URLs

Instead of using absolute URLs when linking one wiki page to another, use relative URLs.

For instance if `en/pages/foo.md` page had to link to `en/pages/bar.md`, it is enough to just add `[Click here](bar.md)` in your markdown.

### Don't Host Your Uploads in Git(Hub)

Instead of hosting your uploads inside the `uploads` folder, consider using Dropbox, Google Drive, or a CDN.

### Add References to Uploads

**Whenever you can, avoid hosting your uploads using Git(Hub).**

If you _must_ add references to files hosted inside the `uploads` folder here's how to do it, for instance: `![Image Title](uploads/images/foo.png)`. Add that in your markdown and you're good to go.


How to Preview
==============

In order to preview your changes locally, prior to publishing online, you may need to take some actions. Below some starting points for each operating system, also check out MDwiki's [frequently asked questions](http://dynalon.github.io/mdwiki/#!faq.md) section for some ideas.

Mac OS
------

The easiest way to serve up static sites on a Mac is to use [Anvil](http://anvilformac.com). Go ahead and download it from their website, install and add a site using the status bar icon: simply select the folder where your wiki is located on your Mac.

Windows
-------

> This section needs some :heart:, but if you like you can change you computer

Linux
-----

You can use [Prax](http://ysbaddaden.github.io/prax/). Prax is a pure ruby alternative to Pow!! that runs on GNU/Linux.


For Developers
==============

You don't need to read below here or do anything at all if you're only interested creating your own wiki. This section is for developers or maintainers of this repository.

Update MDwiki
-------------

> Current version: [0.6.2](http://git.io/HBH5Wg).

1. Go to https://github.com/Dynalon/mdwiki/releases/latest
1. Click on the green button on that page to download the latest release
1. Extract the contents of the archive file
1. Copy `mdwiki-slim.html` file from the extracted files onto `ll_CC/index.html` file in this repository by renaming, thus overriding `index.html`
1. Update the version information above
1. Commit and push your changes

You can now delete any files downloaded previously, if you want to.
