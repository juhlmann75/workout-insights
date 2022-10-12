import React from 'react';
import {Bar} from 'react-chartjs-2';
import {useLiveQuery} from "dexie-react-hooks";
import {workoutDB} from "../models/workoutDB";
import FileUpload from "./fileUpload";

export default function Charts() {
    const workoutData = useLiveQuery(async () => {
        return workoutDB.workoutData.toArray();
    });

    if (!workoutData || workoutData.length == 0) {
        return (
            <div className="box-content md:mx-auto p-4">
                <FileUpload></FileUpload>
            </div>
        )
    }

    return (
        <div>
            Display Charts Here
        </div>
    )

}
