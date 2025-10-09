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
            // console.error('Login failed:', error); 
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
            // console.error('Error:', error);
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
            // console.error('Booking failed:', error);
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
