$( document ).ready(function() {
	$('#searchForm').on('submit', function(e){
		let searchText = ($('#searchText').val());
		getMovies(searchText);
		e.preventDefault();
	})
});


function getMovies(searchText){
	document.getElementById("loader1").style.display="flex";
	axios.get('http://omdbapi.com?s='+searchText)
	.then(function(response){
		console.log(response)
		let movies = response.data.Search;
		let output = '';

		$.each(movies, function(index, movie){
			output += `
				<div class="col-md-3">
					<div class="well text-center">
					<img src="${movie.Poster}">
					<h5>${movie.Title}</h5>
					<a onclick="movieSelected('${movie.imdbID}')" class ="btn btn-primary" href="#">Movie Details</a>
					</div>
				</div>
			`;
		})
		$('#movies').html(output);
		document.getElementById("loader1").style.display="none";
	})
	.catch(function(err){

		console.log(err)
		document.getElementById("loader1").style.display="none";
	})
	 document.getElementById("searchForm").reset();
}

function movieSelected(id){
	sessionStorage.setItem('movieId', id)
	window.location= 'movie.html';
	return false;
}


function getMovie(){

	let movieID = sessionStorage.getItem("movieId");
	document.getElementById("loader1").style.display="flex";
	axios.get('http://omdbapi.com?i='+movieID)


	.then(function(response){
		console.log(response)
		let movie = response.data;
		let output = '';
		output +=`
			<div class="row">
				<div class="col-md-4">
					<img src="${movie.Poster}" class="thumbnail">
				</div>
				<div class="col-md-8">
					<h2>${movie.Title}</h2>
					<ul class="list-group">
						<li class="list-group-item"><Strong>Genre: </strong>${movie.Genre}</li>
						<li class="list-group-item"><Strong>Actors: </strong>${movie.Actors}</li>
						<li class="list-group-item"><Strong>Released: </strong>${movie.Released}</li>
						<li class="list-group-item"><Strong>Imdb Rating: </strong>${movie.imdbRating}</li>
						<li class="list-group-item"><Strong>Director: </strong>${movie.Director}</li>
						<li class="list-group-item"><Strong>Year: </strong>${movie.Year}</li>
						<li class="list-group-item"><Strong>Runtime: </strong>${movie.Runtime}</li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="well">
				<h3>Plot</h3>
				${movie.Plot}
				<hr>
				<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View Imdb</a>
				<a href="index.html" class="btn btn-default">Home</a>
			</div>
		`
		$("#movie").html(output);
		document.getElementById("loader1").style.display="none";
	})
	.catch(function(err){
		console.log(err)
		document.getElementById("loader1").style.display="none";
	})


}
