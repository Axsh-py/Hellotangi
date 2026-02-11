import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function BrandAnimation() {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const scenes = [0, 1, 2, 3, 4, 5];
    let sceneIndex = 0;

    const interval = setInterval(() => {
      sceneIndex = (sceneIndex + 1) % scenes.length;
      setCurrentScene(scenes[sceneIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="size-full bg-black flex items-center justify-center overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* Scene 0: hey there */}
        {currentScene === 0 && (
          <motion.div
            key="scene0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-white text-[160px] font-black tracking-tighter">
              hey there
            </div>
          </motion.div>
        )}

        {/* Scene 1: Hello tangi - creative split */}
        {currentScene === 1 && (
          <motion.div
            key="scene1"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center gap-20">
              <motion.div
                initial={{ x: -200, opacity: 0, rotate: -90 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="text-[#ff6b35] text-[180px] font-black tracking-tighter uppercase"
                style={{ fontStyle: 'italic' }}
              >
                Hello
              </motion.div>
              <motion.div
                initial={{ y: 200, opacity: 0, rotate: 90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -200, opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="text-white text-[180px] font-black tracking-tighter border-8 border-[#ff6b35] px-8"
              >
                tangi
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Scene 2: WE CREATE MAGIC - staggered */}
        {currentScene === 2 && (
          <motion.div
            key="scene2"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-start gap-0">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="text-white text-[100px] font-black tracking-tighter leading-none uppercase"
              >
                WE
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="text-[#ff6b35] text-[180px] font-black tracking-tighter leading-none uppercase"
              >
                CREATE
              </motion.div>
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="text-white text-[140px] font-black tracking-tighter leading-none uppercase border-[10px] border-white px-10 py-3"
              >
                MAGIC
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Scene 3: GROW YOUR BUSINESS - explosive */}
        {currentScene === 3 && (
          <motion.div
            key="scene3"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: -100, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="text-white text-[100px] font-black tracking-tighter leading-tight uppercase"
              >
                GROW
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="text-[#ff6b35] text-[130px] font-black tracking-tighter leading-tight uppercase"
              >
                YOUR
              </motion.div>
              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="text-white text-[160px] font-black tracking-tighter leading-tight uppercase border-[10px] border-[#ff6b35] px-12"
              >
                BUSINESS
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Scene 4: BRAND - massive impact */}
        {currentScene === 4 && (
          <motion.div
            key="scene4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#ff6b35] text-[280px] font-black tracking-tighter uppercase"
            >
              BRAND
            </motion.div>
          </motion.div>
        )}

        {/* Scene 5: Services - popup effect */}
        {currentScene === 5 && (
          <motion.div
            key="scene5"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-6 px-8">
              {['Graphic Design', 'Web Design', 'Branding', 'Marketing', 'SEO', 'Content'].map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0, rotate: index % 2 === 0 ? -15 : 15 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: '#ff6b35' }}
                  className="bg-white text-black text-[32px] font-black px-12 py-4 rounded-full text-center cursor-pointer tracking-tight transition-colors"
                >
                  {service}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}