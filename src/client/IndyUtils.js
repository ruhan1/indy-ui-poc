'use strict'

export const Utils = {
  remoteOptions: store => {
    var options = [];

    if ( store.allow_snapshots ){
      options.push({icon: 'S', title: 'Snapshots allowed'});
    }

    if ( store.allow_releases ){
      options.push({icon: 'R', title: 'Releases allowed'});
    }
    return options;
  },
  storeHref: key => {
      let parts = key.split(':');

      let hostAndPort = window.location.hostname;
      if ( window.location.port != '' && window.location.port != 80 && window.location.port != 443 ){
        hostAndPort += ':';
        hostAndPort += window.location.port;
      }

      var basepath = window.location.pathname;
      basepath = basepath.replace('/app', '');
      basepath = basepath.replace(/index.html.*/, '');


      var proto = window.location.protocol;

      // TODO: In-UI browser that allows simple searching
      return proto + "//" + hostAndPort + basepath + 'api/content/' + parts[0] + '/' + parts[1] + '/' + parts[2];
  },
  isDisabled: key => {
      var result = key in scope.disabledMap;
      return result;
  }
};
