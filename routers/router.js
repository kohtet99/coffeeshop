const express = require("express");
const upload = require("../middlewares/upload_image.js");
const customerController = require("../controllers/customer.controller.js");
const employeeController = require("../controllers/employee.controller.js");
const employeeShiftControler = require("../controllers/employeeShift.controller.js");

const router = express.Router();

// Customer Routers

router.post("/customer/register", customerController.register);
router.post("/customer/login", customerController.login);
router.get("/customer/info/:id", customerController.getCustomerInfo);
router.get("/customer/all-customer", customerController.getAllCustomers);
router.get("/customer/search", customerController.searchCustomer);
router.patch("/customer/update-customer", customerController.updateCustomer);
router.delete(
  "/customer/delete-one-customer/:id",
  customerController.deleteOne
);
router.delete(
  "/customer/delete-all-customer",
  customerController.deleteAllCustomer
);

//********************************************************************************** */

// Employees Routers

router.post("/employee/register", employeeController.register);
router.post("/employee/login", employeeController.login);
router.get("/employee/employeeInfo/:id", employeeController.getEmployeeInfo);
router.get("/employee/allEmployee", employeeController.getAllEmployee);
router.patch("/employee/updateEmployee/:id", employeeController.updateEmployee);
router.delete("/employee/deleteOneEmployee/:id", employeeController.deleteOne);
router.delete("/employee/deleteAll", employeeController.deleteAll);

//************************************************************************************ */

// EmployeeShifts Routers

router.post("/employeeShift/create", employeeShiftControler.create);
router.get("/employeeShift/test/", employeeShiftControler.test);

router.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json(req.file);
});

module.exports = router;
