import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './auth/auth0-provider';
import { LoginPage } from './components/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminDashboard } from './components/AdminDashboard';
import StoryEditor from './components/StoryEditor';

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/*" element={
            <PrivateRoute>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="story/new" element={<StoryEditor />} />
                <Route path="story/:id" element={<StoryEditor />} />
              </Routes>
            </PrivateRoute>
          } />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
};

export default App;