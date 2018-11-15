'use strict'

// mock data: options
const remoteOptionLegend = [
  {icon: "S", title: "Snapshots allowed"},
  {icon: "R", title: "Releases allowed"}
];

const hostedOptionLegend = [
  {icon: 'S', title: 'Snapshots allowed'},
  {icon: 'R', title: 'Releases allowed'},
  {icon: 'D', title: 'Deployment allowed'}
];

//TODO this should be fetched from backend
const packageTypes = [
  'maven',
  'generic',
  'npm'
];

const APP_ROOT = '';

export {APP_ROOT, remoteOptionLegend, hostedOptionLegend, packageTypes};
