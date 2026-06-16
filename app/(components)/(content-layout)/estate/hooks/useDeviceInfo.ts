// types.ts
export interface DeviceInfo {
  device: string;
  ipAddress: string;
  lastUpdated: string;
}

// useDeviceInfo.ts
import { useState, useEffect } from "react";

const STORAGE_KEY = "user_device_info";

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const detectDevice = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (
      /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      )
    ) {
      if (/tablet|ipad/i.test(userAgent)) {
        return "Tablet";
      }
      return "Mobile Phone";
    }

    if (/macintosh|windows|linux/i.test(userAgent)) {
      if (/macbook|laptop/i.test(userAgent)) {
        return "Laptop";
      }
      return "Desktop";
    }

    return "Unknown Device";
  };

  const getIPAddress = async (): Promise<string> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      throw new Error("Failed to fetch IP address");
    }
  };

  const getDeviceInfo = async (): Promise<DeviceInfo> => {
    const device = detectDevice();
    const ipAddress = await getIPAddress();

    const newDeviceInfo: DeviceInfo = {
      device,
      ipAddress,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDeviceInfo));
    setDeviceInfo(newDeviceInfo);
    setLoading(false);

    return newDeviceInfo;
  };

  const clearDeviceInfo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDeviceInfo(null);
  };

  // Initialize on mount - but don't automatically fetch
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDeviceInfo(JSON.parse(stored));
      } catch {
        setDeviceInfo(null);
      }
    }
    setLoading(false);
  }, []);

  return {
    deviceInfo,
    loading,
    error,
    getDeviceInfo,
    clearDeviceInfo,
  };
};
