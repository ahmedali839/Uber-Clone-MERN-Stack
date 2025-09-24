// // App.js or your main component
// import React, { useState, useEffect } from 'react';
// import UberLoadingPage from './components/UberLoadingPage';

// import Dashboard from './components/Dashboard';

// function Loading() {
//     const [isLoading, setIsLoading] = useState(true);
//     const [user, setUser] = useState(null);

//     // Simulate your app initialization
//     useEffect(() => {
//         const initializeApp = async () => {
//             try {
//                 // Your actual loading logic here
//                 // e.g., check authentication, load user data, etc.

//                 // Example: Check if user is authenticated
//                 const token = localStorage.getItem('auth_token');
//                 if (token) {
//                     // Fetch user data
//                     const userData = await fetchUserData(token);
//                     setUser(userData);
//                 }

//                 // Minimum loading time for smooth UX (optional)
//                 await new Promise(resolve => setTimeout(resolve, 2000));

//             } catch (error) {
//                 console.error('App initialization error:', error);
//             }
//         };

//         initializeApp();
//     }, []);

//     const handleLoadingComplete = () => {
//         setIsLoading(false);
//     };

//     // Show loading page while initializing
//     if (isLoading) {
//         return (
//             <UberLoadingPage
//                 onLoadingComplete={handleLoadingComplete}
//                 duration={5000} // 5 seconds
//                 showLogo={true}
//                 customMessages={[
//                     'STARTING UP',
//                     'LOADING YOUR DATA',
//                     'CONNECTING SERVICES',
//                     'ALMOST READY',
//                     'WELCOME BACK!'
//                 ]}
//             />
//         );
//     }

//     // Show main app after loading
//     return (
//         <div className="app">
//             <Dashboard user={user} />
//         </div>
//     );
// }

// // Example usage in other components
// const LoginPage = () => {
//     const [isLoggingIn, setIsLoggingIn] = useState(false);

//     const handleLogin = async (credentials) => {
//         setIsLoggingIn(true);
//         try {
//             await loginUser(credentials);
//             // Loading will complete automatically after 3 seconds
//         } catch (error) {
//             setIsLoggingIn(false);
//             // Handle error
//         }
//     };

//     const handleLoginComplete = () => {
//         setIsLoggingIn(false);
//         // Redirect to dashboard
//         window.location.href = '/dashboard';
//     };

//     return (
//         <div>
//             {isLoggingIn && (
//                 <UberLoadingPage
//                     onLoadingComplete={handleLoginComplete}
//                     duration={3000}
//                     customMessages={['LOGGING IN...', 'VERIFYING CREDENTIALS', 'SUCCESS!']}
//                 />
//             )}

//             {/* Your login form */}
//             <form onSubmit={handleLogin}>
//                 {/* Login form content */}
//             </form>
//         </div>
//     );
// };

// // Example with React Router
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// const AppWithRouter = () => {
//     const [isInitialized, setIsInitialized] = useState(false);

//     useEffect(() => {
//         // App initialization logic
//         setTimeout(() => {
//             setIsInitialized(true);
//         }, 3000);
//     }, []);

//     if (!isInitialized) {
//         return (
//             <UberLoadingPage
//                 onLoadingComplete={() => setIsInitialized(true)}
//                 duration={4000}
//             />
//         );
//     }

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/profile" element={<ProfilePage />} />
//             </Routes>
//         </Router>
//     );
// };

// export default Loading;













// Just copy the RideHistory component and use it like this:

import React, { useState } from 'react';
import RideHistory from './RideHistory'; // Your loading component

// Example 1: Login Page
const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            // Your login API call
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            // Hide loading after success
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            {/* Show loading when isLoading is true */}
            {isLoading && (
                <RideHistory
                    isVisible={isLoading}
                    messages={['LOGGING IN...', 'VERIFYING...', 'WELCOME BACK!']}
                />
            )}

            {/* Your login form */}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

// Example 2: Data Fetching
const RidePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rideData, setRideData] = useState(null);

    const fetchRideData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/rides');
            const data = await response.json();
            setRideData(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Loading screen */}
            <RideHistory
                isVisible={isLoading}
                messages={['FINDING RIDES...', 'CALCULATING...', 'READY!']}
            />

            {/* Your content */}
            <button onClick={fetchRideData}>Get Rides</button>
            {rideData && <div>{/* Display ride data */}</div>}
        </div>
    );
};

// Example 3: App Initialization
const App = () => {
    const [appLoaded, setAppLoaded] = useState(false);

    React.useEffect(() => {
        // Simulate app initialization
        setTimeout(() => {
            setAppLoaded(true);
        }, 3000);
    }, []);

    if (!appLoaded) {
        return (
            <RideHistory
                isVisible={true}
                duration={3000} // Auto-hide after 3 seconds
                onComplete={() => setAppLoaded(true)}
                messages={['STARTING UP...', 'LOADING SERVICES...', 'READY TO RIDE!']}
            />
        );
    }

    return (
        <div>
            {/* Your main app */}
            <h1>Welcome to Uber!</h1>
        </div>
    );
};

// Example 4: With Manual Control
const BookingPage = () => {
    const [loadingStep, setLoadingStep] = useState('');

    const bookRide = async () => {
        setLoadingStep('booking');

        try {
            // Step 1: Create booking
            await fetch('/api/book', { method: 'POST' });
            setLoadingStep('finding');

            // Step 2: Find driver  
            await fetch('/api/find-driver', { method: 'POST' });
            setLoadingStep('confirming');

            // Step 3: Confirm
            await fetch('/api/confirm', { method: 'POST' });
            setLoadingStep('');

        } catch (error) {
            setLoadingStep('');
            console.error('Booking failed:', error);
        }
    };

    const getLoadingMessages = () => {
        switch (loadingStep) {
            case 'booking': return ['CREATING BOOKING...', 'PROCESSING...'];
            case 'finding': return ['FINDING DRIVER...', 'SEARCHING...'];
            case 'confirming': return ['CONFIRMING RIDE...', 'ALMOST DONE...'];
            default: return ['LOADING...'];
        }
    };

    return (
        <div>
            {/* Show loading for different steps */}
            <RideHistory
                isVisible={!!loadingStep}
                messages={getLoadingMessages()}
            />

            <button onClick={bookRide}>Book Ride</button>
        </div>
    );
};

// Example 5: Simple Usage
const SimpleExample = () => {
    const [loading, setLoading] = useState(false);

    const doSomething = async () => {
        setLoading(true);

        // Your async operation
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
    };

    return (
        <div>
            {/* Basic usage - show/hide with boolean */}
            <RideHistory isVisible={loading} />

            <button onClick={doSomething}>
                {loading ? 'Loading...' : 'Click Me'}
            </button>
        </div>
    );
};

export default Loading;
