{% extends 'layout.swig' %}


{% block content %}
	<a href="/logout" class="btn">Logout</a>
	{% if articles.length > 0 %}
	<ol>
		{% for article in articles %}
		<li class="article">
			<a href="/article/{{ article.id }}"><h2>{{ article.title }}</h2></a>
			<p>{{ article.description | safe }}</p>
			<p>{{ article.updatedAt |date('F jS, Y')}}</p>
		</li>
		{% endfor %}
	</ol>
	{% else %}
		<h2>Nothing to see here.</h2>
	{% endif %}

	<a href="/article/create" class="button">Create New</a>

{% endblock %}
