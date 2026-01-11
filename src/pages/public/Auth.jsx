import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'login' : 'register';
        const res = await fetch(`http://localhost:3000/api/auth/${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const data = await res.json();

        if (res.ok) {
            if (isLogin) {
                setAuth(data.user, data.token);
                navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
            } else {
                setIsLogin(true);
                alert("Now please login.");
            }
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isLogin && (
                    <input className="p-2 border" type="text" placeholder="Name"
                        onChange={e => setForm({ ...form, name: e.target.value })} />
                )}
                <input className="p-2 border" type="email" placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="p-2 border" type="password" placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })} />
                <button className="bg-black text-white p-2 rounded">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-sm underline">
                {isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
            </button>
        </div>
    );
}