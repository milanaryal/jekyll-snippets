---
# https://thornelabs.net/2014/06/08/a-better-way-to-display-random-jekyll-posts-on-page-load-or-refresh-using-jquery-and-json.html
---

Create file search.json in your root Jekyll directory with the following contents:

## The JSON File

```text
---
---
[
    {% for post in site.posts %}
    {
      "title"    : "{{ post.title }}",
      "href"     : "{{ post.url }}",
      "date"     : {
         "day"   : "{{ post.date | date: "%d" }}",
         "month" : "{{ post.date | date: "%B" }}",
         "year"  : "{{ post.date | date: "%Y" }}"
      }
    }
    {% unless forloop.last %},{% endunless %}
    {% endfor %}
]
```

## The jQuery Code

```js
function generateRandomPosts()
    {
        $.getJSON("/search.json", function(data) {
            console.log("[search.json loaded for random posts]");

            var postsCount = data.length;
            var posts = data;

            var randomIndexUsed = [];
            var counter = 0;
            var numberOfPosts = 5;

            var divRandomPosts = $("#random_posts");

            divRandomPosts.append('<h2>other posts</h2><hr />');

            while (counter < numberOfPosts)
            {
                var randomIndex = Math.floor(Math.random() * postsCount);

                if (randomIndexUsed.indexOf(randomIndex) == "-1")
                {
                    var postHREF = posts[randomIndex].href;
                    var postTitle = posts[randomIndex].title;

                    if (counter == (numberOfPosts - 1))
                    {
                        divRandomPosts.append('<p><a href="' + postHREF + '">' + postTitle + '</a></p>');
                    }
                    else
                    {
                        divRandomPosts.append('<p><a href="' + postHREF + '">' + postTitle + '</a></p><hr />');
                    }

                    randomIndexUsed.push(randomIndex);

                    counter++;
                }
            }
        });
    }

    $(document).ready(function() {
        generateRandomPosts();
    });
```

## The HTML Markup

```
<div id="random_posts">
</div>
```
