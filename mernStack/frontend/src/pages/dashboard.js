import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {getGoals, reset} from "../features/goals/goalSlice";
import Spinner from "../component/Spinner";
import GoalForm from "../component/GoalForm";
import GoalItem from "../component/GoalItem";



function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {goals, isError, isLoading, message} = useSelector((state) => state.goals)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        if (isError) {
            toast.error(message)
        }

        dispatch(getGoals())
        return () => {
            dispatch(reset)
        }

    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }


    return (
        <div>
            <h1>Dashboard of {user && user.name}</h1>
            <img src={user.image} alt="Profile image" />
            <p>Goals Dashboard</p>
            <GoalForm/>
            <section className="content">
                {
                    goals.length > 0 ?
                        (
                            <div className="goals">
                                {goals.map((goal) => (
                                    <GoalItem key={goal._id} goal={goal} />
                                ))}
                            </div>
                        ) :
                        (
                            <h3>You have not set any goals</h3>
                        )}
            </section>
        </div>
    );
}

export default Dashboard;