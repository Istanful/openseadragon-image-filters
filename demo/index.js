(function(f, $) {
  f.filterBackend = f.initFilterBackend();
  $.Viewer.prototype.setFilters = function(filters) {
    this.addHandler("tile-loaded", function(e) {
      /*
       * Create a fabric image from the image on the event.
       * This will be used to apply the given filters.
       *
       */
      var fabricImage = new f.Image(e.image);
      fabricImage.applyFilters(filters)

      /*
       * Create a canvas as big as the image. This will be used to
       * draw the image on.
       *
       */
      var canvas = document.createElement( 'canvas' );
      canvas.width = e.image.width;
      canvas.height = e.image.height;

      /*
       * Draw the image on the canvas and override the context2D OpenSeadragon
       * currently draws. This will render the filter on the tile with our new
       * filters applied.
       *
       */
      var renderedContext = canvas.getContext('2d');
      e.tile.context2D = renderedContext;
      e.tile.context2D.drawImage(fabricImage.getElement(),
        0, 0, e.image.width, e.image.height);
    });
  };

  var viewer = $({
    id: "image-viewer",
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    tileSources: {
      crossOriginPolicy: 'Anonymous',
      ajaxWithCredentials: false,
      "Image": {
          "xmlns":    "http://schemas.microsoft.com/deepzoom/2008",
          "Format":   "jpg",
          "Overlap":  "2",
          "TileSize": "256",
          "Size": {
              "Height": "9221",
              "Width":  "7026"
          },
          "Url": "https://openseadragon.github.io/example-images/highsmith/highsmith_files/"
      },
    }
  });

  var filter = new f.Image.filters.Grayscale();
  viewer.setFilters([filter]);
})(fabric, OpenSeadragon);
