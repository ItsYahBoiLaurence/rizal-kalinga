import { Button } from '@/components/ui/button';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { TFields } from '..';

// Define the component
export default function ImageCaptureComponent ({setValue}:{setValue:UseFormSetValue<TFields>}){
    // 1. Refs for DOM elements
    // HTMLVideoElement for the camera feed
    const videoRef = useRef<HTMLVideoElement>(null);
    // HTMLCanvasElement for image processing
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 2. State for application data
    // MediaStream for the camera
    const [stream, setStream] = useState<MediaStream | null>(null);
    // string (Data URL) for the captured image
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const [isCapturing, setIsCapturing] = useState(false)

    // --- Stream Management Functions ---

    // Function to stop the stream and release camera resources
    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            // Ensure the video element releases the object
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    }, [stream]);

    // Function to start the camera stream
    const startCamera = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Your browser does not support camera access.");
            return;
        }

        try {
            // Constraints object is typed implicitly as MediaStreamConstraints
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setCapturedImage(null);
            setIsCapturing(true) // Clear any previously captured image
        } catch (error) {
            console.error("Error accessing the camera: ", error);
            alert("Permission denied or no camera found.");
            setStream(null);
        }
    };

    // --- Image Capture Function ---

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            // 1. Set canvas dimensions to match the video feed
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // 2. Get the 2D rendering context
            // Type assertion is necessary here to ensure context is CanvasRenderingContext2D
            const context = canvas.getContext('2d') as CanvasRenderingContext2D | null;

            if (context) {
                // 3. Draw the current video frame onto the canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // 4. Convert the canvas image to a Data URL (base64 string)
                const imageDataURL = canvas.toDataURL('image/png');

                // 5. Store the Data URL in state
                setCapturedImage(imageDataURL);
                setIsCapturing(false)
                setValue("img",imageDataURL)
                stopCamera()
            } else {
                console.error("Could not get 2D rendering context.");
            }
        }
    };

    // --- Lifecycle Hook for Cleanup ---

    // Use the cleanup function to stop the camera when the component unmounts
    useEffect(() => {
        return () => {
            // Note: We use the dependency-less stopCamera here for correct cleanup on unmount
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []); // Run only on mount and unmount

    // --- Rendered Output ---

    console.log(capturedImage)

    return (
        <div className=' flex flex-col gap-2 justify-center items-center'>
            <div className='w-full max-w-md mx-auto'>
                {/* Hidden Canvas (for processing) */}
                <canvas ref={canvasRef} style={{ display: 'none' }} />

                {/* Video element - always present but conditionally shown */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={`w-full h-full border rounded-lg ${isCapturing && stream ? 'block' : 'hidden'}`}
                />

                {/* Show captured image when done capturing */}
                {capturedImage && !isCapturing && (
                    <div className='py-10 border rounded-lg'>
                        <img
                            src={capturedImage}
                            alt="Captured Photo"
                            className='w-full h-full'
                        />
                    </div>
                )}

                {/* Show ready message when no image captured and not capturing */}
                {!capturedImage && !isCapturing && (
                    <div className='flex justify-center items-center w-full h-[300px] border rounded-lg'>
                        Ready to Capture!
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className='flex flex-row gap-2'>
                {!isCapturing && <Button
                    type='button'
                    onClick={startCamera}
                    disabled={!!stream}
                >
                    Start Capture
                </Button>}
                {isCapturing && (
                    <>
                        <Button
                            type='button'
                            onClick={captureImage}
                            disabled={!stream}
                        >
                            Capture Image
                        </Button >
                        <Button
                            type='button'
                            onClick={stopCamera}
                            disabled={!stream}
                        >
                            Stop Camera
                        </Button>
                    </>
                )

                }

            </div>

        </div>
    );
};