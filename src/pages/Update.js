import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from 'react-router-dom'
import supabase from "../config/SupabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !genre || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('Movies')
      .update({ title, genre, rating })
      .eq('id', id)
if (!error) {
  // Movie successfully updated
  alert('Movie is successfully updated');

  // Delayed navigation after 3 seconds
  setTimeout(() => {
    navigate('/');
  }, 1000);
}
    if (error) {
      setFormError('Some Database Error Plz Check Your Connection')
      return
    }
    if (data) {
      setFormError(null)
    
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await supabase
        .from('Movies')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/Home', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setGenre(data.genre)
        setRating(data.rating)
      }
    }

    fetchMovies()
  }, [id, navigate])

  return (
    <div className="page create">
            <nav>
        <h1>Supa Cards</h1>
        <Link to="/Home">Home</Link>
        <Link to="/create">Create New Cards</Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="genre">Genre:</label>
        <textarea 
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type="submit">Update Movie</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update