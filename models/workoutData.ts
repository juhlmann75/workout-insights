export interface WorkoutData {
    id?: number;
    date: string;
    workoutName: string;
    duration: string;
    exerciseName: string;
    setOrder: number;
    weight: number;
    reps: number;
    distance: number;
    seconds: number;
    notes?: string;
    workoutNotes?: string;
    rpe?: string
}