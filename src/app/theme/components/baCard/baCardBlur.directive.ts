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

import {Directive, ElementRef, HostListener, HostBinding} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';

import {BaCardBlurHelper} from './baCardBlurHelper.service';
import {BgMetrics} from './bgMetrics';

@Directive({
  selector: '[baCardBlur]',
  providers: [BaCardBlurHelper]
})
export class BaCardBlur {

  @HostBinding('class.card-blur') isEnabled:boolean = false;

  private _bodyBgSize:BgMetrics;

  constructor(private _baConfig:BaThemeConfigProvider, private _baCardBlurHelper:BaCardBlurHelper, private _el:ElementRef) {
    if (this._isEnabled()) {
      this._baCardBlurHelper.init();
      this._getBodyImageSizesOnBgLoad();
      this._recalculateCardStylesOnBgLoad();

      this.isEnabled = true;
    }
  }

  @HostListener('window:resize')
  _onWindowResize():void {
    if (this._isEnabled()) {
      this._bodyBgSize = this._baCardBlurHelper.getBodyBgImageSizes();
      this._recalculateCardStyle();
    }
  }

  private _getBodyImageSizesOnBgLoad():void {
    this._baCardBlurHelper.bodyBgLoad().subscribe(() => {
      this._bodyBgSize = this._baCardBlurHelper.getBodyBgImageSizes();
    });
  }

  private _recalculateCardStylesOnBgLoad():void {
    this._baCardBlurHelper.bodyBgLoad().subscribe((event) => {
      setTimeout(this._recalculateCardStyle.bind(this));
    })
  }

  private _recalculateCardStyle():void {
    if (!this._bodyBgSize) {
      return;
    }
    this._el.nativeElement.style.backgroundSize = Math.round(this._bodyBgSize.width) + 'px ' + Math.round(this._bodyBgSize.height) + 'px';
    this._el.nativeElement.style.backgroundPosition = Math.floor(this._bodyBgSize.positionX) + 'px ' + Math.floor(this._bodyBgSize.positionY) + 'px';
  }

  private _isEnabled() {
    return this._baConfig.get().theme.name == 'blur';
  }
}
