Math.hypot = function(a, b) {
    if (typeof(a) == "object") {
	var i, sumSq = 0;
	for(i=0; i < a.length; i++) {
	    sumSq += a[i] * a[i];
	}
	return Math.sqrt(sumSq);
    } else
	return Math.sqrt( a*a + b*b );
};

$(document).ready(function() {
    // At this point, some View implementation is supposed to be
    // loaded through a <script> tag, for example one of
    // view-raphael.js or view-paperjs.js

    if (!View.isSupported()) {
        window.location = './notsupported.html';
    }

    // suppress text select events
    $(window).bind('selectstart', function(event) {
        event.preventDefault();
    });

    // initialize visualization
    Panel.init();
    Controller.init();
});
