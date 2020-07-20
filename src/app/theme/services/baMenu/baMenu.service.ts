/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BaMenuService {
  menuItems = new BehaviorSubject<Object>([]);

  protected _currentMenuItem = {};

  constructor(private _router: Router) { }

  /**
   * Updates the routes in the menu
   *
   * @param {Routes} routes Type compatible with app.menu.ts
   */
  updateMenuByRoutes(routes: Routes) {
    const convertedRoutes = this.convertRoutesToMenus(_.cloneDeep(routes));
    this.menuItems.next(convertedRoutes);
  }

  convertRoutesToMenus(routes: Routes): any[] {
    const items = this._convertArrayToItems(routes);
    return this._skipEmpty(items);
  }

  getCurrentItem(): any {
    return this._currentMenuItem;
  }

  selectMenuItem(menuItems: any[]): any[] {
    const items = [];
    menuItems.forEach((item) => {
      this._selectItem(item);

      if (item.selected) {
        this._currentMenuItem = item;
      }

      if (item.children && item.children.length > 0) {
        item.children = this.selectMenuItem(item.children);
      }
      items.push(item);
    });
    return items;
  }

  protected _skipEmpty(items: any[]): any[] {
    const menu = [];
    items.forEach((item) => {
      let menuItem;
      if (item.skip) {
        if (item.children && item.children.length > 0) {
          menuItem = item.children;
        }
      } else {
        menuItem = item;
      }

      if (menuItem) {
        menu.push(menuItem);
      }
    });

    return [].concat.apply([], menu);
  }

  protected _convertArrayToItems(routes: any[], parent?: any): any[] {
    const items = [];
    routes.forEach((route) => {
      items.push(this._convertObjectToItem(route, parent));
    });
    return items;
  }

  protected _convertObjectToItem(object, parent?: any): any {
    let item: any = {};
    if (object.data && object.data.menu) {
      // this is a menu object
      item = object.data.menu;
      item.route = object;
      delete item.route.data.menu;
    } else {
      item.route = object;
      item.skip = true;
    }

    // we have to collect all paths to correctly build the url then
    if (Array.isArray(item.route.path)) {
      item.route.paths = item.route.path;
    } else {
      item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
      const hasPath = !!item.route.path;
      if (hasPath) {
        item.route.paths.push(item.route.path);
      }
    }

    if (object.children && object.children.length > 0) {
      item.children = this._convertArrayToItems(object.children, item);
    }

    const prepared = this._prepareItem(item);

    // if current item is selected or expanded - then parent is expanded too
    if ((prepared.selected || prepared.expanded) && parent) {
      parent.expanded = true;
    }

    return prepared;
  }

  protected _prepareItem(object: any): any {
    if (!object.skip) {
      object.target = object.target || '';
      object.pathMatch = object.pathMatch  || 'full';
      return this._selectItem(object);
    }

    return object;
  }

  protected _selectItem(object: any): any {
    object.selected = this._router
      .isActive(this._router.createUrlTree(object.route.paths), object.pathMatch === 'full');
    return object;
  }
}
