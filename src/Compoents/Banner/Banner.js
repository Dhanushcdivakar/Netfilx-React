import React, { useEffect,useState } from 'react';  // Added useEffect import
import { API_KEY ,imageUrl} from '../../Constants/Constants';
import './Banner.css';
import axios from '../../axios';  // Ensure this path is correct


function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data.results[0])
      })
  }, []);

  return (
    <div
      style={{backgroundImage:`url(${movie ?imageUrl+movie.backdrop_path:""})`}} 
    className="banner">
      <div className="content">
        <h1 className="title">{ movie? movie.title:""}</h1>
        <div className="banner_buttons">
          <button className="button">Play</button>
          <button className="button">My List</button>
        </div>
        <h1 className="description">
          {movie?movie.overview:"A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine."
}
        </h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
