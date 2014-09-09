(function () {
  $.Color.add = function(a, b) = {
    return $.Color(a.red + b.red, 
                   a.green + b.green, 
                   a.blue + b.blue);
  }
})()
