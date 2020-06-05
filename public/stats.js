fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let lastWeek = [];
    for (let i = data.length - 1; i > data.length - 8; i--) {
      lastWeek.unshift(data[i]);
      populateChart(lastWeek);
    }
    console.log(lastWeek);
  });

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];
  return arr;
}

function populateChart(data) {
  let labels = label(data);
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  let workoutsDuration = workoutDuration(data);
  let workoutData = workoutPound(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total daily workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      events: ["click"],
      responsive: true,
      title: {
        display: true,
        text: "Exercise duration",
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total daily pounds lifted",
          data: pounds,
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      events: ["click"],
      responsive: true,
      title: {
        display: true,
        text: "Pounds Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises duration break down",
          backgroundColor: colors,
          data: workoutsDuration,
        },
      ],
    },
    options: {
      events: ["click"],
      responsive: true,
      title: {
        display: true,
        text: "Exercises duration break down",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workoutData.workoutLabels,
      datasets: [
        {
          label: "Pounds lifted break down",
          backgroundColor: colors,
          data: workoutData.workoutPounds,
        },
      ],
    },
    options: {
      events: ["click"],
      responsive: true,
      title: {
        display: true,
        text: "Pounds lifted break down",
      },
    },
  });
}

function label(data) {
  let labels = [];
  data.forEach((workout) => {
    labels.push(workout.day);
  });

  return labels.map((label) =>
    new Date(label).toLocaleString("en-us", { weekday: "long" })
  );
}

function duration(data) {
  let durations = [];

  data.forEach((workout) => {
    let totalDuration = 0;
    workout.exercises.forEach((exercise) => {
      totalDuration = totalDuration + exercise.duration;
    });
    durations.push(totalDuration);
  });

  return durations;
}

function calculateTotalWeight(data) {
  let pounds = [];

  data.forEach((workout) => {
    let totalPound = 0;
    workout.exercises.forEach((exercise) => {
      if (exercise.weight) {
        totalPound =
          totalPound + exercise.weight * exercise.sets * exercise.reps;
      }
    });
    pounds.push(totalPound);
  });

  return pounds;
}

function workoutNames(data) {
  let workouts = [];
  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}

function workoutDuration(data) {
  let workoutsDuration = [];
  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workoutsDuration.push(exercise.duration);
    });
  });

  return workoutsDuration;
}

function workoutPound(data) {
  let workoutPounds = [];
  let workoutLabels = [];
  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.weight) {
        workoutPounds.push(exercise.weight);
        workoutLabels.push(exercise.name);
      }
    });
  });

  return { workoutPounds: workoutPounds, workoutLabels: workoutLabels };
}
