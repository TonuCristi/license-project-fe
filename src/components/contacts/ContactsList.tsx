import { useEffect, useRef } from "react";
import Contact from "./Contact";

export default function ContactsList() {
  const rootRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleIntersection() {
      console.log("It works!");
    }

    const options = {
      root: rootRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (rootRef.current?.lastChild) {
      observer.observe(rootRef.current.lastChild as Element);
    }
  }, []);

  return (
    <ul
      ref={rootRef}
      className="scrollbar flex flex-col gap-2 overflow-y-scroll pr-2"
    >
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
    </ul>
  );
}
