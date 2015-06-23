$(document).ready(function() {
    Parse.initialize("AHIy9mpKJEjOzLWZ3EEM3p822bXjevKRB5i1y7lw", "b3iPxis4qWRwM5XGyUKrF48QBWjK8F3yeUKK01wd");

	/*-----------------------------------------------------------------------------------*/
	/*	Smooth Scroll
	/*  Thanks to: https://github.com/davist11/jQuery-One-Page-Nav
	/*-----------------------------------------------------------------------------------*/

	function smoothScroll(){
		$(".nav").onePageNav({
			filter: ':not(.external)',
			scrollSpeed: 1500
		});

		var formTarget = $(".js-form"); // Assign this class to corresponding section on Index.html

		// Scrolls to form section
		$(".js-scroll").on("click", function() {
			$('html, body').animate({
				scrollTop: formTarget.offset().top
			}, 2000);
			return false;
		});

		return false;
	}

	smoothScroll();

	/*-----------------------------------------------------------------------------------*/
	/*	Backstretch
	/*  Thanks to: http://srobbin.com/jquery-plugins/backstretch/
	/*-----------------------------------------------------------------------------------*/

	function backStrech() {
		$("aside").backstretch([
			"img/placeholder-1.jpg",
			"img/placeholder-2.jpg",

			], {duration: 5000, fade: 1000});
	}

	backStrech();

	/*-----------------------------------------------------------------------------------*/
	/*	Flexslider
	/*  Thanks to: http://www.woothemes.com/flexslider/
	/*-----------------------------------------------------------------------------------*/

	function flexSlider(){
		$('.flexslider').flexslider({
			animation: "slide",
			slideshow: true,
            slideshowSpeed: 7000,
			touch: true,
            controlNav: false
		});
	}

	flexSlider();

	/*-----------------------------------------------------------------------------------*/
	/*	RSVP Form Validation + Submission
	/*-----------------------------------------------------------------------------------*/
    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

	function rsvpFormSubmit() {

		// this is the id of the form
		var formID = $("#js-form");

		// submits form with ajax method
        formID.on({
            submit: function() {
                return false;
            },
            valid: function() {
                var ResponseObject = Parse.Object.extend("ResponseObject");
                var respObject = new ResponseObject();
                var data = getFormData($(this));
                respObject.save(data, {
                    success: function(object) {
                        $(".js-display")
                            .removeClass("error-panel")
                            .addClass("message-panel")
                            .html('Thanks for your RSVP!'); 
                        $("#js-submit-btn").hide();
                    },
                    error: function(object) {
                        $(".js-display")
                            .removeClass("message-panel")
                            .addClass("error-panel")
                            .html("Uh oh, something went wrong when submitting your RSVP. Can you try again a bit later?");
                    }
                });                
            },
            invalid: function() {
                $(".js-display")
                    .removeClass("message-panel")
                    .addClass("error-panel")
                    .html("Please fill out the details and try again!");
            }
        });

        $("input[name='rsvp']").on("change", function() {
            if ($(this).val() === "accept") {
                $(".rsvp-events").fadeIn();
                $("#wedding").attr('required', '');
                $("#reception").attr('required', '');
            } else {
                $(".rsvp-events").fadeOut();
                $("#wedding").removeAttr('required');
                $("#reception").removeAttr('required');
            }
        });
        $("#reception").on("change", function() {
            if ($(this).val() === "true") {
                $(".rsvp-shuttle").fadeIn();
                $("#shuttle").attr('required', '');
            } else {
                $(".rsvp-shuttle").fadeOut();
                $("#shuttle").removeAttr('required');
            }
        });
	}
	rsvpFormSubmit();


});

/*-----------------------------------------------------------------------------------*/
/*	Google Map API 
/*  Credit to: http://stiern.com/tutorials/adding-custom-google-maps-to-your-website/
/*-----------------------------------------------------------------------------------*/

var map;
var myLatlng = new google.maps.LatLng(40.745443, -73.603387); // Specify YOUR coordinates

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

	/*----------------------------------------------------------------------------*/
	/* Creates a custom color scheme for map
	/* For details on styling go to the link below:
	/* http://www.evoluted.net/thinktank/web-design/custom-google-maps-style-tool */
	/*----------------------------------------------------------------------------*/
	
	var featureOpts = [
		{
			"featureType": "road",
			"stylers": [
				{ "hue": "#ff3300" },
				{ "gamma": 0.82 },
				{ "visibility": "on" },
				{ "saturation": 62 },
				{ "lightness": -7 }
			]
		},{
			"featureType": "poi",
			"stylers": [
				{ "hue": "#ff0000" },
				{ "lightness": 14 }
			]
		},{
			"stylers": [
				{ "hue": "#ff0000" }
			]
		}
	]

	var mapOptions = {
		zoom: 14,
		center: myLatlng,
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: false,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
		},
		mapTypeId: MY_MAPTYPE_ID
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	var styledMapOptions = {
		name: 'Custom Style'
	};

	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	var image = new google.maps.MarkerImage("img/map-marker@2x.png", null, null, null, new google.maps.Size(55,57));

	// Includes custom marker on map
	var myLatLng = new google.maps.LatLng(40.745443, -73.603387);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

google.maps.event.addDomListener(window, 'load', initialize);