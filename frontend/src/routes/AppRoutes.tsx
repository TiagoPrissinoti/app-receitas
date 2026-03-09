import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import { RecipeDetails } from '../pages/RecipeDetails'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { Recipes } from '../pages/Recipes'
import { CreateRecipe } from '../pages/CreateRecipe'
import { EditRecipe } from '../pages/EditRecipe'
import { MyRecipes } from '../pages/MyRecipes'
import { Favorites } from '../pages/Favorites'
import { PrivateRoute } from './PrivateRoute'

export function AppRoutes() {
  return (
    <Routes>
      {/* rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* rotas com layout */}
      <Route element={<Layout />}>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipes"
          element={
            <PrivateRoute>
              <Recipes />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipes/create"
          element={
            <PrivateRoute>
              <CreateRecipe />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipes/:id"
          element={
        <PrivateRoute>
      <RecipeDetails />
    </PrivateRoute>
  }
/>

        <Route
          path="/recipes/edit/:id"
          element={
            <PrivateRoute>
              <EditRecipe />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipes/my"
          element={
            <PrivateRoute>
              <MyRecipes />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}
