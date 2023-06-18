import { useContext, useState } from "react";
import SubTaskList from "./SubTaskList"
import { IMainTodo, LoginContextType } from "../Interfaces/Interfaces";
import { AuthContext } from "../contexts/AuthContext";
import CreateBox from "./CreateForm";
import EditForm from "./EditForm";


interface ITaskList {
    Task: IMainTodo | null;
}

const TaskList: React.FC<ITaskList> = ({Task}) => {
    const { tasks, editForm, editTask, setEditForm, deleteTask } = useContext(AuthContext) as LoginContextType;
    const [hover, setHover] = useState(true);
    const [toggleSubtasks, setToggleSubtasks] = useState(false);
    const [subTasks, setSubTasks] = useState(Task?.subtask || [])
    const display = Task?.id === editForm?.id
        
    const handleDeleteTask = (id:any) => {
        deleteTask(id)
    }

    const handleEditTask = (tasks:IMainTodo) => {
        editTask(tasks)
    }

    const handleDeleteSubTask = (id:any) => {
        const newSubTasks = subTasks?.filter(ele => ele.id !== id)
        setSubTasks(newSubTasks)
    }

    const handleDisplayCreate = () => {
        setEditForm({id:Task?.id!,taskType:'Sub Task'})
    }

    const handleDisplayEdit = () => {
        setEditForm({id:Task?.id!,taskType:'Edit'})
    }

    const toggleDropdown = () => {
        if (subTasks?.length! > 0) {
            setToggleSubtasks(!toggleSubtasks);
        }
    };

    return (
        <>
        <div className={`flex flex-col md:mx-8 m-2`}>
            <div className="flex justify-between"  onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(true)}>
                <div className="flex p-1 cursor-pointer" onClick={toggleDropdown}>
                    <div className="cursor-pointer pl-2 w-6 pl-2 h-6 mr-3 text-white bg-blue-500 rounded-full" > {subTasks?.length} </div>
                    {Task?.task}
                </div>
                <div className={`${hover ? '': 'hidden' } flex group`}>
                    <div className={`mx-1 md:mx-2 px-1 md:px-1 p-1 w-8 h-8 cursor-pointer text rounded-full drop-shadow`} onClick={handleDisplayCreate}>➕</div>
                    <div className={`mx-1 md:mx-2 px-1 md:px-1 p-1 w-8 h-8 rounded-full cursor-pointer text-sm  drop-shadow`} onClick={handleDisplayEdit}>✏️</div>
                    <div className={`mx-1 md:mx-2 px-1 md:px-1 p-1 w-8 h-8 rounded-full cursor-pointer drop-shadow`} onClick={()=>handleDeleteTask(Task?.id)}>🗑️</div>
                </div>
            </div>

            {toggleSubtasks && <div>
                {subTasks?.map(ele => <SubTaskList subTask={ele} deleteSubTask={handleDeleteSubTask} />)}
            </div>}

            <CreateBox create={setSubTasks} Tasks={subTasks!} display={display} setDisplay={setEditForm} taskType={editForm?.taskType!} setToggleSubtasks={setToggleSubtasks} />
            <EditForm display={display} setDisplay={setEditForm} taskType={editForm?.taskType!} taskToBeEdited={Task!} handleEditTask={handleEditTask} />

            
        </div>
        <hr className="border-t border-slate-300 " />
        
        </>
    );
}
 
export default TaskList;