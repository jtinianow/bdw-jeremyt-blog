{% extends '../layout.swig' %}



{% block content %}

<form method="post">
	<label for="title">Title</label>
	<input class="u-full-width" type="title" id="title" name="title" />
	
	<label for="post">Post</label>
	<textarea id="post" class="u-full-width" placeholder="" name="description"></textarea>
	
	<input class="button-primary" type="submit", value="Submit" />
	<a class="button" href="/article">Back</a>
</form>

{% endblock %}
