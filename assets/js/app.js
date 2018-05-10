/* Psuedocode Area
Yvellise will be doing the front end 
Yulin the backend 
Jeff and Ryan will float in between both
We will attempt to replicate the Balsalmiq landing page.
Yulin will start the Yelp | Google Maps API keys.
Basic HTML is the goal.*/

// Execute this code when the DOM has fully loaded.
$(document).ready(function () {

    //Set global variables here
    var food = "";
    var place = "";
    var debug = false;
    var entrySubmit = true;
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
    var database = firebase.database();
    var key = "";

    

    $("#submit").on("click", function (event) {
        //alert("I was clicked");
        var isValid = true;
        $('#formInput,#formFood').each(function () {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
        if (isValid == false)
            event.preventDefault();
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

        //Do function related to the Firebase DB
        
        if((place.length == 0) || (food.length == 0)){

        }
        else {
            $("#formgroupcontainer").hide();
            addNewFB(queryURL);
        
        $.ajax({
            url: queryURL,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + 'yF9IjWnaqJ3yRbhJnyBvBR9Kh2zBdrdaXwQysdRAeIK5PNgfHvGuNWBqF3eBbv6eFZ2HnbtHG6jUf6CXHioS30K6SjxwpMja_dWEcC_KRgoEAxwTGI8J3vCBL8ftWnYx' }
        }).then(function (response) {
            // do something with response
            if (debug) { console.log(response); }
            prependResults(response);

        });//End Ajax Call
    }
    }); //End of submit click

    function addNewFB(queryURL){
    // Save the new data in Firebase
    database.ref().push({
        food: food,
        place: place,
        queryURL: queryURL,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });//End push    
    };//End updateFB
//______________
    // Project listener to when new data is added to DB is here
    database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function(childSnapshot) {
        food = childSnapshot.val().food;
        place = childSnapshot.val().place;
        queryURL = childSnapshot.val().queryURL;
        frequency = childSnapshot.val().frequency;
        dateAdded = childSnapshot.val().dateAdded;
        var key = childSnapshot.key;
        var strSearch ="";
        strSearch+=place+", ";
        strSearch+=food+"\n";
        // Prepend the table row to the table body
        $("#recentSearches").prepend(strSearch);          
    });//End ChildAdded 
//_______________





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
            var restTd = $('<td>');
            let restImage = $("<img>");
            var imgA = $('<a href="">');
            imgA.append(restImage);
            restTd.append(imgA);

            let p1 = $("<td>").html(" "+ name + '<br>');
            p1.append( displayPhone);
            // let p2 = $("<td>").html("Phone: " + displayPhone);
            let p3 = $("<td>").html("Rating: " + rating);
            let p4 = $("<td>").html("Address: " + address.toString());
            console.log(latitude + ", " + longitude);
            //let p4 = $("<p>").html("Closed: " + closed);
            //let p5 = $("<p>").html("Coordinates:" + coordinates);
            restImage.attr({ "src": image
            // , "class": "col-sm-2    img-responsive foodImg" 
        });
        
            // restDiv.attr("class", "col-sm-3 restMeta");
            imgDiv.attr("class", "imgMeta");
            // imgDiv.append(restImage);
            restDiv.append(
                restTd,
                 p1,
                //   p2,
                   p3,
                    p4);
            restRow.append(imgDiv, restDiv);
            $(".searchresults").prepend(restRow);
        }//end for loop
    }//End preprendResults fuction



});//End document.ready


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}


