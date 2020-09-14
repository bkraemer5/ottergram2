var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var ARROW_SELECTOR = '[data-image-role="arrow"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;


function setDetails(imageURL, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) { 
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail)); 
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault(); 
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() { 
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails); // converts nodelist to array
    return thumbnailArray; 
}

function hideDetails() { 
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS); 
}

function showDetails() { 
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS); 
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        } 
    });
}

function getArrows() {
    var arrows = document.querySelectorAll(ARROW_SELECTOR);
    var arrowsArray = [].slice.call(arrows); 
    return arrowsArray; 
}

function previousArrowClickHandler() {
    'use strict';
    var arrow = document.querySelectorAll(ARROW_SELECTOR)[0];
    var currentDetail = document.querySelector(DETAIL_IMAGE_SELECTOR);
    arrow.addEventListener('click', function (event) {
        var thumbnails = getThumbnailsArray();
        for (var i = 0; i < thumbnails.length; i++) {
            if (thumbnails[i].pathname === ("/" + currentDetail.attributes.src.value)) {
                if (i === 0) {
                    setDetailsFromThumb(thumbnails[thumbnails.length - 1]);
                    showDetails();
                }
                else {
                    setDetailsFromThumb(thumbnails[i-1]);
                    showDetails();
                }
                break;
            }
        }
    });
}

function nextArrowClickHandler() {
    'use strict';
    var arrow = document.querySelectorAll(ARROW_SELECTOR)[1];
    var currentDetail = document.querySelector(DETAIL_IMAGE_SELECTOR);
    arrow.addEventListener('click', function (event) {
        var thumbnails = getThumbnailsArray();
        for (var i = 0; i < thumbnails.length; i++) {
            if (thumbnails[i].pathname === ("/" + currentDetail.attributes.src.value)) {
                if (i === thumbnails.length - 1) {
                    setDetailsFromThumb(thumbnails[0]);
                    showDetails();
                }
                else {
                    setDetailsFromThumb(thumbnails[i+1]);
                    showDetails();
                }
                break;
            }
        }
    });
}


function initializeEvents() {
    'use strict';
    console.log("initialize");
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    previousArrowClickHandler();
    nextArrowClickHandler();
    addKeyPressHandler();
}

initializeEvents();