import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg text-center">
        
        <p className="text-7xl font-bold text-indigo-600 sm:text-8xl">
          404
        </p>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-slate-500">
          Sorry, the page you are looking for doesn't exist or may have
          been moved.
        </p>

        <nav
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          aria-label="404 page navigation"
        >
          <Link
            to="/"
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Go Home
          </Link>

          <Link
            to="/about"
            className="w-full rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            About TodoList
          </Link>
        </nav>
      </section>
    </main>
  );
}

export default NotFoundPage;