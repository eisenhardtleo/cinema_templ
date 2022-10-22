var slideshowReady = false;
var current = 0;
var heroGallery = document.getElementById( 'hero-gallery' );
var slideshow = document.getElementById( 'slideshow' );
var slides = slideshow.getElementsByClassName( 'slide' );

var dots = heroGallery.getElementsByClassName( 'dot' );
var navs = heroGallery.getElementsByClassName( 'hero-gallery-navi-btn' );
var slidesCounter = slides.length;
var slideshowInterval;
var viewPortWidth;
    
var resizeEnd;

var init = function() {

    setUpSlideshow();
    initSlideshow();
 

    for( var d = 0; d < dots.length; d++ ) {
        dots[d].addEventListener( 'click', dotClickHandler );
    }

    function windowResized(){
        console.log( 'windowResized');
        setUpSlideshow();
        playSlideshow();
    }
    window.onresize = function() {
        if( this.slideshowInterval ) {
            this.stopSlideshow();
        }
        clearTimeout(resizeEnd);
        resizeEnd = setTimeout(windowResized, 100);
    };

}();

function setUpSlideshow() {
    viewPortWidth = window.innerWidth;
    slideshow.style.width = ( viewPortWidth * slidesCounter ) + 'px';
    for( var i = 0; i < slidesCounter; i++ ) {
        slides[i].style.width = viewPortWidth + 'px';

        if( !slideshowReady ) {
            var slideContent = slides[i].querySelector('.slide-content');
            slideContent.addEventListener( 'mouseenter', stopSlideshow );
            slideContent.addEventListener( 'mouseleave', playSlideshow );

            slideshowReady = true;
        }
    }

    var newOffset = viewPortWidth * current;
    slideshow.style.marginLeft = -newOffset + 'px';
    slideshow.style.left = -newOffset + 'px';
    slideshow.style.transform = 'translateX(' + -newOffset + 'px )';

}

function dotClickHandler() {
    stopSlideshow();
    var dotClicked = this;
    var nextSlideIndex = dotClicked.getAttribute('data-slide');
    var next = parseInt( nextSlideIndex, 10 );

    goToSlide( next );
    playSlideshow();
}

function initSlideshow() {
    playSlideshow();
}

function playSlideshow() {
    console.log('playSlideshow');
    if( !slideshowInterval )  {
        slideshowInterval = setInterval( handleSlideshow, 5000 );
    }
}

function stopSlideshow() {
    console.log('stopSlideshow');
    clearInterval( slideshowInterval );
    slideshowInterval = undefined;
}

function handleSlideshow() {
    var next = current < slidesCounter - 1 ? current + 1 : 0;
    goToSlide( next );
}


function goToSlide( index ) {
    var currentSlide = slides[current];
    var currentDot = document.querySelector('[data-slide="' + current + '"]');
    var next = index;
    var nextSlide = document.querySelector('[data-slide="' + next + '"]');
    var nextDot = slides[next];

    currentSlide.classList.remove('active');
    currentDot.classList.remove('active');
    nextSlide.classList.add('active');
    nextDot.classList.add('active');

    var newOffset = viewPortWidth * index;
    // slideshow.style.marginLeft = -newOffset + 'px';
    // slideshow.style.left = -newOffset + 'px';
    slideshow.style.transform = 'translateX(' + -newOffset + 'px )';

    current = index;
}