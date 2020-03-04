import React, { useState, useEffect } from 'react';
import './DebtGrowth.scss';
import gearSettings from './../../assets/icons/setting-line.svg';

const DebtGrowth = (props) => {
    const [debtDetails, setDebtDetails] = useState(null);

    const renderLiveGrowthData = () => {
        return (
            "nothing"
        )
    }

    const getInitialData = () => {
        return (
            <div className="debt-growth__initial-fields">
                <p>Please enter your average debt and average interest rate</p>
                <span>Starting debt: $<input type="number" /></span>
                <span>Interest rate: <input type="number" />%</span>
            </div>
        )
    }
  
	return (
		<div className="lifeapp__debt-growth sub-app">
            <div className="debt-growth__nav">
                <img src={ gearSettings } className="debt-growth__gear"/>
            </div>
            {
                debtDetails
                    ? renderLiveGrowthData()
                    : getInitialData()
            }
		</div>
	)
}

export default DebtGrowth;