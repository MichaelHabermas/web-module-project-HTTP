import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Route, Switch, Redirect } from 'react-router-dom';
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm.js';
import AddMovieForm from './components/AddMovieForm.js';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = props => {
	const { push } = useHistory();
	const { id } = useParams();

	const [movies, setMovies] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/movies')
			.then(res => {
				console.log(res);
				setMovies(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const deleteMovie = id => {
		console.log('id: ', id);
		const newList = movies.filter(movie => {
			// console.log(movie);
			return id !== movie.id;
		});
		setMovies(newList);
		push('/movies');
	};

	const addToFavorites = movie => {
		console.log(movie);
	};

	return (
		<div>
			<nav className="navbar navbar-dark bg-dark">
				<span className="navbar-brand">
					<img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD Module Project
				</span>
			</nav>

			<div className="container">
				<MovieHeader />
				<div className="row ">
					<FavoriteMovieList favoriteMovies={favoriteMovies} />

					<Switch>
						<Route path="/movies/edit/:id" render={props => <EditMovieForm setMovies={setMovies} />} />

						<Route path="/movies/add" render={props => <AddMovieForm setMovies={setMovies} />} />

						<Route path="/movies/:id">
							<Movie deleteMovie={deleteMovie} />
						</Route>

						<Route path="/movies">
							<MovieList movies={movies} />
						</Route>

						<Route path="/">
							<Redirect to="/movies" />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default App;
