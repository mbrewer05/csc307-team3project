import React, {useState, useEffect} from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";

function PieChart(props){
    const [amts, setAmts] = useState([])
    
    async function getCatSpending(category, catArr){
        return axios.get('http://localhost:5000/users/' + localStorage.getItem('currentUser') + '/transactions?category=' + category +'&spent=1')
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
        var catArr = {
            HomeAndUtilities: 0,
            Transportation: 0,
            Groceries: 0,
            PersonalAndFamilyCare: 0,
            Health: 0,
            Insurance: 0,
            RestaurantsAndDining: 0,
            ShoppingAndEntertainment: 0,
            Travel: 0,
            CashChecksAndMisc: 0,
            Giving: 0,
            BusinessExpenses: 0,
            Education: 0,
            Finance: 0,
            Uncategorized: 0,
        }
        getCatSpending("HomeAndUtilities", catArr).then(result => {
            catArr["HomeAndUtilities"] = result 
            console.log("Home & Utilities: " + result)
        }) 
        getCatSpending("Transportation", catArr).then(result => {
            catArr["Transportation"] = result 
            console.log("Transportation: " + result)
        }) 
        getCatSpending("Groceries", catArr).then(result => {
            catArr["Groceries"] = result
            console.log("Groceries: " + result)
        })
        getCatSpending("PersonalAndFamilyCare", catArr).then(result => {
            catArr["PersonalAndFamilyCare"] = result
            console.log("Personal & Family Care: " + result)
        })
        getCatSpending("Health", catArr).then(result => {
            catArr["Health"] = result
            console.log("Health: " + result)
        })
        getCatSpending("Insurance", catArr).then(result => {
            catArr["Insurance"] = result
            console.log("Insurance: " + result)
        })
        getCatSpending("RestaurantsAndDining", catArr).then(result => {
            catArr["RestaurantsAndDining"] = result
            console.log("Restaurants & Dining: " + result)
        })
        getCatSpending("ShoppingAndEntertainment", catArr).then(result => {
            catArr["ShoppingAndEntertainment"] = result
            console.log("Shopping & Entertainment: " + result)
        })
        getCatSpending("Travel", catArr).then(result => {
            catArr["Travel"] = result
            console.log("Travel: " + result)
        })
        getCatSpending("CashChecksAndMisc", catArr).then(result => {
            catArr["CashChecksAndMisc"] = result
            console.log("Cash, Checks, & Misc: " + result)
        })
        getCatSpending("Giving", catArr).then(result => {
            catArr["Giving"] = result
            console.log("Giving: " + result)
        })
        getCatSpending("BusinessExpenses", catArr).then(result => {
            catArr["BusinessExpenses"] = result
            console.log("Business Expenses: " + result)
        })
        getCatSpending("Education", catArr).then(result => {
            catArr["Education"] = result
            console.log("Education: " + result)
        })
        getCatSpending("Finance", catArr).then(result => {
            catArr["Finance"] = result
            console.log("Finance: " + result)
        })
        getCatSpending("Uncategorized", catArr).then(result => {
            catArr["Uncategorized"] = result
            setAmts(catArr)
            console.log("Uncategorized: " + result)
        })
    }, [])

    var state = {
        dataDoughnut: {
            labels: ["Home & Utilities", "Transportation", "Groceries",
                     "Personal & Family Care", "Health", "Insurance",
                     "Restaurants & Dining", "Shopping & Entertainment",
                     "Travel", "Cash, Checks, & Misc.", "Giving",
                     "Business Expenses", "Education", "Finance",
                     "Uncategorized",],
            datasets: [{
                label: "Amount",
                data: [amts.HomeAndUtilities, amts.Transportation, amts.Groceries, 
                       amts.PersonalAndFamilyCare, amts.Health, amts.Insurance,
                       amts.RestaurantsAndDining, amts.ShoppingAndEntertainment,
                       amts.Travel, amts.CashChecksAndMisc, amts.Giving,
                       amts.BusinessExpenses, amts.Education, amts.Finance,
                       amts.Uncategorized],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", 
                                  "#4287F5", "#C939E3", "#34C948",
                                  "#B54633", "#3B33B5",
                                  "#FF852E", "#12AEDE", "#69D186",
                                  "#D169BA", "#D17D69", "#EBEB52",
                                  "#87EB52"],

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