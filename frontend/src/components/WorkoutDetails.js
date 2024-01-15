import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import API_BASE_URL from "../config";
import { Link } from "react-router-dom"

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch(API_BASE_URL + '/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <Link style={{ textDecoration: 'none' }} to={`/details/${workout.title}`}
            className={`card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
                    <h4>{workout.title}</h4>
                    <p><strong>Load (lbs): </strong>{workout.load}</p>
                    <p><strong>Reps: </strong>{workout.reps}</p>
                    <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            </Link>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;