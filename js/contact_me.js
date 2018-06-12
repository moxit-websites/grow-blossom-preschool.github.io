// $(function(){
//     // intercept the form submission
//     $("#moxit-contact-form").on("submit", function(e) {
//         e.preventDefault(); // stop the form from being submitted
//         // make an ajax POST request to the form's action

//         console.log('contact form fired')
        
//         $.ajax({
//             type: "POST",
//             url: $(this).attr("action"),      // use the form's action attribute as the endpoint
//             data: $(this).serialize(),        // use the data from the form
//             headers:
//             {
//                 "Accept": "application/json"  // this makes the server send you a JSON response
//             },
//             success: function(response)       // handle the successful submission of your POST
//             {
//                 console.log(response);        // response contains the form submission that was just made
//                 alert("Thank you for your submission, we'll get back to you soon :)");
//                 $("#moxit-contact-form")[0].reset();// reset the form
//             },
//         });
//     });
//   })
  
$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            
            $.ajax({
                // url: "././mail/contact_me.php",
                url: "https://liveformhq.com/form/a8a67404-33c2-4ebd-8053-5f779fc57f73",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                headers: {
                    "Accept": "application/json"
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(err) {
                    console.error(err)
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
