const express = require("express");

const nhomDoiTuongController = require("../controllers/nhomDoiTuongController");

const nhomDoiTuongRouter = express.Router();

nhomDoiTuongRouter.get("/", nhomDoiTuongController.getNhomDt);
nhomDoiTuongRouter.get("/:id", nhomDoiTuongController.getNhomDtById);
nhomDoiTuongRouter.post("/create", nhomDoiTuongController.create);
nhomDoiTuongRouter.post("/:id", nhomDoiTuongController.update);
nhomDoiTuongRouter.post("/delete/:id", nhomDoiTuongController.deleteNhomDt);

// tracuuRouter.post("/thuetncn", tracuuController.tracuuthueTNCN);
// tracuuRouter.post("/contact", tracuuController.contact);

// tracuuRouter.post("/employees", tracuuController.getEmployees);
// tracuuRouter.post("/employees/create", tracuuController.createEmployees);
// tracuuRouter.get("/employees/:id", tracuuController.getEmployeesById);
// tracuuRouter.post("/employees/update/:id", tracuuController.updateEmployees);

module.exports = nhomDoiTuongRouter;
