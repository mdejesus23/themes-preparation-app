import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllThemes from './pages/AllThemes';
import PreparationTheme from './pages/PreparationTheme';
import ConsolidatedReadings from './pages/ReadingVotes';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import MyThemes from './pages/MyThemes';
import MyResults from './pages/MyResults';
import Settings from './pages/Settings';
import UpdateUserPassword from './pages/UpdateUserPassword';
import AdminThemeWithReadings from './features/admin/AdminThemeWithReadings';
import ReadingVotes from './pages/ReadingVotes';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="themes" />} />\
            <Route path="themes" element={<AllThemes />} />
            <Route path="themes/:slug" element={<PreparationTheme />} />
            <Route
              path="themes/:slug/reading-votes"
              element={<ReadingVotes />}
            />
            {/* admin routes */}
            <Route path="admin-themes" element={<MyThemes />} />
            <Route
              path="admin-themes/:slug"
              element={<AdminThemeWithReadings />}
            />
            <Route path="admin-results" element={<MyResults />} />
            <Route path="admin-settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
