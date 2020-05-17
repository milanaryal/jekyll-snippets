# https://zeckli.github.io/en/2017/10/30/jekyll-add-random-post-link-to-page-en.html

## Jekyll - Generate random post links when refreshing page

Jekyll is a great static site generator, but it has some limitations due to it’s simplicity. For example, Jekyll cannot generate a random post link when refreshing page. However, we can still use JavaScript and JSON data to achieve this feature. This post is about how to do it.

## Generate JSON data

Let me walk you through the solution. Although Jekyll cannot achieve any dynamic feature, we can use it to output a JSON file that contains post data when building. Once we have the JSON data, we can use JavaScript to generate random post links when refreshing page. OK, let’s output the JSON file via Jekyll. First, create a JSON file named `posts.json`, and put below content into it:

```text
---
---
[
{% assign posts = site.posts | where:"your-filter","filter-value" %}
{% for post in posts %}
{
    "title": "{{ post.title }}",
    "href": "{{ post.url }}"
}{% unless forloop.last %},{% endunless %}
{% endfor %}
]
```

Everytime you build, Jekyll will generate a complete `posts.json` into `_site` folder.

## Generate random post links

If you’re familiar with JavaScript, the last step is quite easy. In this step, all we have to do is to read JSON data, and pick a random post. Like this:

```js
 ...
<script src="//cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js"></script>
<script>
$(function() {
  fetch('/posts.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // Generate an random index
      var index = Math.floor(Math.random() * json.length);
      // Get the post
      var post = json[index];

      // Do things with post ...

    }).catch(function(error) {
      console.error(error);
    });
});
</script>
```

That’s it. Hope this post helps you to create more interesting websites.

---

## References

```js
<script>
$(function() {
  fetch('/posts-en.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var element = $('#more-posts');
      var contents = '';
      for (var count = 0; count < 8; ++count) {
          var index = Math.floor(Math.random() * json.length);
          var post = json[index];
          link = "<li><a class='a-hl-blue' href='" + post.href + "'>" + post.title + "</a></li>";
          contents = contents + link;
          json.splice(index, 1);
      }
      element.html(contents);
    }).catch(function(error) {
      console.error(error);
    });
});
</script>
```
