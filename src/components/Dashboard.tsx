import { useContext, useEffect } from "react";
import { IMainTodo, IuserData, LoginContextType } from "../Interfaces/Interfaces";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios"

const LoginForm = () => {
    const { user, isLoggedIn, tasks, setTasks, login, logout, setIsLoggedIn } = useContext(AuthContext) as LoginContextType;
    let Todos: IMainTodo[] = []
    useEffect(() => {
        if (isLoggedIn) {
            axios
                .get("/data.json")
                .then((res) => {
                    let loguser = res.data.find((ele: IuserData) => (ele.email === user?.email))
                    let { Todos }  = loguser
                    setTasks(Todos)
                    setTasks(Todos)
                    console.log("Todos",Todos)
                })
                .catch((err) => console.log(err));
        }
      }, [])

    return (
    <div className="bg-gradient-to-r flex justify-center items-center from-pink-500 to-blue-500 h-screen">
        <div className="bg-white flex justify-center  w-5/6 h-4/6 gap-4 place-content-center">
            <div className="grid grid-cols-1 flex justify-center w-3/6 gap-4 place-content-center">
                {tasks?.map(ele => ele.task)}
            </div>
        </div>
    </div>
    );
};

export default LoginForm;
