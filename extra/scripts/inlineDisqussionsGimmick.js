// This gimmick is not currently in use, however it will be added in the future. See dynamic gimmick load issue
// on mdwiki github page. 
(function($) {
  function disqus ($links, opt, text) {
    var default_options = {
      identifier: ''
    };
    var options = $.extend (default_options, opt);
    return $links.each(function(i,link) {
      var $link = $(link);
      var disqus_shortname = $link.attr('href');
      if (disqus_shortname !== undefined && disqus_shortname.length > 0) {
        (function() {
          var dsq = document.createElement('p');
          //<p class='inline-disqus-p' data-disqus-identifier="disqussion-1"></p>
          dsq.type = 'text/javascript';
          dsq['data-disqus-identifier'] = disqus_shortname;
          dsq['class'] = 'inline-disqus-p';
          $link.prepend();
        })();
        $link.remove ();
      }
    }); // links.each
    disqus_shortname = 'team-diana-github';
    jQuery(document).delay(2000).ready(function() {
      setTimeout(function() {
        jQuery(".inline-disqus-p").inlineDisqussions({
            highlighted: false,
            position: 'left',
            background: 'white',
            maxWidth: 9999
        });
      }, 1000);
    });
  }
  var disqusGimmick = new MDwiki.Core.Gimmick();
  disqusGimmick.addHandler('inline-disqus', disqus);
  $.md.wiki.gimmicks.registerGimmick(disqusGimmick);
}(jQuery));
