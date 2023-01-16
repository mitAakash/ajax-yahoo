import CSVError from "csvtojson/v2/CSVError.js";
import EmployeeModals from "../modal/Employee.js";
import dataModals from "../modal/data.js";
import fs from 'fs'
import xlsx from 'xlsx'
import excelToJson from "convert-excel-to-json";
class employeeController {
  static home = async (req, res) => {

    res.render("index");
  };

  static createData = async (req, res) => {
    
    const date = await EmployeeModals({
      Name: req.body.name,
      Age: req.body.age,
      City: req.body.city,
    });
    await date.save();
 res.send('date')
  };
  static getdata = async(req,res)=>{
   
    var result = await EmployeeModals.find()
    var pagelength = 4
    if(result.length%pagelength != 0){
     var limit = Math.trunc(result.length/pagelength)+1
    }else{
     var limit = Math.trunc(result.length/pagelength)
    }
    var page_No = req.body.page_No

   
    
    var page = ( page_No- 1) * pagelength
   

    const data = await EmployeeModals.find().skip(page).select().limit(pagelength);
    var obj = {
      data:data,
      limit: limit
    }
    res.send(obj)
  }
 
  static delete = async (req, res) => {
  
    const data = await EmployeeModals.findByIdAndDelete(req.body.abc)

    res.redirect("/");
  };
  static edit = async (req, res) => {
    // console.log("object",req.body.data)
    const data = await EmployeeModals.findById(req.body.data);
 
    res.send(data)
  };
  static update = async (req, res) => {
    console.log('aaka',req.body)
    const detil = await EmployeeModals.findByIdAndUpdate(req.body.id ,
      req.body);
       
      
    res.redirect("/");
  };
  static pagination = async (req, res) => {
    const pageNumber = req.params.id;
    const result = await EmployeeModals.find();  
    var pagelength = 2;
    if (result.length % pagelength != 0) {
      var limit = (Math.trunc(result.length / pagelength) + 1);
    } else {
      var limit = Math.trunc(result.length / pagelength);
    }
    var page = (pageNumber - 1) * pagelength;
    const detail = await EmployeeModals.find()
      .skip(page)
      .select()
      .limit(pagelength);
    var current = parseInt(pageNumber);
    var obj = {
      
      result: limit,
      detail: detail,
      current: current,
    };
    res.render("home", obj);
  };
  static pag= async(req,res)=>{
    res.render('pagination')
  }
  static data = async (req, res) => {
    // console.log("object",req.body.action)
    const result = await EmployeeModals.find({
      Name: {
        $regex:req.body.action,

        $options: "i",
      },

    });
    // console.log("object",data)
    res.send(result);
  };
  static editform = async(req,res)=>{
    res.render('editform')
  }
  static pagData = async(req,res)=>{
    var pagelength = 3
   var page = (1-1)*pagelength

    const data = await EmployeeModals.find().skip(page).select().limit(pagelength)
    res.send(data)
  }
  static upload =async(req,res)=>{
    var result = excelToJson({source:fs.readFileSync('./data/upload/Anurag excel.xlsx')})
    console.log("object",result.Sheet1)
    if(result.Sheet1 != null){
     for(let i=2;i<result.Sheet1.length;i++){
       if(result.Sheet1[i].B == null){
         break;
       }else{
         const data = await dataModals({
           product : result.Sheet1[i].C,
           qty : result.Sheet1[i].D,
           NetPrice : result.Sheet1[i].E,
           Delivery : result.Sheet1[i].F
         })
         await data.save();
       }
     }
    }else{
     console.log("No data found")
    }
  
    }
      
  
    static jsondata = async(req,res)=>{
    
      const data = await dataModals.find()
      res.send(data)
    }   
   
    static xlsx = async(req,res)=>{
    
    }
}

export default employeeController;
