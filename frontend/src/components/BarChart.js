import React, {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";
import {red, orange, yellow, green, blue, purple, 
        deepPurple, pink, lightBlue, cyan, teal, lightGreen} from '@material-ui/core/colors'

function BarChart() {
    // const [amts, setAmts] = useState([])

    var state = {
        dataBar: {
            labels: ["January", "February", "March", "April",
                     "May", "June", "July", "August",
                     "September", "October", "November", "December"],
            datasets: [{
                label: "Amount",
                // data: [amts.January, amts.February, amts.March, amts.April,
                //        amts.May, amts.June, amts.July, amts.August,
                //        amts.September, amts.October, amts.November, amts.December],
                data: [100, 200, 300, 200, 150, 230, 333, 777, 123, 563, 345, 500],
                backgroundColor: [red[500], pink[500], purple[500], deepPurple[500],
                                  blue[500], lightBlue[500], cyan[500], teal[500], 
                                  green[500], lightGreen[500], yellow[500], orange[500]],
                borderWidth: 3,
                borderColor: [red[900], pink[900], purple[900], deepPurple[900],
                blue[900], lightBlue[900], cyan[900], teal[900], 
                green[900], lightGreen[900], yellow[900], orange[900]]
            }]
        }
    }

    return (
        <MDBContainer>
            <h3 className="mt-5">Total Spendings By Month</h3>
            <Bar data={state.dataBar} options={{ responsive: true }} />
        </MDBContainer>
    )
}