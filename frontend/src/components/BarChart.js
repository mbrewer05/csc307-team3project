import React, {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";
import {red, orange, yellow, green, blue, purple, deepPurple, 
    pink, lightBlue, cyan, teal, lightGreen} from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const userID = "60a483f4cc4a814ce0cb4139";
const year = 2021;

function BarChart() {
    const [amts, setAmts] = useState([]);

    function filter_by_date(list, month, year) {
        var updated = [];
        var res;
        for (var i=0; i<list.length; i++) {
            res = list[i].date.split("-");
            if (Number(res[0]) == year && Number(res[1]) == month) {
                updated.push(list[i]);
            }
        }
        return updated;
    }

    async function getMonthSpending(month, year) {
        return (axios.get('http://localhost:5000/users/' + userID + '/transactions?spent=1')
                .then(response => {
                    var amt = 0
                    const list = response.data.transaction_list
                    const updated = filter_by_date(list, month, year)
                    for (var i=0; i<updated.length; i++){
                        amt += updated[i].amount
                    }
                    return amt
                })
        )
    }

    useEffect(() => {
        var monthArr = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        }
        getMonthSpending(0, year).then(result => {
            monthArr["January"] = result
            console.log("January: " + result)
        })
        getMonthSpending(1, year).then(result => {
            monthArr["February"] = result
            console.log("February: " + result)
        })
        getMonthSpending(2, year).then(result => {
            monthArr["March"] = result
            console.log("March: " + result)
        })
        getMonthSpending(3, year).then(result => {
            monthArr["April"] = result
            console.log("April: " + result)
        })
        getMonthSpending(4, year).then(result => {
            monthArr["May"] = result
            console.log("May: " + result)
        })
        getMonthSpending(5, year).then(result => {
            monthArr["June"] = result
            console.log("June: " + result)
        })
        getMonthSpending(6, year).then(result => {
            monthArr["July"] = result
            console.log("July: " + result)
        })
        getMonthSpending(7, year).then(result => {
            monthArr["August"] = result
            console.log("August: " + result)
        })
        getMonthSpending(8, year).then(result => {
            monthArr["September"] = result
            console.log("September: " + result)
        })
        getMonthSpending(9, year).then(result => {
            monthArr["October"] = result
            console.log("October: " + result)
        })
        getMonthSpending(10, year).then(result => {
            monthArr["November"] = result
            console.log("November: " + result)
        })
        getMonthSpending(11, year).then(result => {
            monthArr["December"] = result
            setAmts(monthArr)
            console.log("December: " + result)
        })
    })

    var state = {
        dataBar: {
            labels: ["January", "February", "March", "April",
                     "May", "June", "July", "August",
                     "September", "October", "November", "December"],
            datasets: [{
                label: "Amount",
                data: [amts.January, amts.February, amts.March, amts.April,
                       amts.May, amts.June, amts.July, amts.August,
                       amts.September, amts.October, amts.November, amts.December],
                backgroundColor: [red[500], pink[500], purple[500], deepPurple[500],
                                  blue[500], lightBlue[500], cyan[500], teal[500], 
                                  green[500], lightGreen[500], yellow[500], orange[500]],
                borderWidth: 3,
                borderColor: [red[900], pink[900], purple[900], deepPurple[900],
                              blue[900], lightBlue[900], cyan[900], teal[900], 
                              green[900], lightGreen[900], yellow[900], orange[900]]
            }]
        },
        dataBarOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    }

    return (
        <MDBContainer>
            <h3 className="mt-5">Total Spendings By Month ({year})</h3>
            <Bar data={state.dataBar} options={state.dataBarOptions} />
        </MDBContainer>
    )
}

export default BarChart;