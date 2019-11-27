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

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaremetalObject, BaremetalObjectList} from '@api/backendapi';
import {ResourceListBase} from '../../../resources/list';
import {NamespacedResourceService} from '../../../services/resource/resource';
import {NotificationsService} from '../../../services/global/notifications';
import {ActivatedRoute} from '@angular/router';
import {ListGroupIdentifier, ListIdentifier} from '../groupids';
import {MenuComponent} from '../../list/column/menu/component';

@Component({
  selector: 'kd-baremetal-object-list',
  templateUrl: './template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaremetalObjectListComponent extends ResourceListBase<
  BaremetalObjectList,
  BaremetalObject
> {
  @Input() endpoint: string;
  @Input() baremetalName: string;

  constructor(
    private readonly baremetalObject_: NamespacedResourceService<BaremetalObjectList>,
    notifications: NotificationsService,
    private readonly activatedRoute_: ActivatedRoute,
    cdr: ChangeDetectorRef,
  ) {
    super(`baremetalhost/${activatedRoute_.snapshot.params.baremetalName}`, notifications, cdr);
    this.id = ListIdentifier.baremetalObject;
    this.groupId = ListGroupIdentifier.none;

    // Register action columns.
    this.registerActionColumn<MenuComponent>('menu', MenuComponent);
  }

  getResourceObservable(params?: HttpParams): Observable<BaremetalObjectList> {
    return this.baremetalObject_.get(this.endpoint, undefined, undefined, params);
  }

  map(baremetalObjectList: BaremetalObjectList): BaremetalObject[] {
    return baremetalObjectList.items;
  }

  getDisplayColumns(): string[] {
    return ['name', 'namespace', 'age'];
  }
}
