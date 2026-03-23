import { useState, useEffect } from 'react';
import { BMSData, HistoryPoint, AlertSeverity, BMSAlert } from '../types';

const generateMockData = (prevData: BMSData | null): BMSData => {
  const now = Date.now();
  
  // Simulate data fluctuation with more volatility for visibility
  let voltage = prevData ? prevData.voltage + (Math.random() - 0.5) * 1.5 : 400;
  let current = prevData ? prevData.current + (Math.random() - 0.5) * 4 : 15;
  let temp = prevData ? prevData.packTemp + (Math.random() - 0.5) * 0.8 : 35;
  let ambientTemp = prevData ? prevData.ambientTemp + (Math.random() - 0.5) * 0.4 : 24;
  
  // Boundaries
  voltage = Math.max(350, Math.min(450, voltage));
  temp = Math.max(20, Math.min(80, temp));
  ambientTemp = Math.max(10, Math.min(45, ambientTemp));

  // Performance simulation
  const velocity = prevData ? Math.max(0, Math.min(180, prevData.velocity + (Math.random() - 0.45) * 8)) : 65;
  const throttle = Math.max(0, Math.min(100, (velocity / 180) * 100 + (Math.random() - 0.5) * 15));
  const elevation = prevData ? prevData.elevation + (Math.random() - 0.5) * 5 : 450;
  const motorTorque = Math.max(0, Math.min(500, (throttle * 5) + (Math.random() - 0.5) * 30));
  const longitudinalAccel = (Math.random() - 0.3) * 6;

  const airconPower = 450 + (Math.random() * 150);
  const heatExchangerTemp = 28 + (Math.random() * 8);
  const coolantHeatercoreTemp = 55 + (Math.random() * 10);
  const coolantInletTemp = 32 + (Math.random() * 8);

  const swellRandom = Math.random();
  const leakRandom = Math.random();
  
  const isCharging = velocity === 0;
  // Increase SOC drop/gain rate for demo visibility
  const socStep = isCharging ? 0.2 : -0.15;
  const soc = prevData ? Math.max(0, Math.min(100, prevData.soc + socStep)) : 78;
  const remainingRangeKm = soc * 3.5;

  // SoH degrades slowly over time; high temp accelerates degradation
  const tempDegradation = temp > 45 ? 0.008 : 0.003;
  const soh = prevData ? Math.max(60, prevData.soh - tempDegradation + (Math.random() - 0.5) * 0.002) : 92.5;
  // RUL derived from SoH — end-of-life at 60% SoH
  const maxCycles = 2000;
  const rulCycles = Math.max(0, Math.round(((soh - 60) / 40) * maxCycles));
  const rulDays = Math.max(0, Math.round(rulCycles * 0.68));

  return {
    soc: parseFloat(soc.toFixed(1)),
    soh: parseFloat(soh.toFixed(1)),
    voltage: parseFloat(voltage.toFixed(1)),
    current: parseFloat(current.toFixed(1)),
    power: parseFloat((voltage * current).toFixed(0)),

    velocity: parseFloat(velocity.toFixed(1)),
    throttle: parseFloat(throttle.toFixed(0)),
    elevation: parseFloat(elevation.toFixed(0)),
    motorTorque: parseFloat(motorTorque.toFixed(1)),
    longitudinalAccel: parseFloat(longitudinalAccel.toFixed(2)),

    rulCycles,
    rulDays,
    remainingRangeKm: parseFloat(remainingRangeKm.toFixed(1)),
    remainingTimeMinutes: parseFloat((velocity > 0 ? (remainingRangeKm / velocity) * 60 : 0).toFixed(0)),
    
    packTemp: parseFloat(temp.toFixed(1)),
    ambientTemp: parseFloat(ambientTemp.toFixed(1)),
    humidity: 45 + (Math.random() * 5),
    pressure: 1013 + (Math.random() * 10),

    airconPower: parseFloat(airconPower.toFixed(1)),
    heatExchangerTemp: parseFloat(heatExchangerTemp.toFixed(1)),
    coolantHeatercoreTemp: parseFloat(coolantHeatercoreTemp.toFixed(1)),
    coolantInletTemp: parseFloat(coolantInletTemp.toFixed(1)),
    
    fanStatus: temp > 40,
    relayStatus: voltage > 440 || temp > 70 ? 'DISCONNECTED' : 'CONNECTED',
    isCharging: isCharging,
    
    capacityFadeDetected: Math.random() > 0.98,
    thermalRunawayRisk: temp > 60, // lowered for more frequent occurrence
    voltageAnomaly: voltage > 445 || Math.random() > 0.98,
    currentAnomaly: current > 50 || (Math.random() > 0.98 && !isCharging), // Current spike detection
    batterySwellDetected: swellRandom > 0.995,
    waterLeakageDetected: leakRandom > 0.995,
    
    timestamp: now
  };
};

export const useBMSData = () => {
  const [data, setData] = useState<BMSData | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [alerts, setAlerts] = useState<BMSAlert[]>([]);

  useEffect(() => {
    const initialData = generateMockData(null);
    setData(initialData);

    const interval = setInterval(() => {
      setData((prev) => {
        const newData = generateMockData(prev);
        
        setHistory((prevHistory) => {
          const newPoint: HistoryPoint = {
            time: new Date(newData.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
            voltage: newData.voltage,
            temp: newData.packTemp,
            ambientTemp: newData.ambientTemp,
            current: newData.current,
            soc: newData.soc,
            range: newData.remainingRangeKm
          };
          const updated = [...prevHistory, newPoint];
          if (updated.length > 20) updated.shift();
          return updated;
        });

        const newAlerts: BMSAlert[] = [];
        const timestamp = Date.now();

        if (newData.waterLeakageDetected) {
          newAlerts.push({ id: `leak-${timestamp}`, code: 'HUM-01', message: 'Humidity detected in Battery compartment!', severity: AlertSeverity.CRITICAL, timestamp });
        }
        if (newData.batterySwellDetected) {
          newAlerts.push({ id: `swell-${timestamp}`, code: 'PRS-01', message: 'Battery Pack Swelling Detected!', severity: AlertSeverity.CRITICAL, timestamp });
        }
        if (newData.voltageAnomaly) {
          newAlerts.push({ id: `volt-${timestamp}`, code: 'VOL-01', message: 'Abnormal Voltage Spikes!', severity: AlertSeverity.CRITICAL, timestamp });
        }
        if (newData.currentAnomaly) {
          newAlerts.push({ id: `curr-${timestamp}`, code: 'CUR-01', message: 'Abnormal Current Spikes!', severity: AlertSeverity.CRITICAL, timestamp });
        }
        if (newData.thermalRunawayRisk) {
          newAlerts.push({ id: `therm-${timestamp}`, code: 'THM-01', message: 'High Pack Temperature!', severity: AlertSeverity.CRITICAL, timestamp }); // Changed logic based on request
        }
        
        // Attention Required alerts
        if (newData.capacityFadeDetected) {
          newAlerts.push({ id: `cap-${timestamp}`, code: 'CAP-01', message: 'Abnormal Capacity Fade', severity: AlertSeverity.ATTENTION_REQUIRED, timestamp });
        }
        if (newData.soc < 20) {
          newAlerts.push({ id: `soc-${timestamp}`, code: 'SOC-01', message: 'Low Battery Charge', severity: AlertSeverity.ATTENTION_REQUIRED, timestamp });
        }
        if (prev && (prev.soc - newData.soc) > 0.5) {
          newAlerts.push({ id: `socdrop-${timestamp}`, code: 'SOC-02', message: `Rapid SoC Drop Detected! (${prev.soc.toFixed(1)}% → ${newData.soc.toFixed(1)}%)`, severity: AlertSeverity.CRITICAL, timestamp });
        }
        
        if (newAlerts.length > 0) {
            setAlerts(prev => [...newAlerts, ...prev].slice(0, 200));
        }

        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { data, history, alerts };
};