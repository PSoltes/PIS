import SoapRequest from "react-native-soap-request";

export default async function Update(object,id, entity)
{
  return new Promise( async function(resolve, reject){

    const soapRequest = new SoapRequest({
      requestURL: "http://labss2.fiit.stuba.sk/pis/ws/Students/Team035"+entity
    });

    const xmlRequest = soapRequest.createRequest({
      "typ:update": {
        attributes: {
          "xmlns:typ":
          "http://labss2.fiit.stuba.sk/pis/students/team035"+ entity +"/types"
        },
        'team_id': '035',
        'team_password':'zvbTTu',
        'entity_id': id,
        entity : object
      }
    });
    const response = await soapRequest.sendRequest();

    //const result = response['SOAP-ENV:Envelope']['SOAP-ENV:Body']['0']['ns1:getByAttributeValueResponse']['0'][entity + 's']['0'][entity]['0'];
    resolve(response);

  });

}