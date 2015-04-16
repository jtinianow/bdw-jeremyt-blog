{% extends '../layout.swig' %}

{% block content %}
  <h1>{{ title }}</h1>
  <p>Welcome to {{ title }}</p>

{% for article in articles %}
	<a href="/article/{{ article.id }}">
		<h2>{{ article.title }}</h2>
	</a>
{% endfor %}

{% endblock %}
