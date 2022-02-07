const spinnerEvent = new CustomEvent("spinner-event");

document.addEventListener("spinner-event", function(event){
    //event
    console.log(event);

});


document.dispatchEvent(spinnerEvent);

