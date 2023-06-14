import { useContext, useState } from "react";
import SubTaskList from "./SubTaskList"
import { IMainTodo, LoginContextType } from "../Interfaces/Interfaces";
import { AuthContext } from "../contexts/AuthContext";
import CreateBox from "./CreateBox";


interface ITaskList {
    Task: IMainTodo | null;
}

const TaskList: React.FC<ITaskList> = ({Task}) => {
    const { tasks, idCreateOpen, setEditTasks, setIdCreateOpen, deleteTask } = useContext(AuthContext) as LoginContextType;
    const [hover, setHover] = useState(false);
    const [editTask, setEditTask] = useState('');
    const [toggleSubtasks, setToggleSubtasks] = useState(false);

    if (!Task?.subtask) {
        tasks?.map(ele => {
            if (ele.id === Task?.id) {
                ele.subtask = []
                return ele
            }
            return ele
        })
    }

    const [subTasks, setSubTasks] = useState(Task?.subtask)

    const display = Task?.id === idCreateOpen

    const handleDeleteTask = (id:any) => {
        deleteTask(id)
    }

    const handleDeleteSubTask = (id:any) => {
        const newSubTasks = subTasks?.filter(ele => ele.id !== id)
        setSubTasks(newSubTasks)
    }

    const handleDisplayCreate = () => {
        setIdCreateOpen(Task?.id!)
    }

    const handleDisplayEdit = () => {
        setIdCreateOpen('EditTask')
        setEditTasks(Task?.id!)
    }

    const toggleDropdown = () => {
        if (subTasks?.length! > 0) {
            setToggleSubtasks(!toggleSubtasks);
        }
    };

    return (
        <>
        <div className={`flex flex-col md:mx-8 m-2`}>
            <div className="flex justify-between"  onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
                <div className="flex p-1 cursor-pointer" onClick={toggleDropdown}>
                    <div className="cursor-pointer pl-2 w-6 pl-2 h-6 mr-3 text-white bg-blue-500 rounded-full" > {subTasks?.length} </div>
                    {Task?.task}
                </div>
                <div className={`${hover ? '': 'hidden' } flex group`}>
                    <div className={`mx-1 md:mx-2 px-1 md:px-2 p-1 rounded cursor-pointer text-sm  drop-shadow bg-red-200`} onClick={handleDisplayEdit}>Edit</div>
                    <div className={`mx-1 md:mx-2 px-1 md:px-2 p-1 rounded cursor-pointer text-sm  drop-shadow bg-red-200`} onClick={handleDisplayCreate}>Create Subtask</div>
                    <div className={`px-2 p-1 rounded cursor-pointer drop-shadow bg-red-200`} onClick={()=>handleDeleteTask(Task?.id)}>Delete</div>
                </div>
            </div>

            {toggleSubtasks && <div>
                {subTasks?.map(ele => <SubTaskList subTask={ele} deleteSubTask={handleDeleteSubTask} />)}
            </div>}

            <CreateBox create={setSubTasks} Tasks={subTasks!} display={display} setDisplay={setIdCreateOpen} taskType={"Sub Task"}  />
            
        </div>
        <hr className="border-t border-slate-300 " />
        
        </>
    );
}
 
export default TaskList;