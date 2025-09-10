import Auth from "./components/auth";
import "./App.css";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [movieList, SetMovieLIst] = useState([]);
  // get a specific collection in firebase using its reference
  const movieCollectionReference = collection(db, "movies");
  // use use useeffect to ensure the function runs on load up
  useEffect(() => {
    const getMovieList = async () => {
      try {
        const movieData = await getDocs(movieCollectionReference);
        // filter the data
        const filterData = movieData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // set the movie data to the state -- setMovieLIst(filterData)
        SetMovieLIst(filterData);
        console.log(filterData);
      } catch (error) {
        console.error("An error occured", error);
      }
    };
    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />
      <h1>Movie List</h1>
      <div>
        {movieList.map((movie) => (
          // conditional if the movie recied an oscar then its tru and color is green if fals the its false then color is red
          <div>
            <h2 style={{ color: movie.recievedAnOscar ?  "green" : "red" }}>{movie.title}</h2>
          <p> Date:  {movie.releaseDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
