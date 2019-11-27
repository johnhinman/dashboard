// Copyright 2017 The Kubernetes Authors.
// Copyright 2019 Intel, Corp.
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

import {HttpParams} from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BaremetalList, BaremetalHost} from '@api/backendapi';

import {ResourceListWithStatuses} from '../../../resources/list';
import {NotificationsService} from '../../../services/global/notifications';
import {EndpointManager, Resource} from '../../../services/resource/endpoint';
import {ResourceService} from '../../../services/resource/resource';
import {MenuComponent} from '../../list/column/menu/component';
import {ListGroupIdentifier, ListIdentifier} from '../groupids';

@Component({
  selector: 'kd-baremetal-list',
  templateUrl: './template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaremetalListComponent extends ResourceListWithStatuses<BaremetalList, BaremetalHost> {
  @Input() endpoint = EndpointManager.resource(Resource.baremetalhost).list();

  constructor(
    private readonly baremetal_: ResourceService<BaremetalList>,
    notifications: NotificationsService,
    cdr: ChangeDetectorRef,
  ) {
    super(Resource.baremetalhost, notifications, cdr);
    this.id = ListIdentifier.baremetal;
    this.groupId = ListGroupIdentifier.none;

    // Register action columns.
    this.registerActionColumn<MenuComponent>('menu', MenuComponent);

    // Register status icon handlers
    this.registerBinding(this.icon.checkCircle, 'kd-success', this.isInSuccessState);
    this.registerBinding(this.icon.help, 'kd-muted', this.isInUnknownState);
    this.registerBinding(this.icon.error, 'kd-error', this.isInErrorState);
  }

  isNamespaced(baremetal: BaremetalHost): string {
    return baremetal.scope === 'Namespaced' ? 'True' : 'False';
  }

  getResourceObservable(params?: HttpParams): Observable<BaremetalList> {
    return this.baremetal_.get(this.endpoint, undefined, params);
  }

  map(baremetalList: BaremetalList): BaremetalHost[] {
    return baremetalList.items;
  }

  isInErrorState(resource: BaremetalHost): boolean {
    return resource.established === 'False';
  }

  isInUnknownState(resource: BaremetalHost): boolean {
    return resource.established === 'Unknown';
  }

  isInSuccessState(resource: BaremetalHost): boolean {
    return resource.established === 'True';
  }

  getDisplayColumns(): string[] {
    return ['statusicon', 'name', 'group', 'fullName', 'namespaced', 'age'];
  }
}
