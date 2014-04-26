<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Brain Lab Prototype</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="js/xmlhttp.js"></script>
		<script src="js/brainlab.js"></script>
	</head>
	<body onload="LoadTestTable()">
		<div class="navbar">
			<div class="navbar-inner">
				<div class="container">
					<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</a>
	 
					<!-- Be sure to leave the brand out there if you want it shown -->
					<a class="brand" href="#">Brainlab</a>
					<ul class="nav">
						<li class="span1"></li>
						<li class="active"><a href="#">Home</a></li>
						<li><a class="span1" href="#">Reports</a></li>
						<li><a class="span1" href="#">Upload</a></li>
						<li><a class="span1" href="#">Settings</a></li>
						<li><a class="span3" href="#">
							<input type="text" placeholder="Username...">
							</a>
						</li>
						<li><a class="span3" href="#">							
							<input type="text" placeholder="Password...">
							</a>
						</li>
					</ul>
	 
					<!-- Everything you want hidden at 940px or less, place within here -->
					<div class="nav-collapse collapse">
					<!-- .nav, .navbar-search, .navbar-form, etc -->
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="container">&nbsp;</div>
			<div class="container">
				<div class="row">
					<div class="span9">
						<table class="table table-striped">
							<tr>
								<td id="TableName0">Alex</td>
								<td id="TableHours0">Hours...</td>
								<td>Computer Science</td>
							</tr>
							<tr>
								<td id="TableName1">Edson</td>
								<td id="TableHours1">Hours...</td>
								<td>Computer Engineering</td>
							</tr>
							<tr>
								<td id="TableName2">Katie</td>
								<td id="TableHours2">Hours...</td>
								<td>Mechanical Engineering</td>
							</tr>
						</table>
					</div>
					<div class="span3">
						<legend>Modify Status</legend>
						<label>Teammember</label>
							<select id="ListNames">
							</select>
						</label>
						<label>Number of Hours</label>
							<input id="HoursInput" type="text">
						</label>
						<button type="submit" class="btn" onclick="UpdateTestTable()">Submit</button>
					</div>
				</div>
			</div>
			<div class="container">&nbsp;</div>
		</div>
	</body>
</html>