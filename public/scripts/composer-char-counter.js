// function that counts down the remaining characters in your tweet turns red on negative values
$(document).ready(() => {
  $(".new-tweet textarea").on("input", function() {
    const remainingChar = 140 - $(this).val().length;
    const counter = $(this).closest(".new-tweet").find("#counter");
    if (remainingChar < 0) {
      counter.removeClass("changeCounterYellow");
      counter.addClass("changeCounterRed");
    } else if (remainingChar >= 0 && remainingChar <= 20) {
      counter.addClass("changeCounterYellow");
    } else {
      counter.removeClass("changeCounterRed");
      counter.removeClass("changeCounterYellow");
    }
    counter.text(remainingChar);
  });
});
