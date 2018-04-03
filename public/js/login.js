$(document).ready(function(){

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

    function validate_username(){
        var username = $('#username').val();
        if(!empty('username')){
            var regex = /(^[A-z]+[A-z0-9\.\_]*)/;
            if(regex.test(username)){
               return true
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

    $('#username').blur(function(){
        validate_username();
    }).focus(function(){
        $('#err_username').hide();
    });

    $('#password').blur(function(){
        validate_password();
    }).focus(function(){
        $('#err_password').hide();
    })

    $('#login').on('click',function(){
        console.log("Ddd");
        var test1 = validate_username();
        var test2 = validate_password();
        var username = $('#username').val();
        var password = $('#password').val();
        if(test1 && test2){
            $.ajaxSetup({
                headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
              });
            $.ajax({
                url:"/login",
                type:'POST',
                data:{
                    username:username,
                    password:password
                },
                datatype:'json',
                cache:false,
                success:function(response){
                    if(response.status == "1"){
                        window.location.href = '/dashboard';
                    }
                    else{
                        $('#err_username').text(response.error);
                        $('#err_username').show();
                    }

                }
            })
        }
    })
}) 