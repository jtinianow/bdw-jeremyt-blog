{% extends '../layout.swig' %}




{% block content %}

<form action="/article/{{ article.id }}" method="post">
	<label for="title">Title</label>
	<input class="u-full-width" type="title" value="{{ article.title }}" id="title" name="title" />
	
	<label for="post">Post</label>
	<textarea id="post" class="u-full-width" placeholder="" name="description">{{ article.description }}</textarea>
	
	<input class="button-primary" type="submit", value="Submit" />
	<a class="button" href="/article/{{ article.id }}">Back</a>
</form>

{% endblock %}
