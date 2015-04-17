{% extends '../layout.swig' %}




{% block content %}
	{% if articles.length > 0 %}
	<ol>
		{% for article in articles %}
		<li class="article">
			<a href="/article/{{ article.id }}"><h2>{{ article.title }}</h2></a>
			<p>{{ article.description }}</p>
		</li>
		{% endfor %}
	</ol>
	{% else %}
		<h2>Nothing to see here.</h2>
	{% endif %}

{% endblock %}
