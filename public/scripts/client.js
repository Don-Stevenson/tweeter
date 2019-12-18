/* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// user database
  const data = [
    {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": "10 days ago"
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": "12 days ago"
    }
  ]

  // function that creates the tweet
  const createTweetElement = function(tweet) {
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
  const renderTweets = function(tweets) {
    for (let tweet of tweets){
      $('#tweets-container').append(createTweetElement(tweet));
    }  
  }
  
  $(document).ready(function() {
    renderTweets(data);

  //handling the submit function
  $("#submit").submit(function(event) {
    event.preventDefault();    
    console.log($(this).find("textarea").serialize());   
  });    

  });