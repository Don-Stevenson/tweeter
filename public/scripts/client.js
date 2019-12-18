/* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// user database


// function that creates the tweet
const createTweetElement = function (tweet) {
  let $tweet = $('<article>').addClass('tweet');
  const htmlCode = `
    <header>
      <img src="${tweet.user.avatars}">         
      <p>
        ${tweet.user.name}
        <span>${tweet.user.handle}</span>
      </p>                     
    </header>
    <p>${tweet.content.text}</p>
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
    $('#tweets-container').append(createTweetElement(tweet));
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
    event.preventDefault();
    console.log($(this).find("textarea").serialize());
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
  });

});