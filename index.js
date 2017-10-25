$(function() {
  var fade = 3000;
  var delay = 1000;
  var useRandom = true;

  var $spinner = $('.loading_spinner');
  var $title= $('.title');
  var $img = $('.image');
  var $imgOld = $('.image.old');
  var $imgNew = $('.image.new');

  function fadeImages(callback) {
    $imgOld.fadeIn(fade, function() {
      $imgOld
        .delay(delay).fadeToggle(fade)
        .delay(delay).fadeToggle(fade)
        .delay(delay).fadeToggle(fade);
      $imgNew
        .delay(delay).fadeToggle(fade)
        .delay(delay).fadeToggle(fade)
        .delay(delay).fadeToggle(fade, callback);
    });
  }

  function showImages(title, src_old, src_new, callback) {
    console.log("Showing Slide: ", title || src_old);
    $spinner.fadeIn(fade);
    $title.fadeOut(fade);
    $imgOld.hide();
    $imgNew.fadeOut(fade, function() {
      $imgOld.attr('src', src_old);
      $imgNew.attr('src', src_new);
      $spinner.fadeOut(fade);
      $title.text(title || '').fadeIn(fade);
      fadeImages(callback);
    });
  }

  function getNextSlideIndex(slide_couter, slides) {
    var index = slide_couter;
    if (useRandom) {
      index = Math.floor(Math.random() * slides.length);
    } else {
      index = slide_couter < slides.length-1 ? slide_couter+1 : 0;
    }
    if (index === slide_couter) {
      index = getNextSlideIndex(slide_couter, slides);
    }
    return index;
  }

  function startSlideshow(slides) {
    var slide_couter = 0;
    function endlessLoop() {
      slide_couter = getNextSlideIndex(slide_couter || 0, slides);
      var slide = slides[slide_couter];
      showImages(
        slide.title,
        slide.src_old,
        slide.src_new,
        endlessLoop
      );
    }
    endlessLoop();
  }

  $spinner.show();
  $title.hide();
  $img.hide();
  $.getJSON( "./images/slideshow.json", function(slides) {
    slides = slides.map(function(slide) {
      slide.src_old = "./images/" + slide.src_old;
      slide.src_new = "./images/" + slide.src_new;
      return slide;
    })
    startSlideshow(slides);
  });
});
