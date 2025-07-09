import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthPageContainer({ children }: Props) {
  const [letters, setLetters] = useState<string[]>([]);

  const text = "Organize your workflow.";

  useEffect(() => {
    function write() {
      if (text.length !== letters.length) {
        setLetters((prev) => {
          const length = prev.length - 1;
          return [...prev, text[length + 1]];
        });
      }
    }

    const interval = setInterval(write, 100);

    if (text.length === letters.length) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [letters.length]);

  return (
    <div className="grid min-h-screen grid-cols-1 items-center justify-items-center md:grid-cols-2">
      <div className="bg-primary hidden h-full w-full flex-col items-center justify-center gap-4 p-2 text-white md:flex">
        <h1 className="text-primary rounded-lg bg-white px-2 py-1 text-3xl font-bold">
          Together
        </h1>
        <p className="max-w-md text-center">
          From managing employees to leading projects and scheduling meetings,
          our platform gives your team everything they need to stay organized,
          aligned, and successful.
        </p>
        <p className="text-md font-bold">
          {letters}
          <span className="animate-pulse font-normal">|</span>
        </p>
      </div>
      <div className="flex w-full items-center justify-center p-2">
        {children}
      </div>
    </div>
  );
}
