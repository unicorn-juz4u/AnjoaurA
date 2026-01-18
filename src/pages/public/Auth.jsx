import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../../api/client';

export default function Auth() {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const { login, user } = useAuthStore();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        }
    }, [user, navigate]);


    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isLogin = activeTab === 'login';
        const url = isLogin ? '/auth/login' : '/auth/register';
        
        try {
            const payload = isLogin ? { email: form.email, password: form.password } : form;
            const res = await apiClient.post(url, payload);
            const data = res.data;

            if (isLogin) {
                login(data.user, data.token);
            } else {
                setActiveTab('login');
                alert("Registration successful! Please login.");
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred.');
        }
    };
    


    const renderForm = () => {
        const isLogin = activeTab === 'login';
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isLogin && (
                    <input className="p-3 border rounded-md" name="name" type="text" placeholder="Name" onChange={handleFormChange} required />
                )}
                <input className="p-3 border rounded-md" name="email" type="email" placeholder="Email" onChange={handleFormChange} required />
                <input className="p-3 border rounded-md" name="password" type="password" placeholder="Password" onChange={handleFormChange} required />
                <button className="bg-charcoal text-white p-3 rounded-md uppercase tracking-wider font-semibold hover:bg-opacity-90 transition-all">
                    {isLogin ? 'Login' : 'Create Account'}
                </button>
            </form>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 border rounded-lg shadow-lg">
                <div className="mb-8">
                    <div className="flex border-b">
                        <button 
                            onClick={() => setActiveTab('login')}
                            className={`flex-1 py-3 text-center font-semibold transition-all ${activeTab === 'login' ? 'text-charcoal border-b-2 border-charcoal' : 'text-gray-400'}`}
                        >
                            LOGIN
                        </button>
                        <button 
                            onClick={() => setActiveTab('signup')}
                            className={`flex-1 py-3 text-center font-semibold transition-all ${activeTab === 'signup' ? 'text-charcoal border-b-2 border-charcoal' : 'text-gray-400'}`}
                        >
                            SIGN UP
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6">

                    
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}