# This Wiki 

This wiki is created with [mdwiki](http://dynalon.github.io/mdwiki/#!index.md) and written in markdown.

The repository is avaiable [here on github](https://github.com/team-diana/team-diana.github.io)

You can edit or write new pages with any text editor, then submit your changes with a pull request.

##Comments


### Inline Comments
Write the comment in a way that is distinguishable from normal wiki content (you can use *** italics *** for instance).
Remember to sign your comment appending your name/email or your github account link with this gimmick

```javascript
[!githubuser](username)
```

warning: this gimmick must still be implemented.

### Discus Comments

<p class='inline-disqus' data-disqus-identifier="this_wiki-1"></p>
Comments can be written by anyone. In order to add a placeholder for comment insert this line:

```html
<p class='inline-disqus' data-disqus-identifier="ID"></p>
```

warning: Remember to add one empty line above and under when embedding html inside markdown.

where __ID__ is a unique id (for the entire wiki). The __ID__ helps to edit the wiki without having to
care about the order of comments. In order to maintain unique id, prepend the name of the page.

hint: In the future, a mdwiki gimmick will be available and will replace the html line above

