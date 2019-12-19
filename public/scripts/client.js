/* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// user database


// escape function to prevent XSS attacks
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// function that creates the tweet
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
        console.log(tweetDB);
        renderTweets(tweetDB);
      },
      error: function () {
        console.log("failed");
      }
    });
  }
  loadTweets();

  //after loading the page, handling the submit function
  $("#submit").submit(function (event) {
    noOfChars = $(this).find("textarea").val().length;
    if (noOfChars === 0) {
      alert("Invalid entry. Please enter a tweet");
      event.preventDefault()
    } else if (noOfChars > 140) {
      alert("Invalid entry. The maxium haracter length has been exceeded")
      event.preventDefault();
    } else {
      $.ajax({
        url: "/tweets/",
        dataType: "text",
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: $(this).find("textarea").serialize(),
        success: function () {
          console.log("success");
        },
        error: function () {
          console.log("failed");
        }
      });
    }
  });

  // handling the toggle of the compose tweet bar

  let composeToggle = true;
  let startToggle = true;
  $("#write-tweet").on("click", function () {
    if (composeToggle && startToggle) {
      $(".new-tweet").find("textarea").focus();
      composeToggle = false;
      startToggle = false;
    } else if (composeToggle) {
      $(".new-tweet").slideDown();
      $(".new-tweet").find("textarea").focus();
      composeToggle = false;
    } else {
      $(".new-tweet").slideUp();
      composeToggle = true;
    }
  });

});