import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className="">
      <Link
        to="/"
        className={`text-2xl font-semibold dark:text-white ${
          type && "text-white  text-4xl"
        }`}
      >
        Blog
        <span
          className={`text-3xl font-bold text-rose-500 ${
            type && "text-5xl font-bold"
          }`}
        >
          X
        </span>
      </Link>
    </div>
  );
};

export default Logo;
