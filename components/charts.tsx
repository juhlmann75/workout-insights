import React, {ForwardedRef, useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {useLiveQuery} from "dexie-react-hooks";
import {workoutDB} from "../models/workoutDB";
import FileUpload from "./fileUpload";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Charts() {

    const labels = useLiveQuery(async () => workoutDB.workoutData.orderBy('exerciseName').uniqueKeys());
    const exerciseCount = new Map<string, {count: number}>();
    const labelCount = useLiveQuery(async () => workoutDB.workoutData.orderBy('exerciseName').each(workout => {

        if (exerciseCount.has(workout.exerciseName)) {
            // @ts-ignore
            exerciseCount.get(workout.exerciseName).count++;
        }
        else {
            exerciseCount.set(workout.exerciseName, {count: 1});
        }
    }).then(() => {
        return Array.from(exerciseCount.values());
    }));

    if ((!labels || labels === undefined) || (!labelCount || labelCount === undefined)) {
        return (
            <div className="box-content md:mx-auto p-4">
                <FileUpload></FileUpload>
            </div>
        )
    }

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Exercise Frequency',
                data: labelCount.map((count) => count.count),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    console.log(labelCount);

    return (
        <div>
            <Bar options={options} data={data}/>
        </div>
    )

}
