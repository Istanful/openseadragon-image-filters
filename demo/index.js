(function(f, $) {
  "use strict";

  f.filterBackend = f.initFilterBackend();

  $.Viewer.prototype.setFilters = function() {
    console.log('abc');
    this.addHandler("tile-loaded", function(e) {
      const isLoaded = e.tile.loaded;
      console.log('tile-loaded', isLoaded);
      // const callback = e.getCompletionCallback();

      // setTimeout(function() {
      //   callback();
      // });

      console.log('things');
    });

    this.addHandler("tile-drawing", function(e) {
      console.log("tile-drawing", e);
    });
  };
})(fabric, OpenSeadragon);
