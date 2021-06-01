import React from 'react';
import Appbar from '../components/Appbar.js';
import PieChart from '../components/PieChart.js';
import BarChart from '../components/BarChart.js';
import { Redirect } from "react-router-dom";

function StatsPage(props ){
    if (localStorage.getItem('currentUser')) 
    {
        return(
            <div className="stats-page">
                <Appbar curUser={props.curUser} setCurUser={props.setCurUser} />
                <PieChart curUser={props.curUser} />
                <BarChart curUser={props.curUser} />
            </div>
        )
    }
    else {
        return <Redirect to="/login" />
    }
}

export default StatsPage