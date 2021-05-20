import React from 'react';
import Appbar from '../components/Appbar.js';
import PieChart from '../components/PieChart.js';

function StatsPage(){
    return(
        <div className="stats-page">
            <Appbar />
            <PieChart />
        </div>
    )
}

export default StatsPage