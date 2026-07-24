import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

/**
 * 404 Not Found page.
 */
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | Patao Pocket</title>
      </Helmet>

      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-8xl font-bold text-primary-800 mb-4">404</h1>
          <p className="text-xl text-primary-700 mb-8">
            Oops! This page has wandered off the garden path.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
