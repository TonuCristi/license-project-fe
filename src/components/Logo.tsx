import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/">
      <div className="relative h-9 w-9">
        <div className="absolute top-[20%] h-5 w-5 rounded-full bg-white"></div>
        <div className="absolute top-[15%] right-0 h-3 w-3 rounded-full bg-white"></div>
        <div className="absolute top-[70%] right-[15%] h-2 w-2 rounded-full bg-white"></div>
      </div>
    </Link>
  );
}
