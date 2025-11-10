import React, { useState, useEffect } from 'react';
import { getGeoInfoFromCoordinates } from '../services/geminiService';

const Header: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [geoInfo, setGeoInfo] = useState<{ location: string, islamicDate: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const data = await getGeoInfoFromCoordinates(position.coords.latitude, position.coords.longitude);
                    setGeoInfo(data);
                } catch (e) {
                    setError("Could not fetch geo data.");
                }
            },
            (err) => {
                setError("Location access denied.");
            }
        );
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <header className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md mb-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300 gap-2">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-2 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{geoInfo ? geoInfo.location : (error || 'Loading location...')}</span>
            </div>
             <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21V5a2 2 0 00-2-2H5a2 2 0 00-2 2v16m18 0h-2.286a1 1 0 00.93-1.732l-5.36-6.254a1 1 0 00-1.53 0l-1.07 1.249a1 1 0 01-1.53 0l-5.36-6.254a1 1 0 00-.93-1.732H3m18 0H3" /></svg>
                <span>{geoInfo ? geoInfo.islamicDate : '...'}</span>
            </div>
        </header>
    );
};

export default Header;
