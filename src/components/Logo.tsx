import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/">
      <div className="relative inline-block h-5 w-5 rounded-full bg-white">
        <div className="absolute top-[-10%] left-[110%] h-3 w-3 rounded-full bg-white"></div>
        <div className="absolute top-[70%] left-[110%] h-2 w-2 rounded-full bg-white"></div>
      </div>
    </Link>
  );
}
