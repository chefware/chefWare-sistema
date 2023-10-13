
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['18:00:00', '18:01:00', '18:02:00', '18:03:00', '18:04:00', '18:05:00', '18:06:00', '18:07:00'],
      datasets: [{
        label: '% de uso',
        data: [62, 50, 97, 43, 56, 65, 30, 69],
        borderWidth: 1,
        backgroundColor: (context) => {
            const background = [
                "#040454",
                "#555592"
            ]

            if(!context.chart.chartArea) {
                return;
            }

            const { ctx, data, chartArea: { top, bottom } } = context.chart;
            const gradientBackground = ctx.createLinearGradient(0, top, 0, bottom);
            gradientBackground.addColorStop(.5, background[0]);
            gradientBackground.addColorStop(1, background[1]);

            return gradientBackground;
        },
        fill: true,
        cubicInterpolationMode: 'monotone'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });