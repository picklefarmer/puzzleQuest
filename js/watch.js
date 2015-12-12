 
  var path = './';
  var fs = require('fs');
  var dev = require('nw.gui').Window.get().showDevTools();
  fs.watch(path, function() {
    if (location)
      location.reload();
  });
