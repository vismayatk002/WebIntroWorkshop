// UC4
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
        this.profileImg = profileImg;
    }
    set city(city){
        this.gender = gender;
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

let personObj = new Person();

function validateName(){
    const firstName = document.querySelector('#fullName');
    const nameError = document.querySelector('.name-error');
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(nameRegex.test(firstName.value)){
        nameError.textContent = "";
        personObj.firstName = firstName.value;
    }
    else{
        throw "Name is incorrect";
    }

}

function validateAddress(){
    const address = document.querySelector('#address');
    const addrError = document.querySelector('.address-error');
    let addressRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(addressRegex.test(address.value)){
        addrError.textContent = "";
        personObj.address = address.value;
    }
    else{
        throw "Address is incorrect";
    }

}

function validatePhoneNo(){
    const phoneNo = document.querySelector('#phno');
    const phNoError = document.querySelector('.phno-error');
    let phnoRegex = RegExp('91[0-9]{12}');
    if(phnoRegex.test(phoneNo.value)){
        phNoError.textContent = "";
        personObj.phoneNo = phoneNo.value;
    }
    else{
        throw "Phone number is incorrect";
    }

}
try{
    validateName();
    validateAddress();
    validatePhoneNo();
}catch(e){
    alert(e);
}
