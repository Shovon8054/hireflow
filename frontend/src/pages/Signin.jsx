import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Sign In
        </h2>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-md outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-md outline-none"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
};

export default SignIn;