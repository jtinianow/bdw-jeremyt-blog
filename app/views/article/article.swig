{% extends '../layout.swig' %}

{% block content %}
{% for article in articles %}
  <h1>{{ article.title }}</h1>
  <p>{{ article.description }}</p>
{% endfor %}
{% endblock %}
