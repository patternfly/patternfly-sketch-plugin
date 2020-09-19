import sketch from 'sketch'

export default function () {
  const doc = sketch.getSelectedDocument();

  // get all padding layers and make sure they are visible
  let paddingLayers = doc.getLayersNamed('📐 Padding');
  paddingLayers.forEach((layer) => {
    layer.hidden = false;
  });

  try {
    let file_doc = context.document,
      file_url = file_doc.fileURL(),
      file_path = file_url.path(),
      file_folder = file_path.split(file_doc.displayName())[0];

    let path = file_folder + file_doc.displayName().split('.sketch')[0] + "_export/";
    sketch.UI.message(path);

    for (var i = 0; i < pages.count(); i++) {
      var page = pages.objectAtIndex(i);
      file_doc.setCurrentPage(page);
      var pagename = file_doc.currentPage().name(),
        layers = file_doc.currentPage().artboards();

      for (var j = 0; j < layers.count(); j++) {
        var slice = layers.objectAtIndex(j);
        file_doc.saveArtboardOrSlice_toFile_(slice, path + "/" + slice.name() + ".svg");
      }
    }

    // Reset visibility on all padding layers
    paddingLayers.forEach((layer) => {
      layer.hidden = true;
    });

    sketch.UI.message('Export to SVG completed!');
  } catch (err) {
    sketch.UI.message(err);
  }
}
