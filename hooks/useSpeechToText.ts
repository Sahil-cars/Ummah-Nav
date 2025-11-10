// FIX: Resolve TypeScript errors related to SpeechRecognition API.
// - Cast `window` to `any` to access non-standard `SpeechRecognition` and `webkitSpeechRecognition`.
// - Renamed `SpeechRecognition` constant to `SpeechRecognitionAPI` to avoid shadowing the type.
// - Changed `recognitionRef` type to `any` as the `SpeechRecognition` type is not available in standard libs.
import { useState, useRef, useEffect } from 'react';

interface SpeechToTextOptions {
    onTranscript: (text: string) => void;
}

const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechToText = ({ onTranscript }: SpeechToTextOptions) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<any | null>(null);

    useEffect(() => {
        if (!SpeechRecognitionAPI) {
            console.error("Speech Recognition not supported by this browser.");
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                setTranscript(prev => prev + finalTranscript);
                onTranscript(finalTranscript);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
             console.error("Speech recognition error", event.error);
             setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, [onTranscript]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
    };
};
