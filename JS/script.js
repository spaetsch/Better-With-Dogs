
$('#search-form').submit(function(event) {
  var $flickrSearch = $("#flickr-search").val();
  console.log("sending search tag:", $flickrSearch);

  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  var options = {
    tags: $flickrSearch,
    format: "json"
  };
  var optionsWDog = {
    tags: $flickrSearch + " ,dog",
    format: "json"
  };

  function showPhotosLeft(data) {
    var firstPhoto = '<a href="' + data.items[0].link + '"><img src="' + data.items[0].media.m + '"></a>';
    // var photoList = '<ul>';
    // $.each(data.items, function(i, photo) {
    //   photoList += '<li>';
    //   photoList += '<a href="' + photo.link + '">';
    //   photoList += '<img src="' + photo.media.m + '"></a></li>';
    // });
    // photoList += '</ul>';
    // $('#left1').html(photoList);
     $('#left1').html(firstPhoto);

  }

  function showPhotosRight(data) {
       var firstDogPhoto = '<a href="' + data.items[0].link + '"><img src="' + data.items[0].media.m + '"></a>';
     $('#right1').html(firstDogPhoto);

  }

  event.preventDefault();
  $.getJSON(flickrAPI, options, showPhotosLeft);
  $.getJSON(flickrAPI, optionsWDog, showPhotosRight);


});



// $('#search-formDog').submit(function(event) {
//   var $flickrSearchDog = $("#flickr-searchDog").val() + " ,dog";

//   console.log("sending search tags:", $flickrSearchDog);

//   var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
//   var options = {
//     tags: $flickrSearchDog,
//     format: "json"
//   };
//   function showPhotos(data) {
//     var photoList = '<ul>';
//     $.each(data.items, function(i, photo) {
//       photoList += '<li>';
//       photoList += '<a href="' + photo.link + '">';
//       photoList += '<img src="' + photo.media.m + '"></a></li>';
//     });
//     photoList += '</ul>';
//     $('#search-resultsDog').html(photoList);
//   }

//   event.preventDefault();

//   $.getJSON(flickrAPI, options, showPhotos);
// });
