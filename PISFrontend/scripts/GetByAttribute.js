import SoapRequest from "react-native-soap-request";


export default async function getByAttribute(name, value, entity) {
  return new Promise(async function(resolve, reject) {
    const soapRequest = new SoapRequest({
      requestURL: "http://labss2.fiit.stuba.sk/pis/ws/Students/Team035" + entity
    });

    const xmlRequest = soapRequest.createRequest({
      "typ:getByAttributeValue": {
        attributes: {
          "xmlns:typ":
            "http://labss2.fiit.stuba.sk/pis/students/team035" +
            entity +
            "/types"
        },
        attribute_name: name,
        attribute_value: value,
        ids: []
      }
    });
    const response = await soapRequest.sendRequest();
    if (
      response["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["0"][
        "ns1:getByAttributeValueResponse"
      ]["0"][entity + "s"]["0"].hasOwnProperty(entity)
    ) {
      const result =
        response["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["0"][
          "ns1:getByAttributeValueResponse"
        ]["0"][entity + "s"]["0"][entity];
      resolve(result);
    } else {
      resolve(null);
    }
  });
}
