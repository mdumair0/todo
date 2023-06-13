export type TodoContextType = {
    todos: ITodo[];
    saveTodo: (todo: ITodo) => void;
    updateTodo: (id: number) => void;
};

export interface ITodo {
    id: number;
    title: string;
    description: string;
    status: boolean;
}

export type LoginContextType = {
    user: IuserData | null
    isLoggedIn: boolean
    setIsLoggedIn: (value:boolean) => void;
    login: (userData: IuserData) => void;
    logout: () => void;
};

export interface IuserData {
    id?: number;
    name?: string;
    email: string;
    password: string;
}