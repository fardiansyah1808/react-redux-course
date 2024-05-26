import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="flex flex-col justify-evenly items-center h-screen">
      <p className="flex justify-center items-center text-5xl font-bold">
        404: Page not found
      </p>
      <Link
        to="/"
        className="flex justify-center items-center text-2xl hover:text-gray-500"
      >
        Back to home
      </Link>
    </div>
  );
}

export default Page404;
