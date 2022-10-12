import {parse} from "csv-parse";
import {WorkoutData} from "../models/workoutData";
import {workoutDB} from "../models/workoutDB";

export function saveWorkoutFile() {
    const headers = ['Date', 'Workout Name', 'Duration', 'Exercise Name', 'Set Order', 'Weight', 'Reps', 'Distance', 'Seconds', 'Notes', 'Workout Notes', 'RPE'];
    let fileReader = new FileReader();
    let fileObject = document.getElementById('workoutFile') as HTMLInputElement | null;

    if (fileObject != null) {
        let file = fileObject.files;
        if (file != null && file.length > 0) {
            fileReader.readAsText(file[0]);
            fileReader.onload = (() => {
                if (fileReader.result != null) {
                    parse(fileReader.result as Buffer, {
                        delimiter: ',',
                        columns: headers,
                    }, (error, result: WorkoutData[]) => {
                        if (error) {
                            console.log(error);
                        }
                        saveDataInIndexDB(result).then(r => console.log('success!'));
                    });
                }
            });
        }
    }
}

export async function saveDataInIndexDB(data: WorkoutData[]) {
    if (data) {
        data.shift();
        if (workoutDB.workoutData) workoutDB.workoutData.clear();
        await workoutDB.workoutData.bulkAdd(data);
    }
}
