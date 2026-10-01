import { useState, useEffect } from "react";
import { Heart, Calendar } from "lucide-react";
import invitationImg from "@/assets/photo-output.jpeg";
import sosImg from "@/assets/Anx.jpeg";

import footerBgImg from "@/assets/An.jpeg";
import cardImg from "@/assets/IMG_8206.png";

import Envelope from "@/components/Envelope";
import SprayParticles from "@/components/SprayParticles";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import EventTimeline from "@/components/EventTimeline";
import EventDetails from "@/components/EventDetails";
import NavigationDock from "@/components/NavigationDock";

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

   // =========================================================
  // التمرير التلقائي - يتوقف عند سحب المستخدم
  // =========================================================
  useEffect(() => {
    if (opened) {
      let animationFrameId: number;
      let timerId: NodeJS.Timeout;
      let userInteracted = false;
      const stopAutoScroll = () => {
        userInteracted = true;
        clearTimeout(timerId);
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("touchstart", stopAutoScroll);
        window.removeEventListener("wheel", stopAutoScroll);
        window.removeEventListener("pointerdown", stopAutoScroll);
      };
      window.addEventListener("touchstart", stopAutoScroll, { passive: true });
      window.addEventListener("wheel", stopAutoScroll, { passive: true });
      window.addEventListener("pointerdown", stopAutoScroll, { passive: true });
      timerId = setTimeout(() => {
        if (userInteracted) return;
        const startPosition = window.pageYOffset;
        const targetPosition =
          document.documentElement.scrollHeight - window.innerHeight;
        const distance = targetPosition - startPosition;
        const duration = 40000; // 40 ثانية
        const startTime = Date.now();
        const animation = () => {
          if (userInteracted) return;
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const run = startPosition + distance * progress;
          window.scrollTo({
            top: run,
            behavior: "instant",
          });
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animation);
          }
        };
        animationFrameId = requestAnimationFrame(animation);
      }, 3000);
      return () => {
        clearTimeout(timerId);
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("touchstart", stopAutoScroll);
        window.removeEventListener("wheel", stopAutoScroll);
        window.removeEventListener("pointerdown", stopAutoScroll);
      };
    }
  }, [opened]);

  return (
    <div
      className={`relative min-h-screen text-white ${
        !opened ? "overflow-hidden h-screen" : "overflow-x-hidden"
      }`}
      style={{ backgroundColor: "#E9DDD4" }}
    >
      <SprayParticles />

      {/* الشريط السفلي للتنقل والموسيقى */}
      <NavigationDock active={opened} playMusic={playMusic} />

      {/* الظرف */}
      <Envelope
        onOpen={() => {
          setOpened(true);
          setPlayMusic(true);
        }}
      />

      {/* محتوى الموقع */}
      <main className="relative z-10 w-full pb-24">
        {/* الصورة الأولى */}
        <section className="w-full">
          <img
            src={invitationImg}
            alt="صورة الدعوة الأولى"
            className="w-full h-auto block"
          />
        </section>

        {/* المربع الأول بالنصوص */}
        <section className="relative w-full flex flex-col items-center justify-start pb-12">
          <img
            src={sosImg}
            alt="الصورة الثانية"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="relative z-10 w-full flex flex-col items-center pt-20 sm:pt-32 px-4 space-y-6">
            <div
              className="w-[92%] max-w-md p-5 sm:p-7 rounded-3xl text-center backdrop-blur-md border border-white/50 shadow-2xl space-y-2.5"
              style={{
                background: "rgba(255, 255, 255, 0.18)",
                color: "#433D20",
              }}
            >
              {/* الرقم 2 */}
              <div className="flex items-center justify-center my-4">
                <span
                  className="inline-block text-6xl sm:text-7xl font-normal leading-none select-none"
                  style={{
                    fontFamily: "'Monasabat', sans-serif",
                    color: "#433D20",
                    transform: "scale(3.4)",
                    transformOrigin: "center",
                    textRendering: "geometricPrecision",
                  }}
                >
                  2
                </span>
              </div>

              {/* أسطر الترحيب */}
              <p
                className="font-arabic text-base sm:text-lg opacity-90"
                style={{ color: "#433D20" }}
              >
                في ليلةٍ تجمع الاحبة .. وتبدأ فيها أجمل حكاية
              </p>

              <p
                className="font-arabic text-base sm:text-lg opacity-90"
                style={{ color: "#433D20" }}
              >
                بكل الفرح والمحبة
              </p>

              <p
                className="font-arabic text-base sm:text-lg opacity-90 pb-2"
                style={{ color: "#433D20" }}
              >
                تتــشرف عائلتــا
              </p>

              {/* أسماء العائلتين */}
<div className="flex items-center justify-center gap-6 py-3">
  <span
    className="text-xl sm:text-2xl font-bold"
    style={{
      fontFamily: "'Almarai', sans-serif",
      color: "#433D20",
    }}
  >
    آل العايش
  </span>

  <span
    className="font-arabic text-xl sm:text-2xl font-bold"
    style={{ color: "#433D20" }}
  >
    &
  </span>

  <span
    className="text-xl sm:text-2xl font-bold"
    style={{
      fontFamily: "'Almarai', sans-serif",
      color: "#433D20",
    }}
  >
    آل الدقر
  </span>
</div>
              {/* سطر الدعوة */}
              <p
                className="font-arabic text-base sm:text-lg opacity-90 pt-2 pb-2"
                style={{ color: "#433D20" }}
              >
                بدعوتكم لمشاركتهم فرحة زفاف نجليهما
              </p>

              {/* أسماء العروسين */}
              <div className="pt-10 pb-4">
                <div
                  className="text-4xl sm:text-5xl flex items-start justify-center gap-3 font-semibold"
                  style={{
                    fontFamily: "'IranNastaliq', sans-serif",
                    color: "#433D20",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <span>أنســور</span>

                    <span
                      className="font-arabic text-sm opacity-85 mt-1"
                      style={{ color: "#433D20" }}
                    >
                      حازم العايش
                    </span>

                    <span
                      className="font-arabic text-xs opacity-85 mt-1 tracking-widest"
                      style={{ color: "#433D20" }}
                    >
                      ANWAR
                    </span>
                  </div>

                  <span
                    className="font-arabic text-2xl mx-1 mt-9"
                    style={{ color: "#433D20" }}
                  >
                    &
                  </span>

                  <div className="flex flex-col items-center">
                    <span>ياسميـن</span>

                    <span
                      className="font-arabic text-sm opacity-85 mt-1"
                      style={{ color: "#433D20" }}
                    >
                      خالد الدقر
                    </span>

                    <span
                      className="font-arabic text-xs opacity-85 mt-1 tracking-widest"
                      style={{ color: "#433D20" }}
                    >
                      YASMINE
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* قسم الموقع */}
            <div id="location" className="text-center space-y-0.5 py-1">
              <h3
                className="font-arabic text-lg sm:text-xl font-bold"
                style={{ color: "#433D20" }}
              >
                الموقع
              </h3>

              <p
                className="font-arabic text-base sm:text-lg font-semibold"
                style={{ color: "#433D20" }}
              >
                قاعات ليالي الشرق
              </p>

              <p
                className="font-arabic text-sm sm:text-base font-medium opacity-90"
                style={{ color: "#433D20" }}
              >
                القاعة الألماسية
              </p>
            </div>

            {/* التقويم */}
            <div className="flex flex-col items-center space-y-3">
              <div
                className="w-60 sm:w-68 rounded-3xl overflow-hidden backdrop-blur-md border border-white/50 shadow-2xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.18)",
                  color: "#433D20",
                }}
              >
                <div
                  className="relative px-4 py-2 flex justify-between items-center font-arabic text-xs sm:text-sm font-bold"
                  style={{
                    background: "rgba(67, 61, 32, 0.85)",
                    color: "#FFFFFF",
                  }}
                >
                  <span>الاثنين</span>
                  <span className="text-sm font-extrabold">نوفمبر</span>
                  <span className="font-display">2026</span>
                </div>

                <div className="py-4 px-4 space-y-0.5">
                  <div
                    className="font-display text-4xl font-extrabold tracking-tight"
                    style={{ color: "#433D20" }}
                  >
                    16
                  </div>

                  <div
                    className="font-arabic text-sm font-bold"
                    style={{ color: "#433D20" }}
                  >
                        
                  </div>

                  <div
                    className="font-arabic text-xs font-semibold opacity-80"
                    style={{ color: "#433D20" }}
                  >
                     
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  window.location.href = "/wedding.ics";
                }}
                className="flex items-center justify-center gap-2 px-5 py-2 rounded-full backdrop-blur-md border border-white/50 shadow-md transition-transform active:scale-95 hover:scale-105 cursor-pointer"
                style={{
                  background: "rgba(255, 255, 255, 0.18)",
                  color: "#433D20",
                }}
              >
                <Calendar
                  className="w-4 h-4"
                  style={{ color: "#433D20" }}
                />
                <span className="font-arabic text-xs sm:text-sm font-bold">
                  احفظ الموعد
                </span>
              </button>
            </div>

            {/* العد التنازلي */}
            <div className="w-full max-w-md text-center space-y-2 pt-1">
              <h3
                className="font-arabic text-base sm:text-lg font-bold"
                style={{ color: "#433D20" }}
              >
                العدّ التنازلي
              </h3>
              <Countdown />
            </div>

            <EventTimeline />
            <EventDetails />
          </div>
        </section>

        {/* القسم السفلي والذيل */}
        <section
          id="gallery"
          className="relative w-full flex flex-col items-center justify-start"
        >
          <div className="relative w-full flex items-center justify-center">
            <img
              src={footerBgImg}
              alt="صورة خلفية الفوتر"
              className="w-full h-auto block"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-6 overflow-y-auto">
              {/* ننتظركم بكل حب */}
              <p
                className="text-6xl sm:text-7xl font-bold text-center mb-3"
                style={{
                  fontFamily: "'Sull', sans-serif",
                  color: "#433D20",
                }}
              >
                ننتظركم بكل حُب
              </p>

              {/* الصورة الصغيرة */}
              <div className="w-[92%] max-w-md rounded-3xl overflow-hidden backdrop-blur-md border border-white/40 shadow-xl mb-6">
                <img
                  src={cardImg}
                  alt="بطاقة تذكارية"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* الاسم */}
              <Reveal>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className="text-2xl sm:text-3xl"
                    style={{
                      fontFamily: "'IranNastaliq', sans-serif",
                      color: "#433D20",
                    }}
                  >
                    أنســور{" "}
                    <span style={{ fontFamily: "font-arabic" }}>&</span>{" "}
                    ياسميـن
                  </span>
                </div>
              </Reveal>

              {/* غيمة */}
              <Reveal delay={200}>
                <div
                  className="flex items-center justify-center gap-2 pt-0.5"
                  style={{
                    transform: "translateY(100px)",
                    color: "#433D20",
                  }}
                >
                  <Heart className="w-4 h-4 fill-current text-[#433D20]" />
                  <span className="font-arabic text-xs sm:text-sm font-semibold">
                    <a
                      href="https://www.tiktok.com/@shim2t?_r=1&_t=ZS-95w0d8f7vnk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 font-bold hover:opacity-80 transition-opacity"
                      style={{ color: "#433D20" }}
                    >
                      غيمة
                    </a>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
