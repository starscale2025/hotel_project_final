import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';

// Import all page components
import OverviewPage from './pages/Overview';
import AccommodationsPage from './pages/Accommodations';
import OffersPage from './pages/Offers';
import ExperiencesPage from './pages/Experiences';
import DiningPage from './pages/Dining';
import Booking from './pages/Booking';
import ConfirmationPage from './pages/Confirmation';
import DashboardBookings from './pages/DashboardBookings';
import Dashboard from './pages/Dashboard';
import BookingHistory from './pages/BookingHistory';


function App() {
  return (
    <Router>
      <SmoothScroll />
      <div className="App">
        <Routes>
          {/* Home/Overview Route */}
          <Route path="/" element={<OverviewPage />} />
          <Route path="/overview" element={<OverviewPage />} />

          {/* Booking Route */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />

          {/* Accommodations Route */}
          <Route path="/accommodations" element={<AccommodationsPage />} />

          {/* Offers Route */}
          <Route path="/offers" element={<OffersPage />} />

          {/* Experiences Route */}
          <Route path="/experiences" element={<ExperiencesPage />} />

          {/* Dining Routes */}
          <Route path="/dining" element={<DiningPage />} />

          {/* DashboardBookings */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/rooms" element={<DashboardBookings type="rooms" />} />
          <Route path="/dashboard/tables" element={<DashboardBookings type="tables" />} />
          <Route path="/dashboard/booking-history" element={<BookingHistory />} />


          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// 404 Not Found Component
function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-light text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="bg-gray-900 text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition inline-block"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}

export default App;