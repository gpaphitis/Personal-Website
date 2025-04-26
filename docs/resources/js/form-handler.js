(function (global)
{
   let formHandler = {};
   //* Returns the inputs of the form fields
   function getFormValues()
   {
      if (!isFormValid()) return null;
      let formValues = new Object();
      formValues.sender = document.getElementById("sender-name").value;
      formValues.respond = document.getElementById("sender-respond").value;
      formValues.msg = document.getElementById("sender-msg").value;
      return formValues;
   }

   //* Checks if form fields for email are empty
   function isFormValid()
   {
      let emptyErrors = document.querySelectorAll(".empty-error");
      let fields = document.querySelectorAll('input');
      let isValid = true;
      for (let i = 0; i < fields.length; i++) {
         if (fields[i].value == "") {
            makeVisible(emptyErrors[i]);
            isValid = false;
         }
         else
            makeInvisible(emptyErrors[i]);
      }
      let text = document.querySelectorAll("textarea");
      emptyErrors = document.querySelectorAll(".text-empty-error");
      for (let i = 0; i < text.length; i++) {
         if (text[i].value == '') {
            emptyErrors[i].classList.remove('hidden');
            isValid = false;
         }
         else
            emptyErrors[i].classList.add('hidden');
      }
      return isEmailValid() && isValid;
   }

   function isEmailValid()
   {
      let invalidEmail = document.querySelector("#sender-respond:invalid");
      if (invalidEmail != null) {
         makeVisible(document.querySelector("#respond-error"));
         return false;
      }
      return true;
   }

   function makeVisible(elem)
   {
      if (elem.classList.contains('hidden'))
         elem.classList.remove('hidden');
   }
   function makeInvisible(elem)
   {
      if (!elem.classList.contains('hidden'))
         elem.classList.add('hidden');
   }
   formHandler.getFormValues = getFormValues;
   formHandler.isFormValid = isFormValid;
   formHandler.makeVisible = makeVisible;
   formHandler.makeInvisible = makeInvisible;
   global.$formHandler = formHandler;
})(window);