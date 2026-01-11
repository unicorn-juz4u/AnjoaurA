import { useEffect, useState } from 'react';

export default function Home() {
    const [connection, setConnection] = useState("Connecting...");

    useEffect(() => {
        // Calling our new standalone backend
        fetch('http://localhost:3000/api/health')
            .then(res => res.json())
            .then(data => setConnection(data.message))
            .catch(err => setConnection("Backend Offline ❌"));
    }, []);

    return (
        <div className="p-10 text-center">
            {/* <h1 className="text-anjo-gold font-serif text-4xl font-extrabold tracking-tight sm:text-7xl">
                AnjoaurA
            </h1> */}
            <p className="mt-4 p-2 bg-gray-100 rounded">
                Server Status: <strong>{connection}</strong>
            </p>
        </div>
    );
}