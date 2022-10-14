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

    const exerciseCount = new Map<string, {exerciseName: string, count: number}>();
    const labelCount = useLiveQuery(async () => workoutDB.workoutData.orderBy('exerciseName').each(workout => {
        if (exerciseCount.has(workout.exerciseName)) {
            // @ts-ignore
            exerciseCount.get(workout.exerciseName).count++;
        }
        else {
            exerciseCount.set(workout.exerciseName, {exerciseName: workout.exerciseName, count: 1});
        }
    }).then(() => {
        return Array.from(exerciseCount.values());
    }));

    if (!labelCount || labelCount === undefined) {
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

    // @ts-ignore
    const sorted = new Map<number, {exerciseName: string, count: number}>([...labelCount.entries()].sort((a,b) => b[1].count - a[1].count));
    const sortedArray = Array.from(sorted.values());
    const labels = sortedArray.map((counts) => counts.exerciseName);
    const data = {
        labels,
        datasets: [
            {
                label: 'Exercise Frequency',
                data: sortedArray.map((count) => count.count),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data}/>
        </div>
    )

}
