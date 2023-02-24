//importing
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const User=require('./schemas/User')
const DonorRegistration =require("./schemas/DonorRegistration")
const Organisation=require("./schemas/Organisation")
const Staff=require('./schemas/Staff')
const BloodComponet=require('./schemas/BloodComponent');
const BloodRequest = require('./schemas/BloodRequest');
const app=express();
const port=8000;

//db config
const connection_url="mongodb+srv://admin:admin@cluster0.2aegvni.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//middelewares
app.use(express.json());
app.use(cors());

//--------------------end points--------------

//user-signup
app.post('/users/new',(req,res)=>{
    const UserDetails=req.body.data;
    User.create(UserDetails,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    });
})

//user-login
app.post('/users/login',async (req,res)=>{
    const {email,password}=req.body.data;
    const userDetail = await User.findOne({ email: email });
    if (userDetail) {
      if (password === userDetail.password) {
        res.send({data: email});
      } else {
        res.send({ data: "Invaild Password" });
      }
    } else {
      res.send({ data: "User does not exist" });
    }
})
//fetch all organisation

app.get('/organisation/all',async (req,res)=>{
    const organisations=await Organisation.find();
    if(organisations)res.status(200).send(organisations);
})
//donor registration
app.post('/donor_registration',async (req,res)=>{
    const donorDetails=req.body.donorForm;
    if(donorDetails.donorAge<18||donorDetails.donorAge>65){
        res.status(201).send({data:"Age must be between 18 to 65"});
    }
    else{
        const aadharNumber=donorDetails.aadharNumber;
        const prevDetails=await DonorRegistration.find({ aadharNumber:aadharNumber }).sort({_id:-1}).limit(1)
        if(prevDetails.length==1){
            const prevDonationDate=prevDetails[0].donationDate;
            const donationType=prevDetails[0].donationType;
            var date1 = new Date(prevDonationDate);
            var date2 = new Date();
            var Difference_In_Time = date2.getTime() - date1.getTime();
            var Difference_In_Days = Math.abs(Difference_In_Time / (1000 * 3600 * 24));
            if(prevDetails[0].donationStatus==='completed'){
                if(Difference_In_Days>56&&donationType==='Whole Blood Donation'){
                    res.status(200).send({data:"You have donated whole blood so you have to wait atleast 56 days"});
                }
                else if(Difference_In_Days>112&&donationType==='Powered Red Donation'){
                    res.status(200).send({data:"You have donated double red donation so you have to wait atleast 112 days"});
                }
                else if(Difference_In_Days>28&&donationType==='Plasma Donation'){
                    res.status(200).send({data:"You have donated plasma so you have to wait atleast 28 days"});
                }
                else if(Difference_In_Days>7&&donationType==='Platelets Donation'){
                    res.status(200).send({data:"You have donated platelets so you have to wait atleast 7 days"});
                }
                else{
                    DonorRegistration.create(donorDetails,(err,data)=>{
                        if(err){
                            res.status(500).send(err);
                        }else{
                            res.status(201).send(data);
                        }
                    })
                }
            }
            else{
                res.status(200).send({data:"your previous donation is registered and pending ,you can see it in your home page"});
            }  
        }     
        else{
            DonorRegistration.create(donorDetails,(err,data)=>{
                if(err){
                    res.status(500).send(err);
                }else{
                    res.status(201).send(data);
                }
            })
        }   
    }
})
//donor applications
app.post("/donor_registration/all",async (req,res)=>{
    const userEmail=req.body.userEmail;
    const applications=await DonorRegistration.find({ userEmail:{$eq: userEmail} });
    if(applications){
        res.status(200).send(applications);
    }
    else{
        res.status(500).send("Something went wrong");
    }
})

//reject donor
app.post('/reject/donor',async (req,res)=>{
    let donorId=req.body.donorId;
    let rejectReason=req.body.rejectReason;
    const updatedDonor=await DonorRegistration.findByIdAndUpdate(
        donorId,
        {donationStatus:'rejected',rejectReason:rejectReason},
        {new: true},
    );
})

//accept donor
app.post('/accept/donor',async(req,res)=>{
    let donorId=req.body.donorId;
    const updatedDonor=await DonorRegistration.findByIdAndUpdate(
        donorId,
        {
            donationStatus:"sucess",
        },
        {new: true},
    )
})
//organisation registration
app.post('/organisations/new',(req,res)=>{
    let organisationData=req.body.data;
    Organisation.create(organisationData,(err,data)=>{
        if(!err)
        res.status(201).send(data)
        else
        res.status(500).send(err);
    })
})

//organisation login
app.post('/organisations/login',async (req,res)=>{
    const {organisationmail,organisationpassword}=req.body.data;
    const OrganisationDetail = await Organisation.findOne({ organisationmail: organisationmail });
    if (OrganisationDetail) {
      if (organisationpassword === OrganisationDetail.organisationpassword) {
        res.status(200).send({data: organisationmail});
      } else {
        res.send({ data: "Invaild Password" });
      }
    } else {
      res.send({ data: "Organistion does not exist" });
    }
})

//find organisation
app.post('/find_organisation',async (req,res)=>{
    const orgEmail=req.body.orgEmail;
    const OrganisationName=await Organisation.findOne({organisationmail: orgEmail})
    res.status(200).send({data:OrganisationName});
})
//staff registration
app.post('/staffs/new',(req,res)=>{
    let staffData=req.body.data;
    Staff.create(staffData,(err,data)=>{
        if(!err)
        res.status(201).send(data)
        else
        res.status(500).send(err);
    })
})
//staff login
app.post('/staffs/login',async (req,res)=>{
    const {staffmail,staffpassword}=req.body.data;
    const StaffDetail = await Staff.findOne({ staffmail: staffmail });
    if (StaffDetail) {
      if (staffpassword === StaffDetail.staffpassword) {
        res.status(200).send({data:StaffDetail});
      } else {
        res.send({ data: "Invaild Password" });
      }
    } else {
      res.send({ data: "Staff does not exist" });
    }
})
//today blood donors 
app.post('/blood_donors/today',async (req,res)=>{
    const organisation =req.body.organisation;
    const today=req.body.today;
    const bloodDonors=await DonorRegistration.find({ organisation:organisation,donationStatus:"registered",donationDate:today});
    if(bloodDonors){
        res.status(200).send({data:bloodDonors});
    }else{
        res.status(500).send({data:"Error Occured"})
    }
})

//all blood donors
app.post('/blood_donors/all',async (req,res)=>{
    const organisation =req.body.organisation;
    const bloodDonors=await DonorRegistration.find({ organisation:organisation});
    if(bloodDonors){
        res.status(200).send({data:bloodDonors});
    }else{
        res.status(500).send({data:"Error Occured"})
    }
})

//blood entry
app.post('/blood/new',async (req,res)=>{
    const blood=req.body.blood;
    BloodComponet.create(blood,(err,data)=>{
        if(err){
            res.status(500).send("something went wrong");
        }
        else{
            res.status(201).send(data);
        }
    })
})
//blood request 
app.post('/blood_request',async (req,res)=>{
    const request=req.body.requestForm;
    const bloodGroup=request.bloodGroup;
    const allOrg=await Organisation.find();
    const units=parseInt(request.units);
    let results=new Map();
    let currentDate = new Date(Date.now());
    let cDate=currentDate.getDate(),cMonth=currentDate.getMonth()+1,cYear=currentDate.getFullYear();
    if(cDate<10) cDate="0"+cDate;
    if(cMonth<10) cMonth="0"+cMonth;
    let today=cYear+"-"+cMonth+"-"+cDate;
    for(let m=0;m<allOrg.length;m++){
        var availableBloods=[];
        let bloodCounts={
            "O positive":0,
            "O negative":0,
            "A positive":0,
            "A negative":0,
            "B positive":0,
            "B negative":0,
            "AB positive":0,
            "AB negative":0,
        };
        const allBloods=await BloodComponet.find({component:request.bloodComponent,bloodStatus:"donated",organisation:allOrg[m].organisationname,expiryDate:{$gt:today} })
        allBloods.map((blood)=>{
        bloodCounts[blood.bloodGroup]=bloodCounts[blood.bloodGroup]+1;
        })
        if(units<=bloodCounts[bloodGroup]){
            let valid=allBloods.filter((blood)=>blood.bloodGroup===bloodGroup);
            console.log("valid",valid)
            let k=1,i=0;
            let v=[];
            while(k<=units&&i<valid.length){
                availableBloods.push(valid[i]);
                i++;
                k++;
            }
            // availableBloods=v;
        }
        if(availableBloods.length==0){
            if(bloodCounts[bloodGroup]>=1){
                let valid=allBloods.filter((blood)=>blood.bloodGroup===bloodGroup);
                availableBloods.push(...valid);
            }
            let remainingUnits=units-bloodCounts[bloodGroup];
            if(remainingUnits>=1){
                if(bloodGroup=="O positive"){
                    let validDonors=["O negative"];
                    for(let t=0;t<validDonors.length;t++){
                        if(bloodCounts[validDonors[t]]>=1){
                            let valid=allBloods.filter((blood)=>blood.bloodGroup===validDonors[t])
                            let validIndex=0;
                            while(remainingUnits>=1&&validIndex<valid.length){
                                availableBloods.push(valid[validIndex]);
                                validIndex++;
                                remainingUnits--;
                            }
                        }
                    }
                }
                else if(bloodGroup=="B negative"){
                    let validDonors=["O negative"];
                    for(let t=0;t<validDonors.length;t++){
                        if(bloodCounts[validDonors[t]]>=1){
                            let valid=allBloods.filter((blood)=>blood.bloodGroup===validDonors[t])
                            let validIndex=0;
                            while(remainingUnits>=1&&validIndex<valid.length){
                                availableBloods.push(valid[validIndex]);
                                validIndex++;
                                remainingUnits--;
                            }
                        }
                    }
                }
                else if(bloodGroup=="B positive"){
                    let validDonors=["B negative","O positive","O negative"];
                    for(let t=0;t<validDonors.length;t++){
                        if(bloodCounts[validDonors[t]]>=1){
                            let valid=allBloods.filter((blood)=>blood.bloodGroup===validDonors[t])
                            let validIndex=0;
                            while(remainingUnits>=1&&validIndex<valid.length){
                                availableBloods.push(valid[validIndex]);
                                validIndex++;
                                remainingUnits--;
                            }
                        }
                    }
                }
                else if(bloodGroup=="A negative"){
                    let validDonors=["O negative"];
                    for(let t=0;t<validDonors.length;t++){
                        if(bloodCounts[validDonors[t]]>=1){
                            let valid=allBloods.filter((blood)=>blood.bloodGroup===validDonors[t])
                            let validIndex=0;
                            while(remainingUnits>=1&&validIndex<valid.length){
                                availableBloods.push(valid[validIndex]);
                                validIndex++;
                                remainingUnits--;
                            }
                        }
                    }
                }
                else if(bloodGroup=="A positive"){
                    let validDonors=["A negative","O positive","O negative"];
                    for(let t=0;t<validDonors.length;t++){
                        if(bloodCounts[validDonors[t]]>=1){
                            let valid=allBloods.filter((blood)=>blood.bloodGroup===validDonors[t])
                            let validIndex=0;
                            while(remainingUnits>=1&&validIndex<valid.length){
                                availableBloods.push(valid[validIndex]);
                                validIndex++;
                                remainingUnits--;
                            }
                        }
                    }
                }
                else if(bloodGroup=="AB negative"){
                    let validDonors=["A negative","B positive","O negative"];
                    for(let t=0;t<validDonors.length;t++){
                        if(bloodCounts[validDonors[t]]>=1){
                            let valid=allBloods.filter((blood)=>blood.bloodGroup===validDonors[t])
                            let validIndex=0;
                            while(remainingUnits>=1&&validIndex<valid.length){
                                availableBloods.push(valid[validIndex]);
                                validIndex++;
                                remainingUnits--;
                            }
                        }
                    }
                }
                else if(bloodGroup=="AB positive"){
                    let validDonors=["AB negative","A positive","A negative","B positive","B negative","O positive","O negative"];
                    for(let t=0;t<validDonors.length;t++){
                        if(bloodCounts[validDonors[t]]>=1){
                            let valid=allBloods.filter((blood)=>blood.bloodGroup===validDonors[t])
                            let validIndex=0;
                            while(remainingUnits>=1&&validIndex<valid.length){
                                availableBloods.push(valid[validIndex]);
                                validIndex++;
                                remainingUnits--;
                            }
                        }
                    }
                }
            }
            
        }
        results.set(allOrg[m].organisationname,availableBloods);
    }
    res.status(200).send(JSON.stringify([...results]));
})
//accept blood request

app.post('/blood_request/accept',async (req,res)=>{
    const bloodDonors=req.body.blood;
    let requestForm=req.body.requestForm;
    let bloodId=[];
    bloodDonors.map((bloodDonor)=>{
        bloodId.push(bloodDonor._id)
    })
    requestForm["bloodId"]=bloodId;
    requestForm["organisation"]=req.body.organisation;
    bloodDonors.map(async (bloodDonor)=>{
        await BloodComponet.findByIdAndUpdate(
            bloodDonor._id,
            {bloodStatus:'donated'},
            {new: true},
        )
        BloodRequest.create(requestForm,(err,data)=>{
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(201).send(data)
            }
        });
    })
})

//blood request all

app.post("/blood_request/all",async (req,res)=>{
    const userEmail=req.body.userEmail
    const bloodRequests=await BloodRequest.find({userEmail:userEmail});
    if(bloodRequests){
        res.status(200).send(bloodRequests);
    }
    else{
        res.status(500).send("Something went wrong")
    }
})
//recipients all
app.post('/recipients/all',async (req,res)=>{
    const recipients=await BloodRequest.find({isDelivered:false,organisation:req.body.organisation})
    if(recipients){
        res.status(200).send(recipients);
    }
    else{
        res.status(500).send("Something went wrong")
    }
})

//recipients sucess 
//recipients all
app.post('/recipients/sucess',async (req,res)=>{
    const recipients=await BloodRequest.find({isDelivered:true,organisation:req.body.organisation})
    if(recipients){
        res.status(200).send(recipients);
    }
    else{
        res.status(500).send("Something went wrong")
    }
})

//recipient  success 

app.post('/recipients/all',async (req,res)=>{
    const recipients=await BloodRequest.find({isDelivered:true,organisation:req.body.organisation})
    if(recipients){
        res.status(200).send(recipients);
    }
    else{
        res.status(500).send("Something went wrong")
    }
})
//deliver blood
app.post('/deliver_blood',async (req,res)=>{
    const recipient=req.body.recipient;
    await BloodRequest.findByIdAndUpdate(
        recipient._id,
        {isDelivered:true},
        {new: true},
    )
})
//remove expired blood

app.post('/expired_blood',async (req,res)=>{
    let currentDate = new Date(Date.now());
    let cDate=currentDate.getDate(),cMonth=currentDate.getMonth()+1,cYear=currentDate.getFullYear();
    if(cDate<10) cDate="0"+cDate;
    if(cMonth<10) cMonth="0"+cMonth;
    let today=cYear+"-"+cMonth+"-"+cDate;
    const expiredBlood=await BloodComponet.find({organisation:req.body.organisation,expiryDate:{$lt:today},isExpired:false});
    expiredBlood.map(async (blood)=>{
       await BloodComponet.findByIdAndUpdate(
            blood._id,
            {isExpired:true},
            {new: true},
        )
    })
    let json={
        expired:expiredBlood.length,
    }
    res.status(200).send(json)
})
app.post('/expired_blood/all',async (req,res)=>{
    const expiredBlood=await BloodComponet.find({organisation:req.body.organisation,isExpired:true});
    let expired=[]
    async function getDetails(){
        for (const blood of expiredBlood)
        {
            const donorid=blood.donorId;
            const staffid=blood.staffHandled;
            const donor= await DonorRegistration.findOne({_id:donorid});
            const staff=await Staff.findOne({_id:staffid});
            let obj={};
            const keys = Object.keys(donor["_doc"]);
            keys.map((key)=>{
                if(key!='_id' && key!="__v"&& key !='rejectReason')
                obj[key]=donor[key];
            })
            obj["staffName"]=staff.staffname;
            obj["bloodUnits"]=blood.units;
            obj["component"]=blood.component;
            obj["expiryDate"]=blood.expiryDate;
            expired.push(obj);
        }
    }
    await getDetails();

    if(expiredBlood){
        res.status(200).send(expired);
    }
    else{
        res.status(500).send("No results found")
    }

})

app.post('/staffs/home',async (req,res)=>{
    const orgName=req.body.organisation;
    const orgDonorRegistrationRegsitered=await DonorRegistration.find({organisation:orgName,donationStatus:'registered'});
    const orgDonorRegistrationSucess=await DonorRegistration.find({organisation:orgName,donationStatus:'sucess'});
    const orgDonorRegistrationFailed=await DonorRegistration.find({organisation:orgName,donationStatus:'rejected'});
    const bloodUnits=await BloodComponet.find({organisation:orgName})
    let json={
        sucess:orgDonorRegistrationSucess.length,
        failed:orgDonorRegistrationFailed.length,
        registered:orgDonorRegistrationRegsitered.length+orgDonorRegistrationSucess.length+orgDonorRegistrationFailed.length,
        bloodUnits:bloodUnits.length,
    }
    res.status(200).send(json);

})
//port connection 
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("listening on port");
    }
});
