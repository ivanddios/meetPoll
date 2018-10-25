//file js/common.js

//Function JQuery to limit the time of alerts messages
$(document).ready(function() {
    setTimeout(function() {
        $(".alert").alert('close');
    }, 4000);
});


//Function to delete a row from a table

function deleteRow(row) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById('dataTable').deleteRow(i);
}


function addRow() {


    var boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-danger";
    boton.value = "-";
    boton.onclick = function () { deleteRow(this) };
    boton.appendChild(document.createTextNode("-"));


    var divDate = document.createElement("div");
    divDate.id = "inputDate";

    var divIcon = document.createElement("div");
    divIcon.className = "inputWithIconLogin inputIconBg";
    divDate.appendChild(divIcon);

    var inputDate = document.createElement("input");
    inputDate.type ="text";
    inputDate.id = "date-es";
    inputDate.className = "date";
    inputDate.required;
    divIcon.appendChild(inputDate);

    $(inputDate).bootstrapMaterialDatePicker
    ({
        format: 'DD/MM/YYYY',
        lang: 'es',
        time: false,
        weekStart: 1, 
        nowButton : true,
        switchOnClick : true,
        minDate : new Date()

    });

    var iconDate = document.createElement("i");
    iconDate.className = "fa fa-calendar fa-lg fa-fw";
   divIcon.appendChild(iconDate);



    var divTimeStart = document.createElement("div");
    divTimeStart.id = "inputTime";

    var divIcon2 = document.createElement("div");
    divIcon2.className = "inputWithIconLogin inputIconBg";
    divTimeStart.appendChild(divIcon2);

    var inputTimeStart = document.createElement("input");
    inputTimeStart.type ="text";
    inputTimeStart.className = "timeStart";
    inputTimeStart.required;
    divIcon2.appendChild(inputTimeStart);

    $(inputTimeStart).bootstrapMaterialDatePicker
    ({
        date: false,
        shortTime: false,
        format: 'HH:mm'
    });

    var iconTimeStart = document.createElement("i");
    iconTimeStart.className = "fa fa-clock-o fa-lg fa-fw";
    divIcon2.appendChild(iconTimeStart);




    var divTimeEnd = document.createElement("div");
    divTimeEnd.id = "inputTime";

    var divIcon3 = document.createElement("div");
    divIcon3.className = "inputWithIconLogin inputIconBg";
    divTimeEnd.appendChild(divIcon3);

    var inputTimeEnd = document.createElement("input");
    inputTimeEnd.type ="text";
   // inputTimeEnd.id = "timeEnd";
    inputTimeEnd.className = "timeEnd";
    inputTimeEnd.required;
    divIcon3.appendChild(inputTimeEnd);

    $(inputTimeEnd).bootstrapMaterialDatePicker
    ({
        date: false,
        shortTime: false,
        format: 'HH:mm'
    });

    var iconTimeEnd = document.createElement("i");
    iconTimeEnd.className = "fa fa-clock-o fa-lg fa-fw";
    divIcon3.appendChild(iconTimeEnd);


    var table = document.getElementById('dataTable');
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell = row.insertCell(0);
    cell.appendChild(boton);
    var cell1 = row.insertCell(1);
    cell1.appendChild(divDate);
    var cell2 = row.insertCell(2);
    cell2.appendChild(divTimeStart);
    var cell3 = row.insertCell(3);
    cell3.appendChild(divTimeEnd);

}


//Function to delete a button 
function removeButton(idButton) {
    button = document.getElementById(idButton);
    if (!button) {
        alert("El elemento selecionado no existe");
    } else {
        hh = button.parentNode;
        hh.removeChild(button);
        var nestedDiv = document.getElementById('user').innerHTML = "Tú";
    }
}


//Function to change attribute "class-success"  to "". 
function removeCheckboxSuccess() {
    var filaSuccess = document.getElementsByClassName("table-success"); //Array with a one element (tr's id)

    for (var i = 0; i < filaSuccess.length; i++) {
        document.getElementById(filaSuccess[i].id).setAttribute("class", ""); //Set tr deleting the class (table-success)
    }
}

//Function to change attribute "class-warning"  to "". 
function removeCheckboxWarning() {
    var filaWarning = document.getElementsByClassName("table-warning"); //Array with a one element (tr's id)

    for (var i = 0; i < filaWarning.length; i++) {
        document.getElementById(filaWarning[i].id).setAttribute("class", ""); //Set tr deleting the class (table-success)
    }
}

/*
*
* Function to evaluate the most voted option and highlight it in the table:
*   With "table-success" if it is only one, 
*   With "table-warning" when the rows are more than one.
*
*/
function checkboxes(tableId) {

    var table = document.getElementById(tableId);
    var rowCount = table.rows.length - 1;                     //Number of row (-1 for not counting the table titles)
    var inputElems = document.getElementsByTagName("input");  //Array one dimensional with the inputs (input link poll included)
    var numInputsForRow = (inputElems.length - 1) / rowCount; //Number of inputs for Row (-1 for not counting the link poll input)
    var count = 0, max = 0, maxAbs = 0, trSelected = -1, trSelectedArray = new Array(); 

    console.log(inputElems);
    for (var j = 1; j < inputElems.length; j++) {
        if (inputElems[j].type === "checkbox" && inputElems[j].checked) {
            count++;
        }
        if (j % numInputsForRow == 0) {  //Separate the elements of each row
            if (count > maxAbs) {
                max = count;
                maxAbs = count;
                trSelected = inputElems[j].parentNode.parentNode.parentNode.id; //trSelected is the id of the row that has the maximum number of checkbox checked
            } else if (count == max) {
                max = -1;
            }
            count = 0;
        }
    }

    if (trSelected != -1 && max != -1) {
        removeCheckboxWarning();
        document.getElementById(trSelected).setAttribute("class", "table-success"); //Modified the class of div
    }
    
   //Iterate the inputs elements again and check if there is more than one row withe the maximum number of checkbox
    for (var j = 1; j < inputElems.length; j++) { 
        if (inputElems[j].type === "checkbox" && inputElems[j].checked) {
            count++;
        }
        if (j % numInputsForRow == 0) {  
            if (count == maxAbs) { //if count (of row) is equal to the maximux push this row id in a array.
                trSelectedArray.push(inputElems[j].parentNode.parentNode.parentNode.id);
            } 
            count = 0;
        }
    }

    if(trSelectedArray.length > 1){ //if the array with de row's id have more than 1 element, remove the old modification (table-success) and insert table-warning in this rows.
        removeCheckboxSuccess();
        removeCheckboxWarning();
        for(var y=0; y<trSelectedArray.length; y++){
            document.getElementById(trSelectedArray[y]).setAttribute("class", "table-warning"); //Modified the class of div when several options are tied 
        }
    } 
}

function validateCheckboxes() {

    var checkboxChecked = [];
    var checkbox = document.getElementsByName('assignation');

    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            checkboxChecked.push(checkbox[i].value);
        }
    }

    document.getElementById("hidden").value = checkboxChecked;

}



function valueData() {

    var dateArray = [];
    var inputsDate = document.getElementsByClassName('date');

    for (var i = 0; i < inputsDate.length; i++) {
            dateArray.push(inputsDate[i].value);
    }
    document.getElementById('dates').value = dateArray;


    var timeStartArray = [];
    var inputsTimeStart = document.getElementsByClassName('timeStart');

    for (var i = 0; i < inputsTimeStart.length; i++) {
        timeStartArray.push(inputsTimeStart[i].value.toString());
    }
    document.getElementById('timesStarts').value = timeStartArray;


    var timeEndArray = [];
    var inputsTimeEnd = document.getElementsByClassName('timeEnd');

    for (var i = 0; i < inputsTimeEnd.length; i++) {
        timeEndArray.push(inputsTimeEnd[i].value.toString());
    }
    document.getElementById('timesEnds').value = timeEndArray;

}

