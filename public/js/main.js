$(document).ready(function(){
    var bool = {email:false,username:false};
    
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    function empty(x){
        var selector = "#" + x;
        // console.log(selector);
        var field = $(selector).val();
        if(field == ''){
           $('#err_'+x).text(x+' cannot be empty');
           $('#err_'+x).show();
           return true;
        }
        else{
            $('#err_'+x).hide();
            return false;
        }
    }

    function check_duplicate_entry(field , value){
        $.ajax({
            url:"/check_duplicate_entry",
            type:'POST',
            data:{field:field,value:value},
            datatype:'json',
            cache:false,
            success:function(response){
                //console.log(response);
                if(response.status == '0'){
                    $('#err_'+field).hide();
                    bool[field] = true;
                    return true;
                }
                else{
                    $('#err_'+field).text(field+' already exists');
                    $('#err_'+field).show();
                    bool[field] = false;
                    return false;
                }
            }
        })
    }
    function validate_name(){
        var name = $('#name').val();
        if(!empty('name')){
            var regex = /(^[A-z]+[\s]{0,1}[A-z]*)+$/;
            if(regex.test(name)){
                return true;
            }
            else{
                $('#err_name').text("Invalid name");
                $('#err_name').show();
                return false;
            }
        }
        else{
            return false;
        }
    }

    function validate_email()
    {
        var email = $('#email').val();
        if(!empty('email')){
            var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if(regex.test(email)){
                return check_duplicate_entry('email',email);
            }
            else{
                $('#err_email').text("Invalid email");
                $('#err_email').show();
                return false;
            }
        }
        else{
            return false;
        }
    }

    function validate_username(){
        var username = $('#username').val();
        if(!empty('username')){
            var regex = /(^[A-z]+[A-z0-9\.\_]*)/;
            if(regex.test(username)){
                return check_duplicate_entry('username' , username);
            }
            else{
                $('#err_username').text("Invalid username");
                $('#err_username').show();
                return false;
            }
        }
        else{
            return false;
        }
    }

    function validate_password(){
        var password = $('#password').val();
        if(!empty('password')){
            if(password.length >= 8){
                $('#err_password').hide();
                return true;
            }
            else{
                $('#err_password').text('password must be atleast 8 characters');
                $('#err_password').show();
                return false;
            }
        }
        else{
            return false;
        }
    }

    // make fields dynamic

    $('#name').blur(function(){
        validate_name();
    }).focus(function(){
        $('#err_name').hide();
    });

    $('#email').blur(function(){
        validate_email();
    }).focus(function(){
        $('#err_email').hide();
    });

    $('#username').blur(function(){
        validate_username();
    }).focus(function(){
        $('#err_username').hide();
    });

    $('#password').on('keydown',function(){
        validate_password();
    });

   
    $('#signup').on('click',function(){
        bool['name'] = validate_name();
        bool['password'] = validate_password();
        validate_email();
        validate_username();
        if(validate_name() && validate_password() && bool['email'] && bool['username']){
            var name = $('#name').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var username = $('#username').val();
            $.ajax({
                type:'POST',
                url:'/register',
                data:{
                    name:name,
                    email:email,
                    password:password,
                    username:username
                },
                cache:false,
                datatype:'json',
                success:function(response){
                    console.log(response);
                    if(response.status == '1'){
                        window.location.href='/login';
                    }
                    else{
                        console.log(response);
                    }
                }
            });
        }
        else{
            console.log('wrong');
            console.log(bool['email']);
            console.log(bool['username']);
        }
        
    });

});

