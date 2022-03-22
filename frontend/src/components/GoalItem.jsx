import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'

const GoalItem = ({goal}) => {
    const dispatch = useDispatch();
  return (
   <>
    <div className="goal">
        <div>
            {new Date(goal.creatdAt).toLocaleString('en-US')}
        </div>
        <h2>{goal.text}</h2>
        <button className="close" onClick={()=>dispatch(deleteGoal(goal._id))}></button>
    </div>
   </>
  )
}

export default GoalItem