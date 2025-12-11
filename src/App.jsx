import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Login from './pages/Login';
import Signup from './pages/Signup';
import AllThemes from './pages/AllThemes';
import PreparationTheme from './pages/PreparationTheme';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import MyThemes from './pages/MyThemes';
import MyResults from './pages/MyResults';
import User from './pages/User';
import AdminThemeWithReadings from './features/admin/AdminThemeWithReadings';
import ReadingVotes from './pages/ReadingVotes';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './features/authentication/ProtectedRoute';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import Songs from './pages/Songs';
import Song from './pages/Song';
import Liturgy from './pages/Liturgy';
import PublicAppLayout from './ui/PublicAppLayout';
import CatechismOfTheCatholicChurch from './pages/CatechismOfTheCatholicChurch';
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Avoid unnecessary refetches
    },
  },
});

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="themes" />} />\
                <Route path="themes" element={<AllThemes />} />
                <Route path="themes/:themeId" element={<PreparationTheme />} />
                <Route
                  path="themes/:themeId/reading-votes"
                  element={<ReadingVotes />}
                />
                {/* admin routes */}
                <Route path="admin-themes" element={<MyThemes />} />
                <Route
                  path="admin-themes/:themeId"
                  element={<AdminThemeWithReadings />}
                />
                <Route path="admin-results" element={<MyResults />} />
                <Route path="admin-user" element={<User />} />
                <Route path="songs" element={<Songs />} />
                <Route path="songs/:songId" element={<Song />} />
                <Route
                  path="office-of-the-readings/:bookId"
                  element={<Liturgy />}
                />
                <Route
                  path="catechism-of-the-catholic-church/:bookId"
                  element={<CatechismOfTheCatholicChurch />}
                />
                <Route path="terms-of-service" element={<TermsOfService />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Route>
            <Route>
              <Route element={<PublicAppLayout />}>
                {/* place applayout for these components  */}
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route
                  path="reset-password/:token"
                  element={<ResetPassword />}
                />
                {/* make this accessible to everyone as well  */}
                <Route path="song-book" element={<Songs />} />
                <Route path="song-book/:songId" element={<Song />} />
                <Route
                  path="public/office-of-the-readings/:bookId"
                  element={<Liturgy />}
                />

                <Route
                  path="public/catechism-of-the-catholic-church/:bookId"
                  element={<CatechismOfTheCatholicChurch />}
                />
              </Route>
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: '#f6f8f9',
              color: '#1C252C',
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
