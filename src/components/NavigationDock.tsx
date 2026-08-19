import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Music,
  Camera,
  MapPin,
  Heart,
  X,
  Download,
  RefreshCw,
  Share2,
  Check,
  Send,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeCanvas } from "qrcode.react";

// 🎵 استيراد ملف الصوت m4a
import bgMusic from "@/assets/music.m4a";

interface NavigationDockProps {
  active: boolean;
}

type RSVPState =
  | { kind: "form" }
  | { kind: "choose_name"; phone: string; names: string[] }
  | { kind: "loading" }
  | { kind: "declined"; name: string }
  | { kind: "error"; msg: string }
  | { kind: "qr"; name: string; qr: string };

const NavigationDock = ({ active }: NavigationDockProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // ===== RSVP =====
  const [showRSVP, setShowRSVP] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState<
    "attending" | "declined" | ""
  >("");
  const [rsvpState, setRsvpState] = useState<RSVPState>({
    kind: "form",
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // =========================================================
  // تشغيل الموسيقى تلقائياً فور فتح الظرف
  // =========================================================
  useEffect(() => {
    if (active && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [active]);

  // =========================================================
  // استرجاع حالة RSVP المحفوظة
  // =========================================================
  useEffect(() => {
    const savedQr = localStorage.getItem("guest_qr");

    if (savedQr) {
      try {
        const data = JSON.parse(savedQr);

        if (data.name && data.qr) {
          setGuestName(data.name);

          setRsvpState({
            kind: "qr",
            name: data.name,
            qr: data.qr,
          });
        }
      } catch {
        localStorage.removeItem("guest_qr");
      }

      return;
    }

    const savedDeclined = localStorage.getItem("guest_declined");

    if (savedDeclined) {
      try {
        const data = JSON.parse(savedDeclined);

        if (data.name) {
          setGuestName(data.name);

          setRsvpState({
            kind: "declined",
            name: data.name,
          });
        }
      } catch {
        localStorage.removeItem("guest_declined");
      }
    }
  }, []);

  // =========================================================
  // تشغيل / إيقاف الموسيقى
  // =========================================================
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // =========================================================
  // فتح الكاميرا
  // =========================================================
  const openCamera = async () => {
    try {
      setShowCamera(true);
      setCapturedImage(null);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert("يرجى السماح للمتصفح بالوصول إلى الكاميرا.");
      setShowCamera(false);
    }
  };

  // =========================================================
  // إغلاق الكاميرا
  // =========================================================
  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setStream(null);
    setShowCamera(false);
    setCapturedImage(null);
  };

  // =========================================================
  // التقاط الصورة
  // =========================================================
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1920;

    const vRatio =
      video.videoWidth / video.videoHeight || 9 / 16;

    const cRatio = canvas.width / canvas.height;

    let renderWidth = canvas.width;
    let renderHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (vRatio > cRatio) {
      renderWidth = canvas.height * vRatio;
      offsetX = (canvas
