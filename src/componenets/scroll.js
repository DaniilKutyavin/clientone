import React, { useRef, useEffect } from "react"; 
import "../style/scroll.css";

const ScrollContainer = () => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      // Check if we are at the bottom of the scroll container
      if (scrollTop + clientHeight >= scrollHeight) {
        // Scroll to the right (simulate going to the end)
        scrollRef.current.scrollTo({ top: 0, left: scrollRef.current.scrollWidth, behavior: 'smooth' });
      }

      // Check if we are at the top of the scroll container
      if (scrollTop === 0) {
        // Scroll back to the left (simulate going back to the start)
        scrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    const currentScrollRef = scrollRef.current;
    currentScrollRef.addEventListener('scroll', handleScroll);
    
    return () => {
      currentScrollRef.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={scrollRef} className="horizontal-scroll-wrapper rectangles">
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
      <div>item 4</div>
      <div>item 5</div>
      <div>item 6</div>
      <div>item 7</div>
      <div>item 8</div>
    </div>
  );
};

export default ScrollContainer;
