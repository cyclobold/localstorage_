//This IIFE will be assigned to a variable
//The benefit of working this way is to allow us use the variable, in this case, notes_ in our code..
const notes_ = (function(){

    //Create reference to the notes id 
    const notes_id = document.querySelector("#notes");

    //Create a reference to the create-note-btn id
    const create_note_btn = document.querySelector("#create-note-btn");

    //Create a reference to the note-input id
    const note_input = document.querySelector("#note-input");

    //Call the display notes function
    displayNotes();


    // --- SECTION 1: Functions Declarations ----

    /**
     * The displayNotes() function handles displaying all the notes that have been saved to ...
     * the localStorage
     * 
     * We have decided to use 'saved_notes' as the key to saving the notes
     */
    function displayNotes(){

        //get notes from localStorage
        /**
         * The key to the storage where the notes are is 'saved_notes', 
         * so any time we want to get the notes from the localStorage, we will use "saved_notes"
        */

        //Get notes from localStorage using "saved_notes" as the key
        //then we save the notes gotten to a variable called "savedNotes"
        let savedNotes = localStorage.getItem("saved_notes");

        //We need to check if the data we have received from localStorage is null or undefined
        //If the data received and saved to savedNotes is null or undefined, that means there are no data 
        // ... in the localStorage
        if(savedNotes == null || savedNotes == undefined){
            //this means there are no data at this moment..
            
            //so we make this known in the HTML
            notes_id.innerHTML = "No notes at the moment";


        }else{
            //This means there are notes
            //so we are going to parse the notes so that we get them in the original form they saved..
            savedNotes = JSON.parse(savedNotes);//savedNotes is now going to be an array
            
            /**
             * We want to put the notes retrieved from the localStorage into a div.
             * Each note will be inside an input that will be inside a div. This 'div' will then be wrapped 
             * by a cover div
             * 
             * Since the cover div is only going to be wrapping all the notes, we set an initial value to it
             * 
             */

            //set an initial string value and pass it to uElement variable
            let ulElement = "<div>";
           
            /**
             * - Then we need to loop through the savedNotes returned from the localStorage. Remember that we already
             * parsed this 'savedNotes' so that the form of data we now have is an array.
             * 
             * - Each note in the 'savedNotes' array is an object that takes the form below:
             * [{}, {}, {}];
             * - The construct above can be further expantiated to be: 
             * [
             *  {
             *      note_title: 'example_title',
             *      time_created: '1234567890'
             * 
             *  }, 
             * 
             *  {
             *      note_title: 'example_title_2',
             *      time_created: '12345634544'
             * 
             *  }
             * 
             * ]
             * 
             * - In the construct above, notice the array is made up of two items. Each item is an object
             * with key-value pairs. In the case above, there are two key-value pairs per object: 'note_title'
             * and 'time_created' are the keys.
             * 
             * - To get the values in each of the object, we need to loop. 
             * - One of the most efficient ways to loop through an array; especially one containing objects is
             * to use the for loop.
             */
            for(let i = 0; i < savedNotes.length; i++){
                //set the div that will wrap the note object and add it the ulElement variable content

                /*
                * - 1. i -> this points to the current index as we count from 0 to n-1;
                * - 2. savedNotes[i] -> points to the current note index
                * - 3. savedNotes[i]['note_title'] -> points to the 'note_title' key of the current note index
                * - 4. savedNotes[i]['time_created'] -> points to the 'time_created' key of the current note index
                * 
                * For example, 
                * - savedNotes[i] will give you an object:
                * {
                *   note_title: 'example_title',
                *   time_created: '1234567890'
                * }
                * 
                * - savedNotes[i]['note_title'] will therefore give you:
                * 'example_title'
                * 
                * 
                */
                
                /**
                 * - We also attach an onclick event listener tot the anchor tag that bears the 'Edit' feature
                 * - Notice that we use notes_.editNote() and not just editNotes(). This is because the code is 
                 * interpreted as an HTML code and since HTML codes don't have direct access to the functions defined within
                 * IIFE
                 * - We pass the 'time_created' to the notes_.editNote() function call
                 */ 
                ulElement += `
                        <div class='notes-input-group'>
                        <input type='text' value='${savedNotes[i]['note_title']}' id='note_id_${savedNotes[i]['time_created']}' class='note-inputs' readonly>
                        <a id='edit_note_${savedNotes[i]['time_created']}' onclick="notes_.editNote('${savedNotes[i]['time_created']}')"><strong>Edit</strong></a>
                        </div>
                        `                        

            }

            //Outside the for loop, we close the div and add the contents in the ulElement variable.
            ulElement += "</div>";

            //then we pass all the contents in the ulElement to the notes_id as innerHTML data.
            notes_id.innerHTML = ulElement;





        }

    }

   /**
    * This function handles saving note to localStorage
    * @param {string} note_title : the title of the note to be saved to localStorage
    * Note that we are using 'saved_notes' as the key.
    */
    function saveNote(note_title){
        
        //get notes
        let saved_notes = localStorage.getItem("saved_notes");

        //create date
        /**
         * - We need some form of uniqueness, 
         * - One of the ways to create uniqueness is to use timestamp
         * - With timestamps, we are able to generate 'almost' unique milliseconds from January 1st 1970.
         */
        let date = new Date();
        let time_saved = date.getTime(); //generate timestamp in milliseconds from January 1st, 1970 (Since Epoch); 

        // - We then create an object that represents the note we are about to save
        // - Each note is an object made up of two properties: 
        // 1. the 'note_title' property
        // 2. the 'time_created' property
        let note_object = {
            note_title : note_title,
            time_created: time_saved
        }

        // - Before saving, we need to check if there are any notes saved in the localStorage

        //If the saved_notes points to null or undefined
        if(saved_notes == null || saved_notes == undefined){
            // - this means there are no notes stored in the localStorage

            // - this will be out first note..


            // - therefore we create an empty array
            let saved_notes_array = [];

            // - we then push the note_object we created above into the array
            saved_notes_array.push(note_object);

            // - Remember, localStorage can only handle strings, so we need to stringify this array which now ...
            // ... contains the object we pushed into it
            saved_notes_array = JSON.stringify(saved_notes_array);

            // - We then set the saved_notes_array to localStorage using 'saved_notes' as the key
            localStorage.setItem("saved_notes", saved_notes_array);

            // - We reload the page after everything. Notice that the benefit of reloading ...
            // ... the page is to trigger the displayNotes() function that we invoked and declared above
            location.reload();

        }else{
            // - this either means there are notes already or the array for saving the notes still exists in the ...
            // ... the localStorage

            // - therefore, we need to parse the saved_notes into its original array format
            saved_notes = JSON.parse(saved_notes);

            // - We then push the new note_object into this array
            saved_notes.push(note_object);

            // - Before saving back to the localStorage, we need to stringify the data
            saved_notes_array = JSON.stringify(saved_notes);

            // - We save the data back to the localStorage. Notice we use the "saved_notes" string as key
            localStorage.setItem("saved_notes", saved_notes_array);

            // - Then we reload the page.
            location.reload();


        }

    }

    /**
     * This functions handles creating of new note
     */
    function createNewNote(){

        // - checks that the user actually entered data
        if(note_input.value.trim().length > 0){
            const new_note_input = note_input.value.trim();

            //calls the saveNote() function and passes the note entered by the user to it as argument
            saveNote(new_note_input);
        }
    }

     /**
     * Handles editing note. 
     * Since we need a way to identify the note we want to edit, 
     * @param {string} time_created - the timestamp in milliseconds each note was created...
     */
      function editNoteFunction(time_created){
        
        // - We reconstruct the id for the input area where the note is displayed. See line 124
        // - We remove the original 'readonly' attribute so we can edit
        document.querySelector(`#note_id_${time_created}`).removeAttribute("readonly");

        // - We reconstruct the id for the edit area where the note is displayed. See line 124.
        // - We change the content to save wrapped with strong element
        document.querySelector(`#edit_note_${time_created}`).innerHTML = "<strong>Save</strong>"; 
        
        // - We set a new onclick attribute and we pass the notes_.saveEditedNote() as the value ...
        // ... of the onclick attribute

        // - We then pass the time_created as argument to the notes_.saveEditedNote()

        // - Notice that we did not use saveEditedNote() instead we use notes_.saveEditedNote(). 
        // - the 'notes_' is comes from the variable we assigned to this IIFE to. See line 3.
        document.querySelector(`#edit_note_${time_created}`).setAttribute("onclick", `notes_.saveEditedNote('${time_created}')`)


    }


    /**
     * Handles saving of the Edited note
     * @param {string} time_created the unique timestamp of each note
     */
    function saveEditedNoteFunction(time_created){

        // - Get the new title entered
        let new_note_title = document.querySelector(`#note_id_${time_created}`).value.trim();

        // - Ensure that the user actually entered data
        if(new_note_title.length != 0){
            //save the new note title

            //get data from localStorage
            let stored_notes = localStorage.getItem("saved_notes");

            // - Parsed the data into an array format
            stored_notes = JSON.parse(stored_notes);

            // - Loops through this array
            for(let i = 0; i < stored_notes.length; i++){

                /**
                 * - As we loop through the array, we check if the 'time_created' key
                 * on the current index in the array is equal to the time_created variable
                 * 
                 * - Once there is a match, it means we have found our note.
                 * - We then change the data in the object by assigning the new data to the 'note_title' key
                 * 
                 */ 
                if(stored_notes[i]['time_created'] == time_created){
                    
                    // - we have a match
                    // - assign the new note title to the object using the note_title key on the current index
                    stored_notes[i]['note_title'] = new_note_title;

                    // - Save to localStorage..
                    // - Don't forget to stringify before saving
                    stored_notes = JSON.stringify(stored_notes);

                    // - Save to localStorage. 
                    localStorage.setItem("saved_notes", stored_notes);

                    break; //break out of the loop
                }
            }

            // - Reload the page
            location.reload();


        }


    }

    // -- End of Section 1 --



    // --- SECTION 2: Event Listeners ---

    // - Handles what happens when the user clicks on the 'create_note_btn' referenced id.
    // - Once the element referenced by the variable is clicked, the createNewNote() function ...
    // ... is called or invoked.
    // - Note that when passing a function as a value or argument to another function, the () is dropped ...
    // ... hence, instead of create_note_btn.onclick = createNewNote(), it should be create_note_btn.onclick = createNewNote;
    create_note_btn.onclick = createNewNote;


    // -- End of Section 2 --




    // --- SECTION 3: Publicly available functions ---
    // - The 'return' construct is actually used in returning data to the HTML or another script file for public ...
    // ... access.

    // - If you want a function or property to be accessible outside this IIFE, you put it here, within the returned object
    return {
        editNote : editNoteFunction,

        deleteNote: function(){

        },

        saveEditedNote : saveEditedNoteFunction
    }

    // -- End of Section 3 --






}());
