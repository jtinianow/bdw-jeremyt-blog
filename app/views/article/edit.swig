{% extends '../layout.swig' %}

{% block content %}
<h1>
  <form method="post" action="update" accept-charset="utf-8">
  	<input type="text" name="title" style="width: 100%;" value="{{ articles.title }}"/>
  	<textarea name="description" id="article-description" cols="60" rows="10">{{ articles.description }}</textarea>
	<input type="submit", value="Save" />
  </form>
</h1>
{# <p>
	<form action="/edit" method="post" accept-charset="utf-8">
		<input type="text" name="description" value="{{ articles.description }}">
	</form>
</p> #}



{% endblock %}
