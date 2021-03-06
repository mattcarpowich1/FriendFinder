$(document).ready(function() {

  var submitted = false;

  // Initialize materialize select boxes
  $('select').material_select();

  // Hide error message
  $('#message').hide();

  // When the form is submitted...
  $('#submit').on('click', function(e) {

    // Prevent page from refreshing
    e.preventDefault();

    if (submitted) {
      $('.modal').css("display", "block");
      return false;
    }

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
    $.each($('select'), function(key, value) {
      if (!($(value).val())) {
        complete = false;
        $('#message').text("Please fill out all form fields.");
        $('#message').show();
      }
    });

    // If the form is completed...
    if (complete) {

      // Serialize form data --> -->
      var info = $('form').serialize();

      // Send a post request with form data
      $.ajax({
        type: "POST",
        url: "/api/friends",
        data: info
      }).done(function(match) {

          submitted = true;

          $('.modal').css("display", "block");

          $('.modal-content > span').on("click", function() {
            $('.modal').css("display", "none");
            $('#submit').text("View Results");
          });

          var modal = document.getElementById('modal');

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
                  $('#submit').text("View Results");
              }
          }

          // Hide message
          $('#message').hide();
          

          // Replace with the resulting match
          $('#photo').attr('src', match["photo"]);
          $('#friend_name').text(match["name"]);
          
        });
      }
  });
});