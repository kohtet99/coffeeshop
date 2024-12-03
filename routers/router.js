const express = require("express");
const upload = require("../middlewares/upload_image.js");
const customerController =require("../controllers/customer.controller.js")
const productController = require("../controllers/product.controller.js");
const supplierController = require("../controllers/supplier.controller.js");

const employeeController = require("../controllers/employee.controller.js");
const orderController = require("../controllers/order.controller.js");
const orderDetailController = require("../controllers/orderdetail.controller.js");
const paymentController=require("../controllers/payment.controller.js");

const router = express.Router();

// Customers routers

router.post("/customer/register", customerController.registerbyemployee);



router.get("/customer/info/:id", customerController.getCustomerInfo);
router.get("/customer/all-customer", customerController.getAllCustomers);
router.get("/customer/search", customerController.searchCustomer);
router.patch("/customer/update-customer/:id", customerController.updateCustomer);

//pagination
router.get(
  "/customer/paginated-customers",
  customerController.getPaginatedCustomers
);

router.delete(
  "/customer/delete-one-customer/:id",
  customerController.deleteOne
);
router.delete(
  "/customer/delete-all-customer",
  customerController.deleteAllCustomer
);

//********************************************************************** */

// Employees routers

router.post("/employee/register",upload.single("image"), employeeController.register);
router.post("/employee/login", employeeController.login);
router.get("/employee/all-employees", employeeController.getAllEmployee);
router.get(
  "/employee/paginatedEmployees",
  employeeController.getPaginationEmployee
);
router.get("/employee/info/:id", employeeController.getEmployeeInfo);
router.patch("/employee/update-employee", employeeController.updateEmployee);
router.delete("/employee/delete-one-employee", employeeController.deleteOne);
router.delete("/employee/delete-all-employee", employeeController.deleteAll);

// ****************************************************************************

// Supplier Routers

router.get("/supplier/all-suppliers", supplierController.getAllSuppliers);
router.get("/supplier/:id", supplierController.getSupplier);
router.post("/supplier/create", supplierController.create);

// ****************************************************************************

// Product Routers

router.post(
  "/product/create",
  upload.single("image"),
  productController.createProduct
);

router.get("/product/all-products", productController.getAllProducts);
router.get("/product", productController.getProducts);
router.patch(
  "/product/update-product/:id",
  upload.single("image"),
  productController.updateProduct
);
router.delete(
  "/product/delete-one-product/:id",
  productController.deleteProduct
);

// ****************************************************************************

// Order Routers

router.post("/order/create-order", orderController.createOrder);
router.get("/order/get-all-orders", orderController.getAllOrders);
router.get("/order/paginate-orders", orderController.getPaginateOrders);

// ****************************************************************************

// OrderDetails Routers

router.post(
  "/order/orderDetails/create-orderDetails",
  orderDetailController.createOrderDetail
);
router.get(
  "/order/orderDetails/orderDetailPopulate/:id",
  orderDetailController.populateOrderDetails
);

//payment routers

router.post(
  "/payment/create-payment",
  paymentController.createPayment
);

// ****************************************************************************

module.exports = router;
