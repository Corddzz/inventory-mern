import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-base-200 px-6 text-base-content">
      <section className="max-w-lg text-center">
        <p className="text-8xl font-black tracking-tight text-cyan-500">404</p>
        <h1 className="mt-4 text-3xl font-bold">
          This page isn’t in the inventory.
        </h1>
        <p className="mt-3 text-base-content/70">
          The address may be incorrect, or the page may have moved.
        </p>
        <Link
          to="/"
          className="btn mt-8 border-0 bg-cyan-500 text-white hover:bg-cyan-600"
        >
          Return to dashboard
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
