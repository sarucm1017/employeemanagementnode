



// Add Employee-popup  
const addemployee = document.getElementById("addEmployeeBtn");
addemployee.addEventListener("click",addemployeeformpopup);

function  addemployeeformpopup() {
    const addemployeeform = document.getElementById("addEmployeeForm");
    addemployeeform.style.display  = "block";

    const overlay = document.getElementById("overlayDiv");
    overlay.style.display =  "block";

}

//    edit employee


function editemployeepopup(id) {
    const editemployeeform = document.getElementById("editEmployeeForm")
    editemployeeform.style.display = "block";

    const overlay = document.getElementById("overlayDiv");
    overlay.style.display =  "block";

     
    editformview(id);

}


// delete employee


function deleteemployeepopup(id){
    console.log(id);
    const deleteemployeeform = document.getElementById("deleteEmployeeForm");
    deleteemployeeform.style.display = "block";

    const overlay = document.getElementById("overlayDiv");
    overlay.style.display =  "block";

    const deletebtn = document.getElementById("confirmDelete");
    deletebtn.addEventListener('click', ()=>{
         
        //delete function

        employee_delete(id);

        deleteemployeeform.style.display="none";
       


         const deleteMsg =document.getElementById("delete_emloyee");
         deleteMsg.style.display="block";
         setTimeout(() => {
            deleteMsg.style.display="none";
            overlay.style.display= "none";
         }, 1000);


    })
   


    }

    // delete function

    function employee_delete(id) {

        console.log("id is",id);
        fetch(`https://employeemanagementnode.onrender.com/api/employees/${id}`,{
            method:'DELETE',
        })
        .then((respone) =>  respone.json())
        .then(data =>{
            const deleteRow = document.getElementById(`row-${data._id}`);
            if(deleteRow){
                deleteRow.remove();
            }
            // console.log('API Response:',data);
            fetchData();
        })
        .catch(error =>{
            console.error('Error:', error);
        });

    }

//close function

function closefunction(){

    const addEmployeeForm =  document.getElementById("addEmployeeForm");
    addEmployeeForm.style.display = "none";

    const editemployeeform = document.getElementById("editEmployeeForm")
    editemployeeform.style.display = "none";

    const deleteemployeeform = document.getElementById("deleteEmployeeForm");
    deleteemployeeform.style.display = "none";
    
    const overlay = document.getElementById("overlayDiv");
    overlay.style.display =  "none";


// imageclosing function

    const imageview = document.getElementById("previewImg");
    imageview.src = "";
    imageview.style.display ="none";
    const imguploadsection = document.getElementById("imguploadsection");
    imguploadsection.style.width = "100%";
    imguploadsection.style.margin ="0 ";
    const toHidden = document.getElementById("toHidden");
    toHidden.style.display = "block";

    

}




// pagination

var currentPage =  1;
function pagination(totalPages){

    //button
    var pagenumberButton = document.getElementById("Page_Num_Btns");
    let temp = '';

    // condition
    for (let i=1;i<= totalPages;i++){
        temp +=`<button id="page${i}">${i}</button>`;

    }
    //function
    pagenumberButton.innerHTML = temp;
    pagenumberButton.addEventListener( 'click', function (e) {
         if ( e.target.tagName === "BUTTON"){
             const pageNumber = parseInt(e.target.textContent);
            if (!isNaN(pageNumber)) {
            currentPage = pageNumber;

            fetchData();
            }
            
            }
    }); 
    // left and right icon

    var pageleftbutton = document.getElementById("pageleft");
    var pagerightbutton = document.getElementById("pageright");


    // condition
    if (currentPage === 1) {
        pageleftbutton.classList.add("hidden");
     } else {
        pageleftbutton.classList.remove("hidden");
    }

    if (currentPage === totalPages) {
        pagerightbutton.classList.add("hidden");
    } else {
        pagerightbutton.classList.remove("hidden");
    }

    pageleftbutton.addEventListener( "click", function() {
        if (currentPage > 1 ) {
         currentPage--;
         fetchData();
         console.log("left",currentPage);
        }  
       
        });
    pagerightbutton.addEventListener( "click" , function(){
        if (currentPage < totalPages) {
            currentPage++;
            fetchData();
            console.log("right",currentPage);

        }
    });
    const actionButton = document.getElementById(`page${currentPage}`);
    actionButton.classList.add("active");


}

// fetching and displaying
// fetchData();
// async function fetchData(){
//     await fetch('http://localhost:2001/api/employees')
//     .then(response => response.json())
//     .then((data) =>{
//         employeeinfo = data.reverse();

        

//         let tabledata = '';


//         // employeelistselect

//         const employeeNumber = document.getElementById("employeeNumber");
//         employeeNumber.addEventListener("click",fetchData);
//         const TotalPageCount  = employeeNumber.value;
        

//         // page
//         const totalEmployee = document.getElementById("totalEmployee");
//         totalEmployee.innerHTML = `of ${employeeinfo.length}`;
//         const totalPages = Math.ceil(data.length / TotalPageCount);
//         pagination(totalPages);
//         const start =  TotalPageCount * (currentPage - 1);
//         const end =  Math.min(TotalPageCount * currentPage, data.length);
//         for (let i=start;i<end;i++){
//             const user = data[i];
//             let slNumber =  i+1 ;
//             let newslNumber = slNumber > 9 ? `#${slNumber}` : `#0${slNumber}`; 
//             tabledata += `   <tr>
//             <td>${newslNumber}</td>
//             <td> <img id="avatar" src="http://localhost:2001/api/employees/${user._id}/avatar" class="img"> ${user.salutation}  ${user.firstName} ${user.lastName} </td>
//             <td>${user.email}</td>
//             <td>${user.phone}</td>
//             <td>${user.gender}</td>
//             <td>${user.dob}</td>
//             <td>${user.country}</td>
//             <td>
//                 <div class="dropdown">
//                     <button class="btn extra_iteam" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                     <p>...</p>
//                     </button>
//                     <div class="dropdown-menu minidiv" aria-labelledby="dropdownMenuButton">
//                       <a href ="employeedetails?id=${user._id}" class="dropdown-item title" id="viewDetails" ><i class="fa-solid fa-user"></i>View Details</a>
//                       <a class="dropdown-item title" id="menuEdit" onclick="editemployeepopup('${user._id}')"><i class="fa-solid fa-pen"></i>Edit</a>
//                       <a class="dropdown-item title" id="menuDelete" onclick = "deleteemployeepopup('${user._id}')"><i class="fa-regular fa-trash-can"></i>Delete Employee</a>
//                     </div>
//                 </div>
//             </td>
//         </tr>`;
//     }
//         document.getElementById("tbody").innerHTML = tabledata;
        
//     })
//     .catch((err) => {
//         console.log(err)
//     });
// };



function displayEmployeeData(data, totalCountOnpage){

    let tableData ="";

    for (var i=0 ; i < data.length; i++){
        const user = data[i];

        tableData +=  `<tr id="row-${user._id}">
                       <td>#0${(currentPage-1) * totalCountOnpage + i + 1}</td>
                       <td> <img id="avatar" src="/${user.image}" class="img"> ${user.salutation}  ${user.firstName} ${user.lastName} </td>
                       <td>${user.email}</td>
                       <td>${user.phone}</td>
                       <td>${user.gender}</td>
                       <td>${user.dob}</td>
                       <td>${user.country}</td>
                       <td>
                         <div class="dropdown">
                             <button class="btn extra_iteam" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <p>...</p>
                            </button>
                            <div class="dropdown-menu minidiv" aria-labelledby="dropdownMenuButton">
                              <a href ="employeedetails/?id=${user._id}" class="dropdown-item title" id="viewDetails" ><i class="fa-solid fa-user"></i>View Details</a>
                               <a class="dropdown-item title" id="menuEdit" onclick="editemployeepopup('${user._id}')"><i class="fa-solid fa-pen"></i>Edit</a>
                               <a class="dropdown-item title" id="menuDelete" onclick = "deleteemployeepopup('${user._id}')"><i class="fa-regular fa-trash-can"></i>Delete Employee</a>
                             </div>
                         </div>
                     </td>
                     </tr>`;
    }

    document.getElementById("tbody").innerHTML = tableData;
};


fetchData();
var isFetching = false;
var currentPage = 1;

function fetchData(){
    if(isFetching){
        return;
    }

    isFetching = true;
    const employeeNumberCount = document.getElementById('employeeNumber')
    const totalPageCount = employeeNumberCount.value;

    fetch(
        `https://employeemanagementnode.onrender.com/api/employees?page=${currentPage}&size=${totalPageCount}`
    )
    .then((res) => {
        if(!res.ok) {
            throw new Error("network reesponse was not ok");
        }
        return res.json() ;
    })

    .then((data) =>{
        isFetching = false;

        //list-section
        employeeNumberCount.addEventListener("change",fetchData);
        const totalEmployee = document.getElementById( "totalEmployee");
        totalEmployee.innerHTML = `of ${data.allEmployees.length}`;


        const totalPages = Math.ceil(data.allEmployees.length/totalPageCount);
        pagination(totalPages);
        displayEmployeeData(data.employees,totalPageCount)

    })
    .catch((err) => {
        console.error("Error fetching data:", err);
        isFetching = false;
    });

};






///////////// Edit Employeee///////////////////////


// editform view details

async function editformview(id){
    await fetch(`https://employeemanagementnode.onrender.com/api/employees/${id}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {


        // const imageview = document.getElementById("editimageview");
        // imageview.src = data.image;


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
        
        const editimageview = document.getElementById("editimageview");
        editimageview.src =data.image;

        
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
    fetchData();

});


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

    const edituploadimg = document.getElementById("edituploadimg").files[0];

    if(edituploadimg) {
        formData.append("image",edituploadimg);
    }

   formData.append("salutation",salutation);
   formData.append("firstName",firstname);
   formData.append("lastName",lastname);
   formData.append("email",email);
   formData.append("phone",phone);
   formData.append("dob",newDob);
   formData.append("qualifications",qualification);
   formData.append("gender",gender);
   formData.append("address",address);
   formData.append("country",country);
   formData.append("state",state);
   formData.append("city",city);
   formData.append("pin",pin);
   formData.append("username",username);
   formData.append("password",password);


    
    

    // const editemployeeObject ={
        // salutation : salutation ,
        // firstName : firstname,
        // lastName : lastname,
        // email : email,
        // phone : phone,
        // dob :newDob,
        // qualifications:qualification,
        // gender:gender,
        // address:address,
        // country:country,
        // state:state,
        // city:city,
        // pin:pin,
        // username:username,
        // password:password,
    //  };

    //  let editemployeeData;

     fetch(`https://employeemanagementnode.onrender.com/api/employees/${id}`,{
        method: "PUT",
        body: formData,
     }) 
     .then((res) =>{
        return  res.json();
     })
     .then((data)=>{
        fetchData();
       console.log("Employee Details Updated Successfully!",data);
    //    editemployeeData =  data;

    }) 
    .catch((error) => {
      console.error("Error:", error);
    });

    editEmployeeForm.style.display="none";
    const overlay = document.getElementById("overlayDiv");
    overlay.style.display= "none";

}

// edit employeeimageview

let editimage =document.getElementById("editimageview");
let editinputimg =document.getElementById("edituploadimg");
editinputimg.onchange =function(){
editimage.src=URL.createObjectURL(editinputimg.files[0]);



}



////////////Add Employeee////////////////////

// add employeeform image view



const uploadimageview = document.getElementById("uploadimg");
uploadimageview.addEventListener('change',uploadimageView );

function uploadimageView(){

    const imagelink = URL.createObjectURL(uploadimageview.files[0]);
    const imageview = document.getElementById("previewImg");
    imageview.src = imagelink;

    imageview.style.height = "100px";
    imageview.style.width = "100px";
    imageview.style.borderRadius ="12px";
    imageview.style.display = "block" ;

    const imguploadsection = document.getElementById("imguploadsection");
    imguploadsection.style.width = "153px";
    imguploadsection.style.margin ="0 auto";

    const toHidden = document.getElementById("toHidden");
    toHidden.style.display = "none";



}

const addemployeesubmit = document.getElementById("addEmployeeSubmit");
addemployeesubmit.addEventListener("click", (e) =>  {
    e.preventDefault();
    const isValid = addformvalidation();
    if(!isValid){
        return;
    }

    const salutation = document.getElementById("addSalutation").value;
    const firstname = document.getElementById("addFirstName").value;
    const lastname = document.getElementById("addLastName").value;
    const username = document.getElementById("addUserName").value;
    const password = document.getElementById("addPassword").value;
    const email = document.getElementById("addEmail").value;
    const phone = document.getElementById("addPhone").value;
    const dobValue = document.getElementById("addDOB").value;
    const address = document.getElementById("addAddress").value;
    const qualifications = document.getElementById("addQualification").value;
    const gender =document.querySelector('input[name="addgender"]:checked').value;
    const city = document.getElementById("addCity").value;
    const country = document.getElementById("addCountry").value;
    const state = document.getElementById("addState").value;
    const pin = document.getElementById("addPin").value;

    const [year, month, day] = dobValue.split("-");
    const newDob = `${day}-${month}-${year}`;

    const image = document.getElementById("uploadimg").files[0];

    const formData  = new FormData();

    formData.append("salutation" , salutation);
    formData.append("firstName" , firstname);
    formData.append("lastName",lastname)
    formData.append("email", email);
    formData.append("phone",phone);
    formData.append("dob",newDob);
    formData.append("qualifications",qualifications);
    formData.append("gender",gender);
    formData.append("address",address);
    formData.append("country",country);
    formData.append("state",state);
    formData.append("city",city);
    formData.append("pin",pin);
    formData.append("username",username);
    formData.append("password",password);
    formData.append("image",image);

    const apiurl = "https://employeemanagementnode.onrender.com/api/employees" ;

    fetch(apiurl, {
        method : 'POST' ,
        body : formData,
    })

    .then((response) =>  response.json())
    .then((data) => {
        console.log("api response" , data);


        //appending the new row to the table

        const  tableBody = document.getElementById("tbody");
        const newRow = createTableRow(
        data,
        salutation,
        firstname,
        lastname,
        email,
        phone,
        gender,
        newDob,
        country
        );

        //insert the new row   at the beging of the table body

        setTimeout(() => {
            
            tableBody.insertAdjacentHTML('afterbegin',newRow);

            updateserialNos();
         },50);

         const employeeNumber = document.getElementById("employeeNumber").value;
         const tableRows = document.querySelectorAll("#tbody tr") ;
         if(employeeNumber == tableRows.length){
            const  lastRow = tableBody.lastElementChild;
            tableBody.removeChild(lastRow);

         }

            //updating employee number


            const employeeTotal = document.getElementById("totalEmployee");

            //extract current count

            let currentCount = parseInt(employeeTotal.textContent.split(" ")[1]);

            currentCount++;

            employeeTotal.textContent =`of ${currentCount}`;

            const success = document.getElementById("success_msg");
            success.style.display = "block";


            const addemployeeform = document.getElementById("addEmployeeForm");
            addemployeeform.style.display  = "none";
          
      
            setTimeout(() => {
            const success =document.getElementById("success_msg");
            success.style.display="none";
            const overlay = document.getElementById("overlayDiv");
            overlay.style.display= "none";
            },1000);
         })

         .catch((error) => {
            console.log("error :",error);
         });

         currentPage = 1;
        

        
});




//  data,
// salutation,
// firstname,
// lastname,
// email,
// phone,
// gender,
// newDob,
// country


// addemployeee

// function  addemployeedetails(){

    // const salutation = document.getElementById("addSalutation").value;
    // const firstname = document.getElementById("addFirstName").value;
    // const lastname = document.getElementById("addLastName").value;
    // const username = document.getElementById("addUserName").value;
    // const password = document.getElementById("addPassword").value;
    // const email = document.getElementById("addEmail").value;
    // const phone = document.getElementById("addPhone").value;
    // const dobValue = document.getElementById("addDOB").value;
    // const address = document.getElementById("addAddress").value;
    // const qualification = document.getElementById("addQualification").value;
    // const gender =document.querySelector('input[name="addgender"]:checked').value;
    // const city = document.getElementById("addCity").value;
    // const country = document.getElementById("addCountry").value;
    // const state = document.getElementById("addState").value;
    // const pin = document.getElementById("addPin").value;

    // const [year, month, day] = dobValue.split("-");
    // const newDob = `${day}-${month}-${year}`;

//     const employeeObject ={
//         salutation : salutation ,
//         firstName : firstname,
        // lastName : lastname,
        // email : email,
        // phone : phone,
        // dob :newDob,
        // qualifications:qualification,
        // gender:gender,
        // address:address,
        // country:country,
        // state:state,
        // city:city,
        // pin:pin,
        // username:username,
        // password:password,
//      };
//      let employeeData;

//      fetch("http://localhost:2001/api/employees",{
//         method: "POST",
//         headers:{
//             'Content-Type':'application/json'
//         },
//          body: JSON.stringify(employeeObject) ,
//      })

//      .then(response => response.json())

//       .then(async (data) => {
//         console.log("Employee added successfully",data);
//         employeeData =  data;
//         // fetchData();

//         const imageupload = document.getElementById("uploadimg");
//         const  imageuploading = new FormData();
//         imageuploading.append("image",imageupload.files[0]);
//         console.log("image added");

//         const user = data;
        

//         try {
//               const res = await fetch(`http://localhost:2001/api/employees`, {
//                   method: "POST",
//                   body: imageuploading,
//               });
//               if (res.ok) {
//                   console.log("image added successfully");


//                   // appending new row
//                   const tablebody = document.getElementById("tbody");
//                   const newRom = createTableRow(user, salutation, firstname, lastname, email, phone, gender, newDob, country);


//                   //  inserting at begin
//                   setTimeout(() => {
//                       tablebody.insertAdjacentHTML('afterbegin', newRom);
//                       updateserialNos();
//                   }, 50);

//                   const empNO = document.getElementById("employeeNumber").value;
//                   const tbodylength = document.querySelectorAll("#tbody tr");
//                   if(empNO == tbodylength.length){
//                     const lastRow = tablebody.lastElementChild;
//                     tablebody.removeChild(lastRow);
//                   }

                //   const success = document.getElementById("success_msg");
                //   success.style.display = "block";

//               } else {
//                   console.log("error in uploaing image:", res);
//               }
//           } catch (error) {
//               console.log("Error in uploading Image ", error);
//           }
//     }) 
//       .catch((error) => {
//         console.error(error);
//       });
    //    const addemployeeform = document.getElementById("addEmployeeForm");
    //   addemployeeform.style.display  = "none";
    

    //   setTimeout(() => {
    //   const success =document.getElementById("success_msg");
    //   success.style.display="none";
    //   const overlay = document.getElementById("overlayDiv");
    //   overlay.style.display= "none";
    //   },1000);
 


// }

// const addemployeesubmit = document.getElementById("addEmployeeSubmit");
// addemployeesubmit.addEventListener("click",(e) => {
//     e.preventDefault();
//     const isValid = addformvalidation();
//     if (!isValid){
     
//         return;
//     }
//     addemployeedetails();
//     // fetchData();
// });

function createTableRow( data, salutation, firstname , lastname ,email,phone, gender,newDob,country){
    return `<tr id="row-${data._id}">
            <td></td>
            <td>
               <img id="avatar" src='/${data.image}' class="img"></img>${salutation}  ${firstname} ${lastname} 
            </td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${gender}</td>
            <td>${newDob}</td>
            <td>${country}</td>
            <td>
                <div class="dropdown">
                    <button class="btn extra_iteam" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <p>...</p>
                    </button>
                    <div class="dropdown-menu minidiv" aria-labelledby="dropdownMenuButton">
                      <a href ="employeedetails.html?id=${data._id}" class="dropdown-item title" id="viewDetails" ><i class="fa-solid fa-user"></i>View Details</a>
                      <a class="dropdown-item title" id="menuEdit" onclick="editemployeepopup('${data._id}')"><i class="fa-solid fa-pen"></i>Edit</a>
                      <a class="dropdown-item title" id="menuDelete" onclick = "deleteemployeepopup('${data._id}')"><i class="fa-regular fa-trash-can"></i>Delete Employee</a>
                    </div>
                </div>
            </td>

        </tr>`;

}
function updateserialNos(){
    const tableRows = document.querySelectorAll('#tbody tr');
    tableRows.forEach((row,index) =>{
        const serialNo = row.querySelector('td:nth-child(1)');
        let serialNos = index+1;
        let newSerialNumber = serialNos > 9 ?`#${serialNos}` : `0${serialNos}` ;
        serialNo.textContent = newSerialNumber;
    });
}





// window.addEventListener("popstate",fetchData());

// searchinput


// function searching(){
//     let searchinput = document.getElementById("searchInput").value;
//     searchinput = searchinput.toLowerCase();
//     let rows = document.getElementsByTagName('tr');
//     let employeeNotFoundMsg = document.getElementById("notFound");
//     let found = false;

//     for(let i = 1 ;i < rows.length; i++){
//         if(!rows[i].innerHTML.toLowerCase().includes(searchinput)){
//             rows[i].style.display = "none";
//         }else{
//             rows[i].style.display = "" ;
//             found = true;
//         }
//     }
//     if (found){
//         employeeNotFoundMsg.style.display ="none";
//     }else{
//         employeeNotFoundMsg.style.display ="block";
//     }

// }



///aggregation searching


function searchEmployee(){
    let searchingInput = document.getElementById("searchInput").value.toLowerCase();
    if(searchingInput){
     
      fetch(`https://employeemanagementnode.onrender.com/api/employees/search/${searchingInput}`)
      .then((res) => {
        // if(!res.ok) {
        //     throw new Error("response was not ok");
        // }
        return res.json();
      })
      .then((data) => {
        displayEmployeeData(data);
        updateserialNos();
        const employeeNumberCount = document.getElementById('employeeNumber')
        const totalPageCount = employeeNumberCount.value;
        const totalPages = Math.ceil(data.length/totalPageCount);
        pagination(totalPages);
      })
      .catch((error) => {
        console.log('Error', error);
      });
    }else if (searchingInput == 0){
        // displayEmployeeData();
        fetchData();
    }else if (searchingInput === '0') {
        alert('Please enter a valid input');
    }
}



// addemployeevalidation


function addformvalidation(){

    const salutation = document.getElementById("addSalutation").value.trim();
    const firstname = document.getElementById("addFirstName").value.trim();
    const lastname = document.getElementById("addLastName").value.trim();
    const username = document.getElementById("addUserName").value.trim();
    const password = document.getElementById("addPassword").value.trim();
    const email = document.getElementById("addEmail").value.trim();
    const phone = document.getElementById("addPhone").value.trim();
    const address = document.getElementById("addAddress").value.trim();
    const qualification = document.getElementById("addQualification").value.trim();
    const city = document.getElementById("addCity").value.trim();
    const country = document.getElementById("addCountry").value.trim();
    const state = document.getElementById("addState").value.trim();
    const pin = document.getElementById("addPin").value.trim();

    const dob = document.getElementById("addDOB");
    const addDOBValidation = document.getElementById("addDOBValidation");
    const dobvalue = dob.value.trim();

    const gender = document.querySelector('input[name = "addgender"]:checked');
    const addGenderValidation = document.getElementById("addGenderValidation");

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

    // imagevalidation

    const uploadimage = document.getElementById("uploadimg");
    const imagevalidation = document.getElementById("imagevalidation");
    if(uploadimage.files.length == 0) {
        imagevalidation.textContent = "* pllease select the image.";
        isValid = false;
    }else{
        imagevalidation.textContent ="";
    }


    if(gender ){
        addGenderValidation.textContent ="";
        
    }else{
        addGenderValidation.textContent = "*  please select a gender";
        isValid = false;
    }

    if(dobvalue ===""){
        addDOBValidation.textContent = "* Required Date Of birth";
        isValid = false;
    }




    if(!phonePattern.test(phone)){
        document.getElementById("addPhoneValidation").textContent="* Invalid Phone Number";
        isValid = false;
    }
    if(!emailPattern.test(email)) {
        document.getElementById("addEmailValidation").textContent= "* Invalid Email ID" ;
        isValid = false;
    }
    if(!namePattern.test(firstname)) {
        document.getElementById("addFirstNameValidation").textContent =" * FirstName required";
        isValid =false;
    }    
    
    if(!namePattern.test(lastname)) {
        document.getElementById("addLastNameValidation").textContent = " * LastName required";
        isValid = false;
    }
    if(!passwordpattern.test(password))  {
        document.getElementById("addPasswordValidation").textContent= " * Invalid Password";
        isValid = false;
    } 
    if(salutation === "select"){
        document.getElementById("addSalutationValidation").textContent = " * Required ";
        isValid = false;
    }
    if(username === ""){
        document.getElementById("addUserNameValidation").textContent =" * Username can not be empty.";
        isValid = false;
    }
    if(address ===""){
        document.getElementById("addAddressValidation").textContent = " * Address field can't be empty.";
        isValid = false;
    }
    if(qualification ===""){
        document.getElementById("addQualificationValidation").textContent = "  * Qualification field can't be empty.";
        isValid = false;
    }
    if(city ===""){
        document.getElementById("addCityValidation").textContent = " * City field can't be empty.";
        isValid = false;
    }
    if(country ==="select"){
    document.getElementById("addCountryValidation").textContent = " * Country can't be Empty";
    isValid = false;
    }
    if(state ==="select"){
        document.getElementById("addStateValidation").textContent = " * State can't be Empty";
        isValid = false;
    }
    if(pin === ""){
        document.getElementById("addPinValidation").textContent = "* Inavalide pin";
        isValid = false;
    }

    // validation text event

    document.getElementById("addEmployeeForm").addEventListener("input", (event)=>{
        inputId = event.target.id;
        const errorid = `${inputId}Validation`;
        console.log(errorid);
        document.getElementById(errorid).textContent = "";
    }); 
    
    
    return isValid ;
}

// gender validation

const addmale =document.getElementById("male");
const addfemale = document.getElementById("female");
const  addGenderValidation = document.getElementById("addGenderValidation");
addmale.addEventListener("click",() => {
    const addGenderValidation = document.getElementById("addGenderValidation");
    addGenderValidation.textContent ="";

});
addfemale.addEventListener("click",() => {
    const addGenderValidation = document.getElementById("addGenderValidation");
    addGenderValidation.textContent ="";
});


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


