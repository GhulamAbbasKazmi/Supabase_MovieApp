import supabase from "../config/SupabaseClient"
import { Link, Navigate, useNavigate } from 'react-router-dom'

const MovieCard = ({ movie, onDelete }) => {
const Navigate = useNavigate()
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('Movies')
      .delete()
      .eq('id', movie.id)
      Navigate('/')
    
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      onDelete(movie.id)
    }
  }

  return (
    <div className="smoothie-card">
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <div className="rating">{movie.rating}</div>
      <div className="buttons">
        <Link to={"/" + movie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default MovieCard