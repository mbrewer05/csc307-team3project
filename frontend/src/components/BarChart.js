import React, {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";
import {red, orange, yellow, green, blue, purple, deepPurple, 
    pink, lightBlue, cyan, teal, lightGreen} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const userID = "60a483f4cc4a814ce0cb4139";

function BarChart() {
    const [amts, setAmts] = useState([]);
    const [year, setYear] = useState(2021);

    function updateMonthArr(year, transaction, months) {
        var val = transaction.date.split("-");
        if (Number(val[0]) == year) {
            switch (Number(val[1])) {
                case 0:
                    months["January"] += transaction.amount;
                    break;
                case 1:
                    months["February"] += transaction.amount;
                    break;
                case 2:
                    months["March"] += transaction.amount;
                    break;
                case 3:
                    months["April"] += transaction.amount;
                    break;   
                case 4:
                    months["May"] += transaction.amount;
                    break;
                case 5:
                    months["June"] += transaction.amount;
                    break;
                case 6:
                    months["July"] += transaction.amount;
                    break;
                case 7:
                    months["August"] += transaction.amount;
                    break;
                case 8:
                    months["September"] += transaction.amount;
                    break;
                case 9:
                    months["October"] += transaction.amount;
                    break;
                case 10:
                    months["November"] += transaction.amount;
                    break;
                case 11:
                    months["December"] += transaction.amount;
                    break;
                default:
                    break;
            }
        }
    }

    async function getMonthSpending(year) {
        var months = {
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
        return (axios.get('http://localhost:5000/users/' + userID + '/transactions?spent=1')
                .then(response => {
                    const list = response.data.transaction_list
                    for (var i=0; i<list.length; i++){
                        updateMonthArr(year, list[i], months)
                    }
                    return months
                })
        )
    }

    useEffect(() => {
        getMonthSpending(year).then(result => {
            setAmts(result)
            console.log("January: " + result)
        })
    }, [year])

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
        <div>
        <MDBContainer>
            <h3 className="mt-5">Total Spendings By Month ({year})</h3>
            <Bar data={state.dataBar} options={state.dataBarOptions} />
        </MDBContainer>
        <IconButton color="primary" onClick={() => setYear(year - 1)}>
            <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => setYear(year + 1)}>
            <KeyboardArrowRightIcon />
        </IconButton>
        </div>
    )
}

export default BarChart;