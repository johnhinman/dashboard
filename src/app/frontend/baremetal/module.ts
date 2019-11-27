import {NgModule} from '@angular/core';

import {ComponentsModule} from '../common/components/module';
import {SharedModule} from '../shared.module';

import {BaremetalRoutingModule} from './routing';
import {BaremetalDetailComponent} from './detail/component';
import {BaremetalListComponent} from './list/component';
import {BaremetalObjectDetailComponent} from './baremetalobject/component';

@NgModule({
  imports: [SharedModule, ComponentsModule, BaremetalRoutingModule],
  declarations: [BaremetalListComponent, BaremetalDetailComponent, BaremetalObjectDetailComponent],
})
export class BaremetalModule {}
