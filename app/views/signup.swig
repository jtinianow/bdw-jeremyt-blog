{% extends 'layout.swig' %}

{% block content %}

<h1><span>Sign Up</span></h1>

{% if message.length > 0 %}
	<div class="alert">{{ message }}</div>
{% endif %}

<form action="/signup" method="post">
	<div class="form-group">
		<label>Email</label>
		<input type="text" class="form-control" name="email">
	</div>
	<div class="form-group">
		<label>Password</label>
		<input type="password" class="form-control" name="password">
	</div>

	<button type="submit" class="btn">Signup</button>
</form>

{% endblock %}