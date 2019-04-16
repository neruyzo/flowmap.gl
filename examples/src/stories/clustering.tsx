/*
 * Copyright 2019 Teralytics
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { isLocationCluster } from '@flowmap.gl/cluster';
import { Flow, Location } from '@flowmap.gl/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ClusteringExample from '../components/ClusteringExample';
import pipe from '../utlis/pipe';
import { withFetchJson } from '../utlis/withFetch';
import withSheetsFetch from '../utlis/withSheetsFetch';
import withStats from '../utlis/withStats';

storiesOf('Clustering', module)
  .add(
    'basic',
    pipe(
      withStats,
      withFetchJson('locations', './data/locations.json'),
      withFetchJson('flows', './data/flows-2016.json'),
    )(({ locations, flows }: any) => (
      <ClusteringExample
        locations={locations}
        flows={flows}
        getLocationId={(loc: Location) => (isLocationCluster(loc) ? loc.id : loc.properties.abbr)}
        getLocationCentroid={(loc: Location) => (isLocationCluster(loc) ? loc.centroid : loc.properties.centroid)}
        getFlowOriginId={(flow: Flow) => flow.origin}
        getFlowDestId={(flow: Flow) => flow.dest}
        getFlowMagnitude={(flow: Flow) => +flow.count}
      />
    )),
  )
  .add(
    'NL commuters',
    pipe(
      withStats,
      withSheetsFetch('1Oe3zM219uSfJ3sjdRT90SAK2kU3xIvzdcCW6cwTsAuc'),
    )(({ locations, flows }: any) => (
      <ClusteringExample
        locations={locations}
        flows={flows}
        getLocationId={(loc: Location) => loc.id}
        getLocationCentroid={(loc: Location): [number, number] =>
          isLocationCluster(loc) ? loc.centroid : [+loc.lon, +loc.lat]
        }
        getFlowOriginId={(flow: Flow) => flow.origin}
        getFlowDestId={(flow: Flow) => flow.dest}
        getFlowMagnitude={(flow: Flow) => +flow.count}
      />
    )),
  );
