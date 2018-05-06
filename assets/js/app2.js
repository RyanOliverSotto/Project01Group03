/* Psuedocode Area
Yvellise will be doing the front end 
Yulin the backend 
Jeff and Ryan will float in between both
We will attempt to replicate the Balsalmiq landing page.
Yulin will start the Yelp | Google Maps API keys.
Basic HTML is the goal.*/

// Execute this code when the DOM has fully loaded.
$(document).ready(function() {

//Set global variables here
var food = "";
var place = "";
var debug = false;

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDQXVzsC8EJebVAE3VIPVw6CzCM0_5nbLc",
    authDomain: "groupproject-56d74.firebaseapp.com",
    databaseURL: "https://groupproject-56d74.firebaseio.com",
    projectId: "groupproject-56d74",
    storageBucket: "",
    messagingSenderId: "792884529627"
  };
  firebase.initializeApp(config);



    $("#submit").on("click", function (event) {
        //alert("I was clicked");
        place = $("#formInput").val().trim();
        food = $("#formFood").val().trim();
        event.preventDefault();

        if (debug) {
            alert("I was clicked");
            console.log(food);
            console.log(place);
        }; //End Debug

        //var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + food + "&latitude=37.786882&longitude=-122.399972"
        var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + food + "&location=" + place + "&price=1";

        if (debug) {
            console.log(queryURL);
        }//End debug

        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }//End if
        });//End prefilter

        $.ajax({
            url: queryURL,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + 'yF9IjWnaqJ3yRbhJnyBvBR9Kh2zBdrdaXwQysdRAeIK5PNgfHvGuNWBqF3eBbv6eFZ2HnbtHG6jUf6CXHioS30K6SjxwpMja_dWEcC_KRgoEAxwTGI8J3vCBL8ftWnYx' }
        }).then(function (response) {
            // do something with response
            if (debug) { console.log(response); }
            prependResults(response);

        });//End Ajax Call

    }); //End of submit click

    function prependResults(resp) {
        console.log(resp);
        for (var i = 0; i < resp.businesses.length; i++) {
            let image = resp.businesses[i].image_url;
            let name = resp.businesses[i].name;
            let displayPhone = resp.businesses[i].display_phone;
            let rating = resp.businesses[i].rating;
            let latitude = resp.businesses[i].coordinates.latitude;
            let longitude = resp.businesses[i].coordinates.longitude;
            let phone = resp.businesses[i].phone;
            //let closed = resp.businesses[i].is_closed; // Indicator if it is permanently closed
            let address = resp.businesses[i].location.display_address;

            //Create the DOM HTML elements
            let restRow = $("<row>");
            let imgDiv = $("<div>");
            let restDiv = $("<div>");
            let restImage = $("<img>");
            let p1 = $("<p>").html("Name: " + name);
            let p2 = $("<p>").html("Phone: " + displayPhone);
            let p3 = $("<p>").html("Rating: " + rating);
            let p4 = $("<p>").html("Address: " + address.toString());
            console.log(latitude + ", " + longitude);
            //let p4 = $("<p>").html("Closed: " + closed);
            //let p5 = $("<p>").html("Coordinates:" + coordinates);
            restImage.attr({ "src": image, "class": "col-sm-4 img-responsive" });
            restDiv.attr("class", "col-sm-3 restMeta");
            imgDiv.attr("class", "imgMeta");
            imgDiv.append(restImage);
            restDiv.append(p1, p2, p3, p4);
            restRow.append(imgDiv, restDiv);
            $(".searchresults").prepend(restRow);
        }//end for loop
    }//End preprendResults fuction
});//End document.ready
