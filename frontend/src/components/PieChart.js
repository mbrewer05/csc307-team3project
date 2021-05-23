import React, {useState, useEffect} from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";

const userID = "60a483f4cc4a814ce0cb4139";

function PieChart(){
    const [categoryAmts, setCategoryAmts] = useState([])
    
    async function getHomeUtil(){
        return axios.get('http://localhost:5000/users/' + userID + '/transactions?category=HomeAndUtilities&spent=1')
                .then(response => {
                    var amt = 0
                    const list = response.data.transaction_list
                    for(var i=0; i<list.length; i++){
                        amt += list[i].amount
                    }
                    return amt
                })
    }

    useEffect(() => {
        getHomeUtil().then(result => {
            setCategoryAmts(result)
            console.log(result)
        })
    }, [])

    var state = {
        dataDoughnut: {
            labels: ["Home & Utilities", "Green", "Yellow", "Grey", "Dark Grey"],
            datasets: [{
                data: [categoryAmts, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1",
                    "#FFC870",
                    "#A8B3C5",
                    "#616774"
                ]
            }]
        }
    }

    return (
        <MDBContainer>
            <h2 className="mt-5">Spending Category Breakdown</h2>
            <Doughnut data={state.dataDoughnut} options={{ responsive: true }} />
        </MDBContainer>
    );
}

export default PieChart;