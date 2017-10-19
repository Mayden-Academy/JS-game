var fall_time
var interval_between_cows
var timeout

/**
 * iterates core functions
 */
function game_loop() {
    increase_speed()
    create_cow(fall_time)
    timeout = setTimeout(game_loop, interval_between_cows)
}

/**
 * creates new cows
 * @param fall_time  number time it takes for cow to fall
 */
function create_cow(fall_time) {
    var column_number = Math.floor(Math.random() * 6)  // Random number from 0 to 5.

    // Plus 5 because cows are 10 pixels narrower than the 110 pixels wide columns.
    var horizontal_position = 5 + (110 * column_number)

    var $container_div = $("<div class='cow_target_container absolute'>" +
        "<div class='parachute_target'></div>" +
        "<div class='cow_target js_clickable_cow'></div>" +
        "</div>")

    $container_div.css({'top':'-177px', 'left': horizontal_position + 'px'})
    $(".play_area").append($container_div);
    $container_div.animate({ top: '343px'}, fall_time, dead_cow)
}

/**
 * Switch from intro page to playing page
 */
function go_to_game() {
    interval_between_cows = 2000
    fall_time = 3000
    $(".score_value").text(0)
    $(".lives_value").text(5)

    $(".game_title").hide()
    $(".play_area").show()
    game_loop()
}

/**
 * Removed cows when they hit the spikes, make them fade out and change image. Also minus a life.
 */
function dead_cow() {
    $('.cow_target', this).removeClass('js_clickable_cow').css("background-image", "url('../JS-game/img/dead_cow.png')")
    $('.parachute_target', this).css("visibility", "hidden")
    $(this).fadeOut('slow', function() {
        $(this).remove()
    })
    lose_life()
}

/**
 * Reduces interval for cows being created and increases speed at which they fall
 */
function increase_speed() {
    if (fall_time > 2500) {
        fall_time *= 0.99
    }
}

$(".start_button").click(go_to_game)
