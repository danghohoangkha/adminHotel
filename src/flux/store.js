import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
  menuVisible: false,
  navItems: localStorage.getItem('ChucVu').toString() === '1' ? getSidebarNavItems() : localStorage.getItem('ChucVu')=== '2' ? 
  [{
    title: "Thong Ke Doanh Thu",
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: "/Revenue",
  }] : [{
    title : "Tạo hóa đơn",
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: "CreateOrder"
  }]
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    console.log(localStorage.getItem('ChucVu  '))
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
