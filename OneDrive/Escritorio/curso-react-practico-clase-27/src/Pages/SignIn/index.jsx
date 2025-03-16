import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useRef } from 'react';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';

function SignIn() {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate(); // Hook de navegación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('user-info'); // Nueva gestión de vistas
  const form = useRef(null);

  // Obtener cuenta desde localStorage
  const account = localStorage.getItem('account');
  const parsedAccount = account ? JSON.parse(account) : null;

  // Verificar si el usuario tiene cuenta
  const noAccountInLocalStorage = !parsedAccount || Object.keys(parsedAccount).length === 0;
  const noAccountInLocalState = !context.account || Object.keys(context.account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignIn = () => {
    localStorage.setItem('sign-out', JSON.stringify(false));
    context.setSignOut(false);
    
    // Redirigir al home
    navigate('/');
  };

  const createAnAccount = (event) => {
    event.preventDefault(); // Evita el envío del formulario

    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    console.log("Datos registrados:", data);

    // Guardar cuenta en localStorage
    localStorage.setItem('account', JSON.stringify(data));
    context.setAccount(data);

    // Iniciar sesión y redirigir
    handleSignIn();
  };

  // Renderizado del formulario de login
  const renderLogin = () => (
    <div className="flex flex-col w-80">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
      <button 
        className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
        onClick={handleSignIn}
        disabled={!hasUserAnAccount}
      >
        Log in
      </button>
      <div className="text-center">
        <Link 
          to="/forgot-password"
          className={`font-light text-xs underline underline-offset-4 ${hasUserAnAccount ? 'text-black/40 pointer-events-none' : ''}`}
        >
          Forgot my password
        </Link>
      </div>
      <button 
        className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3"
        onClick={() => setView('create-user-info')} // Cambiar vista
      >
        Sign up
      </button>
    </div>
  );

  // Renderizado del formulario de creación de cuenta
  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name || ""}
            placeholder="Peter"
            className="rounded-lg border border-black placeholder:font-light text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
  
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">Your email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email || ""}
            placeholder="hi@helloworld.com"
            className="rounded-lg border border-black placeholder:font-light text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
  
        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">Your password:</label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password || ""}
            placeholder="********"
            className="rounded-lg border border-black placeholder:font-light text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <button
          className="bg-black text-white w-full rounded-lg py-3"
          onClick={createAnAccount}
        >
          Register Account
        </button>
      </form>
    );
  };
  
  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6">Welcome</h1>
      {view === 'create-user-info' ? renderCreateUserInfo() : renderLogin()}
    </Layout>
  );
}

export default SignIn;
