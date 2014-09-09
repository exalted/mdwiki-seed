// from https://github.com/jsantell/interpolate-color
/**
 * A simple color interpolator.
 * Parses a `from` and `to` HSL string in the format
 * `hsl(200, 100%, 50%)` and a step value between 0 and 1
 * and returns a new HSL string.
 * An optional `precision` value may be provided for the
 * new HSL string
 *
 * @param {string} from
 * @param {string} to
 * @param {number} step
 * @param {precision} number
 */

var InterpolateColor = (function(){
  var regex= /^hsl\(\s*([\-|\d|\.]*)\s*,\s*([\d|\.]*)%\s*,\s*([\d|\.]*)%/;
  return {
  interpolate: function (start, end, step, precision) {
      var precision = precision != null ? precision : 0;
      var start = start.match(regex);
      var end = end.match(regex);
      var
        startH = +start[1],
        startS = +start[2],
        startL = +start[3],
        endH   = +end[1],
        endS   = +end[2],
        endL   = +end[3];

      var
        h = (startH - (startH - endH) * step).toFixed(precision),
        s = (startS - (startS - endS) * step).toFixed(precision),
        l = (startL - (startL - endL) * step).toFixed(precision);

      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }
  };
})();
