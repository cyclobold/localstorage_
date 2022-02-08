const toggler = (function(){
    /**
     * I am using IIFE for this example..
     */

    //Get a reference to the toggleBtn 
    const toggleBtn = document.querySelector("#toggle-btn");



    //All functions that will be publicly available will be put here..
    return {

        
        triggerToggleBtn: function(){
            toggleBtn.setAttribute("onclick", "toggler.tester()");
        },

        tester: function(){

            alert('works');

        }



    }


    




}())