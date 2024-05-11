const express = require("express");
const router = express.Router();
const {getAllEmployees,getEmployee,createEmployee,updateEmployee,deleteEmployee,searching} = require("../controller/employeeController")

router.route("/").post(createEmployee);
router.route("/").get(getAllEmployees);


router.route("/:id").get(getEmployee).put(updateEmployee).delete(deleteEmployee);

router.route("/search/:key").get(searching);


module.exports=router;
