// UC4
window.addEventListener('DOMContentLoaded', (event) => {
    let addrBookId = localStorage.getItem("EditId");
    if(addrBookId){
        localStorage.removeItem("EditId");

        let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
        // let editPersonObj = addressBookList.find(addressBook => addressBook.id == addrBookId);


        const getURL = "http://localhost:3000/addressBook/"+addrBookId;
        makePromiseCall("GET", getURL, true)
            .then(responseText => {
                setFormValue(JSON.parse(responseText));
        })
        .catch(error => 
            console.log("GET Error Status : " + JSON.stringify(error))
            );

        // if(!editPersonObj){
        //     window.location.href = "AddrBookHomePage.html";
        // }
        // setFormValue(editPersonObj);
    }
});

function setFormValue(editPersonObj){
    document.querySelector('#fullName').value = editPersonObj.fullName;
    document.querySelector('#address').value = editPersonObj.address;
    document.querySelector('#city').value = editPersonObj.city;
    document.querySelector('#state').value = editPersonObj.state;
    document.querySelector('#zip').value = editPersonObj.zipCode;
    document.querySelector('#phno').value = editPersonObj.phoneNo;
    document.querySelector('#addrId').value = editPersonObj.id;
}

const remove = (id) => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList")); 
    let removePersonObj = addressBookList.find(addressBook => addressBook.id == id);
    if(!removePersonObj){
        return;
    }
    const index = addressBookList
                .map(addressBook => addressBook.id)
                .indexOf(removePersonObj.id);       
    addressBookList.splice(index,1);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

class Person{

    fullName;
    address;
    city;
    state;
    zipCode;
    phoneNo;

    set fullName(fullName){
        this.fullName = fullName;
    }
    set address(address){
        this.address = address;
    }
    set city(city){
        this.city = city;
    }
    set state(state){
        this.state = state;
    }
    set zipCode(zipCode){
        this.zipCode = zipCode;
    }
    set phoneNo(phoneNo){
        this.phoneNo = phoneNo;
    }
 
}

function validateName(personObj ){
    const firstName = document.querySelector('#fullName');
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(nameRegex.test(firstName.value)){
        personObj.fullName = firstName.value;
    }
    else{
        throw "Name is incorrect";
    }

}

function validateAddress(personObj){
    const address = document.querySelector('#address');
    let addressRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(addressRegex.test(address.value)){
        personObj.address = address.value;
    }
    else{
        throw "Address is incorrect";
    }

}

function validatePhoneNo(personObj){
    const phoneNo = document.querySelector('#phno');
    let phnoRegex = RegExp('91[0-9]{10}');
    if(phnoRegex.test(phoneNo.value)){
        personObj.phoneNo = phoneNo.value;
    }
    else{
        throw "Phone number is incorrect";
    }

}

function saveData(personObj){
   
    const postURL = "http://localhost:3000/addressBook";
    makePromiseCall("POST", postURL, true, personObj)
        .then(responseText => {
            alert("Submitted Successfully !");
    })
    .catch(error => console.log("POST Error Status : " + JSON.stringify(error)));
}

function updateData(personObj,id){
   
    const putURL = "http://localhost:3000/addressBook/"+id;
    makePromiseCall("PUT", putURL, true, personObj)
        .then(responseText => {
            alert("Details Updated Successfully !");
    })
    .catch(error => console.log("PUT Error Status : " + JSON.stringify(error)));
}

function formReset() {
    document.getElementById("addressBook").reset();
}

function onSubmit(){
    let personObj = new Person();

    try{
        validateName(personObj);
        validateAddress(personObj);

        const city = document.querySelector('#city');
        personObj.city = city.value;

        const state = document.querySelector('#state');
        personObj.state = state.value;

        const zipCode = document.querySelector('#zip');
        personObj.zipCode = zipCode.value;

        validatePhoneNo(personObj);
        
        const resultId = document.querySelector('#addrId').value;
        if(resultId == ''){
            saveData(personObj);
        }
        else{
            // Edit
            updateData(personObj,resultId);
        }
    }catch(e){
        alert(e);
    }
    return false;
}

function onCancel(){
    window.location.href = "AddrBookHomePage.html";
}