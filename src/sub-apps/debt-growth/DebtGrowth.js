import React, { useState, useEffect, useRef } from 'react';
import './DebtGrowth.scss';
import gearSettings from './../../assets/icons/setting-line.svg';
import workerScript from './worker.js';

const DebtGrowth = (props) => {
    const balanceInput = useRef(null);
    const interestInput = useRef(null);
    const [debtDetails, setDebtDetails] = useState(null);
    const secondsInAYear = 31536000; // estimate based on 365
    let centsPerSecondGrowth = 0;
    let updatedBalance = 0;

    const renderLiveGrowthData = () => {
        return (
            <div className="debt-growth__live-display"></div>
        )
    }

    const interestGrowthPerYearInCents = (balance, interestRate) => {
        return (
            ((balance * 100) * ((1/100) * interestRate)).toFixed(2) // growth amount in a year in cents
        )
    }

    const getInterestGrowthPerSecond = (balance, interestRate) => {
        return (interestGrowthPerYearInCents(balance, interestRate) / secondsInAYear);
    }

    // "sourced" from
    // https://stackoverflow.com/questions/2024198/how-many-seconds-between-two-dates
    const secondsBetweenTwoDateTimes = (dateTimeDataAdded) => {
        const dif = new Date().getTime() - new Date(dateTimeDataAdded).getTime();
        const secondFromT1ToT2 = dif / 1000;
        const secondsBetweenDates = Math.abs(secondFromT1ToT2);
        return secondsBetweenDates;
    }

    const saveData = () => {
        const userBalance = balanceInput.current.value;
        const userInterest = interestInput.current.value;

        if (!userBalance || !userInterest) {
            alert('Please fill in both balance and interest');
        }

        // create user data object with current date time
        const debtDetailsObj = {
            "balance": userBalance,
            "interest": userInterest,
            "dateSaved": new Date() 
        };

        window.localStorage.setItem('lifeAppDebtGrowth', JSON.stringify(debtDetailsObj));
        setDebtDetails(debtDetailsObj);
    }

    const getInitialData = () => {
        return (
            <div className="debt-growth__initial-fields">
                <p>Please enter your average debt and average interest rate</p>
                <span>Current debt balance including principal: $<input ref={ balanceInput } type="number" /></span>
                <span>Annual interest rate: <input ref={ interestInput } type="number" />%</span>
                <button type="button" onClick={ saveData }>Save</button>
            </div>
        )
    }

    // straight outta SO
    // https://stackoverflow.com/questions/6784894/add-commas-or-spaces-to-group-every-three-digits
    function tresCommas( num ) {
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const workerCallback = (secGained) => {
        if (debtDetails) {
            const newBalance = (( ((updatedBalance * 100) + centsPerSecondGrowth) ) / 100);
            updatedBalance = newBalance;
            document.querySelector('.debt-growth__live-display').innerText = `$${tresCommas(updatedBalance)}`; // you should be horse whipped
        }
    };

    const getElapsedTimeGrowth = () => {
        const elapsedSeconds = secondsBetweenTwoDateTimes(debtDetails.dateSaved);
        return ((elapsedSeconds * centsPerSecondGrowth) / 100); // to dollars
    }

    useEffect(() => {
        const userDebtDetails = window.localStorage.getItem('lifeAppDebtGrowth');
        if (userDebtDetails) {
            setDebtDetails(JSON.parse(userDebtDetails));
        }
    }, []);

    useEffect(() => {
        // update main values to be used
        // update the interest that has grown since elapsed time
        if (debtDetails) {
            centsPerSecondGrowth = getInterestGrowthPerSecond(parseFloat(debtDetails.balance), parseFloat(debtDetails.interest));
            updatedBalance = parseFloat(debtDetails.balance) + getElapsedTimeGrowth();
            if (window.Worker) {
                var workerClock = new Worker(workerScript);
                workerClock.onmessage = (msg) => {
                    workerCallback(msg.data);
                };
            } else {
                alert('Web worker not available');
            }
        }
    }, [debtDetails]);
  
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