import Model from './model';
import Controller from './controller';
import DaysView from './view/days';
import DetailsView from './view/details';
import Dropdown from './view/dropdown';

const model = new Model();
const controller = new Controller(model);
const detailsView = new DetailsView(controller);
const daysView = new DaysView(controller);
const dropdown = new Dropdown(controller);
