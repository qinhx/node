var express = require('express')
var  router = express.Router();
var mongoose = require('mongoose')
router.route('/')
            .get((req,res,next)=>{
                var db = mongoose.createConnection('mongodb://localhost:27017/mydb',{useNewUrlParser: true });
                var User = db.model('user',new mongoose.Schema({
                    id:String,
                    flag:Boolean,
                    times:{
                        timeIn:String,
                        timeOut:String
                    }
                }));
                var history = db.model('history',mongoose.Schema({
                    id:String,
                    flag:Boolean,
                    times:{
                        timeIn:String,
                        timeOut:String
                    }
                }));
                var id = req.query.id;
                var date = new Date();
                date = date.getTime();
                var newDate = {
                    id:id,
                    flag:false,
                    times:{
                        timeIn:date,
                        timeOut:date
                    }
                }
                User.find({id:id,flag:true},(err,data)=>{
                    console.log(data[0]);
                    
                })
                User.find({id:id},(err,da)=>{
                    if(err) console.log("err")
                    if(da.length == 0){
                        User.create(newDate,(err,d,affectNums)=>{
                            if(err) console.log("error at Create");
                            if(affectNums == 0) console.log("插入失败")
                            res.send("进入成功")
                        })
                    }else{
                        User.updateOne({id:id},{flag:true,times:{
                            timeIn:da[0].times.timeIn,
                            timeOut:date}},(err,raw)=>{
                            if(err) console.log(err);
                            else console.log(raw)
                            
                            User.find({id:id},(err,da)=>{
                                res.send(da[0])
                                history.create({
                                    times:{
                                        timeIn:da[0].times.timeIn,
                                        timeOut:da[0].times.timeOut
                                    },
                                    id:da[0].id,
                                    flag:da[0].flag
                                },(err,result)=>{
                                })
                            })
                            User.remove({id:id},(err,any)=>{
                                if(err) console.log("remove fail");
                            })
                        });

                    }
                })
                
            })
            .post((req,res,next)=>{
            })


module.exports = router;