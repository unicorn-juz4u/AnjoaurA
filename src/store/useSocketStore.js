import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket: null,
    liveVisitors: 0,
    connect: () => {
        const socket = io('http://localhost:3000');
        set({ socket });

        socket.on('product_hot', (data) => {
            // Logic for "Someone else is looking at this scent!" notifications
            console.log("Hot product:", data);
        });
    }
}));