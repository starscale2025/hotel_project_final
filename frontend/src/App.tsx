import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';

// Import all page components
import OverviewPage from './pages/Overview';
import AccommodationsPage from './pages/Accommodations';
import OffersPage from './pages/Offers';
import ExperiencesPage from './pages/Experiences';
import DiningPage from './pages/Dining';
import LocationPage from './pages/Location';
import ContactPage from './pages/Contact';
import Booking from './pages/Booking';
import ConfirmationPage from './pages/Confirmation';
import DashboardBookings from './pages/DashboardBookings';
import Dashboard from './pages/Dashboard';
import BookingHistory from './pages/BookingHistory';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <SmoothScroll />
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<OverviewPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/accommodations" element={<AccommodationsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/rooms"
            element={
              <ProtectedRoute>
                <DashboardBookings type="rooms" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tables"
            element={
              <ProtectedRoute>
                <DashboardBookings type="tables" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/booking-history"
            element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
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