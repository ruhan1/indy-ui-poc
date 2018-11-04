'use strict'

export const Utils = {
  remoteOptions: store => {
    let options = [];

    if ( store.allow_snapshots ){
      options.push({icon: 'S', title: 'Snapshots allowed'});
    }

    if ( store.allow_releases ){
      options.push({icon: 'R', title: 'Releases allowed'});
    }
    return options;
  },
  hostedOptions: store => {
    var options = [];

    if ( store.allow_snapshots ){
      options.push({icon: 'S', title: 'Snapshots allowed'});
    }

    if ( store.allow_releases ){
      options.push({icon: 'R', title: 'Releases allowed'});
    }

    if ( store.allow_snapshots || store.allow_releases ){
      options.push({icon: 'D', title: 'Deployment allowed'});
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

      let basepath = window.location.pathname;
      basepath = basepath.replace('/app', '');
      basepath = basepath.replace(/index.html.*/, '');


      let proto = window.location.protocol;

      // TODO: In-UI browser that allows simple searching
      return proto + "//" + hostAndPort + basepath + 'api/content/' + parts[0] + '/' + parts[1] + '/' + parts[2];
  },
  setDisableMap: (listing, stores) => {
    let disabledMap = {};

    let items = listing.items;
    if ( items ) {
      for(let i = 0; i<items.length; i++){
        let item = items[i];
        let parts = item.group.split(':');
        let key = parts[0] + ':' + parts[1] + ':' + parts[2];
        console.log("DISABLED: " + key + " (until: " + item.expiration + ")");
        disabledMap[key] = item.expiration;
      }
    }
    return disabledMap;
  },
  isDisabled: (key, disabledMap) => {
      let result = key in disabledMap;
      return result;
  }
};
