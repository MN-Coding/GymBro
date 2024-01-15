import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale} from "chart.js"; 
import 'chartjs-adapter-date-fns';
import { useParams, Link } from 'react-router-dom';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

Chart.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale); 

const calculate1RM = (weight, reps) => {
    return weight / (1.0278 - 0.0278 * reps);
}

const timestampToHourlyFormat = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const timestampToDailyFormat = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

const WorkoutDetails = () => {

    const handleClick = () => {
    };

    const title = useParams().title
    const {workouts} = useWorkoutsContext()
    const filtered = workouts.filter((w) => w.title === title).map((w) => {
        return {x: w.createdAt, y: calculate1RM(w.load, w.reps)}
    })
    const labels = filtered.map((w) => timestampToHourlyFormat(w.x))

  const data = {
    labels,
    datasets: [
      {
        label: '1 Rep Max (expected)',
        data: filtered,
        fill: false,
        borderColor: '#4287f5',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
            unit: 'day',
            displayFormats: {
              hour: 'yyyy-MM-dd',
            },
            tooltipFormat: 'yyyy-MM-dd',
            stepSize: 1,
        },
        title: {
            display: true,
            text: 'Time',
            color: 'grey',
            font: {
              size: 14,
            },
        },
      },
      y: {
        title: {
            display: true,
            text: 'Projected 1RM',
            color: 'grey',
            font: {
              size: 14,
            },
          },
        beginAtZero: true,
      },
    },
    legend: {
        display: true,
        position: 'top',
    },
  };

  return (
    <div className="wrapper">
        <Link to="/">
            <span class="material-symbols-outlined" onClick={handleClick}>arrow_back</span>
        </Link>
        <div className='exercise-details'>
            <h1>{title}</h1>
            <h2>Strength Over Time*</h2>
            <Line data={data} options={options} />
            <small>*based on expected 1RM max</small>
        </div>
    </div>
  );
};

export default WorkoutDetails;
  