function get_car_block(car) {
    return `<li class="list-group-item">
                <div class="row">
                    <div class="col-3">${car.make}</div>
                    <div class="col-3">${car.model}</div>
                    <div class="col-3">${car.year}</div>
                    <div class="col-3">${car.price}</div>
                </div>
            </li>`
}

function load_user(user) {
    $('#name').text(user.fullname);
    $('#brand').text(user.brand);
    $('#profile_img').attr('src', user.profile);
    $('#car_list').empty();
    const favList = user.favorites;
    favList.forEach((car) => {
        console.log(car);
        $('#car_list').append(get_car_block(car))
    })
}

$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            load_user(user)
        }
    })
})
