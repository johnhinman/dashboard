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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaremetalDetail} from '@api/backendapi';
import {Subscription} from 'rxjs';

import {ActionbarService, ResourceMeta} from '../../common/services/global/actionbar';
import {NotificationsService} from '../../common/services/global/notifications';
import {ResourceService} from '../../common/services/resource/resource';
import {EndpointManager, Resource} from '../../common/services/resource/endpoint';

@Component({selector: 'kd-baremetal-detail', templateUrl: './template.html'})
export class BaremetalDetailComponent implements OnInit, OnDestroy {
  private baremetalSubscription_: Subscription;
  private readonly endpoint_ = EndpointManager.resource(Resource.baremetalhost);
  baremetal: BaremetalDetail;
  baremetalObjectEndpoint: string;
  isInitialized = false;

  constructor(
    private readonly baremetal_: ResourceService<BaremetalDetail>,
    private readonly actionbar_: ActionbarService,
    private readonly activatedRoute_: ActivatedRoute,
    private readonly notifications_: NotificationsService,
  ) {}

  ngOnInit(): void {
    const {baremetalName} = this.activatedRoute_.snapshot.params;
    this.baremetalObjectEndpoint = EndpointManager.resource(Resource.baremetalhost, true).child(
      baremetalName,
      Resource.baremetalObject,
    );

    this.baremetalSubscription_ = this.baremetal_
      .get(this.endpoint_.detail(), baremetalName)
      .subscribe((d: BaremetalDetail) => {
        this.baremetal = d;
        this.notifications_.pushErrors(d.errors);
        this.actionbar_.onInit.emit(new ResourceMeta('Baremetal Host', d.objectMeta, d.typeMeta));
        this.isInitialized = true;
      });
  }

  ngOnDestroy(): void {
    this.baremetalSubscription_.unsubscribe();
    this.actionbar_.onDetailsLeave.emit();
  }
}
