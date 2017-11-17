import { getUpcomingDays, getCurrentForecast } from '../helpers';

export default class DaysView {
  protected controller;
  protected container: HTMLElement;

  constructor(controller) {
    this.controller = controller;
    this.container = document.getElementById('days-bar');
    this.render(this.controller.model.state);
    this.controller.model.addObserver(this);
  }

  private clickHandlerFactory = (date: number) => (e: Event): void => {
    this.controller.changeActiveDate(date);
  }

  public render(state): void {
    const { container } = this;

    container.innerHTML = '';
    getUpcomingDays()
      .forEach((dateObject) => {
        const block = document.createElement('DIV');
        if (dateObject.date === state.acitveDate) {
          block.classList.add('active');
        }

        let temperatures = '';

        if (state.wheather) {
          const currentForecast = getCurrentForecast(state.wheather.item.forecast, dateObject.date);
          temperatures = `
            <div><div>${currentForecast.low}° F</div>,
            <div>${currentForecast.high}° F</div></div>
          `;
        }

        block.addEventListener('click', this.clickHandlerFactory(dateObject.date));
        block.innerHTML = `
          <div>${dateObject.date}</div>
          <div>${dateObject.day}</div>
          ${temperatures}
        `;
        container.appendChild(block);
      });
  }
}
