// function that counts down the remaining characters in your tweet turns red on negative values
$(document).ready(() => {
  $(".new-tweet textarea").on('input', function() {
    const remainingChar = 140 - $(this).val().length;
    const counter = $(this).closest(".new-tweet").find("#counter");
    if (remainingChar < 0) {
      counter.addClass("changeCounterColor");
    } else {
      counter.removeClass("changeCounterColor");
    }
    counter.text(remainingChar);
  });
});