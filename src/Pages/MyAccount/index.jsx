import { useContext, useState, useRef, useEffect } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';

function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const form = useRef(null);

  // Obtener la cuenta desde localStorage o contexto
  const [account, setAccount] = useState(() => {
    const storedAccount = localStorage.getItem('account');
    return storedAccount ? JSON.parse(storedAccount) : context.account || null;
  });

  useEffect(() => {
    console.log("Context Account Updated:", context.account); // Debugging
    if (context.account) {
      setAccount(context.account);
    }
  }, [context.account]);

  const editAccount = (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      password: formData.get('password') || ''
    };

    console.log("Saving Account Data:", data); // Debugging

    // Guardar en localStorage y actualizar el contexto
    localStorage.setItem('account', JSON.stringify(data));
    setAccount(data);
    context.setAccount(data);
    
    setView('user-info'); // Volver a la vista de usuario
  };

  const renderUserInfo = () => {
    if (!account) {
      return (
        <div className='flex flex-col w-80'>
          <p className="text-red-500">No account found. Please add your details.</p>
          <button
            className='border border-black rounded-lg mt-6 py-3'
            onClick={() => setView('edit-user-info')}>
            Add Info
          </button>
        </div>
      );
    }

    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Name: </span>
          <span>{account.name || 'No name set'}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{account.email || 'No email set'}</span>
        </p>
        <button
          className='border border-black rounded-lg mt-6 py-3'
          onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    );
  };

  const renderEditUserInfo = () => (
    <form ref={form} className='flex flex-col gap-4 w-80' onSubmit={editAccount}>
      <div className='flex flex-col gap-1'>
        <label htmlFor="name" className='font-light text-sm'>Your name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={account?.name || ''}
          placeholder="Peter"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="email" className='font-light text-sm'>Your email:</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={account?.email || ''}
          placeholder="hi@helloworld.com"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="password" className='font-light text-sm'>Your password:</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={account?.password || ''}
          placeholder="******"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <button
        type="submit"
        className='bg-black text-white w-full rounded-lg py-3'>
        Save
      </button>
    </form>
  );

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">My account</h1>
      {view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()}
    </Layout>
  );
}

export default MyAccount;
