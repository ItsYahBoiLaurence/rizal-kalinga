import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase"
import { Fingerprint } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";

interface WebSocketMessage {
  type: string;
  action: string;
  data?: string
}

interface ServerResponse {
  status?: string;
  message?: string;
  result?: {
    fingerprint_b64?: string
    success?: number
  };
  base64Image?: any;
}

export default function AidDisbursement() {

  const [b64fp, setb64Fp] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null);
  const [wsMessage, setWsMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [info, setInfo] = useState<any | null >(null)

  console.log(info)
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

      if (data.message) {
        setWsMessage(data.message)
      }

      if (data.status) setStatus(data.status)

      if (data?.result?.success) {
        if (data.result.success == 0) {
          setIsAuthenticated(false)
        }
        setIsAuthenticated(true)
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
        action: action,
        data: info[0].b64fp ?? ""
      };

      wsRef.current.send(JSON.stringify(message));
      console.log('You', `Triggered: ${action}`);
    } else {
      console.log('Error', 'Not connected to server');
    }
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: ""
    }
  })

  const onsubmit: SubmitHandler<{ email: string }> = async (formData) => {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('email', formData.email)
      if (error) throw error
      setInfo(data)
      setb64Fp(data[0].b64fp)
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="grid grid-cols-2">
      <div>
        <p className="mb-5 font-semibold text-xl ">Biometric Data</p>
        <form className="w-[300px] my-5 flex flex-col gap-2" onSubmit={handleSubmit(onsubmit)}>
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            {...register("email")}
          />
          <Button type="submit">Find User</Button>
          {info && info.length ==0 &&<p className="text-red-500">Cannot find user!</p>}
        </form>

        <div className="grid grid-cols-2">
          <div className="w-1/2 flex flex-col gap-5">
            <Card className="mx- w-full">
              <CardContent>
                {status === "complete" && isAuthenticated ? <img src="/valid.svg" className="mx-auto w-full" /> : status === "complete" && !isAuthenticated ? <img src="/alert1.svg" className="mx-auto w-full" /> : <Fingerprint className="mx-auto" size={100}/>}
              </CardContent>
            </Card>
            {/* <Button onClick={() => sendTrigger('scan')}>Fingerprint Capture</Button> */}
            <Button
              type="button"
              disabled={(status === "processing" || status === "complete") || isInitialized || info == null}
              onClick={() => sendTrigger('verify')}
            >
              Verify
            </Button>
            {status === "complete" ? (
              <></>
            ) : (
              wsMessage && (
                <p
                  className={`text-center ${status === "processing"
                    ? "text-orange-400"
                    : status === "complete"
                      ? "text-green-500"
                      : ""
                    }`}
                >
                  {wsMessage}
                </p>
              )
            )}

            {status == "complete" ? <p className={`${isAuthenticated ? "text-green-500" : "text-red-500"}`}>{isAuthenticated ? "User Verified" : "Verification Failed"}</p> : ""}
          </div>
        </div>
      </div>
      <div>
        
        {info && info.length !== 0 && 
        (<div className="flex flex-col gap-2">
          <img src={info[0].img} alt="image" className="w-[300px] border rounded" />
          <p>First Name: <span className="font-bold">{info[0].firstName}</span></p>    
          <p>Middle Name: <span className="font-bold">{info[0].middleName}</span></p>
          <p>Last Name: <span className="font-bold">{info[0].lastName}</span></p>
          <p>Suffix: <span className="font-bold">{info[0].suffix == "" ? "N/A" : info[0].suffix}</span></p>
          <p>Father's First Name: <span className="font-bold">{info[0].fathersFirstName} {info[0].fathersLastName}</span></p>  
          <p>Mother's First Name: <span className="font-bold">{info[0].mothersFirstName} {info[0].mothersLastName}</span></p>      
        </div>)
        }
      </div>
    </div>

  )
}
