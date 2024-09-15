import {
  auth,
  registerWithEmailAndPassword,
  logout,
} from '@/app/services/firebase';
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { addDoc } from 'firebase/firestore';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(() => ({ name: 'users' })),
  addDoc: jest.fn(),
}));

describe('Firebase Module', () => {
  it('registers a user with email and password', async () => {
    const mockUser = {
      user: {
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        updateProfile: jest.fn(),
      },
    };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUser);
    (addDoc as jest.Mock).mockResolvedValue({ id: 'abc123' });

    await registerWithEmailAndPassword(
      'Test User',
      'test@example.com',
      'password'
    );

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'test@example.com',
      'password'
    );
    expect(addDoc).toHaveBeenCalledWith(expect.any(Object), {
      uid: '123',
      name: 'Test User',
      authProvider: 'local',
      email: 'test@example.com',
    });
    expect(updateProfile).toHaveBeenCalledWith(mockUser.user, {
      displayName: 'Test User',
    });
  });

  it('logs out a user', async () => {
    await logout(auth);
    expect(signOut).toHaveBeenCalledWith(auth);
  });
});
