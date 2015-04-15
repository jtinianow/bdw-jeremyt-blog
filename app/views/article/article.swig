{% extends '../layout.swig' %}

{% block content %}
  <h1>{{ articles.title }}</h1>
  <p>{{ articles.description }}</p>
  <a href="/article/{{ articles.id }}/edit">Edit</a>
{% endblock %}
