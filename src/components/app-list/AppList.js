import React from 'react';
import { Link } from 'react-router-dom';

const AppList = () => {
  const subApps = ["diet", "finance", "fitness", "notes", "reminders"];
  const appTiles = subApps.map((subApp, index) => {
    return <Link key={index} to={"/" + subApp}><span>{subApp}</span></Link>;
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