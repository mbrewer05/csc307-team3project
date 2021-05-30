import React from 'react';
import Appbar from '../components/Appbar.js';
import PieChart from '../components/PieChart.js';
import BarChart from '../components/BarChart.js';

function StatsPage(){
    return(
        <div className="stats-page">
            <Appbar />
            <PieChart />
            <BarChart />
        </div>
    )
}

export default StatsPage