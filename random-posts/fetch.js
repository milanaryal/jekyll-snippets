/**
 * ------------------------------------------------------------------------
 * Generate ramdom posts
 * ------------------------------------------------------------------------
 */

;(function ($, window, document, undefined) {
  'use strict';

  function generateRandomPosts () {
    fetch('/posts.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {

        var element = $('#random-posts');
        var contents = '';
        var numberOfPosts = 5;

        console.log('Loaded [posts.json] for random posts.');

        for (var count = 0; count < numberOfPosts; ++count) {
            // Generate an random index
            var index = Math.floor(Math.random() * json.length);
            // Get the post
            var post = json[index];
            // Random post metadata
            var url = post.url;
            var title = post.title;
            var excerpt = post.summary;
            var readTime = post.reading_time;
            var date = post.date_published;
            // Template
            var link = '<div class="random-posts-item clearfix">' +
                          '<a href="' + url + '">' +
                            '<h3 class="random-posts-item-title">' + title + '</h3>' +
                            '<p class="random-posts-item-excerpt">' + excerpt + '</p>' +
                          '</a>' +
                          '<div class="random-posts-item-meta">' + readTime + ' &middot; Posted ' + date + '</div>' +
                        '</div>';
            contents = contents + link;
            json.splice(index, 1);
        }
        element.html(contents);
      }).catch(function(error) {
        console.error(error);
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

  }); // END document ready function


})(jQuery, window, document);
