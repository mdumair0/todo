import { useContext, useState } from "react";
import { IMainTodo, LoginContextType } from "../Interfaces/Interfaces";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../contexts/AuthContext";

interface ICreateBox {
    create: Function
    Tasks: IMainTodo[]
    display: boolean
    setDisplay: Function
    taskType: string
}

const CreateBox:React.FC<ICreateBox> = ({Tasks, display, create, setDisplay, taskType}) => {
    const { user, isLoggedIn, tasks, editTasks , idCreateOpen, setIdCreateOpen, setTasks } = useContext(AuthContext) as LoginContextType;

    const [newTask, setNewTask] = useState('')
    const uniqueId: string = uuidv4();

    console.log(tasks, editTasks )
    

    const handleAddTask = (event:any) => {
        event?.preventDefault()
        create([...Tasks, {
            id: uniqueId,
            task: newTask
        }])
        setNewTask('')
    }

    return (
        <div className={`${!display && 'hidden'} sticky bottom-0 bg-white flex flex-col border rounded p-2 px-4 `}>
            <div className="flex flex-col pt-2 px-4 ">
                <form onSubmit={handleAddTask}>
                    <input 
                        className="bg-slate-200 w-full focus:outline-none font-bold p-2 px-4 rounded-lg" 
                        placeholder={taskType}
                        value={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                        />
                    <div className="flex justify-end my-2">
                        <div className="mx-4 rounded cursor-pointer px-4 p-1 bg-slate-300" onClick={()=>setDisplay('')}>Cancel</div>
                        <button type="submit">
                            <div className="px-4 rounded cursor-pointer p-1 bg-red-300" onClick={handleAddTask}>Add {taskType}</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default CreateBox;