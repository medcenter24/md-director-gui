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

import {Component, ViewChild, HostListener, Input, ElementRef} from '@angular/core';
declare var $: any;

@Component({
  selector: 'ba-back-top',
  styleUrls: ['./baBackTop.scss'],
  template: `
    <i #baBackTop class="fa fa-angle-up back-top ba-back-top" title="{{ 'Back to Top' | translate }}"></i>
  `
})
export class BaBackTop {

  @Input() position:number = 400;
  @Input() showSpeed:number = 500;
  @Input() moveSpeed:number = 1000;

  @ViewChild('baBackTop') _selector:ElementRef;

  ngAfterViewInit () {
    this._onWindowScroll();
  }

  @HostListener('click')
  _onClick():boolean {
    $('html, body').animate({scrollTop:0}, {duration:this.moveSpeed});
    return false;
  }

  @HostListener('window:scroll')
  _onWindowScroll():void {
    let el = this._selector.nativeElement;
    window.scrollY > this.position ? $(el).fadeIn(this.showSpeed) : $(el).fadeOut(this.showSpeed);
  }
}
