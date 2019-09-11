import React from 'react';
import { Link } from 'react-router-dom';

const AppList = () => {
  const subApps = [
    {
      appName: "finance"
    },
    {
      appName: "fitness"
    },
    {
      appName: "notes"
    },
    {
      appName: "reminders"
    }
  ];
  const appTiles = subApps.map((subApp, index) => {
    return <Link key={index} to={"/" + subApp.appName}><span>{subApp.appName}</span></Link>;
  });

  return (
    <div className="lifeapp__app-list">
      <div className="lifeapp__app-list-wrapper">
        { appTiles }
      </div>
    </div>
  )
}

export default AppList;