async function getalldata()
{
     var url = document.location.href;
     ///  E:/PROJECTS/Calculator/MOVIE/Html/Movieinfo.html         
     //  id
     //379686
     let params = url.split('=')[1];
     let res = await fetch(
       `https://api.themoviedb.org/3/movie/${params}?api_key=571200d7381f2981c98ffe9da9be47e7&language=en-US`
     );

    //  https://api.themoviedb.org/3/movie/508943/videos?api_key=571200d7381f2981c98ffe9da9be47e7&language=en-US

     const data = await res.json();

     let vid_res = await fetch(
       `https://api.themoviedb.org/3/movie/${params}/videos?api_key=571200d7381f2981c98ffe9da9be47e7&language=en-US`
     );

    let d=await vid_res.json();

    d = d.results;
console.log(d);
    let b=d.filter(function (i)
    {
        if(i.site==="YouTube")
        {
            return i.key;
        }
    })
    let yt_link="null";

    if(b.length!==0)
    {
        yt_link=b[0].key;
    }




       addalldata(data,yt_link);
}

function addalldata(data,yt)
{
let parent = document.getElementsByTagName('body');
parent[0].innerHTML = `
    <img class="backdrop_poster" src="https://image.tmdb.org/t/p/original/${data.backdrop_path}">
    <div class="about_movie">
        <img class="poster" src="https://image.tmdb.org/t/p/w300/${data.poster_path}">

        <div class="some_info_movie">
            <h1>${data.original_title}</h1>
            <a href="https://www.youtube.com/watch?v=${yt}"><img src="https://img.icons8.com/material-outlined/50/000000/play-button-circled.png" /></a>
            <h3>Overview:</h3>
            <h4>${data.overview}</h4>


            <h2>Releasing on:${data.release_date}</h2>
        </div>
    </div>

    <div class="body_container">
    <div id="genres_Area">
    <h1>
             Genres:
        </h1>
    </div>

    

        <div id="production_Area">
        <h1>
             Production Companies:
         </h1>
        </div>
        

        <h1>
            Status:
        </h1>
        <h3>${data.status}</h3>
        <h1>
            Popularity
        </h1>
        <h3>
            ${data.popularity}
        </h3>
        <h1>
            Original Language
        </h1>
        <h3>
            ${data.original_language}
        </h3>



    </div>
    <footer>
        Copyright © 2021-2021 Hira's Devlopers. All Rights Reserved.
    </footer>
`;
let genres_area = document.getElementById('genres_Area');
genres_area.appendChild(createGenres(data.genres));


let production_area = document.getElementById('production_Area');
production_area.appendChild(createcompanies(data.production_companies));


}

function createGenres(data)
{
    let div=document.createElement("div");
    div.setAttribute('class', 'movie_genre');

    for(let i=0;i<data.length;i++)
    {
        let gener=document.createElement("div");
        gener.setAttribute("class","genre");
        let textnode = document.createTextNode(data[i].name);
        gener.appendChild(textnode);
        div.appendChild(gener);
    }

    return div;

}

function createcompanies(data)
{
      let div = document.createElement('div');
      div.setAttribute('class', 'Production_Companies');

      for (let i = 0; i < data.length; i++) {
        let company = document.createElement('div');
        company.setAttribute('class', 'company_card');
        
        let img=document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/original/${data[i].logo_path}`;

        company.appendChild(img);

        let name=document.createElement("h3");
        let textnode = document.createTextNode(data[i].name);
        name.appendChild(textnode);
        company.appendChild(name);
        
        
        div.appendChild(company);
      }

      return div;
}


//         <div class="Production_Companies">
//             <div class="company_card">
//                 <img src="https://image.tmdb.org/t/p/original/wdrCwmRnLFJhEoH8GSfymY85KHT.png">
//                 <h3>Walt Disney Pictures</h3>
//             </div>
//             <div class="company_card">
//                 <img src="https://image.tmdb.org/t/p/original/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png">
//                 <h3>Pixalr</h3>
//             </div>
//         </div>

