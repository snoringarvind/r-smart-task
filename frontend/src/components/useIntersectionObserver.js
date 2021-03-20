import React, { useEffect } from "react";

const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.5,
  rootMargin = "0px",
}) => {
  useEffect(() => {
    console.log("hello");
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    const current = target.current;

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  });
};

export default useIntersectionObserver;
