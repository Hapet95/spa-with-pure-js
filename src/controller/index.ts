export default class Controller {
  public model;

  constructor(model) {
      this.model = model;
  }

  public changeActiveDate = (date: number): void => {
    if (date !== this.model.state.acitveDate) {
      this.model.updateActiveDate(date);
    }
  }

  public changeActiveCity = (data: string): void => {
      this.model.updateActiveCity(data);
  }
}
