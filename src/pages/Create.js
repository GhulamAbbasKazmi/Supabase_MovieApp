import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import supabase from "../config/SupabaseClient"

const Create = () => {
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
      .insert([{ title, genre, rating }])
       
   if (error) {
    setFormError('Database Error Please Check The Connection & Try Again');
  } else {
    setFormError(null); // Clear any previous form errors
    // Show success alert
    alert('Movie added successfully');

    // Reset form fields
    setTitle('');
    setGenre('');
    setRating('');
  }
  }

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

        <button>Add New Movie</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create