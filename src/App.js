import Auth from "./components/auth";
import "./App.css";
import { db, auth, storage } from "./config/firebase";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
  const [movieList, SetMovieLIst] = useState([]);

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [movieOscar, setMovieOscar] = useState(false);

  // update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // file upload state
  const [file, setFile] = useState(null);
  // get a specific collection in firebase using its reference
  const movieCollectionReference = collection(db, "movies");
  // use use useeffect to ensure the function runs on load up
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
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const addMovie = async () => {
    try {
      await addDoc(movieCollectionReference, {
        userId: auth?.currentUser?.uid,
        title: title,
        releaseDate: releaseDate,
        recievedAnOscar: movieOscar,
      });
      getMovieList();
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const deletMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const uploadFile = async () => {
    // this ensures that if the there is no file then it will not run
    if (!file) return;
    const filesFolderRef = ref(storage, "files");
  try {
     await uploadBytes(filesFolderRef, file);
  } catch (error) {
    console.error("An error occured", error);
    
  }

  };

  return (
    <div className="App">
      <Auth />
      <h1>Add A Movie</h1>
      <div>
        <p>SET THE MOVIE TITLE</p>
        <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <p>Set the movie release year</p>
        <input
          placeholder="release date"
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <p>Set if the movie recived an oscar</p>

        <input
          placeholder="recieved an oscar"
          type="checkbox"
          checked={movieOscar}
          onChange={(e) => setMovieOscar(Boolean(e.target.checked))}
        />
        <p>Click to add a movie</p>
        <button onClick={addMovie}>Add</button>
      </div>

      <h1>Movie List</h1>
      <div>
        {movieList.map((movie) => (
          // conditional if the movie recied an oscar then its tru and color is green if fals the its false then color is red
          <div>
            <h2 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h2>
            <p> Date: {movie.releaseDate}</p>
            {/* always add an anynoumous function for those functions that are going to expliciiltly run like a use efect here as the data was being fetched it was deleted */}
            <button onClick={() => deletMovie(movie.id)}>
              Delete this Movie
            </button>
            {/* Update section */}
            <p>Update movie title</p>{" "}
            <input
              type="text"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <h1>Upload a file </h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => uploadFile}>Upload</button>
    </div>
  );
}

export default App;
