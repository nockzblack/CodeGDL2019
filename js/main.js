// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBF_ppX-6GpsypfNK9IMKW9kzSoowJ_RN8",
    authDomain: "codegdl-c2c62.firebaseapp.com",
    databaseURL: "https://codegdl-c2c62.firebaseio.com",
    projectId: "codegdl-c2c62",
    storageBucket: "codegdl-c2c62.appspot.com",
    messagingSenderId: "546875810658"
  };
  firebase.initializeApp(config);

var messagesRef = firebase.database().ref('Interesados');

(function ($) {
    "use strict";
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });
    
    //Listener
    document.getElementById('contactForm').addEventListener('submit', submitForm);
    
    function submitForm(e){
        e.preventDefault();
        //Get values
        var name = getInputVal('name');
        var email = getInputVal('email');
        //Save message
        saveMessage(name,email);
        //Show alert
        document.querySelector('.alert').style.display = 'block';
        setTimeout(function (){
            document.querySelector('.alert').style.display = 'none';
        }, 3000);
        //Set text to empty string
        document.getElementById('contactForm').reset();
    }
    
    function getInputVal(id){
        return document.getElementById(id).value;
    }
    
    //Save message to Firebase
    function saveMessage(name, email){
        var newMessageRef = messagesRef.push();
        newMessageRef.set({
            name:name,
            email:email
        })
    }

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    
    

})(jQuery);