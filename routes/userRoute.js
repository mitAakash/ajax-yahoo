import express from "express";
const router = express.Router();
import employeeController from "../controllers/DepartmentController.js";
import EmployeeModals from "../modal/Employee.js";

  
router.get('/',employeeController.home)
router.post('/',employeeController.home)
router.post('/sendData',employeeController.createData)
router.post('/getdata',employeeController.getdata)
router.post('/delete',employeeController.delete)
router.post('/edit',employeeController.edit)
router.post('/UpdataData',employeeController.update)
router.get('/pag',employeeController.pag)
router.post('/pagData',employeeController.pagData)
router.post('/upload', employeeController.upload)
router.post('/jsondata', employeeController.jsondata)
router.get('/xls', employeeController.xlsx)



router.post('/delete',employeeController.delete)
router.get('/pagin/:id',employeeController.pagination)
router.post('/beta',employeeController.data)
router.post('/pagin',employeeController.pagination)
router.get('/editform',employeeController.editform)
export default router;
