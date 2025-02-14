// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// const Mealinfo = () => {
//   const { mealid } = useParams();
//   const [info, setInfo] = useState();
//   console.log(mealid);

//   const getInfo = async () => {
//     const get = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
//     );
//     const jsonData = await get.json();
//     console.log(jsonData.meals[0]);
//   };
//   if (info !== "") {
//     getInfo();
//   }
//   return (
//     <div>
//       {!info ? (
//         "Data Not Found"
//       ) : (
//         <div className="mealInfo">
//           <img />
//           <div className="info">
//             <h1>Recipe Details</h1>
//             <button>{info.strMeal}</button>
//             <h3>Intruction's</h3>
//             <p>{info.strIntructions}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Mealinfo;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Mealinfo = () => {
  const { mealid } = useParams();
  const [info, setInfo] = useState(null); // Initialize with null

  // Fetch the meal information
  const getInfo = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
      );
      const jsonData = await response.json();
      if (jsonData.meals && jsonData.meals.length > 0) {
        setInfo(jsonData.meals[0]); // Set state with the fetched data
      } else {
        setInfo(null); // Handle the case where no data is returned
      }
    } catch (error) {
      console.error("Error fetching meal data:", error);
      setInfo(null); // Handle fetch error
    }
  };

  // Fetch data when the component mounts or when mealid changes
  useEffect(() => {
    getInfo();
  }, [mealid]);

  return (
    <div>
      {!info ? (
        "Data Not Found" // Display message if info is null
      ) : (
        <div className="mealInfo">
          <img src={info.strMealThumb} alt={info.strMeal} /> {/* Display image */}
          <div className="info">
            <h1>{info.strMeal}</h1> {/* Display meal name */}
            <h3>Instructions</h3> {/* Correct spelling */}
            <p>{info.strInstructions}</p> {/* Display instructions */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mealinfo;
