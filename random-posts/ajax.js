/**
 * ------------------------------------------------------------------------
 * Generate ramdom posts
 * ------------------------------------------------------------------------
 */

;(function ($, window, document, undefined) {
  'use strict';

  function generateRandomPosts() {
    $.getJSON('/posts.json', function(data) {
      console.log('Loaded [posts.json] for random posts.');

      var postsCount = data.length;
      var posts = data;
      var randomIndexUsed = [];
      var counter = 0;
      var numberOfPosts = 5;
      var divRandomPosts = $('#random-posts');

      divRandomPosts.append('<h3 class="random-posts-heading">Read more</h3>');

      while (counter < numberOfPosts) {
        var randomIndex = Math.floor(Math.random() * postsCount);

        if (randomIndexUsed.indexOf(randomIndex) == '-1') {
          var postTitle = posts[randomIndex].title;
          var postURL = posts[randomIndex].url;
          var postDate = posts[randomIndex].date_published;
          var postExcerpt = posts[randomIndex].summary;

          divRandomPosts.append('<div class="random-posts-item"><a href="' + postURL + '"><div class="clearfix"><h3 class="random-posts-item-title">' + postTitle + '</h3><p class="random-posts-item-excerpt">' + postExcerpt + '</p></div></a><div class="random-posts-item-meta">Posted on ' + postDate + '</div></div>');

          randomIndexUsed.push(randomIndex);
          counter++;
        }
      }
    });
  }


  // Only run once the page Document Object Model (DOM)
  // is ready for JavaScript code to execute.
  // $(document).ready(function() { ... });
  $(function () { // BEGIN document ready function

    /**
     * ------------------------------------------------------------------------
     * Random posts init
     * ------------------------------------------------------------------------
     */

    $('.random-posts').removeAttr('hidden');

    // init
    generateRandomPosts();

    // random posts section footer
    $('.random-posts').append('<div class="random-posts-footer"><a class="btn btn-outline-default btn--random" href="/archives/" role="button">' + 'View all' + '</a></div>');

  }); // END document ready function


})(jQuery, window, document);
