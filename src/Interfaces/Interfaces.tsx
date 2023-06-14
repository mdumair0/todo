export interface ITodo {
    id: string;
    task: string
}

export interface IMainTodo {
    id: string;
    task: string
    subtask?: ITodo[]
}

export type LoginContextType = {
    user: IuserData | null
    isLoggedIn: boolean
    tasks: IMainTodo[] | null
    idCreateOpen: string
    editTasks: string
    setEditTasks: (id:string) => void
    setIdCreateOpen: (id:string) => void
    addTask: (tasks: IMainTodo) => void
    editTask: (tasks: IMainTodo) => void
    deleteTask: (id: any) => void
    setTasks: (tasks: IMainTodo[]) => void
    setIsLoggedIn: (value: boolean) => void;
    login: (userData: IuserData) => void;
    logout: () => void;
};

export interface IuserData {
    id?: number;
    name?: string;
    email: string;
    password: string;
}