import React, { useState, useCallback, useRef } from 'react';
import { getFactCheckResponse, generateSpeech } from '../services/geminiService';
import { marked } from 'marked';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { decode, decodeAudioData } from '../utils/audio';

const UserIcon: React.FC = () => (
    <svg className="h-8 w-8 text-white bg-teal-600 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AIIcon: React.FC = () => (
    <svg className="h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
);

const MicIcon: React.FC<{ className?: string, isListening?: boolean }> = ({ className, isListening }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {isListening ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 5.5A.5.5 0 0 1 6 6v4a4 4 0 0 0 8 0V6a.5.5 0 0 1 1 0v4a5 5 0 0 1-10 0V6a.5.5 0 0 1 .5-.5zM3 10v2a9 9 0 0 0 18 0v-2" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        )}
    </svg>
);

const SpeakerIcon: React.FC<{ isPlaying?: boolean }> = ({ isPlaying }) => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isPlaying ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l4-4m0 4l-4-4" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        )}
    </svg>
);

const FactChecker: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [sources, setSources] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastQuery, setLastQuery] = useState<string>('');
    
    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ onTranscript: (text) => setQuery(text) });

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const handlePlayAudio = useCallback(async (text: string) => {
        if (isSpeaking && audioSourceRef.current) {
            audioSourceRef.current.stop();
            setIsSpeaking(false);
            return;
        }

        setIsSpeaking(true);
        try {
            const base64Audio = await generateSpeech(text);
            if (base64Audio) {
                if (!audioContextRef.current) {
                    // FIX: Cast window to 'any' to access vendor-prefixed webkitAudioContext
                    audioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                }
                const audioContext = audioContextRef.current;
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                audioSourceRef.current = source;
                source.onended = () => setIsSpeaking(false);
            } else {
                setIsSpeaking(false);
                setError("Could not generate audio.");
            }
        } catch (e) {
            console.error("Audio playback error:", e);
            setError("Failed to play audio.");
            setIsSpeaking(false);
        }
    }, [isSpeaking]);


    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim() || loading) return;

        setLoading(true);
        setError(null);
        setResponse('');
        setSources([]);
        setLastQuery(query);
        if (isSpeaking && audioSourceRef.current) {
            audioSourceRef.current.stop();
            setIsSpeaking(false);
        }

        try {
            const result = await getFactCheckResponse(query);
            setResponse(result.text);
            setSources(result.sources);
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
            setQuery('');
        }
    }, [query, loading, isSpeaking]);

    const renderMarkdown = (text: string) => {
        const rawMarkup = marked(text) as string;
        return { __html: rawMarkup };
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">AI Islamic Fact Checker</h1>
                <p className="text-gray-600 dark:text-gray-400">Ask a question or present an idea to check its validity against Islamic sources.</p>
            </div>
            
            <div className="flex-grow bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-y-auto mb-6">
                {!lastQuery && !loading && (
                    <div className="text-center text-gray-500 dark:text-gray-400 h-full flex flex-col justify-center">
                        <p className="text-lg">Your AI Scholar, Nur, is ready to assist.</p>
                        <p className="text-sm mt-2">Enter a topic below to begin.</p>
                    </div>
                )}
                
                {lastQuery && (
                    <div className="flex items-start gap-4 mb-6">
                        <UserIcon />
                        <div className="bg-teal-50 dark:bg-teal-900/50 p-4 rounded-lg rounded-tl-none flex-1">
                            <p className="font-semibold text-teal-800 dark:text-teal-200">You Asked:</p>
                            <p className="text-gray-800 dark:text-gray-200 mt-1">{lastQuery}</p>
                        </div>
                    </div>
                )}
                
                {loading && (
                    <div className="flex items-start gap-4">
                        <AIIcon />
                         <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg rounded-bl-none flex-1">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Nur is thinking...</p>
                             <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full w-full mt-3 overflow-hidden">
                                <div className="bg-teal-500 h-2 rounded-full animate-pulse w-full"></div>
                             </div>
                        </div>
                    </div>
                )}

                {response && !loading && (
                    <div className="flex items-start gap-4">
                        <AIIcon />
                        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg rounded-bl-none flex-1">
                             <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Nur Responds:</p>
                                <button onClick={() => handlePlayAudio(response)} title={isSpeaking ? "Stop" : "Read aloud"} className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                                    <SpeakerIcon isPlaying={isSpeaking} />
                                </button>
                             </div>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={renderMarkdown(response)} />
                            {sources.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Sources:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {sources.map((source, index) => (
                                            <li key={index} className="text-xs">
                                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline">
                                                    {source.web.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {error && <p className="text-center text-red-500">{error}</p>}
            </div>

            <div className="mt-auto flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-2 relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={isListening ? "Listening..." : "e.g., Is music haram? What does..."}
                        className="flex-grow bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={loading}
                    />
                    <button type="button" onClick={handleMicClick} className={`absolute inset-y-0 right-16 flex items-center p-2 rounded-full transition-colors ${isListening ? 'text-red-500' : 'text-gray-500 hover:text-teal-600'}`}>
                        <MicIcon className="h-5 w-5" isListening={isListening} />
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-teal-400 transition-colors flex justify-center items-center"
                    >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FactChecker;
