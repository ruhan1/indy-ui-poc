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
  isDisabled: key => {
      var result = key in scope.disabledMap;
      return result;
  };
};
