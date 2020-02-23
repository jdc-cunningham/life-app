import React, { useState, useEffect } from 'react';
import Dexie from 'dexie';
import { dateUtils  } from './../../Utilities';

const Diet = (props) => {
  	const [storage, setStorage] = useState(null);

	const setupStorage = () => {
		console.log('ss');
		const db = new Dexie("LifeAppCalorieCounter");
		db.version(1).stores({
			days: "++id,day,date,calorieCap", // the calorieCap value should ideally just be stored by itself, not in rows but I guess it could change
			foodCalories: "++id,name,calories",
			meals: "++id,name,calories,servings",
			activities: "++id,name,calorieDeficit"
		});
		setStorage(db);
	}

	useEffect(() => {
		if (!storage) {
			setupStorage();
		}

		alert(dateUtils.getDayString());
	});
  
	return (
		<div className="lifeapp__diet sub-app">
			Diet
		</div>
	)
}

export default Diet;