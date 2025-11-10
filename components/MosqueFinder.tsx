import React, { useState, useEffect, useCallback } from 'react';
import { findMosques } from '../services/geminiService';
import { marked } from 'marked';

const Spinner: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <div className={`animate-spin rounded-full border-b-2 border-teal-600 ${className}`}></div>
);

const MosqueFinder: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
    const [info, setInfo] = useState<{ prayerTimes: string, mosques: any[] } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialLoad, setInitialLoad] = useState(true);

    const getLocation = useCallback(() => {
        setLoading(true);
        setError(null);
        setInitialLoad(false);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
            },
            (err) => {
                setError(`Could not get location: ${err.message}. Please enable location permissions in your browser.`);
                setLoading(false);
            }
        );
    }, []);

    const fetchInfo = useCallback(async () => {
        if (!location) return;
        setLoading(true);
        setError(null);
        const data = await findMosques(location.lat, location.lon);
        if (data) {
            setInfo(data);
        } else {
            setError('Failed to fetch prayer information.');
        }
        setLoading(false);
    }, [location]);

    useEffect(() => {
        if (location) {
            fetchInfo();
        }
    }, [location, fetchInfo]);

    const renderMarkdown = (text: string) => {
        const rawMarkup = marked(text) as string;
        return { __html: rawMarkup };
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Mosque Finder</h1>
                <p className="text-gray-600 dark:text-gray-400">Find nearby Masjids and see local prayer times.</p>
            </div>
            <div className="text-center mb-6">
                <button onClick={getLocation} disabled={loading} className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-700 disabled:bg-teal-400 transition-colors flex justify-center items-center gap-2 mx-auto">
                    {loading && <Spinner className="h-5 w-5 border-white"/>}
                    {location ? 'Refresh My Location' : 'Find Mosques Near Me'}
                </button>
            </div>
            {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}
            {initialLoad && !loading && <p className="text-center text-gray-500 dark:text-gray-400">Click the button to find mosques based on your current location.</p>}
            
            {loading && !info && <div className="flex justify-center"><Spinner /></div>}
            
            {info && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-3">Today's Prayer Times</h3>
                        <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={renderMarkdown(info.prayerTimes)} />
                        <p className="text-xs text-gray-400 mt-4">Location-based data provided by Google Maps.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-3">Nearby Mosques</h3>
                        {info.mosques.length > 0 ? (
                            <ul className="space-y-2">
                                {info.mosques.map((mosque, i) => (
                                    <li key={i} className="text-sm">
                                        <a href={mosque.maps.uri} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                                            {mosque.maps.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-sm text-gray-500">No mosques found nearby in the response.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MosqueFinder;
