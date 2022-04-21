const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get("error");
const user = urlParams.get("user")
if (urlParams.get("error")) {
    $('#error_msg').text(error);
}
if (urlParams.get("user")) {
    console.log(user);
}
$('form').on('submit', (() => {
    const pass = $('#password').val();
    const confirm = $('#confirm').val();
    if (!($('#email').val())) {
        $('#error_msg').text("email must not be empty");
    }
    if (!()) {
        $('#error_msg').text("email must not be empty");
    }
    if (!(confirm)) {
        $('#error_msg').text("Confirm password must not be empty");
    } else {
        if(confirm !== pass){
            $('#error_msg').text("Confirm password must not be empty");
        }
    }
    if (!($('#fullname').val())) {
        $('#error_msg').text("Full Name must not be empty");
    }
    if (!($('#brand').val())) {
        $('#error_msg').text("Brand must not be empty");
    }
}))