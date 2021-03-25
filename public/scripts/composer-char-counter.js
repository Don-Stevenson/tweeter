$(document).ready(() => {
  $(".new-tweet textarea").on("input", function() {
    // calculating the remaining characters left
    const remainingChar = 140 - $(this).val().length;

    // storing the #counter element from the page in a variable
    const counter = $(this).closest(".new-tweet").find("#counter");

    // calling the change class colour based on remaining characters
    changeClassColourByCharacterCount(remainingChar, counter);

    // updating the counter text to be the remaining characters left
    counter.text(remainingChar);
  });
});

// function that turns the colour of the counter text by the number of remaining characters
const changeClassColourByCharacterCount = (remainingChar, counter) => {
  if (remainingChar < 0) {
    counter.removeClass("changeCounterYellow");
    counter.addClass("changeCounterRed");
  } else if (remainingChar >= 0 && remainingChar <= 20) {
    counter.addClass("changeCounterYellow");
  } else {
    counter.removeClass("changeCounterRed");
    counter.removeClass("changeCounterYellow");
  }
};
