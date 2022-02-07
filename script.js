(function(){
    document.addEventListener("DOMContentLoaded", function(){

        //Custom Event
        const startSpinnerEvent = new CustomEvent("start-spinner-event", {
            detail: {
                name: "start-spinning",
                height: "1234"
            }
        });   
        const stopSpinnerEvent = new CustomEvent("stop-spinner-event");

        document.addEventListener("start-spinner-event", function(event){
            document.querySelector("#loading-spinner").hidden = false;

            console.log(event);
        })

        document.addEventListener("stop-spinner-event", function(event){
            document.querySelector("#loading-spinner").hidden = true;
        })





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

                     document.dispatchEvent(startSpinnerEvent);

                     break;
                 
                 case "light":
                     document.body.style.backgroundColor = "whitesmoke";
                     selectTag.innerHTML = `<option value=""> --- Select Theme ---</option>
                     <option value='dark'>Dark Theme</option>
                     <option value='light' selected>Light Theme</option>
                     <option value='green'>Green Theme</option>`;

                     document.dispatchEvent(stopSpinnerEvent);
                     break;

                 case "green":
                     document.body.style.backgroundColor = "green";
                     selectTag.innerHTML = `<option value=""> --- Select Theme ---</option>
                     <option value='dark'>Dark Theme</option>
                     <option value='light'>Light Theme</option>
                     <option value='green' selected>Green Theme</option>`;
                     document.dispatchEvent(stopSpinnerEvent);
                     break;
                 
         
             }
         }
        


    })


}());