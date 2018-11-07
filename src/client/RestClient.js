'use strict'

import $ from 'jquery/src/core';
import 'jquery/src/ajax';
import 'jquery/src/ajax/xhr';

const jsonGet = function(payload){
  $.getJSON({
    url: payload.url,
    data: payload.data ? payload.data: {},
    type: "GET",
    responseType: "application/json",
    contentType: "application/json",
    dataType: "json"
  }).done((response) => {
    if(payload.done){
      payload.done(response);
    }
  }).fail((jqxhr, textStatus, error) => {
    if(payload.fail){
      payload.fail(jqxhr, textStatus, error);
    }
  });
}

export {jsonGet};
