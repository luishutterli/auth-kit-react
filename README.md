# Auth Kit - React Client Library

A React client library for the AuthKit authentication suite. This library provides a simple, lightweight React integration using Zustand for state management and Axios for HTTP requests.

## Installation

```bash
npm install @luishutterli/auth-kit-react
# or
bun add @luishutterli/auth-kit-react
```

## Quick Start

### 1. Wrap your app with AuthKitProvider

```tsx
import { AuthKitProvider } from '@luishutterli/auth-kit-react';
import LoginPage from './LoginPage';

function App() {
  return (
    <AuthKitProvider 
      baseUrl="http://localhost:6575" 
      loginComponent={LoginPage}
      loadingComponent={() => <div>Loading...</div>}
    >
      <YourApp />
    </AuthKitProvider>
  );
}
```

### 2. Use authentication hooks in your components

```tsx
import { useAuth } from '@luishutterli/auth-kit-react';

function LoginComponent() {
  const { login, isLoading, error, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    await login('user@example.com', 'password');
  };

  if (isAuthenticated) {
    return <div>You are logged in!</div>;
  }

  return (
    <div>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
```

## API Reference

### AuthKitProvider

The main provider component that wraps your application.

```tsx
interface AuthKitProviderProps {
  children: React.ReactNode;
  baseUrl: string;
  /**
   * Component to show while initial authentication state is loading.
   * If not provided, a default loading spinner will be shown.
   */
  loadingComponent?: React.ComponentType;
  /**
   * Component to show when the user is not authenticated.
   * This is typically your login page or login form.
   */
  loginComponent: React.ComponentType;
}
```

- `baseUrl`: The base URL of your AuthKit server
- `loginComponent`: **Required** - Component to show when the user is not authenticated
- `loadingComponent`: Optional component to show while initial authentication state is loading

### useAuth()

Main hook that provides both authentication state and actions.

```tsx
const {
  // State
  user,
  isAuthenticated,
  isLoading,
  error,
  
  // Actions
  login,
  signup,
  logout,
  clearError
} = useAuth();
```

### Other Hooks

- `useAuthState()`: Returns only the authentication state (user, isAuthenticated, isLoading, error)
- `useAuthActions()`: Returns only the authentication actions (login, signup, logout, etc.)
- `useUser()`: Returns the current user object or null
- `useIsAuthenticated()`: Returns boolean indicating if user is authenticated

## Usage Examples

### Basic Setup

First, create your login component:

```tsx
import { useAuth } from '@luishutterli/auth-kit-react';

function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
```

### Login

```tsx
const { login, isLoading, error } = useAuth();

const handleLogin = async (email: string, password: string) => {
  await login(email, password);
};
```

### Signup

```tsx
const { signup, isLoading, error } = useAuth();

const handleSignup = async (email: string, password: string, name: string, surname: string) => {
  await signup(email, password, name, surname);
};
```

### Logout

```tsx
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
};
```

### Check Authentication Status

```tsx
const { isAuthenticated, user } = useAuth();

if (isAuthenticated && user) {
  return <div>Welcome, {user.name}!</div>;
}

// This will automatically show your loginComponent
return null;
```

### Protecting Routes

```tsx
import { useAuth } from '@luishutterli/auth-kit-react';

function ProtectedComponent() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // This will never render because AuthKitProvider 
    // automatically shows loginComponent when not authenticated
    return null;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Hello, {user?.name}!</p>
    </div>
  );
}
```

### Error Handling

```tsx
const { error, clearError } = useAuth();

useEffect(() => {
  if (error) {
    console.error('Auth error:', error);
    // Clear error after showing it
    setTimeout(clearError, 5000);
  }
}, [error, clearError]);
```

## Requirements

- React 17+ 
- TypeScript support recommended
- AuthKit server running (see [@luishutterli/auth-kit](https://github.com/luishutterli/auth-kit))

## Related Packages

- [@luishutterli/auth-kit](https://github.com/luishutterli/auth-kit) - The backend authentication server
- [@luishutterli/auth-kit-types](https://www.npmjs.com/package/@luishutterli/auth-kit-types) - Shared TypeScript types

## License

UNLICENSED
