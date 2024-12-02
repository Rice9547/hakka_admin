import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './auth/auth0-provider';
import { LoginPage } from './components/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';
import { StoryPage } from './components/StoryPage';
import StoryEditor from './components/StoryEditor';
import { AdminLayout } from "./components/AdminLayout";
import { CategoryPage } from "./components/CategoryPage";
import CategoryEditor from "./components/CategoryEditor";
import { ExercisePage } from './components/ExercisePage';

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/*" element={
            <PrivateRoute>
              <AdminLayout>
                <Routes>
                  <Route index element={<StoryPage />} />
                  <Route path="/story/*">
                    <Route path="" element={<StoryPage />} />
                    <Route path="new" element={<StoryEditor />} />
                    <Route path=":id" element={<StoryEditor />} />
                    <Route path="exercises" element={<ExercisePage />} />
                  </Route>
                  <Route path="/category/*">
                    <Route path="" element={<CategoryPage />} />
                    <Route path="new" element={<CategoryEditor />} />
                    <Route path=":id" element={<CategoryEditor />} />
                  </Route>
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          } />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
};

export default App;