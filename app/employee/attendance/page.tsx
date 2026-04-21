'use client';

import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import {
  FaClock,
  FaMapMarkerAlt,
  FaCamera,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaPhone,
  FaMapPin,
} from 'react-icons/fa';

interface AttendanceRecord {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  checkInLocation: { lat: number; lng: number } | null;
  checkOutLocation: { lat: number; lng: number } | null;
  checkInImage: string | null;
  checkOutImage: string | null;
  status: 'checked-in' | 'checked-out' | 'pending';
  workingHours: string;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      checkInTime: '09:00 AM',
      checkOutTime: '05:30 PM',
      checkInLocation: { lat: 37.7749, lng: -122.4194 },
      checkOutLocation: { lat: 37.7749, lng: -122.4194 },
      checkInImage: 'https://via.placeholder.com/100?text=In',
      checkOutImage: 'https://via.placeholder.com/100?text=Out',
      status: 'checked-out',
      workingHours: '8h 30m',
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      checkInTime: '08:45 AM',
      checkOutTime: '05:15 PM',
      checkInLocation: { lat: 37.7749, lng: -122.4194 },
      checkOutLocation: { lat: 37.7749, lng: -122.4194 },
      checkInImage: 'https://via.placeholder.com/100?text=In',
      checkOutImage: 'https://via.placeholder.com/100?text=Out',
      status: 'checked-out',
      workingHours: '8h 30m',
    },
  ]);

  useEffect(() => {
    if (user?.role !== 'employee') {
      router.push('/login');
    }
  }, [user, router]);

  const getLocation = () => {
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError(
            error.message || 'Unable to get location. Please enable location services.'
          );
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      setLocationError('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && cameraRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(cameraRef.current, 0, 0, 320, 240);
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (cameraRef.current && cameraRef.current.srcObject) {
      const tracks = (cameraRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setShowCamera(false);
    }
  };

  const handleCheckIn = async () => {
    if (!currentLocation) {
      setLocationError('Please enable location services first.');
      return;
    }

    if (!capturedImage) {
      setLocationError('Please capture a photo.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send data to admin
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const now = new Date();
      setCheckInTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
      setIsCheckedIn(true);
      setSuccessMessage('Check-in successful! Image and location sent to admin.');

      const newRecord: AttendanceRecord = {
        id: String(Date.now()),
        date: new Date().toISOString().split('T')[0],
        checkInTime: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        checkOutTime: null,
        checkInLocation: currentLocation,
        checkOutLocation: null,
        checkInImage: capturedImage,
        checkOutImage: null,
        status: 'checked-in',
        workingHours: '0h 0m',
      };

      setAttendanceRecords((prev) => [newRecord, ...prev]);
      setCapturedImage(null);
      setShowCamera(false);

      setTimeout(() => setSuccessMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!currentLocation) {
      setLocationError('Please enable location services first.');
      return;
    }

    if (!capturedImage) {
      setLocationError('Please capture a photo.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send data to admin
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const now = new Date();
      const checkOutTimeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      setAttendanceRecords((prev) => {
        const updated = [...prev];
        if (updated[0]) {
          updated[0].checkOutTime = checkOutTimeStr;
          updated[0].checkOutLocation = currentLocation;
          updated[0].checkOutImage = capturedImage;
          updated[0].status = 'checked-out';
        }
        return updated;
      });

      setIsCheckedIn(false);
      setCapturedImage(null);
      setShowCamera(false);
      setSuccessMessage('Check-out successful! Image and location sent to admin.');

      setTimeout(() => setSuccessMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="employee" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
                <FaClock className="text-primary" />
                Attendance Check-In/Out
              </h1>
              <p className="mt-2 text-gray-600">
                Mark your daily attendance with location and photo verification
              </p>
            </div>

            {/* Check-In/Out Card */}
            <div className="mb-8 grid gap-8 lg:grid-cols-2">
              <Card className="border border-border p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <FaCamera className="text-primary" />
                  {isCheckedIn ? 'Check Out' : 'Check In'}
                </h2>

                {/* Camera Section */}
                <div className="mb-6 rounded-lg border border-border bg-muted p-4">
                  {showCamera ? (
                    <div className="space-y-4">
                      <video
                        ref={cameraRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg border border-border"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={capturePhoto}
                          className="flex-1 bg-accent hover:bg-accent-light text-white"
                        >
                          Capture Photo
                        </Button>
                        <Button
                          onClick={stopCamera}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : capturedImage ? (
                    <div className="space-y-4">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full rounded-lg border border-border"
                      />
                      <Button
                        onClick={() => setCapturedImage(null)}
                        variant="outline"
                        className="w-full"
                      >
                        Retake Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 py-8 text-center">
                      <div className="text-4xl text-gray-400">
                        <FaCamera className="mx-auto" />
                      </div>
                      <p className="text-gray-600">No photo captured yet</p>
                      <Button
                        onClick={startCamera}
                        className="w-full bg-primary hover:bg-primary-dark text-white"
                      >
                        Open Camera
                      </Button>
                    </div>
                  )}
                </div>

                {/* Location Section */}
                <div className="mb-6 rounded-lg border border-border bg-muted p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <FaMapMarkerAlt className="text-primary" />
                      Location
                    </h3>
                  </div>

                  {currentLocation ? (
                    <div className="space-y-2 rounded-lg bg-background p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Latitude:</strong> {currentLocation.lat.toFixed(4)}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Longitude:</strong> {currentLocation.lng.toFixed(4)}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                      >
                        View on Map
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Location not yet captured</p>
                  )}

                  <Button
                    onClick={getLocation}
                    className="mt-4 w-full bg-primary hover:bg-primary-dark text-white"
                  >
                    Get Current Location
                  </Button>
                </div>

                {/* Error Message */}
                {locationError && (
                  <div className="mb-4 rounded-lg border border-destructive bg-red-50 p-3 text-sm text-destructive">
                    {locationError}
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="mb-4 rounded-lg border border-accent bg-green-50 p-3 text-sm text-accent">
                    ✓ {successMessage}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                  disabled={isLoading || !currentLocation || !capturedImage}
                  className={`w-full text-white ${
                    isCheckedIn
                      ? 'bg-destructive hover:bg-red-700'
                      : 'bg-accent hover:bg-accent-light'
                  } disabled:opacity-50`}
                >
                  {isLoading ? (
                    <span>Processing...</span>
                  ) : isCheckedIn ? (
                    <span className="flex items-center gap-2">
                      <FaTimesCircle /> Check Out
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FaCheckCircle /> Check In
                    </span>
                  )}
                </Button>

                {checkInTime && !isCheckedIn && (
                  <div className="mt-4 rounded-lg border border-accent bg-green-50 p-3 text-sm text-accent">
                    <strong>✓ Checked in at {checkInTime}</strong>
                  </div>
                )}
              </Card>

              {/* User Info Card */}
              <Card className="border border-border p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <FaUser className="text-primary" />
                  Employee Information
                </h2>

                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Employee Name</p>
                    <p className="text-lg font-semibold text-foreground">
                      {user?.name || 'John Doe'}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Employee ID</p>
                    <p className="text-lg font-semibold text-foreground">EMP-2024-001</p>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-lg font-semibold text-foreground">
                      Software Engineering
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Contact</p>
                    <div className="flex items-center gap-2 text-foreground">
                      <FaPhone className="text-primary" />
                      +1 (555) 123-4567
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Current Status</p>
                    <p className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      {isCheckedIn ? (
                        <>
                          <FaCheckCircle className="text-accent" /> Checked In
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-destructive" /> Checked Out
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Attendance History */}
            <Card className="border border-border p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                <FaMapPin className="text-primary" />
                Attendance History
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Check In
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Check Out
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Working Hours
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Photos
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-border hover:bg-muted"
                      >
                        <td className="px-4 py-3 text-foreground">{record.date}</td>
                        <td className="px-4 py-3">
                          <div className="text-foreground">{record.checkInTime}</div>
                          {record.checkInLocation && (
                            <a
                              href={`https://maps.google.com/?q=${record.checkInLocation.lat},${record.checkInLocation.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:text-primary-dark"
                            >
                              View Location
                            </a>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {record.checkOutTime ? (
                            <div className="text-foreground">{record.checkOutTime}</div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">
                          {record.workingHours}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {record.checkInImage && (
                              <img
                                src={record.checkInImage}
                                alt="Check In"
                                className="h-10 w-10 rounded border border-border"
                                title="Check In Photo"
                              />
                            )}
                            {record.checkOutImage && (
                              <img
                                src={record.checkOutImage}
                                alt="Check Out"
                                className="h-10 w-10 rounded border border-border"
                                title="Check Out Photo"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                              record.status === 'checked-out'
                                ? 'bg-accent text-white'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {record.status === 'checked-out' ? (
                              <FaCheckCircle />
                            ) : (
                              <FaClock />
                            )}
                            {record.status === 'checked-out'
                              ? 'Completed'
                              : 'In Progress'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{ display: 'none' }}
      />
    </div>
  );
}
