/* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// user database


// escape function to prevent XSS attacks
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// hidding the elment on load up

// //function to convert unix timestamp to date
// (1970,1,1))*86400 


// function that creates the tweet using html
const createTweetElement = function (tweet) {
  let $tweet = $('<article>').addClass('tweet');
  const htmlCode = `
  <header>
  <div>
  <img src="${tweet.user.avatars}">         
  <p class="tweet-username">
  ${tweet.user.name}
  </p>
  <p class="tweet-handle">
  ${tweet.user.handle}
  </p>
  </div>                   
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
  <p>${tweet.created_at}
  <span>                
  <i class="fa fa-flag">&#160</i>
  <i class="fa fa-retweet">&#160</i>
  <i class="fa fa-heart"></i>
  </span>
  </p>                            
  </footer>
  `;
  $tweet.append(htmlCode);
  return $tweet;
}
// function that renders the tweets on the page
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
}
// upon loading the the page, render the previous tweets
$(document).ready(function () {
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      dataType: "json",
      type: "GET",
      success: function (tweetDB) {
        renderTweets(tweetDB);
      },
      error: function () {
        $("#error").text("Error with ajax request");
        $("#error").slideDown();
        event.preventDefault();
      }
    });
  }
  $("#error").hide();
  loadTweets();

  //after loading the page, handling the submit function
  $("#submit").submit(function (event) {
    noOfChars = $(this).find("textarea").val().length;
    if (noOfChars === 0) {
      $("#error").text("Invalid entry: Please enter your text below");
      $("#error").slideDown();
      event.preventDefault()
    } else if (noOfChars > 140) {
      $("#error").text("Invalid entry: The maxium character length has been exceeded")
      $("#error").slideDown();
      event.preventDefault();
    } else {
      event.preventDefault();
      $.ajax({
        url: "/tweets/",
        dataType: "text",
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: $(this).find("textarea").serialize(),
        success: function () {
          loadTweets();
          $("#error").slideUp();
        },
        error: function () {
          $("#error").text("Error with ajax request");
          $("#error").slideDown();
          event.preventDefault();
        }
      });
      $("textarea").val("");
      $(".counter").text(140);
    }
  });

  // handling the toggle of the compose tweet bar
  $("#write-tweet").on("click", function () {
    if ($(".new-tweet:hidden").length) {
      $(".new-tweet").slideDown();
      $(".new-tweet").find("textarea").focus();
    } else $(".new-tweet").slideUp();

  });
});