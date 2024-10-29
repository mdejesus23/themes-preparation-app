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
import Settings from './pages/Settings';
import AdminThemeWithReadings from './features/admin/AdminThemeWithReadings';
import ReadingVotes from './pages/ReadingVotes';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
          <Route path="reset-password/:token" element={<ResetPassword />} />
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
  );
}

export default App;
