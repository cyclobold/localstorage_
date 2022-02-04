(function(){
    document.addEventListener("DOMContentLoaded", function(){
        let selectTag = document.querySelector("select");
        loadActiveTheme();

        
        selectTag.onchange = function(){
            if(selectTag.value.trim().length != 0){
                localStorage.setItem("current-theme", selectTag.value);

                resolveTheme(selectTag.value);

                
                
            }
            
        }
        
        function loadActiveTheme(){
            let currentTheme = localStorage.getItem("current-theme");
         
             resolveTheme(currentTheme);
         
         }
         
         
    function resolveTheme(value){
             switch(value){
                 case "dark":
                     document.body.style.backgroundColor = "black";
                     selectTag.innerHTML = `<option value=""> --- Select Theme ---</option>
                     <option value='dark' selected>Dark Theme</option>
                     <option value='light'>Light Theme</option>
                     <option value='green'>Green Theme</option>`

                     break;
                 
                 case "light":
                     document.body.style.backgroundColor = "whitesmoke";
                     selectTag.innerHTML = `<option value=""> --- Select Theme ---</option>
                     <option value='dark'>Dark Theme</option>
                     <option value='light' selected>Light Theme</option>
                     <option value='green'>Green Theme</option>`;
                     break;
                 case "green":
                     document.body.style.backgroundColor = "green";
                     selectTag.innerHTML = `<option value=""> --- Select Theme ---</option>
                     <option value='dark'>Dark Theme</option>
                     <option value='light'>Light Theme</option>
                     <option value='green' selected>Green Theme</option>`;
                     break;
                 
         
             }
         }
        


    })
    //


}());