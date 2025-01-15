(function (global)
{
   let emailSender = {};
   //^ Sends email to me using EmailJS API
   async function sendEmail(formValues)
   {
      if (formValues == null) return null;
      let props = await getJsonData(
         `${rootUrl}/resources/api-properties.json`
      );
      let url = "https://api.emailjs.com/api/v1.0/email/send";
      const API_KEY = props["api-key"];
      const TEMPLATE_ID = props["template-id"];
      const SERVICE_ID = props["service-id"];
      let request = new Request(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            service_id: SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id: API_KEY,
            template_params: {
               from_name: formValues.sender,
               message: formValues.msg,
               respond: formValues.respond,
            },
         }),
      });
      let response = await fetch(request);
      return response.status == 200;
   }
   emailSender.sendEmail = sendEmail;
   global.$emailSender = emailSender;
})(window);