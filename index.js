$(function() {
  var fade = 2000;
  var delay = 1000;

  var $spinner = $('.loading_spinner');
  var $title= $('.title');
  var $img = $('.image');
  var $imgOld = $('.image.old');
  var $imgNew = $('.image.new');

  function fadeImages() {
    $imgOld.fadeIn(fade, function() {
      $img.delay(delay).fadeToggle(fade).delay(delay).fadeToggle(fade)
          .delay(delay).fadeToggle(fade).delay(delay).fadeToggle(fade)
          .delay(delay).fadeToggle(fade).delay(delay).fadeToggle(fade);
    });
  }

  function showImages(title, src_old, src_new) {
    $spinner.fadeIn();
    $title.fadeOut(fade);
    $imgNew.fadeOut(fade);
    $imgOld.fadeOut(fade, function() {
      $imgOld.attr('src', src_old);
      $imgNew.attr('src', src_new);
      $spinner.fadeOut(fade);
      $title.text(title).fadeIn(fade);
      fadeImages();
    });
  }

  function nextSlide(slide) {
    showImages(
      slide.title,
      slide.src_old,
      slide.src_new
    );
  }

  function startSlideshow(slides) {
    var slide_couter = 0;
    nextSlide(slides[slide_couter]);
    var slideInterval = setInterval(function() {
      slide_couter = slide_couter < slides.length-1 ? slide_couter+1 : 0;
      nextSlide(slides[slide_couter]);
    }, (fade+delay)*6+fade);
  }

  $spinner.show();
  $title.hide();
  $img.hide();
  $.getJSON( "./images.json", function(slides) {
    startSlideshow(slides);
  });
});