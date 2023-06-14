export interface ITodo {
    id: string;
    task: string
}

export interface IMainTodo {
    id: string;
    task: string
    subtask?: ITodo[]
}

export interface ICreateBox {
    id: string
    taskType: string
}

export type LoginContextType = {
    user: IuserData | null
    isLoggedIn: boolean
    tasks: IMainTodo[] | null
    editForm: ICreateBox | null
    setEditForm: (CreateBox:ICreateBox) => void
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