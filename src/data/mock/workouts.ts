import type { Workout } from "@/types";
import { getDaysAgo } from "@/lib/date-utils";

export const mockWorkouts: Workout[] = [
  {
    id: "w1",
    date: getDaysAgo(29),
    name: "Morning Lift",
    exercises: [
      {
        id: "e1",
        name: "Bench Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 10, weight: 135 },
          { setNumber: 2, reps: 8, weight: 155 },
          { setNumber: 3, reps: 6, weight: 175 },
        ],
      },
      {
        id: "e2",
        name: "Rows",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 10, weight: 95 },
          { setNumber: 2, reps: 8, weight: 115 },
          { setNumber: 3, reps: 8, weight: 115 },
        ],
      },
    ],
    createdAt: getDaysAgo(29) + "T07:00:00.000Z",
  },
  {
    id: "w2",
    date: getDaysAgo(28),
    name: "Evening Run",
    exercises: [
      {
        id: "e3",
        name: "Running",
        type: "cardio",
        cardioMetrics: { distance: 3.1, duration: 28, pace: 9.03 },
      },
    ],
    createdAt: getDaysAgo(28) + "T18:00:00.000Z",
  },
  {
    id: "w3",
    date: getDaysAgo(27),
    name: "Leg Day",
    exercises: [
      {
        id: "e4",
        name: "Squats",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 185 },
          { setNumber: 2, reps: 6, weight: 205 },
          { setNumber: 3, reps: 5, weight: 225 },
          { setNumber: 4, reps: 5, weight: 225 },
        ],
      },
      {
        id: "e5",
        name: "Deadlift",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 5, weight: 185 },
          { setNumber: 2, reps: 5, weight: 205 },
          { setNumber: 3, reps: 5, weight: 225 },
        ],
      },
    ],
    createdAt: getDaysAgo(27) + "T08:30:00.000Z",
  },
  {
    id: "w4",
    date: getDaysAgo(25),
    name: "Cycling Session",
    exercises: [
      {
        id: "e6",
        name: "Cycling",
        type: "cardio",
        cardioMetrics: { distance: 10, duration: 45, pace: 4.5 },
      },
    ],
    createdAt: getDaysAgo(25) + "T06:30:00.000Z",
  },
  {
    id: "w5",
    date: getDaysAgo(24),
    name: "Upper Body Push",
    exercises: [
      {
        id: "e7",
        name: "Overhead Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 10, weight: 65 },
          { setNumber: 2, reps: 8, weight: 85 },
          { setNumber: 3, reps: 6, weight: 95 },
        ],
      },
      {
        id: "e8",
        name: "Bench Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 155 },
          { setNumber: 2, reps: 6, weight: 175 },
          { setNumber: 3, reps: 5, weight: 185 },
        ],
      },
    ],
    createdAt: getDaysAgo(24) + "T07:15:00.000Z",
  },
  {
    id: "w6",
    date: getDaysAgo(22),
    name: "Morning Run",
    exercises: [
      {
        id: "e9",
        name: "Running",
        type: "cardio",
        cardioMetrics: { distance: 5, duration: 42, pace: 8.4 },
      },
    ],
    createdAt: getDaysAgo(22) + "T06:00:00.000Z",
  },
  {
    id: "w7",
    date: getDaysAgo(21),
    name: "Pull Day",
    exercises: [
      {
        id: "e10",
        name: "Deadlift",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 5, weight: 195 },
          { setNumber: 2, reps: 5, weight: 215 },
          { setNumber: 3, reps: 5, weight: 225 },
        ],
      },
      {
        id: "e11",
        name: "Rows",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 10, weight: 105 },
          { setNumber: 2, reps: 8, weight: 115 },
          { setNumber: 3, reps: 8, weight: 125 },
        ],
      },
    ],
    createdAt: getDaysAgo(21) + "T08:00:00.000Z",
  },
  {
    id: "w8",
    date: getDaysAgo(19),
    name: "Evening Cycle",
    exercises: [
      {
        id: "e12",
        name: "Cycling",
        type: "cardio",
        cardioMetrics: { distance: 8, duration: 35, pace: 4.38 },
      },
    ],
    createdAt: getDaysAgo(19) + "T17:30:00.000Z",
  },
  {
    id: "w9",
    date: getDaysAgo(18),
    name: "Chest and Shoulders",
    exercises: [
      {
        id: "e13",
        name: "Bench Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 155 },
          { setNumber: 2, reps: 6, weight: 175 },
          { setNumber: 3, reps: 5, weight: 185 },
          { setNumber: 4, reps: 5, weight: 185 },
        ],
      },
      {
        id: "e14",
        name: "Overhead Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 75 },
          { setNumber: 2, reps: 6, weight: 95 },
          { setNumber: 3, reps: 6, weight: 95 },
        ],
      },
    ],
    createdAt: getDaysAgo(18) + "T07:00:00.000Z",
  },
  {
    id: "w10",
    date: getDaysAgo(16),
    name: "Leg Day",
    exercises: [
      {
        id: "e15",
        name: "Squats",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 185 },
          { setNumber: 2, reps: 6, weight: 205 },
          { setNumber: 3, reps: 5, weight: 225 },
        ],
      },
      {
        id: "e16",
        name: "Deadlift",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 5, weight: 205 },
          { setNumber: 2, reps: 5, weight: 225 },
          { setNumber: 3, reps: 5, weight: 225 },
        ],
      },
    ],
    notes: "Felt strong today",
    createdAt: getDaysAgo(16) + "T08:00:00.000Z",
  },
  {
    id: "w11",
    date: getDaysAgo(14),
    name: "Long Run",
    exercises: [
      {
        id: "e17",
        name: "Running",
        type: "cardio",
        cardioMetrics: { distance: 6.2, duration: 55, pace: 8.87 },
      },
    ],
    createdAt: getDaysAgo(14) + "T07:00:00.000Z",
  },
  {
    id: "w12",
    date: getDaysAgo(12),
    name: "Upper Body",
    exercises: [
      {
        id: "e18",
        name: "Bench Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 160 },
          { setNumber: 2, reps: 6, weight: 180 },
          { setNumber: 3, reps: 5, weight: 190 },
        ],
      },
      {
        id: "e19",
        name: "Rows",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 10, weight: 115 },
          { setNumber: 2, reps: 8, weight: 125 },
          { setNumber: 3, reps: 8, weight: 125 },
        ],
      },
      {
        id: "e20",
        name: "Overhead Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 85 },
          { setNumber: 2, reps: 6, weight: 95 },
          { setNumber: 3, reps: 6, weight: 95 },
        ],
      },
    ],
    createdAt: getDaysAgo(12) + "T07:30:00.000Z",
  },
  {
    id: "w13",
    date: getDaysAgo(10),
    name: "Morning Run",
    exercises: [
      {
        id: "e21",
        name: "Running",
        type: "cardio",
        cardioMetrics: { distance: 4, duration: 34, pace: 8.5 },
      },
    ],
    createdAt: getDaysAgo(10) + "T06:15:00.000Z",
  },
  {
    id: "w14",
    date: getDaysAgo(8),
    name: "Heavy Squats",
    exercises: [
      {
        id: "e22",
        name: "Squats",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 5, weight: 205 },
          { setNumber: 2, reps: 5, weight: 215 },
          { setNumber: 3, reps: 5, weight: 225 },
          { setNumber: 4, reps: 5, weight: 225 },
        ],
      },
    ],
    notes: "New PR on working sets",
    createdAt: getDaysAgo(8) + "T08:00:00.000Z",
  },
  {
    id: "w15",
    date: getDaysAgo(6),
    name: "Cycling Session",
    exercises: [
      {
        id: "e23",
        name: "Cycling",
        type: "cardio",
        cardioMetrics: { distance: 7, duration: 30, pace: 4.29 },
      },
    ],
    createdAt: getDaysAgo(6) + "T17:00:00.000Z",
  },
  {
    id: "w16",
    date: getDaysAgo(4),
    name: "Push Day",
    exercises: [
      {
        id: "e24",
        name: "Bench Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 165 },
          { setNumber: 2, reps: 6, weight: 185 },
          { setNumber: 3, reps: 5, weight: 195 },
        ],
      },
      {
        id: "e25",
        name: "Overhead Press",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 85 },
          { setNumber: 2, reps: 6, weight: 95 },
          { setNumber: 3, reps: 6, weight: 100 },
        ],
      },
    ],
    createdAt: getDaysAgo(4) + "T07:00:00.000Z",
  },
  {
    id: "w17",
    date: getDaysAgo(2),
    name: "Morning Run",
    exercises: [
      {
        id: "e26",
        name: "Running",
        type: "cardio",
        cardioMetrics: { distance: 3.5, duration: 30, pace: 8.57 },
      },
    ],
    createdAt: getDaysAgo(2) + "T06:30:00.000Z",
  },
  {
    id: "w18",
    date: getDaysAgo(1),
    name: "Back and Legs",
    exercises: [
      {
        id: "e27",
        name: "Deadlift",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 5, weight: 205 },
          { setNumber: 2, reps: 5, weight: 225 },
          { setNumber: 3, reps: 5, weight: 225 },
        ],
      },
      {
        id: "e28",
        name: "Squats",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 8, weight: 185 },
          { setNumber: 2, reps: 6, weight: 205 },
          { setNumber: 3, reps: 5, weight: 215 },
        ],
      },
      {
        id: "e29",
        name: "Rows",
        type: "strength",
        sets: [
          { setNumber: 1, reps: 10, weight: 115 },
          { setNumber: 2, reps: 8, weight: 125 },
          { setNumber: 3, reps: 8, weight: 135 },
        ],
      },
    ],
    createdAt: getDaysAgo(1) + "T08:00:00.000Z",
  },
];
