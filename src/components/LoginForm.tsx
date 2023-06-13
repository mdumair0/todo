import { useState, useContext, FormEvent, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LoginContextType, IuserData } from '../Interfaces/Interfaces';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<string>('');
  const { user, isLoggedIn, login, logout, setIsLoggedIn } = useContext(AuthContext) as LoginContextType;
  console.log(isLoggedIn)

  // Check if user is already logged In (localStorage)
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      let loggedUser = JSON.parse(localStorage.getItem('authToken')!)
      setIsLoggedIn(true)
      login(loggedUser)
      setUsername(loggedUser.email)
      setPassword(loggedUser.password)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Mocking POST login functionality with static JSON data
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userData: IuserData = {
      email: username,
      password: password
    }
    if (localStorage.getItem('authToken')) {
      let loggedUser = JSON.parse(localStorage.getItem('authToken')!)
      setIsLoggedIn(true)
      login(loggedUser)
    }
    else {
      axios
        .get("/data.json")
        .then((res) => {
          let user = res.data.find((ele: IuserData) => (ele.email === username))
          setUsername('')
          setPassword('')
          if (!user) { setAlert('User Not Found') }
          else if (user && (user.password !== password)) { setAlert('Wrong Password') }
          else if (user && (user.password === password)) {
            console.log("LoggedIn User: ", user);
            localStorage.setItem('authToken', JSON.stringify(user))
            setAlert('')
            login({ ...userData, name: user?.name });
            setIsLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-gradient-to-r flex justify-center items-center from-pink-500 to-blue-500 h-screen">
      <div className="bg-white flex justify-center  w-3/6 h-4/6 gap-4 place-content-center">
        <div className="grid grid-cols-1 flex justify-center w-3/6 gap-4 place-content-center">
          <form className="flex flex-col" onSubmit={handleLogin} >
            <label className="mx-auto text-4xl">LOGIN</label>
            <div className='mx-2 mt-8 text-left text-sm font-bold text-red-500'>
              {alert ? `*${alert}`: ''}
            </div>
            <input
              className="bg-slate-200 w-full h-10 m-2 mb-8 p-5 rounded"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="bg-slate-200 w-full h-10 m-2 mb-8 p-5 rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLoggedIn ? <button className="bg-pink-500 w-full m-2 h-10 rounded text-white" onClick={() => logout()}>Logout</button> :
              <button className="bg-pink-500 w-full m-2 h-10 rounded text-white" type="submit">Login</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
