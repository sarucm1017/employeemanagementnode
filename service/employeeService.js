const employeeModel = require("../models/employeesModel");
const asyncHandler = require("express-async-handler");

// async function getAllEmployees(page, size) {
//     const limit = parseInt(size);
//     const skip = (page- 1)*size;

//     const allEmployees = await employeeModel.find();
//     const employees = await employeeModel.find().sort({ createdAt: -1}).limit(limit).skip(skip);

//     return {allEmployees, employees};
// };

const getAllEmployees = asyncHandler(async (page, size) => {
    try {
        const pipeline = [];
        if (employeeSearch) {
            pipeline.push({
                $match: {employeeSearch}
            });
        }
        
        pipeline.push({
            $facet: {
                allEmployees: [
                    {
                        $sort: { createdAt: -1 }
                    }
                ],
                employees: [
                    {
                        $sort: { createdAt: -1 }
                    },
                    {
                        $skip: (page - 1) * size
                    },

                    
                    {
                        $limit: (size)
                    }
                ]
            }
        });


        const result = await employeeModel.aggregate(pipeline);

        if (!result || !result[0]) {
            throw new Error("No data returned from aggregation pipeline");
        }

        return result[0]; // Return the first element of the result array
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Internal server error");
    }
});




async function getEmployeeById(employeeId) {

    const employee = await employeeModel.findById(employeeId);
    if( !employee ){
        throw new Error("Employee Not Found");
    }
    return employee;

};


async function createEmployee(newEmployee){
    try{
        const employee = await employeeModel.create(newEmployee);
        return employee;
    } catch(error) {
        throw new Error("Error Creating Employee");
    }
};

async function updateEmployee(employeeId, updatedData) {
    try{
        const updateEmployee = await employeeModel.findByIdAndUpdate(employeeId,updatedData,{new:true});
        if(!updateEmployee) {
            throw new Error("Employee Not Found");
        }

        return updateEmployee;

    }catch (error){
        throw new Error("Error updating employee")
    }
};

async function deleteEmployee(employeeId) {
    try{
        const deleteEmployee= await  employeeModel.findByIdAndDelete(employeeId);

        if(!deleteEmployee){
            throw new Error("Employee Not found");
        }
        return deleteEmployee;
    }catch {
        throw new error ("Error in deleting Employee");
    }
};



//search  function

let employeeSearch = asyncHandler(async (req, res) => {
    try{
        const searchKeyword = await employeeModel.find({
            $or:[
                {firstName:{$regex:req.params.key,$options:"i"}},
                {lastName:{$regex:req.params.key,$options:"i"}},
            ]
        });

        console.log(searchKeyword);

        if(searchKeyword.length === 0){
            return res.status(400).json({message: "employee Not Found"});
        }

        return searchKeyword;


    }catch(error){
       
        const errorHandle = handleError(error);
        res.status(errorHandle.status).json({message : errorHandle.message});
    }
});



module.exports ={getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,deleteEmployee,employeeSearch}
