// // src/pages/Dashboard/StateAnalytics.js
// import React, { useEffect } from 'react';

// const StateAnalytics = ({ selectedState }) => {
//     useEffect(() => {
//         if (selectedState) {
//             loadGoogleCharts();
//         }
//     // eslint-disable-next-line no-use-before-define
//     }, [loadGoogleCharts, selectedState]);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const loadGoogleCharts = () => {
//         const script = document.createElement('script');
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.onload = () => {
//             window.google.charts.load('current', { packages: ['corechart'] });
//             window.google.charts.setOnLoadCallback(drawCharts);
//         };
//         document.body.appendChild(script);
//     };

//     const generateRandomSalesData = () => {
//         // Generate random sales data for crops
//         const crops = ['Paddy', 'Wheat', 'Flour', 'Sugar Cane', 'Pineapple'];
//         return crops.map(crop => [crop, Math.floor(Math.random() * 100) + 1]);
//     };

//     const generateMonthlySalesData = () => {
//         // Generate random monthly sales data based on the selected state
//         const months = [
//             'January', 'February', 'March', 'April', 'May', 
//             'June', 'July', 'August', 'September', 'October', 
//             'November', 'December'
//         ];

//         // Use a unique seed based on the selected state to generate different random data
//         const seed = selectedState.charCodeAt(0); // Simple seed based on the first character
//         return months.map(month => [month, Math.floor(Math.random() * (100 + seed)) + 1]);
//     };

//     const calculateYearlySales = (monthlyData) => {
//         return monthlyData.reduce((total, monthData) => total + monthData[1], 0);
//     };

//     const drawCharts = () => {
//         const cropData = generateRandomSalesData();
//         const monthlyData = generateMonthlySalesData();
//         const yearlySales = calculateYearlySales(monthlyData);

//         drawPieChart(cropData);
//         drawBarChart(cropData);
//         drawLineChart(cropData);
//         drawMonthlyChart(monthlyData);
//         drawYearlyChart(yearlySales);
//     };

//     const drawPieChart = (cropData) => {
//         const data = window.google.visualization.arrayToDataTable([
//             ['Crop', 'Sales'],
//             ...cropData
//         ]);
//         const options = { title: `${selectedState} Crop Sales Distribution` }; // Fixed string interpolation
//         const chart = new window.google.visualization.PieChart(document.getElementById('piechart'));
//         chart.draw(data, options);
//     };

//     const drawBarChart = (cropData) => {
//         const data = window.google.visualization.arrayToDataTable([
//             ['Crop', 'Sales'],
//             ...cropData
//         ]);
//         const options = {
//             title: `${selectedState} Crop Sales Bar Chart`, // Fixed string interpolation
//             hAxis: { title: 'Crops' },
//             vAxis: { title: 'Sales' }
//         };
//         const chart = new window.google.visualization.BarChart(document.getElementById('barchart'));
//         chart.draw(data, options);
//     };

//     const drawLineChart = (cropData) => {
//         const data = window.google.visualization.arrayToDataTable([
//             ['Crops', 'Sales'],
//             ...cropData
//         ]);
//         const options = {
//             title: `${selectedState} Crop Sales Line Chart`, // Fixed string interpolation
//             curveType: 'function',
//             legend: { position: 'bottom' }
//         };
//         const chart = new window.google.visualization.LineChart(document.getElementById('linechart'));
//         chart.draw(data, options);
//     };

//     const drawMonthlyChart = (monthlyData) => {
//         const data = window.google.visualization.arrayToDataTable([
//             ['Month', 'Sales'],
//             ...monthlyData
//         ]);
//         const options = {
//             title: `${selectedState} Monthly Sales`, // Fixed string interpolation
//             hAxis: { title: 'Month' },
//             vAxis: { title: 'Sales' }
//         };
//         const chart = new window.google.visualization.ColumnChart(document.getElementById('monthlychart'));
//         chart.draw(data, options);
//     };

//     const drawYearlyChart = (yearlySales) => {
//         const data = window.google.visualization.arrayToDataTable([
//             ['Year', 'Sales'],
//             ['Total Yearly Sales', yearlySales]
//         ]);
//         const options = {
//             title: `${selectedState} Total Yearly Sales`, // Fixed string interpolation
//             hAxis: { title: 'Year' },
//             vAxis: { title: 'Sales' }
//         };
//         const chart = new window.google.visualization.BarChart(document.getElementById('yearlychart'));
//         chart.draw(data, options);
//     };

//     if (!selectedState) return <p>Please select a state to view analytics.</p>;

//     return (
//         <div className="state-analytics">
//             <h2>{selectedState} Crop Sales Analytics</h2>
//             <div id="piechart" style={{ width: '100%', height: '400px' }}></div>
//             <div id="barchart" style={{ width: '100%', height: '400px' }}></div>
//             <div id="linechart" style={{ width: '100%', height: '400px' }}></div>
//             <div id="monthlychart" style={{ width: '100%', height: '400px' }}></div>
//             <div id="yearlychart" style={{ width: '100%', height: '400px' }}></div>
//         </div>
//     );
// };

// export default StateAnalytics;

// src/pages/Dashboard/StateAnalytics.js
import React, { useEffect } from 'react';

const StateAnalytics = ({ selectedState }) => {

  useEffect(() => {
    if (!selectedState) return;

    // -------------------------
    // 1️⃣ Load Google Charts script
    // -------------------------
    const loadGoogleCharts = () => {
      const existingScript = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(drawCharts);
        };
        document.body.appendChild(script);
      } else {
        // If already loaded, just draw charts
        window.google.charts.setOnLoadCallback(drawCharts);
      }
    };

    // -------------------------
    // 2️⃣ Chart drawing helpers
    // -------------------------
    const generateRandomSalesData = () => {
      const crops = ['Paddy', 'Wheat', 'Flour', 'Sugar Cane', 'Pineapple'];
      return crops.map(crop => [crop, Math.floor(Math.random() * 100) + 1]);
    };

    const generateMonthlySalesData = () => {
      const months = [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
      ];
      const seed = selectedState.charCodeAt(0); // simple seed per state
      return months.map(month => [month, Math.floor(Math.random() * (100 + seed)) + 1]);
    };

    const calculateYearlySales = (monthlyData) => monthlyData.reduce((total, m) => total + m[1], 0);

    // -------------------------
    // 3️⃣ Draw all charts
    // -------------------------
    const drawCharts = () => {
      const cropData = generateRandomSalesData();
      const monthlyData = generateMonthlySalesData();
      const yearlySales = calculateYearlySales(monthlyData);

      drawPieChart(cropData);
      drawBarChart(cropData);
      drawLineChart(cropData);
      drawMonthlyChart(monthlyData);
      drawYearlyChart(yearlySales);
    };

    const drawPieChart = (dataArray) => {
      const data = window.google.visualization.arrayToDataTable([['Crop', 'Sales'], ...dataArray]);
      const chart = new window.google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, { title: `${selectedState} Crop Sales Distribution` });
    };

    const drawBarChart = (dataArray) => {
      const data = window.google.visualization.arrayToDataTable([['Crop', 'Sales'], ...dataArray]);
      const chart = new window.google.visualization.BarChart(document.getElementById('barchart'));
      chart.draw(data, {
        title: `${selectedState} Crop Sales Bar Chart`,
        hAxis: { title: 'Crops' },
        vAxis: { title: 'Sales' }
      });
    };

    const drawLineChart = (dataArray) => {
      const data = window.google.visualization.arrayToDataTable([['Crop', 'Sales'], ...dataArray]);
      const chart = new window.google.visualization.LineChart(document.getElementById('linechart'));
      chart.draw(data, {
        title: `${selectedState} Crop Sales Line Chart`,
        curveType: 'function',
        legend: { position: 'bottom' }
      });
    };

    const drawMonthlyChart = (dataArray) => {
      const data = window.google.visualization.arrayToDataTable([['Month', 'Sales'], ...dataArray]);
      const chart = new window.google.visualization.ColumnChart(document.getElementById('monthlychart'));
      chart.draw(data, {
        title: `${selectedState} Monthly Sales`,
        hAxis: { title: 'Month' },
        vAxis: { title: 'Sales' }
      });
    };

    const drawYearlyChart = (yearlySales) => {
      const data = window.google.visualization.arrayToDataTable([
        ['Year', 'Sales'],
        ['Total Yearly Sales', yearlySales]
      ]);
      const chart = new window.google.visualization.BarChart(document.getElementById('yearlychart'));
      chart.draw(data, {
        title: `${selectedState} Total Yearly Sales`,
        hAxis: { title: 'Year' },
        vAxis: { title: 'Sales' }
      });
    };

    // -------------------------
    // 4️⃣ Trigger chart loading
    // -------------------------
    loadGoogleCharts();

  }, [selectedState]); // ✅ runs only when selectedState changes

  if (!selectedState) return <p>Please select a state to view analytics.</p>;

  // -------------------------
  // 5️⃣ Render chart containers
  // -------------------------
  return (
    <div className="state-analytics">
      <h2>{selectedState} Crop Sales Analytics</h2>
      <div id="piechart" style={{ width: '100%', height: '400px' }}></div>
      <div id="barchart" style={{ width: '100%', height: '400px' }}></div>
      <div id="linechart" style={{ width: '100%', height: '400px' }}></div>
      <div id="monthlychart" style={{ width: '100%', height: '400px' }}></div>
      <div id="yearlychart" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default StateAnalytics;