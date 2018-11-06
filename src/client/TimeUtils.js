'use strict'

export const TimeUtils = {
  secondsToDuration: (secs, useDefault)=>{
    if ( (secs === undefined || secs === 0) && useDefault ) {
      return "default";
    }

    if ( secs === undefined ){
      return 'never';
    }

    if ( secs < 1 ){
      return 'never';
    }

    var hours = Math.floor(secs / (60 * 60));

    var mdiv = secs % (60 * 60);
    var minutes = Math.floor(mdiv / 60);

    var sdiv = mdiv % 60;
    var seconds = Math.ceil(sdiv);

    var out = '';
    if ( hours > 0 ){
      out += hours + 'h';
    }

    if ( minutes > 0 ){
      if ( out.length > 0 ){ out += ' '; }

      out += minutes + 'm';
    }

    if ( seconds > 0 ){
      if ( out.length > 0 ){ out += ' '; }

      out += seconds + 's';
    }

    return out;
  },
  secondsToDuration: (secs, useDefault) => {
    if ( (secs === undefined || secs === 0) && useDefault ) {
      return "default";
    }

    if ( secs === undefined ){
      return 'never';
    }

    if ( secs < 1 ){
      return 'never';
    }

    var hours = Math.floor(secs / (60 * 60));

    var mdiv = secs % (60 * 60);
    var minutes = Math.floor(mdiv / 60);

    var sdiv = mdiv % 60;
    var seconds = Math.ceil(sdiv);

    var out = '';
    if ( hours > 0 ){
      out += hours + 'h';
    }

    if ( minutes > 0 ){
      if ( out.length > 0 ){ out += ' '; }

      out += minutes + 'm';
    }

    if ( seconds > 0 ){
      if ( out.length > 0 ){ out += ' '; }

      out += seconds + 's';
    }

    return out;
  },
  timestampToDateFormat: (milliseconds)=>{
    if ( milliseconds == undefined ){
      return 'never';
    }

    if ( milliseconds < 1 ){
      return 'never';
    }

    var date = new Date();
    date.setTime(milliseconds)
    return date.toLocaleString();
  },
  timestampToDuration: (secs)=>{
    if ( secs == undefined ){
      return 'never';
    }

    if ( secs < 1 ){
      return 'never';
    }
    let nextDate =  new Date(secs);
    let toDay = new Date();
    let total = nextDate.getTime() - toDay.getTime();
    return TimeUtils.secondsToDuration( total / 1000);
  }
}
