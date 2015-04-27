{% extends '../layout.swig' %}




{% block content %}
	<h2>{{ article.title }}</h2>
	<p>{{ article.description | safe }}</p>
	
	<a class="button button-primary" href="/article">Back</a>
	<a class="button button-primary" href="/article/{{ article.id }}/edit">Edit</a>
	
{% endblock %}
