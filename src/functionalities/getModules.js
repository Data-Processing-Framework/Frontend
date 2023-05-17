import { conectionPath } from "../API/globals";
export function getModules(){
    fetch(conectionPath + '/module')
    //.then(response=> console.log(response))
    .then((response) => {console.log(response);return response.json()})
    .then((json) => {
      console.log(json);
    });
}