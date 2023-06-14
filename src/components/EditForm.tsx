import { useContext, useState } from "react";
import { IMainTodo, LoginContextType } from "../Interfaces/Interfaces";

import { AuthContext } from "../contexts/AuthContext";

interface ICreateBox {
    display: boolean
    setDisplay: Function
    taskType: string
    taskToBeEdited: IMainTodo
    handleEditTask: Function
}

const CreateBox:React.FC<ICreateBox> = ({taskToBeEdited, display, handleEditTask, setDisplay, taskType}) => {
    const {editForm} = useContext(AuthContext) as LoginContextType;
    const [inputValue, setInputValue] = useState(taskToBeEdited.task);

    const handleFormSubmit = (e:any) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            let editedTask:IMainTodo = {
                id: taskToBeEdited.id,
                task: inputValue,
                subtask: taskToBeEdited.subtask
            }
            handleEditTask(editedTask);
        }
      };

    return (
        <div className={`${((editForm?.taskType === 'Edit') && display)? '' : 'hidden'} sticky bottom-0 bg-white flex flex-col border rounded p-2 px-4 `}>
            <div className="flex flex-col pt-2 px-4 ">
                <form onSubmit={handleFormSubmit}>
                    <input 
                        className="bg-slate-200 w-full focus:outline-none font-bold p-2 px-4 rounded-lg" 
                        placeholder={taskType}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        />
                    <div className="flex justify-end my-2">
                        <div className="mx-4 rounded cursor-pointer px-4 p-1 bg-slate-300" onClick={()=>setDisplay('')}>Cancel</div>
                        <button type="submit">
                            <div className="px-4 rounded cursor-pointer p-1 bg-red-300" onClick={handleFormSubmit}>Add {taskType}</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default CreateBox;