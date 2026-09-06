declare module '@/components/ui/Beams' {
  interface BeamsProps {
    beamWidth?: number;
    beamHeight?: number;
    beamNumber?: number;
    lightColor?: string;
    beamColor?: string;
    backgroundColor?: string;
    speed?: number;
    noiseIntensity?: number;
    scale?: number;
    rotation?: number;
    lightMode?: boolean;
    onReady?: () => void;
  }
  const Beams: React.FC<BeamsProps>;
  export default Beams;
}
