import SoapRequest from "react-native-soap-request";

export default async function email(email, subject, message)
{
    return new Promise( async function(resolve, reject){

        const soapRequest = new SoapRequest({
          requestURL: "http://labss2.fiit.stuba.sk/pis/ws/NotificationServices/Email"
        });
    
        const xmlRequest = soapRequest.createRequest({
          "typ:notify": {
            attributes: {
              "xmlns:typ":
              "http://labss2.fiit.stuba.sk/pis/notificationservices/email/types"
            },
            'team_id': '035',
            'team_password':'zvbTTu',
            'email': email,
            'subject': subject,
            'message': message
          }
        });
        const response = await soapRequest.sendRequest();
    
        resolve(response);
    
      });
    
}