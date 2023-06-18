import { useContext, useEffect } from "react";
import { IuserData, LoginContextType } from "../Interfaces/Interfaces";
import { AuthContext } from "../contexts/AuthContext";

import TaskList from "./TaskList";
import axios from "axios"
import CreateBox from "./CreateForm";

const LoginForm = () => {
    const { user, isLoggedIn, tasks, editForm, setEditForm, setTasks } = useContext(AuthContext) as LoginContextType;
    const display = editForm?.id === 'display'

    useEffect(() => {
        if (isLoggedIn) {
            axios
                .get("/data.json")
                .then((res) => {
                    let loguser = res.data.find((ele: IuserData) => (ele.email === user?.email))
                    let { Todos }  = loguser
                    setTasks(Todos)
                })
                .catch((err) => console.log(err));
        }
      }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
    <div className="bg-gradient-to-l flex justify-center items-center from-blue-300 to-blue-900 max-h-full overflow-hidden">
        <div className="flex rounded bg-white drop-shadow-lg flex-col md:m-12 w-5/6 max-h-full overflow-y-auto relative">
            <div className="flex justify-between bg-red-100 md:px-8 p-3 sticky top-0">
                <div className="text-xl font-bold">Tasks To Do</div>
                <div className="px-4 p-1 font-bold cursor-pointer rounded-lg bg-red-200 drop-shadow-lg" onClick={()=>setEditForm({id:'display',taskType:'Task'})}>Create Task</div>
            </div>
            {tasks?.map((ele, it) => <TaskList key={it} Task={ele} />)}
            
            <CreateBox create={setTasks} Tasks={tasks!} display={display} setDisplay={setEditForm} taskType={editForm?.taskType!} setToggleSubtasks={()=>{}} />
        </div>
    </div>
    );
};

export default LoginForm;
