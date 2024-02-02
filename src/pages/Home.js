import supabase from "../config/SupabaseClient"
import MovieCard from "../components/MovieCard"
import {  Link } from "react-router-dom"
import { useState, useEffect } from "react"
import addNotification from 'react-push-notification';
import { useParams } from "react-router-dom";
console.log(supabase)

const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [movies, setMovies] = useState([])


  const handleDelete = (id) => {
    setMovies(prevMovies => {
      return prevMovies.filter(sm => sm.id !== id)
    })
  }

useEffect(() => {
  const fetchMovies = async () => {
    try {
      const { data, error, status } = await supabase
        .from('Movies')
        .select('id, title, genre, rating');

      console.log('Status:', status);
      console.log('Data:', data);
      console.log('Error:', error);

      if (error) {
        setFetchError("Could not fetch the movies");
        setMovies(null);
        console.error(error);
      } if (data) {
        setFetchError(null);
        setMovies(data || []); // Make sure 'data' is an array
        setTimeout(() => {
            buttonClick();
          }, 4000)
      }
    } catch (error) {
      console.error('Error in fetchMovies:', error);
    }
  };

  fetchMovies();
}, []);

 const buttonClick = () => {
    // Set the database value to 1 when the notification appears
    supabase
      .from('Notifications') // Replace 'YourTable' with your actual table name
      .update({ 'MoviesNotification': 1 }) // Replace 'yourColumn' with the actual column to update
      .eq('id', 1)
      .then(response => {
        if (response.error) {
          console.error('Error updating database:', response.error);
        } else {
          console.log('Database updated successfully:', response.data);
      setTimeout(() => {
        supabase
          .from('Notifications')
          .update({ 'MoviesNotification': 0 })
          .eq('id', 1)
          .then(response => {
            if (response.error) {
              console.error('Error updating database:', response.error);
            } else {
              console.log('Database updated successfully:', response.data);
            }
          })
          .catch(error => {
            console.error('Error updating database:', error);
          });
      }, 5000);
    }
  })



      .catch(error => {
        console.error('Error updating database:', error);
      });




    // Display the notification
    addNotification({
      title: 'Movies Rating',
      subtitle: 'IMDB rating for movies',
      message: 'If you want to check the ratings for all movies just click and you are referred to IMBD official web page',
      theme: 'darkblue',
      native: true,
      duration: 5000,
    });
  };



  return (
    
 <div className="page home">
        <nav>
        <h1>Supa Cards</h1>
        <Link to="/create">Create New Cards</Link>
      </nav>
      {fetchError && (<p>{fetchError}</p>)}
      {movies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home