import api from '../api';
import { getLocation } from '../helpers';

interface IStore {
  acitveDate: number;
  activeCity: string;
  // TODO add type
  wheather: any;
}

export default class Model {
  static instance: Model;

  private store: IStore = {
    acitveDate: (new Date).getDate(),
    activeCity: '',
    wheather: null,
  };
  private observers = [];

  constructor() {
    // implementing SingleTone
    if (!Model.instance) {
      Model.instance = this;

      getLocation((location: any) => {
        const { latitude, longitude } = location.coords;
        const query = `${latitude},${longitude}`;

        this.fetchData(query);
      });
    }

    return Model.instance;
  }

  public addObserver(observer): void {
    this.observers.push(observer);
  }
  private dispatch(state: IStore): void {
    this.observers.forEach(observer => {
      observer.render(state);
    });
  };

  private fetchData(query?: string ): void {
    const { activeCity } = this.state;
    api
      .getWeatherData(query || this.state.activeCity)
      .then(result => this.updateWheather(result));
  }

  public get state(): IStore {
    return this.store;
  }

  public updateActiveDate(date: number): void {
    const newState = { ...this.state, acitveDate: date };
    this.updateState(newState);
    this.dispatch(newState);
  }

  public updateActiveCity(cityName: string): void {
    this.updateState({ ...this.state, activeCity: cityName });
    this.fetchData();
  }

  public updateWheather(data: any): void {
    const newState = { ...this.state, wheather: data };
    this.updateState(newState);
    this.dispatch(newState);
  }

  private updateState = (newState: IStore): void => {
    this.store = newState;
  }
}
