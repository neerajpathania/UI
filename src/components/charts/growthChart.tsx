import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BlogReachChart = () => {
    // Dummy data for the chart
    const [reachData, setReachData] = useState<number[]>([150, 300, 500, 700, 1200, 1500, 1700]);
    const [dates, setDates] = useState<string[]>(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]);

    // You can fetch data from an API in a useEffect like this:
    // useEffect(() => {
    //   fetch('/api/blog-reach')
    //     .then(res => res.json())
    //     .then(data => {
    //       setReachData(data.reach);
    //       setDates(data.dates);
    //     });
    // }, []);

    const data = {
        labels: dates,
        datasets: [
            {
                label: "Blog Reach",
                data: reachData,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Blog Reach Over Time",
            },
        },
    };

    return (
        <div style={{ width: "400px", height: "300px" }}>
            <h5>Blog Reach Statistics (COMING SOON)</h5>
            <Line data={data} options={options} />
        </div>
    );
};

export default BlogReachChart;
