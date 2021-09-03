async function getallmovies()
{
    let res =await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=571200d7381f2981c98ffe9da9be47e7&language=en-US&page=1'
    );

    const data = await res.json();
    let movies=data.results;
    let parent=document.getElementById("movies");
    for(let i=0;i<movies.length;i++)
    {
        parent.appendChild(makemoviecards(movies[i]));
    }
}

function makemoviecards(movie)
{
    let div=document.createElement("div");
    div.setAttribute("class","movie_card");
    div.setAttribute("id",`${movie.id}`);
    div.setAttribute("onclick","gotomovie(this)");
    div.innerHTML = ` <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
            <div class="movie_info">
                <h1>
                   ${movie.original_title}
                </h1>
                <h2 class="rating">
                    ${movie.vote_average}
                </h2>
            </div>`;

    return div; 
}

function gotomovie(e)
{
    window.location=(`./Html/Movieinfo.html?id=${e.id}`);
}