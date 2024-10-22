//  import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './Navbar';
// import moment from 'moment';
// import 'chartjs-adapter-moment';
// import './graph.css';


// const ExpensesGraph = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filterMonth, setFilterMonth] = useState('');
//     const [filterYear, setFilterYear] = useState('');

//     useEffect(() => {
//         const fetchExpenses = async () => {
//             try {
//                 const userId = sessionStorage.getItem('userId');
//                 if (!userId) {
//                     throw new Error('User ID not found in sessionStorage');
//                 }

//                 let url = `http://localhost:3001/expenses?userId=${userId}`;
//                 if (filterMonth && filterYear) {
//                     url += `&month=${filterMonth}&year=${filterYear}`;
//                 }

//                 const response = await axios.get(url);
//                 setExpenses(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching expenses:', error);
//                 setLoading(false);
//             }
//         };

//         fetchExpenses();
//     }, [filterMonth, filterYear]);

//     useEffect(() => {
//         if (!loading) {
//             renderCharts();
//         }
//     }, [loading, expenses]);

//     const renderCharts = () => {
//         renderPieChart();
//         renderBarGraph();
//         renderLineChart();
//         renderMonthVsExpensesBarGraph();
//         renderSavingsOverTime();
    
//     };

//     const renderPieChart = () => {
//         destroyChart('pie-chart');
//         const income = expenses.filter(expense => expense.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
//         const expensesTotal = expenses.filter(expense => expense.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);
//         const absExpenses = Math.abs(expensesTotal);

//         const data = {
//             labels: ['Income', 'Expenses'],
//             datasets: [{
//                 data: [income, absExpenses],
//                 backgroundColor: ['green', 'red']
//             }]
//         };

//         const pieChartCanvas = document.getElementById('pie-chart');
//         if (pieChartCanvas) {
//             new Chart(pieChartCanvas, {
//                 type: 'pie',
//                 data: data
//             });
//         }
//     };

//     const renderBarGraph = () => {
//         destroyChart('bar-chart');
//         const labels = expenses.map(expense => expense.description);
//         const amounts = expenses.map(expense => Math.abs(expense.amount));

//         const barChartCanvas = document.getElementById('bar-chart');
//         if (barChartCanvas) {
//             new Chart(barChartCanvas, {
//                 type: 'bar',
//                 data: {
//                     labels: labels,
//                     datasets: [{
//                         label: 'Amount Spent',
//                         data: amounts,
//                         backgroundColor: 'blue'
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });
//         }
//     };

//     const renderLineChart = () => {
//         destroyChart('line-chart');
//         const expensesByDate = expenses.reduce((acc, expense) => {
//             const date = moment(expense.date).format('YYYY-MM-DD');
//             acc[date] = acc[date] || 0;
//             acc[date] += expense.amount;
//             return acc;
//         }, {});

//         const dates = Object.keys(expensesByDate);
//         const amounts = Object.values(expensesByDate);

//         const lineChartCanvas = document.getElementById('line-chart');
//         if (lineChartCanvas) {
//             new Chart(lineChartCanvas, {
//                 type: 'line',
//                 data: {
//                     labels: dates,
//                     datasets: [{
//                         label: 'Expenses vs Date',
//                         data: amounts,
//                         borderColor: 'orange',
//                         fill: false
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         x: {
//                             type: 'time',
//                             time: {
//                                 unit: 'day',
//                                 parser: 'YYYY-MM-DD',
//                             }
//                         }
//                     }
//                 }
//             });
//         }
//     };

//     const renderMonthVsExpensesBarGraph = () => {
//         destroyChart('month-vs-expenses-bar-chart');
    
//         const filteredExpenses = expenses.filter(expense => {
//             const expenseDate = moment(expense.date);
//             return expenseDate.month() + 1 === parseInt(filterMonth) && expenseDate.year() === parseInt(filterYear);
//         });
    
//         const monthLabels = moment.months();
//         const monthData = Array(12).fill(0);
//         const incomeData = Array(12).fill(0);
//         const expensesData = Array(12).fill(0);
    
//         filteredExpenses.forEach(expense => {
//             const monthIndex = moment(expense.date).month();
//             if (expense.type === 'income') {
//                 incomeData[monthIndex] += Math.abs(expense.amount);
//             } else if (expense.type === 'expense') {
//                 expensesData[monthIndex] += Math.abs(expense.amount);
//             }
//         });
    
//         const chartElement = document.getElementById('month-vs-expenses-bar-chart');
//         if (chartElement) {
//             new Chart(chartElement, {
//                 type: 'bar',
//                 data: {
//                     labels: monthLabels,
//                     datasets: [
//                         {
//                             label: 'Income',
//                             data: incomeData,
//                             backgroundColor: 'green'
//                         },
//                         {
//                             label: 'Expenses',
//                             data: expensesData,
//                             backgroundColor: 'red'
//                         }
//                     ]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });
//         }
//     };

//     const renderSavingsOverTime = () => {
//         destroyChart('savings-over-time-chart');
        
//         const monthlySavings = expenses.reduce((acc, expense) => {
//             const date = new Date(expense.date);
//             const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

//             if (!acc[yearMonth]) {
//                 acc[yearMonth] = { income: 0, expense: 0 };
//             }

//             if (expense.type === 'income') {
//                 acc[yearMonth].income += parseFloat(expense.amount);
//             } else {
//                 acc[yearMonth].expense += parseFloat(expense.amount);
//             }

//             return acc;
//         }, {});

//         const labels = Object.keys(monthlySavings).sort();
//         const data = labels.map(label => monthlySavings[label].income - monthlySavings[label].expense);

//         const chartData = {
//             labels: labels,
//             datasets: [{
//                 label: 'Savings Over Time',
//                 data: data,
//                 borderColor: '#36A2EB',
//                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 fill: true,
//             }],
//         };

//         const chartElement = document.getElementById('savings-over-time-chart');
//         if (chartElement) {
//             new Chart(chartElement, {
//                 type: 'line',
//                 data: chartData,
//             });
//         }
//     };

    
//     const destroyChart = (chartId) => {
//         const chartCanvas = document.getElementById(chartId);
//         if (chartCanvas) {
//             Chart.getChart(chartCanvas)?.destroy();
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="container mt-5">
//                 <div className="row">
//                     <div className="col">
//                         <h2 className="mb-4">Expenses Analysis</h2>
//                         <div className="row mb-3">
//                             <div className="col-md-6">
//                                 <select className="form-control" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
//                                     <option value="">Select Month</option>
//                                     {moment.months().map((month, index) => (
//                                         <option key={index} value={index + 1}>{month}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="col-md-6">
//                                 <select className="form-control" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
//                                     <option value="">Select Year</option>
//                                     {Array.from({ length: 10 }, (_, i) => moment().year() - i).map(year => (
//                                         <option key={year} value={year}>{year}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : (
//                             <div className="graph-container">
//                                 <div className="graph-wrapper">
//                                     <p className="graph-title h4 text-center text-primary">Income vs Expenses</p>
//                                     <canvas id="pie-chart" className="graph"></canvas>
//                                     <p className="graph-title h4 text-center text-primary">Amount vs Description</p>
//                                     <canvas id="bar-chart" className="graph"></canvas>
//                                     <p className="graph-title h4 text-center text-primary">Expenses vs Date</p>
//                                     <canvas id="line-chart" className="graph"></canvas>
//                                     <p className="graph-title h4 text-center text-primary">Month vs Expenses</p>
//                                     <canvas id="month-vs-expenses-bar-chart" className="graph"></canvas>
//                                     <p className="graph-title h4 text-center text-primary">Savings Over Time</p>
//                                     <canvas id="savings-over-time-chart" className="graph"></canvas>
                                  
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ExpensesGraph;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import moment from 'moment';
import 'chartjs-adapter-moment';
import './graph.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExpensesGraph = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');

    const CHART_IDS = {
        PIE_CHART: 'pie-chart',
        BAR_CHART: 'bar-chart',
        LINE_CHART: 'line-chart',
        MONTH_VS_EXPENSES_BAR_CHART: 'month-vs-expenses-bar-chart',
        SAVINGS_OVER_TIME_CHART: 'savings-over-time-chart',
    };

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in sessionStorage');
                }

                let url = `http://localhost:3001/expenses?userId=${userId}`;
                if (filterMonth && filterYear) {
                    url += `&month=${filterMonth}&year=${filterYear}`;
                }

                const response = await axios.get(url);
                setExpenses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching expenses:', error);
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [filterMonth, filterYear]);

    useEffect(() => {
        if (!loading) {
            renderCharts();
        }
    }, [loading, expenses]);

    const renderCharts = () => {
        renderPieChart();
        renderBarGraph();
        renderLineChart();
        renderMonthVsExpensesBarGraph();
        renderSavingsOverTime();
    };

    const renderPieChart = () => {
        destroyChart(CHART_IDS.PIE_CHART);
        const income = calculateTotal('income');
        const expensesTotal = calculateTotal('expense');
        const absExpenses = Math.abs(expensesTotal);

        const data = {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [income, absExpenses],
                backgroundColor: ['green', 'red']
            }]
        };

        renderChart(CHART_IDS.PIE_CHART, 'pie', data);
    };

    const renderBarGraph = () => {
        destroyChart(CHART_IDS.BAR_CHART);
        const labels = expenses.map(expense => expense.description);
        const amounts = expenses.map(expense => Math.abs(expense.amount));

        const data = {
            labels: labels,
            datasets: [{
                label: 'Amount Spent',
                data: amounts,
                backgroundColor: 'blue'
            }]
        };

        renderChart(CHART_IDS.BAR_CHART, 'bar', data, { scales: { y: { beginAtZero: true } } });
    };

    const renderLineChart = () => {
        destroyChart(CHART_IDS.LINE_CHART);
        const expensesByDate = groupExpensesByDate();

        const dates = Object.keys(expensesByDate);
        const amounts = Object.values(expensesByDate);

        const data = {
            labels: dates,
            datasets: [{
                label: 'Expenses vs Date',
                data: amounts,
                borderColor: 'orange',
                fill: false
            }]
        };

        renderChart(CHART_IDS.LINE_CHART, 'line', data, {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        parser: 'YYYY-MM-DD',
                    }
                }
            }
        });
    };

    const renderMonthVsExpensesBarGraph = () => {
        destroyChart(CHART_IDS.MONTH_VS_EXPENSES_BAR_CHART);
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = moment(expense.date);
            return expenseDate.month() + 1 === parseInt(filterMonth, 10) && expenseDate.year() === parseInt(filterYear, 10);
        });

        const monthLabels = moment.months();
        const { incomeData, expensesData } = calculateMonthlyIncomeAndExpenses(filteredExpenses, monthLabels.length);

        const data = {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: 'green'
                },
                {
                    label: 'Expenses',
                    data: expensesData,
                    backgroundColor: 'red'
                }
            ]
        };

        renderChart(CHART_IDS.MONTH_VS_EXPENSES_BAR_CHART, 'bar', data, { scales: { y: { beginAtZero: true } } });
    };

    const renderSavingsOverTime = () => {
        destroyChart(CHART_IDS.SAVINGS_OVER_TIME_CHART);
        const monthlySavings = calculateMonthlySavings();

        const labels = Object.keys(monthlySavings).sort();
        const data = labels.map(label => monthlySavings[label].income - monthlySavings[label].expense);

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Savings Over Time',
                data: data,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            }],
        };

        renderChart(CHART_IDS.SAVINGS_OVER_TIME_CHART, 'line', chartData);
    };

    const calculateTotal = (type) => {
        return expenses.filter(expense => expense.type === type).reduce((acc, curr) => acc + curr.amount, 0);
    };

    const groupExpensesByDate = () => {
        return expenses.reduce((acc, expense) => {
            const date = moment(expense.date).format('YYYY-MM-DD');
            acc[date] = acc[date] || 0;
            acc[date] += expense.amount;
            return acc;
        }, {});
    };

    const calculateMonthlyIncomeAndExpenses = (filteredExpenses, numMonths) => {
        const incomeData = Array(numMonths).fill(0);
        const expensesData = Array(numMonths).fill(0);

        filteredExpenses.forEach(expense => {
            const monthIndex = moment(expense.date).month();
            if (expense.type === 'income') {
                incomeData[monthIndex] += Math.abs(expense.amount);
            } else if (expense.type === 'expense') {
                expensesData[monthIndex] += Math.abs(expense.amount);
            }
        });

        return { incomeData, expensesData };
    };

    const calculateMonthlySavings = () => {
        return expenses.reduce((acc, expense) => {
            const date = new Date(expense.date);
            const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

            if (!acc[yearMonth]) {
                acc[yearMonth] = { income: 0, expense: 0 };
            }

            if (expense.type === 'income') {
                acc[yearMonth].income += parseFloat(expense.amount);
                } else {
                acc[yearMonth].expense += parseFloat(expense.amount);
                }

                return acc;
            }, {});
        };
        
        const destroyChart = (chartId) => {
            const chartCanvas = document.getElementById(chartId);
            if (chartCanvas) {
                Chart.getChart(chartCanvas)?.destroy();
            }
        };
        
        const renderChart = (chartId, type, data, options = {}) => {
            const chartCanvas = document.getElementById(chartId);
            if (chartCanvas) {
                new Chart(chartCanvas, {
                    type: type,
                    data: data,
                    options: options
                });
            }
        };
        
        // const generatePDF = () => {
        //     const graphsContainer = document.querySelector('.graph-container');
        //     if (!graphsContainer) return;
        
        //     html2canvas(graphsContainer)
        //         .then(canvas => {
        //             const imgData = canvas.toDataURL('image/png');
        //             const pdf = new jsPDF('p', 'mm', 'a4');
        //             const imgWidth = 210;
        //             const imgHeight = (canvas.height * imgWidth) / canvas.width;
        //             pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        //             pdf.save('graphs.pdf');
        //         })
        //         .catch(error => {
        //             console.error('Error generating PDF:', error);
        //         });
        // };
        const generatePDF = () => {
            const graphs = document.querySelectorAll('.graph');
            if (!graphs.length) return;
        
            const promises = Array.from(graphs).map(graph => html2canvas(graph));
        
            Promise.all(promises)
                .then(canvases => {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    canvases.forEach(canvas => {
                        const imgData = canvas.toDataURL('image/png');
                        const imgWidth = 210;
                        const imgHeight = (canvas.height * imgWidth) / canvas.width;
                        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                        pdf.addPage();
                    });
                    pdf.deletePage(pdf.internal.getNumberOfPages());
                    pdf.save('graphs.pdf');
                })
                .catch(error => {
                    console.error('Error generating PDF:', error);
                });
        };
        
        const handleMonthChange = (e) => {
            setFilterMonth(e.target.value);
        };
        
        const handleYearChange = (e) => {
            setFilterYear(e.target.value);
        };
        
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="row">
                        <div className="col">
                            <h2 className="mb-4">Expenses Analysis</h2>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <select className="form-control" value={filterMonth} onChange={handleMonthChange}>
                                        <option value="">Select Month</option>
                                        {moment.months().map((month, index) => (
                                            <option key={index} value={index + 1}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <select className="form-control" value={filterYear} onChange={handleYearChange}>
                                        <option value="">Select Year</option>
                                        {Array.from({ length: 10 }, (_, i) => moment().year() - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <div className="graph-container">
                                    <div className="graph-wrapper">
                                        <p className="graph-title h4 text-center text-primary">Income vs Expenses</p>
                                        <canvas id={CHART_IDS.PIE_CHART} className="graph"></canvas>
                                        <p className="graph-title h4 text-center text-primary">Amount vs Description</p>
                                        <canvas id={CHART_IDS.BAR_CHART} className="graph"></canvas>
                                        <p className="graph-title h4 text-center text-primary">Expenses vs Date</p>
                                        <canvas id={CHART_IDS.LINE_CHART} className="graph"></canvas>
                                        <p className="graph-title h4 text-center text-primary">Month vs Expenses</p>
                                        <canvas id={CHART_IDS.MONTH_VS_EXPENSES_BAR_CHART} className="graph"></canvas>
                                        <p className="graph-title h4 text-center text-primary">Savings Over Time</p>
                                        <canvas id={CHART_IDS.SAVINGS_OVER_TIME_CHART} className="graph"></canvas>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-primary" onClick={generatePDF}>Download Graphs as PDF</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    export default ExpensesGraph;