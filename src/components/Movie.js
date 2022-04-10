// Renders each movie. The movie object is simply passed into it as props.
import React, { Component } from 'react'
import { Button } from 'react'
import defaultImg from "../assets/noimage.png";

const DEFAULT_PLACEHOLDER_IMAGE = defaultImg;

const viewList = () =>{
	alert('my list')
}
const Movie = ({ movie }) => {
	const poster =
		movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
	return (
		<div className='movie'>
			<h2>{movie.Title}</h2>
			<div>
				<img
					width='200'
					alt={`The movie titled: ${movie.Title}`}
					src={poster}
				/>
			</div>
			<p style={{ color: "white" }}>({movie.Year})</p>
			console.log("hello")
		</div>
	);
};

export default Movie;
