$('.btn').click(function() {
  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  var options = {
    tags: "YARN",
    format: "json"
  };
  function showPhotos(data) {
    var photoList = '<ul>';
    $.each(data.items, function(i, photo) {
      photoList += '<li>';
      photoList += '<a href="' + photo.link + '">';
      photoList += '<img src="' + photo.media.m + '"></a></li>';
    });
    photoList += '</ul>';
    $('.container').html(photoList);

  }
  $.getJSON(flickrAPI, options, showPhotos);
});
