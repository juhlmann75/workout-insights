import Dexie, { Table } from 'dexie';
import {WorkoutData} from "./workoutData";

export class WorkoutDB extends Dexie {

    workoutData!: Table<WorkoutData, number>;

    constructor() {
        super('workoutDB');
        this.version(1).stores({
            workoutData: '++id',
        });
    }
}

export const workoutDB = new WorkoutDB();