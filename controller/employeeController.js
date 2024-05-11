
const asyncHandler =  require("express-async-handler");
const employeeModel = require("../models/employeesModel");
const multer = require("multer");
const upload = require("../config/multer");
const employeeService = require("../service/employeeService");
const path = require("path");
const { log } = require("console");



//@descr get all the employee
//@route Get/api/employees
//@access  public
//  const  getAllEmployees = asyncHandler(async(req,res) => {

//     try{
//         let{ page = 1, size =10 } = req.query;
//         console.log(size);
//         page = parseInt(page);
//         size = parseInt(size);

//         const {allEmployees, employees} = await employeeService.getAllEmployees(page , size );
//         res.status(200).json({allEmployees, employees});
//     }catch(error){
//         res.status(500).json({ error:"internal server error"});
//     }
    
// });



// const getAllEmployees = asyncHandler(async (req, res) => {
//     try {
//         let { page = 1, size = 10 } = req.query;
//         page = parseInt(page);
//         size = parseInt(size);

//         const { allEmployees, employees } = await employeeService.getAllEmployees(page, size);
//         res.status(200).json({ allEmployees, employees });
//     } catch (error) {
//         console.error("Error fetching employees:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

const getAllEmployees = asyncHandler(async (req, res) => {
    try {
        let { page = 1, size = 10 } = req.query;
        page = parseInt(page);
        size = parseInt(size);

        const { allEmployees, employees } = await employeeService.getAllEmployees(page, size);
        res.status(200).json({ allEmployees, employees });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//@descr get the employee
//@route Get/api/employee/:id
//@access  private
const  getEmployee = asyncHandler(async(req,res) => {

    try{
        const employeeId = req.params.id;
        const employee = await employeeService.getEmployeeById(employeeId);
        res.status(200).json(employee);
    }catch(error){
        res.status(404).json({ error: error.message})
    }
});

//@descr create the employee
//@route Post/api/employee/:id
//@access  public
const createEmployee = asyncHandler(async(req,res)  => {
    console.log("the body is :" ,req.body);

    upload(req,res, async function (err) {
        if(err instanceof multer.MulterError) {
            res.status(400).json({ message: "Image upload error" });
        }else if(err) {
            res.status(500).json({  message: "internal server error" })
        }else{

            const{salutation,
                firstName,
                lastName,
                email,
                phone,
                dob,
                qualifications,
                gender,
                address,
                country,
                state,
                city,pin,username,password} = req.body;

                const imagepath = req.file ? req.file.path : null;

                if(!salutation||!firstName||!lastName||!email||!phone||!dob||!qualifications||!gender||!address||!country||!state||!city||!pin||!username||!password){
                    res.status(400);
                    throw new Error("all fields are required"); 
                }
                const newEmployee = {
                    salutation,
                    firstName,
                    lastName,
                    email,
                    phone,
                    dob,
                    qualifications,
                    gender,
                    address,
                    country,
                    state,
                    city,pin,username,password,
                    image:imagepath,
                    };

                    const employee =await employeeService.createEmployee(newEmployee)
                    res.status(201).json(employee);
                }
    })
});

//@descr update the employee
//@route Put api/employee/:id
//@access  public
const  updateEmployee = asyncHandler(async(req,res) => {

    upload(req,res, async (error) => {
        if(error instanceof multer.MulterError){
            return res.status(400).json({error:"Image upload  error:" + error.message});
        }
        let imagepath;

        if(req.file) {
            imagepath = path.join("uploads",req.file.filename);
        }else{
            const  existingEmployee = await employeeModel.findById(req.params.id);

            if(!existingEmployee) {
                return res.status(404).json({error:"EmployeeNot Found"});
            }

            //already exiisting path 

            imagepath = existingEmployee.image;
        }


        //upade only image if a new file upload
        
        const updatedData = {
            ...req.body,
            ...(imagepath ? {image: imagepath} : {}),
        };


        const upadateEmpoyee = await employeeService.updateEmployee(req.params.id ,updatedData );
        return res.status(200).json(upadateEmpoyee);

    });
});

//@descr delete the employee
//@route Delete/api/employee:id
//@access  public
const  deleteEmployee = asyncHandler(async(req,res) => {

    try{
        const employeeId = req.params.id;
        const deletedEmployee = await employeeService.deleteEmployee(employeeId);
        res.status(200).json(deletedEmployee);
    }catch (error){
        res.status(404).json({error: error.message});
    }
});


//search

const  searching = async (req, res) => {
    try{

        const data = await employeeService.employeeSearch(req);
        res.status(200).json(data);
    }catch(error){

        res.status(404).json({error: error.message});
      
    }
}





module.exports ={getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,searching}
    