import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { UseFormRegister } from "react-hook-form";

interface Message {
    sender: string;
    text: string;
    time: string;
}

interface WebSocketMessage {
    type: string;
    action: string;
}

interface ServerResponse {
    status?: string;
    message?: string;
    result?: any;
    base64Image?: any;
}

export default function FingerPrintScanner() {

    const wsRef = useRef<WebSocket | null>(null);
    const [fingerprint, setFingerprintImage] = useState<string | null>(null);

    useEffect(() => {
        // Connect to WebSocket
        connectWebSocket();

        // Cleanup on unmount
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const connectWebSocket = (): void => {
        const ws = new WebSocket('ws://localhost:8000/ws');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event: MessageEvent) => {
            const data: ServerResponse = JSON.parse(event.data);
            console.log('Received:', data);

            if (data.result?.base64Image) {
                const imageDataUrl = `data:image/png;base64,${data.result.base64Image}`;
                setFingerprintImage(imageDataUrl);
                console.log(imageDataUrl)
            }

        };

        ws.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        wsRef.current = ws;
    };

    const sendTrigger = (action: string): void => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const message: WebSocketMessage = {
                type: 'trigger',
                action: action
            };

            wsRef.current.send(JSON.stringify(message));
            console.log('You', `Triggered: ${action}`);
        } else {
            console.log('Error', 'Not connected to server');
        }
    };

    return (
        <div>
            <p className="mb-5 font-semibold text-xl ">Biometric Data</p>
            <div className="grid grid-cols-2">
                <div className="w-1/2 flex flex-col gap-5">
                    <Card className="mx-auto">
                        <CardContent>
                            {!fingerprint && <Fingerprint size={90} className="mx-auto" />}
                            {fingerprint && <img src={fingerprint} alt="fingerprint" className="w-full h-full object-cover" />}
                        </CardContent>
                    </Card>
                    <Button onClick={() => sendTrigger('scan')}>Fingerprint Capture</Button>
                </div>
                <div className=" flex flex-col gap-5 place-self-start">
                    <p>Verification Status:</p>
                    <p>Verified by:</p>
                    <p>Date Verified: {new Date().toDateString()}</p>
                </div>
            </div>
        </div>

    )
}