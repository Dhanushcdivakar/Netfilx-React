import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import './RowPost.css';
import { imageUrl, API_KEY } from '../../Constants/Constants';
import axios from '../../axios';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(props.url)
      .then(response => {
        console.log('Movies fetched:', response.data);
        setMovies(response.data.results);
      })
      .catch(error => {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
          console.log('Headers:', error.response.headers);
        } else if (error.request) {
          console.log('Error Request:', error.request);
        } else {
          console.log('Error Message:', error.message);
        }
      });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,  // Set to 1 for autoplay
    },
  };

  const handleMovie = (id) => {
    console.log('Movie ID clicked:', id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        console.log('Videos fetched for movie:', response.data);
        if (response.data.results.length !== 0) {
          console.log('Setting video ID:', response.data.results[0].key);
          setUrlId(response.data.results[0].key);  // Set the YouTube video key
        } else {
          console.log('No video found for this movie');
          setUrlId('');  // Reset if no video is found
        }
      })
      .catch(error => {
        console.log('Error fetching video:', error);
      });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id}  // Unique key for each image
            onClick={() => handleMovie(obj.id)}  // Load the movie trailer on click
            className={props.isSmall ? 'smallPoster' : 'poster'}
            alt='poster'
            src={`${imageUrl + obj.backdrop_path}`}  // Correct image path
          />
        ))}
      </div>

      {/* Render YouTube video player only if urlId is valid */}
      {urlId ? (
        <Youtube opts={opts} videoId={urlId} />  // Render YouTube player
      ) : (
        <p>No video available</p>  // Show message if no video is available
      )}
    </div>
  );
}

export default RowPost;
