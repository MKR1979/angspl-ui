import { useState, useEffect, useRef, useCallback } from 'react';

export const useDemoTech = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerImages = ['/imgPrograms/demoPage/tech/demoTech.jpg'];

  const moduleRefs = useRef<HTMLDivElement[]>([]);
  moduleRefs.current = [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  }, [bannerImages.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  }, [bannerImages.length]);

  // const handleModuleClick = useCallback((index: number) => {
  //   if (moduleRefs.current[index]) {
  //     moduleRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, []);

  const handleModuleClick = useCallback((index: number) => {
  const element = moduleRefs.current[index];
  if (element) {
    const yOffset = -60; // adjust based on your fixed header height
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}, []);

  const getYouTubeVideoId = useCallback((url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }, []);

  return {
    bannerImages,
    currentIndex,
    goToNext,
    goToPrev,
    getYouTubeVideoId,
    handleModuleClick,
    moduleRefs
  };
};
