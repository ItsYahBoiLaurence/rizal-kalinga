import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { TFields } from "..";

interface WebSocketMessage {
    type: string;
    action: string;
}

interface ServerResponse {
    status?: string;
    message?: string;
    result?: {
        fingerprint_b64?: string
    };
    base64Image?: any;
}

export default function FingerPrintScanner({setValue}:{setValue:UseFormSetValue<TFields>}) {

    const wsRef = useRef<WebSocket | null>(null);
    const [wsMessage, setWsMessage] = useState<string |null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
    
        connectWebSocket();

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

            setIsInitialized(true)

            if(data.message){
                setWsMessage(data.message)
            }

            if(data.status) setStatus(data.status)        

            if(data?.result?.fingerprint_b64){
                setValue('b64fp',data.result.fingerprint_b64)
            }

            // if (data.result?.base64Image) {
            //     const imageDataUrl = `data:image/png;base64,${data.result.base64Image}`;
            //     setFingerprintImage(imageDataUrl);
            //     console.log(imageDataUrl)
            // }

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
                            {status==="complete" ? <img src="/valid.svg" className="mx-auto w-70"/> : <Fingerprint  className="mx-auto" size={80} />}
                        </CardContent>
                    </Card>
                    {/* <Button onClick={() => sendTrigger('scan')}>Fingerprint Capture</Button> */}
                    <Button type="button" disabled={(status==="processing" || status === "complete") || isInitialized} onClick={() => sendTrigger('register')}>Register</Button>
                    {wsMessage && <p className={`text-center ${status === "processing" ? "text-orange-400" : status === "complete" ? "text-green-500" : ""}`}>{wsMessage}</p>}
                    <p>Date Verified: {new Date().toDateString()}</p>
                </div>
                <div className=" flex flex-col gap-5 place-self-start">
                    {/* <p>Verification Status:</p>
                    <p>Verified by:</p> */}
                </div>
            </div>
        </div>

    )
}