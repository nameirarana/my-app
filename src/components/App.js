/* "useEffect" lets perform side effects in your function components: data fetching
subscriptions, and manual DOM manipulations.
Gets called after the first render (componentDidMount) and after every update (componentDidUpdate).
useEffect function accepts two arguments, the function that you want to run and an array.
In that array we just pass in a value that tells React to skip applying an effect 
if the value passed in hasn’t changed */

import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
const MOVIE_API_URL = "../data";
const movies_1 = [["Name", "Year", "Director", "Duration", "Genre", "Score"],
['Dog Day Afternoon',1975, 'Sidney Lumet', '2h 5min','Crime', 8] ,
[ 'Dead Poets Society',1989, 'Peter Weir', '2h 8min', 'Comedy' , 8 ],];

const movies_2 = [["Name", "Year", "Director", "Duration", "Genre", "Score"],];

const categories = ['Mystery','Science Fiction','Comedy','Thriller','Action']




//console.log('movies: ', movies_1);
console.log('Hello');
function ReptileListItems() {
	const reptiles = ["alligator", "snake", "lizard"];
  
	return reptiles.map((reptile) => <li>{reptile}</li>);
  }
const initialState = {
	loading: true,
	errorMessage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_MOVIES_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case "SEARCH_MOVIES_SUCCESS":
			return {
				...state,
				loading: false,
				movies: action.payload,
			};
		case "SEARCH_MOVIES_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error,
			};
		case "SEARCH_MOVIEDETAIL_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case "SEARCH_MOVIEDETAIL_SUCCESS":
			return {
				...state,
				loading: false,
				movies: action.payload,
			};
		case "SEARCH_MOVIEDETAIL_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error,
			};
		default:
			return state;
	}
};

const App = (props) => {

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				dispatch({
					type: "SEARCH_MOVIES_SUCCESS",
					payload: jsonResponse.Search,
				});
			});
	}, []);

	const search = searchValue => {
		dispatch({
			type: "SEARCH_MOVIES_REQUEST",
		});

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=e9732009`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response === "True") {
					dispatch({
						type: "SEARCH_MOVIES_SUCCESS",
						payload: jsonResponse.Search,
					});
				} else {
					dispatch({
						type: "SEARCH_MOVIES_FAILURE",
						error: jsonResponse.Error,
					});
				}
			});
	};

	const detailMovie = keyMovie => {
		dispatch({
			type: "SEARCH_MOVIEDETAIL_REQUEST",
		});

		fetch(`http://www.omdbapi.com/?i=${keyMovie}&apikey=e9732009`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response === "True") {
					dispatch({
						type: "SEARCH_MOVIEDETAIL_SUCCESS",
						payload: jsonResponse.Search,
					});
				} else {
					dispatch({
						type: "SEARCH_MOVIEDETAIL_FAILURE",
						error: jsonResponse.Error,
					});
				}
			});
	};
	const viewList = () =>{
		alert(movies_2)
	}
	const myList = value => alert(value);
	const addNewItem = (value) => {
			movies_2.push(value);
			alert(movies_2);
		 // this.state.cart.push(this.state.input); // same as above, though bad practice 
	};
	const removeItem = (value) => {
		movies_2.pop(value);
		alert(movies_2);
	 // this.state.cart.push(this.state.input); // same as above, though bad practice 
};
	const { movies, errorMessage, loading } = state;
	 return (
		<div className='App'>
		<Header text='Movies' search={search} />
		<div style = {{ height: "50px" ,textAlign: "right"}}>
				<button onClick={viewList}>My List</button>
			</div>
			<div>
	  <form name="search" action="/send_data" method="POST">
            <select name= "categories" method="GET" action="/">
			<option value="none" selected disabled hidden>Select an Option</option>
			{categories.map((category) => <option value={category}>{category}</option>)}
            </select>
            <input type="submit" value="Submit"  name = "category"/>
        </form>
    </div>
		<div className='movies_display'>
	 <table>
	  <thead>
	<tr>
			{movies_1[0].map((item, index) => {
		return <th>{item}</th>;
	   })}
	 </tr>
		</thead>
			<tbody>
			 {movies_1.slice(1, movies_1.length).map((item, index) => {
				return (
				 <tr>
				   <td>{item[0]}</td>
				   <td>{item[1]}</td>
				   <td>{item[2]}</td>
					<td>{item[3]}</td>
					<td>{item[4]}</td>
					<td>{item[5]}</td>
					<button onClick={() => addNewItem(item)}>Add to List</button>
					<button onClick={() => removeItem(item)}>Remove from List</button>
				 </tr>
				);
			 })}
		   </tbody>
		 </table>  
		 </div>
  </div>
);

};

export default App;
