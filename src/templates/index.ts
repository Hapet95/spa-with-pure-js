export function renderDetailedTemplate(name, forecast): string {
  return `
  <div class="detailed">
    <div>${name} - ${forecast.date}</div>
    <div>${forecast.text}</div>
    <div>☼ ${forecast.high}</div>
    <div>☾ ${forecast.low}</div>
  </div>
  `;
}
