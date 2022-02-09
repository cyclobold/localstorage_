/**
 * In this version, I will be using IIFE instead of normal plain javascript code written from 
 * top to bottom
 * 
 * The code is same with toggle.js, its just I have introduced a better approach to writing elegant applications.
*/


//The IIFE has been assigned to a variable
const togglr = (function(window, document){

    //Get a reference to the toggleBtn 
    toggleBtn = document.querySelector("#toggle-btn");

    //Get a reference to the toogle_phase in the localStorage
    let currentPhase = localStorage.getItem("toggle_phase");


    /**
     * This particular function cannot be accessed from outside this IIFE, 
     * - It is meant to be used inside here only..
     * 
     * - It ensures our toggle selection persists by checking the localStorage for updates..
     * - Notice that we have made this function also an IIFE
     * - This means, there are two IIFEs here, the main wrapper IIFE and this one.
     */
    (function(){

        if(currentPhase == null || currentPhase == undefined){
            currentPhase = "off";
        }
    
        if(currentPhase == "on"){
            toggleBtn.style.right = "0";
            toggleBtn.style.left = "50%";
    
            //change the innerText
            toggleBtn.innerHTML = "&larr; Off";
    
            //change background color
            toggleBtn.style.backgroundColor = "red";
    
            toggleBtn.setAttribute("onclick", "togglr.removeOffBtn()");
    
            // //Persistence
            // localStorage.setItem("toggle_phase", "on");
    
    
        }else{
            toggleBtn.style.right = "50%";
            toggleBtn.style.left = "0";
    
             //change the innerText
             toggleBtn.innerHTML = "On &rarr;";
    
             //change the background color
             toggleBtn.style.backgroundColor = "#000";
    
             toggleBtn.removeAttribute("onclick");
             toggleBtn.setAttribute("onclick", "togglr.addOnBtn()");
    
            //   //Persistence
            // localStorage.setItem("toggle_phase", "off");
        }


    }())




    //All functions that will be publicly available will be put here..
    //Notice that these functions are placed within a 'return' object

    //Also, notice that since we are returning an object, there will be key-value pairs within this returned object. 
    //Lastly, notice that each key-value pair is separated from the next one by a comma.
    return {

        
        triggerToggleBtn: function(){

            //the name we have given this object is togglr, hence, whenever we want to pick any exposed method from outside, we use togglr.the_method_name()
            toggleBtn.setAttribute("onclick", "togglr.addOnBtn()"); //we use togglr.tester() because tester() is a method in this object
        },


        /**
         * Switches the button 'On' when clicked
         * - Adds the removeOffBtn() value to the onclick attribute
         */
        addOnBtn: function(){

            toggleBtn.style.right = "0";
            toggleBtn.style.left = "50%";
    
            //change the innerText
            toggleBtn.innerHTML = "&larr; Off";
    
            //change background color
            toggleBtn.style.backgroundColor = "red";
    
            toggleBtn.setAttribute("onclick", "togglr.removeOffBtn()");//instead of just removeOffBtn(), we use togglr.removeOffBtn()
    
            //Persistence
            localStorage.setItem("toggle_phase", "on");

        },



        /**
         * Switches the button 'Off' when clicked...
         * - Adds the addOnBtn() value to the onclick attribute
         */
        removeOffBtn: function(){

            toggleBtn.style.right = "50%";
            toggleBtn.style.left = "0";
    
            //change the innerText
            toggleBtn.innerHTML = "On &rarr;";
    
            //change the background color
            toggleBtn.style.backgroundColor = "#000";
    
            toggleBtn.removeAttribute("onclick");
            toggleBtn.setAttribute("onclick", "togglr.addOnBtn()"); //instead of just addOnBtn(), we use togglr.addOnBtn()
    
            //Persistence
            localStorage.setItem("toggle_phase", "off");


        }


    }


}(window, document))



togglr.triggerToggleBtn();