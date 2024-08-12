const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log("id is",id);


// feching api

viewdetails(id);
function viewdetails(id){
    fetch(`https://employeemanagementnode.onrender.com/api/employees/${id}`)
    .then(res =>{
        return res.json();
    })
    .then(data => {

        // const profliImage = `<img src ="/${data.image}">`;
        // document.getElementById("viewprofilepic").innerHTML = profliImage ;

        // document.getElementById("viewProfilePic").innerHTML = `<img src="/${data.image}">`  

        // const profliImage = document.getElementById("viewprofilepic");
        // profliImage.src = data.image;
        document.getElementById("viewprofilepic").src = `/${data.image}`;
        viewprofilepic.style.width="110px";

        console.log(data.image);

        const  fullName = data.salutation + " "+ data.firstName+" "+data.lastName;
        document.getElementById('fullName').innerHTML=fullName ;
        document.getElementById("emailDetails").innerHTML=data.email;
        document.getElementById("genderDetails").innerHTML=data.gender;
        document.getElementById("DOB").innerHTML=data.dob;

        const DOB = dobformat(data.dob);
        const age = calculateAge(DOB);

        document.getElementById("ageDetails").innerHTML = age;
        document.getElementById("phnDetails").innerHTML = data.phone;
        document.getElementById("addDetails").innerHTML = data.address;
        document.getElementById("qualificationDetails").innerHTML =data.qualifications;
        // const userName = data.firstName +  data.lastName;
        document.getElementById("userName").innerHTML = data.username;

        // console.log("id is",id);
        // editemployeesubmition(id);
        // editformview(id);

    });
}
function calculateAge(dateOfBirth) {
    const dob = new  Date(dateOfBirth);
    const currentDate = new Date();
    const timeDiffrence = currentDate-dob;
    const age = Math.floor(timeDiffrence / (365.25 * 24* 60*  60*1000));
     return age;
}
function dobformat(DOB){
    const [date,month,year] = DOB.split("-");
    let formatdate = year +"-" + month +"-"+ date;
    return formatdate;
}

// delete

function  deleteemployeepopup(id){
    const deleteemployeeform = document.getElementById("deleteEmployeeForm");
    deleteemployeeform.style.display = "block";

    const overlay = document.getElementById("overlayDiv");
     overlay.style.display =  "block";
    
     const viewdelete = document.getElementById("viewDelete");
     viewdelete.addEventListener('click', ()=>{
     employee_delete(id);

     deleteemployeeform.style.display="none";
      } )
}



////delete employee 

function employee_delete(){

    fetch(`https://employeemanagementnode.onrender.com/api/employees/${id}`,{
        method:'DELETE',
    })
    .then((respone) =>  respone.json())
    .then(data =>{
        console.log('API Response:',data);
        window.location.href="/";
    })
    .catch(error =>{
        console.error('Error:', error);
    });
}

//  close popup
document.getElementById("viewdeletecancel").addEventListener("click",() => {
    document.getElementById("deleteEmployeeForm").style.display="none";
    document.getElementById("overlayDiv").style.display ="none";
});

document.getElementById("closeX").addEventListener("click",() => {
    document.getElementById("deleteEmployeeForm").style.display="none";
    document.getElementById("overlayDiv").style.display ="none";
});
document.getElementById("overlayDiv").addEventListener("click",() => {
    document.getElementById("deleteEmployeeForm").style.display="none";
    document.getElementById("overlayDiv").style.display ="none";
});

// edit


function  editdetailsformpopup(){

    const editEmployeeform  = document.getElementById("editEmployeeForm");
    editEmployeeform.style.display ="block";
    const overlay = document.getElementById("overlayDiv");
    overlay.style.display =  "block";
    editformview(id);
}

function closefunction(){

    const editEmployeeform  = document.getElementById("editEmployeeForm");
    editEmployeeform.style.display ="none";
    const overlay = document.getElementById("overlayDiv");
    overlay.style.display =  "none";
}


// editform view details

async function editformview(id){
    await fetch(`https://employeemanagementnode.onrender.com/api/employees/${id}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const editprofilepic = document.getElementById("editprofilepic");
        editprofilepic.src = `https://employeemanagementnode.onrender.com/api/employees/${id}`;
        document.getElementById("editprofilepic").src = `/${data.image}`;
         document.getElementById("editSalutation").value = data.salutation;
         document.getElementById("editFirstName").value = data.firstName;
         document.getElementById("editLastName").value= data.lastName;
         document.getElementById("editUserName").value=data.username;
         document.getElementById("editPassword").value=data.password;
         document.getElementById('editEmail').value = data.email;
         document.getElementById('editMobileNo').value = data.phone;
         document.getElementById("editAddress").value = data.address;
         document.getElementById("editQualification").value = data.qualifications;
         document.getElementById("editCountry").value = data.country;
         document.getElementById("editState").value = data.state;
         document.getElementById("editCity").value = data.city;
         document.getElementById("editPin").value = data.pin;

        //  dob
        const dobValue = data.dob;
        const [year, month, day] = dobValue.split("-");
        const newDob = `${day}-${month}-${year}`;
        document.getElementById("editDOB").value = newDob ;

        // gender

        document.querySelector(`input[name="editgender"][value='${data.gender}']`).checked = true;
        //edit image

         //  console.log(data.firstName);
    })
    .catch((error)=>{
        console.log('Error', error)
    });

    // editemployeevalidation

    const editemployeesubmit = document.getElementById("editEmployeeSubmit");
    editemployeesubmit.addEventListener("click",(e) => {
        e.preventDefault();
        const isValid = editformvalidation();
        if (!isValid){
         
            return;
        }
        editemployeesubmition(id);
        // editformview(id);
      
    
    });


   

    editEmployeeForm.style.display="block";
    const overlay = document.getElementById("overlayDiv");
    overlay.style.display= "block";
   

}

// editEmployee details put

function editemployeesubmition(id){


    const salutation = document.getElementById("editSalutation").value;
    const firstname = document.getElementById("editFirstName").value;
    const lastname = document.getElementById("editLastName").value;
    const username = document.getElementById("editUserName").value;
    const password = document.getElementById("editPassword").value ;
    const email = document.getElementById("editEmail").value;
    const phone = document.getElementById("editMobileNo").value;
    const dobValue = document.getElementById("editDOB").value;
    const address = document.getElementById("editAddress").value;
    const qualification = document.getElementById("editQualification").value;
    const gender =document.querySelector('input[name="editgender"]:checked').value;
    const city = document.getElementById("editCity").value;
    const country = document.getElementById("editCountry").value;
    const state = document.getElementById("editState").value;
    const pin = document.getElementById("editPin").value;
    
    const [day, month, year] = dobValue.split("-");
    const newDob = `${year}-${month}-${day}`;

    const formData = new FormData();

    ///image calling
    const viewedituploadimg = document.getElementById("viewedituploadimg").files[0];

    if(viewedituploadimg) {
        formData.append("image",viewedituploadimg);
    }


    formData.append("salutation", salutation);
    formData.append("firstName", firstname);
    formData.append("lastName", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dob", newDob);
    formData.append("qualifications", qualification);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pin", pin);
    formData.append("username", username);
    formData.append("password", password);

    console.log(formData);


     fetch(`https://employeemanagementnode.onrender.com/api/employees/${id}`,{
        method: "PUT",
        body: formData,
         
     })
     .then((response) => {
        return response.json();
     })
     .then((data)=>{
       console.log("Employee Details Updated Successfully!",data);

       viewdetails(id);
    })


    .catch((error) => {
      console.error("Error:", error);
    });

    closefunction();

}



// edit employeeimageview

const editimage =document.getElementById("editprofilepic");
const editinputimg =document.getElementById("viewedituploadimg");
editinputimg.onchange =function(){
editimage.src=URL.createObjectURL(editinputimg.files[0]);


}



// editemployeeValidation

function editformvalidation(){

    const salutation = document.getElementById("editSalutation").value.trim();
    const firstname = document.getElementById("editFirstName").value.trim();
    const lastname = document.getElementById("editLastName").value.trim();
    const username = document.getElementById("editUserName").value.trim();
    const password = document.getElementById("editPassword").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editMobileNo").value.trim();
    const address = document.getElementById("editAddress").value.trim();
    const qualification = document.getElementById("editQualification").value.trim();
    const city = document.getElementById("editCity").value.trim();
    const country = document.getElementById("editCountry").value.trim();
    const state = document.getElementById("editState").value.trim();
    const pin = document.getElementById("editPin").value.trim();

    const dob = document.getElementById("editDOB");
    const editDOBValidation = document.getElementById("editDOBValidation");
    const dobvalue = dob.value.trim();

    const gender = document.querySelector('input[name = "editgender"]:checked');
    const editGenderValidation = document.getElementById("editGenderValidation");

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{10}$/;
    const namePattern = /^[A-Za-z]+$/;
    const passwordpattern = new RegExp (
      
        "(?=.*[a-z])" +          
        "(?=.*[A-Z])" +         
        "(?=.*\\d)" +           
        "(?=.*[^A-Za-z0-9])" +   
        ".{8,}"  
        );
    
    let isValid = true;

    if(gender ){
        editGenderValidation.textContent ="";
        
    }else{
        editGenderValidation.textContent = "*  please select a gender";
        isValid = false;
    }

    if(dobvalue ===""){
        editDOBValidation.textContent = "* Required Date Of birth";
        isValid = false;
    }




    if(!phonePattern.test(phone)){
        document.getElementById("editMobileNoValidation").textContent="* Invalid Phone Number";
        isValid = false;
    }
    if(!emailPattern.test(email)) {
        document.getElementById("editEmailValiadation").textContent= "* Invalid Email ID" ;
        isValid = false;
    }
    if(!namePattern.test(firstname)) {
        document.getElementById("editFirstNameValidation").textContent =" * FirstName required";
        isValid =false;
    }    
    
    if(!namePattern.test(lastname)) {
        document.getElementById("editLastNameValidation").textContent = " * LastName required";
        isValid = false;
    }
    if(!passwordpattern.test(password))  {
        document.getElementById("editPasswordValidation").textContent= " * Invalid Password";
        isValid = false;
    } 
    if(salutation === "select"){
        document.getElementById("editSalutationValidation").textContent = " * Required ";
        isValid = false;
    }
    if(username === ""){
        document.getElementById("editUserNameValidation").textContent =" * Username can not be empty.";
        isValid = false;
    }
    if(address ===""){
        document.getElementById("editAddressValidation").textContent = " * Address field can't be empty.";
        isValid = false;
    }
    if(qualification ===""){
        document.getElementById("editQualificationValidation").textContent = "  * Qualification field can't be empty.";
        isValid = false;
    }
    if(city ===""){
        document.getElementById("editCityValidation").textContent = " * City field can't be empty.";
        isValid = false;
    }
    if(country ==="select"){
    document.getElementById("editCountryValidation").textContent = " * Country can't be Empty";
    isValid = false;
    }
    if(state ==="select"){
        document.getElementById("editStateValidation").textContent = " * State can't be Empty";
        isValid = false;
    }
    if(pin === ""){
        document.getElementById("editPinValidation").textContent = "* Inavalide pin";
        isValid = false;
    }

    // validation text event

    document.getElementById("editEmployeeForm").addEventListener("input", (event)=>{
        inputId = event.target.id;
        const errorid = `${inputId}Validation`;
        console.log(errorid);
        document.getElementById(errorid).textContent = "";
    }); 
    
    
    return isValid ;
}

const editmale =document.getElementById("editmale");
const editfemale = document.getElementById("editfemale");
const  editGenderValidation = document.getElementById("editGenderValidation");
editmale.addEventListener("click",() => {
    const editGenderValidation = document.getElementById("editGenderValidation");
    editGenderValidation.textContent ="";

});
editfemale.addEventListener("click",() => {
    const editGenderValidation = document.getElementById("editGenderValidation");
    editGenderValidation.textContent ="";
});

