$(document).ready(function() {

  // Initialize materialize select boxes
  $('select').material_select();

  // Hide error message
  $('#message').hide();

  // When the form is submitted...
  $('#submit').on('click', function(e) {

    // Prevent page from refreshing
    e.preventDefault();

    // Make sure all fields have been filled
    // and display an error message if they're not
    var complete = true;

    // Check name and photo link inputs
    if ((!($('#name').val())) || (!($('#link').val()))) {
      complete = false;
      $('#message').text("Please fill out all form fields.");
      $('#message').show();
    }

    // Check each select input
    $.each( $('select'), function( key, value ) {
      if (!($(value).val())) {
        complete = false;
        $('#message').text("Please fill out all form fields.");
        $('#message').show();
      }
    });

    // If the form is completed...
    if (complete) {
      var info = $('form').serialize();
      // Send a post request with form data
      $.when( $.ajax({
        type: "POST",
        url: "/api/friends",
        data: info
      }) ).then( function() {
        // Hide the error message
        $('#message').hide();
        // GET friends array from api
        $.ajax({
          type: "GET",
          url: "/api/friends"
        }).done(function(friends) {
          var bestMatch;
          var lowestDifference = 100;
          var you = friends[friends.length - 1];
          for (var i = 0; i < friends.length - 1; i++) {
            var currentFriend = friends[i];
            var difference = 0;
            for (var j = 0; j < 10; j++) {
              difference += Math.abs(
                you.scores[j] - currentFriend.scores[j]);
            }
            if (difference < lowestDifference) {
              lowestDifference = difference;
              bestMatch = currentFriend;
            }
          }
          // Hide the submit button
          $('#submit').hide();
          // Replace with the resulting match
          $('#photo').attr('src', bestMatch["photo"]);
          $('#friend_name').text(bestMatch["name"]);
          $('#modal').show();
        });
      });
    }
  });
});