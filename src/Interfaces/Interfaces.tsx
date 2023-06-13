export interface ITodo {
    id: number;
    task: string
}

export interface IMainTodo {
    id: number;
    task: string
    subtask: ITodo[]
}

export type LoginContextType = {
    user: IuserData | null
    isLoggedIn: boolean
    tasks: IMainTodo[] | null
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