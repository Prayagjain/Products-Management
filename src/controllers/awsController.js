const express = require("express");
const aws = require("aws-sdk");

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });

    var uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "project-5-group-29/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log(data);
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};


let profileImageLink= async function(req,res,next){
try{let  profileimage= req.files;
  
if (profileimage && profileimage.length > 0) {
  let uploadedFileURL = await uploadFile(profileimage[0]);
  req.xyz=uploadedFileURL
//   res.status(201).send({status:true, data:uploadedFileURL})
} else {
 return  res.status(400).send({status:false, message: "No file found" });
}
next()
}
catch(err){
    res.status(500).send({status:false, message:err })
}

}




module.exports = {profileImageLink}
