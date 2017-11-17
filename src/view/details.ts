import { getCurrentForecast } from '../helpers';
import { renderDetailedTemplate } from '../templates';

export default class DetailsView {
  protected controller;
  protected container: HTMLElement;

  constructor(controller) {
    this.controller = controller;
    this.container = document.getElementById('details');
    this.render(this.controller.model.state);
    this.controller.model.addObserver(this);
  }

  public render(state): void {
    const { container } = this;

    if (!state.wheather) {
      container.innerHTML = 'Waiting for response...';
      return;
    }

    const { city, country } = state.wheather.location;
    const detailedContent = renderDetailedTemplate(
      `${city}, ${country}`,
      getCurrentForecast(state.wheather.item.forecast, state.acitveDate)
    );


    container.innerHTML = detailedContent;
  }
}
