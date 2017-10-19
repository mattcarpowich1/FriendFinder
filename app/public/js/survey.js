$(document).ready(function() {

  // Initialize materialize select boxes
  $('select').material_select();

  // Hide error message
  $('#message').hide();

  // Hide modal
  $('#modal').hide();

  // When the form is submitted...
  $('#submit').on('click', function(e) {

    // Prevent page from refreshing
    e.preventDefault();

    // Save scores
    var scores = [];

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
      // Save each value to scores array
      scores.push($(value).val());
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
        // Hide the error message, and 
        // get friends JSON 
        $('#message').hide();
        $.ajax({
          type: "GET",
          url: "/api/friends"
        }).done(function(data) {
          var friends = data;
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
          $('#photo').attr('src', bestMatch["photo"]);
          $('#friend_name').text(bestMatch["name"]);
          $('#modal').show();
        });
      });
    }
    
  });
});