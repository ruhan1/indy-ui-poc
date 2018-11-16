'use strict'

const jsonGet = function(payload){
  fetch(payload.url, {
    method: "GET",
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: payload.data ? payload.data : undefined
  })
  .then(response => {
    if(response.ok && payload.done){
      response.json().then(data=>payload.done(data));
    }else if(!response.ok && payload.fail){
      response.text().then(data=>{        
        payload.fail(data, response.status, response.statusText)
      });
    }
  });
}

export {jsonGet};
