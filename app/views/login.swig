{% extends 'layout.swig' %}

{% block content %}

<h1><span class="sign-in">Login</span></h1>

{% if message.length > 0 %}
<div class="alert">{{ message }}</div>
{% endif %}

{# Login Form #}

<form action="/login" method="post">
	<div class="form-group">
		<label>EMail</label>
		<input type="text" class="form-control" name="email">
	</div>
	<div class="form-group">
		<label>Password</label>
		<input type="password" class="form-control" name="password">
	</div>
	
	<button type="submit" class="btn">Login</button>
</form>

{% endblock %}