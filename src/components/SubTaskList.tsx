import { useState } from "react";
import { ITodo } from "../Interfaces/Interfaces";


interface ISubTaskList {
    subTask: ITodo | null;
    deleteSubTask: (id:any) => void
}


const SubTaskList: React.FC<ISubTaskList> = ({subTask, deleteSubTask}) => {
    const [hover, setHover] = useState(true);

    return (
        <>
        <div className={`flex justify-between mx-8 m-2`} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(true)}>
            <div className="">{subTask?.task}</div>
            <div className={`${hover ? '': 'hidden' } flex group`}>
                <div className={`px-2  rounded cursor-pointer drop-shadow`} onClick={()=>deleteSubTask(subTask?.id)}>🗑️</div>
            </div>
        </div>
        <hr className="border-t border-slate-300 mx-8" />     
        </>
    );
}
 
export default SubTaskList;