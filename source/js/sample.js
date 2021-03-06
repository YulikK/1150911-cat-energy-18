var mobileWidth = 320;
var tabletWidth = 768;
var desktopWidth = 1300;
var mobilePictureWidth = mobileWidth;
var tabletPictureWidth = 690;
var desktopPictureWidth = 690;
var pictureWidth = mobileWidth;
var windowW = calcScreen();

function calcScreen() {
  windowW = Math.max(document.documentElement.clientWidth, window.innerWidth);
  if (windowW >= tabletWidth) pictureWidth = tabletPictureWidth;
  if (windowW >= desktopWidth) pictureWidth = desktopPictureWidth;
  var slider = document.querySelector('.sample__slider');
  var img = document.querySelector('.sample__photo-wrapper--overlay');
  if (!(img == null)) {
    img.style.width = (pictureWidth / 2) + "px";
  }
  if(windowW < tabletWidth && !(slider == null)) {
    slider.style.width = 50 + "%";
  }
  else if (!(slider == null)) {
    slider.style.width = 34 +"px";
    slider.style.left = 51 + "%";
  }
};

function initComparisons() {
  var x, i;
  x = document.getElementsByClassName("sample__photo-wrapper--overlay");
  for (i = 0; i < x.length; i++) {
    compareImages(x[i]);
  }

  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    var sampleRange = document.querySelector('.sample__range');
    var sartButton = document.querySelector(".sample__start");
    var endButton = document.querySelector(".sample__end");

    windowW = Math.max(document.documentElement.clientWidth, window.innerWidth);
    if (windowW >= tabletWidth) pictureWidth = tabletPictureWidth;
    if (windowW >= desktopWidth) pictureWidth = desktopPictureWidth;
    w = sampleRange.offsetWidth;
    h = sampleRange.offsetHeight;
    img.style.width = (pictureWidth / 2) + "px";

    slider = document.createElement("DIV");
    slider.setAttribute("class", "sample__slider");
    slider.setAttribute("tabindex", "0");
    slider.setAttribute("role", "button");
    slider.setAttribute("aria-label", "Ползунок переключения фото примеров");
    if (windowW < tabletWidth) {
      slider.style.width = 50 + "%";
    }
    else {
        slider.style.left = 51 + "%";
    }
    sampleRange.insertBefore(slider, sampleRange.firstChild);

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);
    window.addEventListener("resize", calcScreen);
    window.addEventListener("orientationchange", calcScreen);
    sartButton.addEventListener("click", hideAll);
    endButton.addEventListener("click", showAll);

    // calcScreen();

    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      clicked = 0;
    }

    function slideMove(e) {
      var pos;
      w = sampleRange.offsetWidth - 4;
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos <= 0) pos = 4;
      if (pos > w) pos = w;
      slide(pos);
    }

    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      if (windowW < tabletWidth) {
        a = slider.getBoundingClientRect();
      }
      else {
        a = sampleRange.getBoundingClientRect();
      }
      x = e.pageX - a.left;
      x = x - window.pageXOffset;

      return x;
    }

    function hideAll(e) {
      slide(4);
    }

    function showAll(e) {
      slide(w);
    }

    function slide(x) {
      img.style.width = pictureWidth - (x * 100 / sampleRange.offsetWidth) * pictureWidth / 100 + "px";
      if (windowW < tabletWidth) {
        slider.style.width = (x * 100 / sampleRange.offsetWidth) + "%";
      }
      else {
        slider.style.left = (x * 100 / sampleRange.offsetWidth) + "%";
      }
    }
  }
}
