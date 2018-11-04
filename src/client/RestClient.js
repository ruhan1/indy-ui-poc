'use strict'

import $ from 'jquery/src/core';
import 'jquery/src/ajax';
import 'jquery/src/ajax/xhr';

const jsonGet = function(url, successCallback, failCallback){
  $.getJSON({
    url: url,
    type: "GET",
    responseType: "application/json",
    contentType: "application/json",
    dataType: "json"
  }).done((response) => {
    successCallback(response);
  }).fail((jqxhr, textStatus, error) => {
    failCallback(jqxhr, textStatus, error);
  });
}

export {jsonGet};
