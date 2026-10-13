import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [meals, setMeals] = useState([])
  const [search, setSearch] = useState("")
  const [favorites, setFavorites] = useState([])
  const [showFavs, setShowFavs] = useState(false)

  const fetchMeal = async () => {
      const response = await axios.get("https://api.freeapi.app/api/v1/public/meals?page=1&limit=20")
      
      setMeals(response.data.data.data)
    }
    //fav
    const toggleFav = (id) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(id)
      ? prevFavorites.filter((favId) => favId !== id)
      : [...prevFavorites, id]
      )
     }

  useEffect(() => {
    
    fetchMeal()
    console.log(meals)
    console.log(favorites)
  }, [])

  const filteredMeals = meals.filter((meal) => {
    const matchSearch =
  meal.strMeal.toLowerCase().includes(search.toLowerCase())

const matchFavs = !showFavs || favorites.includes(meal.idMeal);
return matchSearch && matchFavs
})

  return (
    <div className='text-center min-h-screen bg-amber-100 px-5 py-10 '>
    <div className='mx-auto mb-8 flex max-w-7xl w-full justify-center gap-4 '>
      <h1 className='text-4xl font-extrabold text-orange-700 text-center justify-center'>Recipe Finder</h1>
     <div className='rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-700 shadow-sm'>
      <p>Favorites: {favorites.length}</p>
      </div>
     </div>

      <button onClick={() => 
          setShowFavs(!showFavs)}
          className='mb-6 rounded-lg bg-orange-600 px-4 py-2 text-white'>
            {showFavs ? "Show All Recipes" : "Show Favorites"}
            </button>    

     <div className='mx-auto mb-8 max-w-7xl'>
      <input 
      type='text'
      placeholder='Search Recipes...'
      value={search}
      onChange={(e) => 
        setSearch(e.target.value)}
        className='text-black font-semibold w-full rounded-2xl border border-orange-200 bg-white px-5 py-4 outline-none placeholder:text-gray-700 focus:border-orange-400 focus:ring-orange-100'
        />
        </div>


        <div className='mx-auto grid max-w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>

        {filteredMeals.length === 0 && (
          <p className='py-10 text-center text-lg font-semibold text-red-800'>No recipes match found.</p>
        )}
        </div>

         <div className='mx-auto grid max-w-7xl gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {filteredMeals.map((meal) => (

        <div key={meal.idMeal}
        className='rounded-2xl bg-white p-4 shadow'>
          <img src={meal.strMealThumb}
          alt={meal.strMeal}
          width='200'
          className='h-70 rounded-xl object-cover auto-fit w-full'
          />

           <h3 className='font-bold text-slate-600 text-xl'>{meal.strMeal}</h3>
          <p className='rounded-full font-medium text-sm px-3 py-1 text-slate-800'>Cuisine: {meal.strArea}</p>
         
         
          <button onClick={() => 
            toggleFav(meal.idMeal)
          }
          className={`rounded-lg px-5 py-2.5 font-medium
          ${favorites.includes(meal.idMeal)
            ? "bg-orange-600 text-white shadow-md hover:bg-orange-700"
            : "border border-orange-300 bg-white text-orange-700 hover:bg-orange-100"
          }`}>
            {favorites.includes(meal.idMeal)
            ? "🤍Saved"
            :"⌛Save Recipe"}
          
          </button>
         </div>
      ))}
    </div>
   </div>

  )
}
export default App;