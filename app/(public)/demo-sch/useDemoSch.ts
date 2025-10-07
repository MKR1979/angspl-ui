import { useMemo, useState, useEffect, useRef, useCallback } from 'react';

export const useDemoSch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const bannerImages = ['/ModulesImgs/admsMng.png'];

  const moduleRefs = useRef<HTMLDivElement[]>([]);
  moduleRefs.current = []; // reset on each render

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
  //   setActiveModule(index);
  //   if (detailRef.current) {
  //     detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, []);

  const handleModuleClick = useCallback((index: number) => {
    if (moduleRefs.current[index]) {
      moduleRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const getYouTubeVideoId = useCallback((url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }, []);

  const testimonials = useMemo(
    () => [
      {
        text: 'This system has completely transformed how we handle student data.',
        name: 'Priya Sharma',
        school: 'Lotus Public School'
      },
      {
        text: 'Our admissions are now 3x faster and more transparent.',
        name: 'Rahul Mehta',
        school: 'Sunrise International'
      },
      {
        text: 'Teachers love how simple it is to manage attendance and grading.',
        name: 'Anita George',
        school: 'Silver Oak High School'
      }
    ],
    []
  );

  return {
    bannerImages,
    currentIndex,
    goToNext,
    goToPrev,
    getYouTubeVideoId,
    setActiveModule,
    activeModule,
    handleModuleClick,
    detailRef,
    testimonials,
    moduleRefs
  };
};
