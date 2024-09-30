const router = require ("express").Router();
let Schedule = require("../models/Schedule");

//create
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const date = Date(req.body.date);
    const Time = req.body.Time;
    const GarbageType = req.body.GarbageType;
    const collectionZone = req.body.collectionZone;
    const AssignedVehicle = req.body.AssignedVehicle;
    const frequancy = req.body.frequancy;

    const newSchedule = new Schedule({
        name,
        date,
        Time,
        GarbageType,
        collectionZone,
        AssignedVehicle,
        frequancy
    })

    newSchedule.save().then(()=>{
         res.json("Schedule added")

    }).catch((err)=>{
        console.log(err);
    })

})
//read

router.route("/").get((req,res)=>{
     Schedule.find().then((schedules)=>{
        res.json(schedules)
     }).catch((err)=>{
        console.log(err);
    })

})

//update route

router.route("/update/:id").put(async(req,res)=>{
   let scheduleId = req.params.id;
   const {name,date,Time,GarbageType,collectionZone,AssignedVehicle,frequancy} =req.body;

   const updateSchedule = {
    name,
    date,
    Time,
    GarbageType,
    collectionZone,
    AssignedVehicle,
    frequancy

   }
   try {
    // Update schedule by ID and return the updated document
    const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updateSchedule, { new: true });

    if (!updatedSchedule) {
      return res.status(404).send({ status: "Schedule not found" });
    }

    res.status(200).send({ status: "Schedule updated", data: updatedSchedule });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let scheduleId = req.params.id;

    await Schedule.findByIdAndDelete(scheduleId).then(()=> {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete schedule",error: err.message});
    })

    })



module.exports = router;