(function(){

    let infoId = document.querySelector("#info");

    //once the page loads

    // Step 1. Check is a user is logged in
    const feedback = checkUserLoggedIn();

    //step 3 
    if(feedback.message.user_msg == "user_not_exist"){
        //no user is logged in
        if(feedback.message.storage_msg == "storage_not_exist"){
            createStorage();
        }
        
        //user should be registered
        infoId.innerHTML = `
                            <h3>Register Account</h3>
                            <div>
                            <form>
                                <div>
                                    <label>Full name</label>
                                    <input type='text' id='fullname'>
                                </div>
                                
                                <div>
                                    <label>Email</label>
                                    <input type='email' id='email'>
                                </div>

                                <div>
                                    <label>Password</label>
                                    <input type='password' id='password'>
                                </div>

                                <div>
                                    <button type='button' id='create-account-btn'>Create Account</button>
                                </div>
                                </form>
                            </div>
        
        
        
        
        `;

        let createAccountBtn = document.querySelector("#create-account-btn");
        createAccountBtn.onclick = function(){
            
            let fullname_ = document.querySelector("#fullname").value.trim();
            let email_ = document.querySelector("#email").value.trim();
            let password_ = document.querySelector("#password").value.trim();

            if(fullname_.length > 0 && email_.length > 0  && password_.length > 0){

               
                const user = {
                    fullname: fullname_,
                    email: email_,
                    password: password_,
                    is_logged_in: false
                }
            
                registerNewUser(user);
            
            }else{
                alert('works');
            }
           
            
        }



    }else{
        // user is logged in
        console.log(feedback);
    }











    /**
     * Functions
     */

    function checkUserLoggedIn(){

        //2. Does a user storage exist?
        let usersStorage = localStorage.getItem("users_storage");

        if(usersStorage == null || usersStorage == undefined){
            //the storage has not been created
            return {
                message: {
                    storage_msg: "storage_not_exist",
                    user_msg: "user_not_exist"
                },
                data: null
            };
            
        }else{
            //the storage exists
            // check is user is in the storage
            usersStorage = JSON.parse(usersStorage);

            //track users not logged ib
            let users_not_logged_in = [];
            let user_logged_in = [];
            for(let i = 0; i < usersStorage.length; i++){
                if(usersStorage[i]['is_logged_in'] == true){
                    //we have found a match
                    user_logged_in.push(usersStorage[i]);
                    break;
                    
                }else{
                    users_not_logged_in.push(usersStorage[i]);
                }
            }


            if(user_logged_in.length > 0){
                user_logged_in = user_logged_in[0];

                return {
                    message: {
                        storage_msg: "storage_exists",
                        user_msg: "user_exists"
                    },
                    data: user_logged_in
                }
            }else{

                return {
                    message: {
                        storage_msg: "storage_exists",
                        user_msg: "user_not_exist"
                    },
                    data: null
                }
                

            }


        
        }



    }


    function createStorage(){
        localStorage.setItem("users_storage", JSON.stringify([]));
    }

    function registerNewUser(user){
        usersStorage = localStorage.getItem("users_storage");

        usersStorage = JSON.parse(usersStorage);

        usersStorage.push(user);

        usersStorage = JSON.stringify(usersStorage);

        localStorage.setItem("users_storage", usersStorage);

        location.reload();

    }





    // -- End of Functions ---




}());