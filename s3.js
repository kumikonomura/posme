//Optional Import
// import { uploadFile } from "react-s3";

// import S3FileUpload from "react-s3";
// require("dotenv").config();

// const config = {
//   bucketName: "posme",
// dirName: "photos" /* optional */,
//   region: "us-west-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// };

// export function upload(e) {
//   console.log(e.target.files[0]);
//   ReactS3.upload(e.target.files[0], config)
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => {
//       alert(err);
//     });
// }

// export function uploadPhoto(e) {
//   console.log(e.target.files[0]);
//   S3FileUpload.uploadFile(e.target.files[0].name, config)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }

/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
// export function uploadPhoto(file) {
//   S3FileUpload.uploadFile(file, config)
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
// }
//** OR *//

// export function uploadAnotherPhoto(file) {
//   uploadFile(file, config)
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
// }

var aws = require("aws-sdk");
require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-1", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const S3_BUCKET = process.env.bucket;
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req, res) => {
  console.log(process.env)
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read"
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    console.log(data)
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    // Send it all back
    console.log(returnData)
    return res.json({ returnData });
  });
};
