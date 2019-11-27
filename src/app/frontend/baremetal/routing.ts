// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

import {BaremetalDetailComponent} from './detail/component';
import {BaremetalListComponent} from './list/component';
import {BaremetalObjectDetailComponent} from './baremetalobject/component';
import {DEFAULT_ACTIONBAR, PIN_DEFAULT_ACTIONBAR} from '../common/components/actionbars/routing';
import {SCALE_DEFAULT_ACTIONBAR} from '../common/components/actionbars/routing';

const BAREMETAL_LIST_ROUTE: Route = {
  path: '',
  children: [
    {
      path: '',
      component: BaremetalListComponent,
      data: {breadcrumb: 'Baremetal Hosts'},
    },
    DEFAULT_ACTIONBAR,
  ],
};

const BAREMETAL_DETAIL_ROUTE: Route = {
  path: '',
  children: [
    {
      path: ':baremetalName',
      component: BaremetalDetailComponent,
      data: {breadcrumb: '{{ baremetalName }}', parent: BAREMETAL_LIST_ROUTE.children[0]},
    },
    PIN_DEFAULT_ACTIONBAR,
  ],
};

const BAREMETAL_NAMESPACED_OBJECT_DETAIL_ROUTE: Route = {
  path: ':baremetalName/:namespace/:objectName',
  children: [
    {
      path: '',
      component: BaremetalObjectDetailComponent,
      data: {
        breadcrumb: '{{ objectName }}',
        routeParamsCount: 2,
        parent: BAREMETAL_DETAIL_ROUTE.children[0],
      },
    },
    SCALE_DEFAULT_ACTIONBAR,
  ],
};

const BAREMETAL_CLUSTER_OBJECT_DETAIL_ROUTE: Route = {
  path: ':baremetalName/:objectName',
  children: [
    {
      path: '',
      component: BaremetalObjectDetailComponent,
      data: {
        breadcrumb: '{{ objectName }}',
        routeParamsCount: 1,
        parent: BAREMETAL_DETAIL_ROUTE.children[0],
      },
    },
    SCALE_DEFAULT_ACTIONBAR,
  ],
};

@NgModule({
  imports: [
    RouterModule.forChild([
      BAREMETAL_LIST_ROUTE,
      BAREMETAL_DETAIL_ROUTE,
      BAREMETAL_NAMESPACED_OBJECT_DETAIL_ROUTE,
      BAREMETAL_CLUSTER_OBJECT_DETAIL_ROUTE,
    ]),
  ],
})
export class BaremetalRoutingModule {}
