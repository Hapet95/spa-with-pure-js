export default class Dropdown {
  protected controller;
  protected container: HTMLElement;
  static cities = [
    {
      name: 'Yerevan',
      data: '40.1792,44.4991'
    },
    {
      name: 'Moscow',
      data: '55.7558,37.6173'
    },
    {
      name: 'Paris',
      data: '48.8566,2.3522'
    },
    {
      name: 'Rome',
      data: '41.9028,12.4964'
    },
  ];

  constructor(controller) {
    this.controller = controller;
    this.container = document.getElementById('top-bar');
    this.render(this.controller.model.state);
    this.controller.model.addObserver(this);
  }

  private clickHandler = (e: Event): void => {
   this.controller.changeActiveCity((e.target as any).value);
  }

  public render(state): void {
    const { container } = this;
    container.innerHTML = '';

    const select: HTMLElement = document.createElement('SELECT');
    select.addEventListener('change', this.clickHandler);

    Dropdown.cities.forEach(city => {
      const option = document.createElement('option');
      option.setAttribute('value', city.data);
      if (city.data === state.activeCity) {
        option.selected = true;
      }
      option.innerHTML = city.name;
      select.appendChild(option);
    });
    container.appendChild(select);
  }
}
