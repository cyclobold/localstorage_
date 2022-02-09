function saveData(data){

    //retrieve your storage
    let storage_data = localStorage.getItem("storage_data");

    if(storage_data == null || storage_data == undefined){
        //this is the first time
        data_array = [];
        data_array.push(data);

        data_array = JSON.stringify(data_array);

        //save
        localStorage.setItem("storage_data", data_array);

    }else{
        //this is not the first time
        storage_data = JSON.parse(storage_data);

        storage_data.push(data);

        storage_data = JSON.stringify(storage_data);

        localStorage.setItem("storage_data", storage_data);
    }

}


saveData();