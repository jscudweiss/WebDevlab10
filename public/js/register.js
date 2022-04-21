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
        $('#error_msg').text("Email must not be empty");
        return false;
    }
    if (!(pass)) {
        $('#error_msg').text("Password must not be empty");
        return false;
    }
    if(pass.length<5) {
        $('#error_msg').text("Password must be at least 5 characters");
        return false;
    }
    if (!(confirm)) {
        $('#error_msg').text("Confirm password must not be empty");
        return false;
    }
    if(confirm !== pass){
        $('#error_msg').text("Confirm password must match password");
        return false;
    }
    if (!($('#fullname').val())) {
        $('#error_msg').text("Full Name must not be empty");
        return false;
    }
    if (!($('#brand').val())) {
        $('#error_msg').text("Brand must not be empty");
        return false;
    }
}))