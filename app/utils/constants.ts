export const GITHUB_LINKS = {
  MARIA: 'https://github.com/mgovoru',
  RINA: 'https://github.com/asimo-git',
  VLADIMIR: 'https://github.com/drbliman',
};

export const RS_REACT_LINK = 'https://rs.school/courses/reactjs';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
};

export const ERROR_MESSAGES: { [key: string]: string } = {
  'auth/email-already-in-use':
    'This email is already registered. Please use a different email or log in',
  'auth/wrong-password': 'Incorrect password. Please try again',
  'auth/user-not-found':
    'No account found with this email. Please register first',
  default: 'unknown error, try again late',
};
