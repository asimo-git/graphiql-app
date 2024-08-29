import { Link } from '@mui/material';
import Routes from './utils/routes';

export default function NotFound() {
  return (
    <main>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={Routes.Home}>Return Home</Link>
    </main>
  );
}
