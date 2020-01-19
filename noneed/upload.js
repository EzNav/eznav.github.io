const fs = require('fs');
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    accessKeyId: 'AKIA3C5KRETDBWGT3EXG',
    secretAccessKey: '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'
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'image1213',
        Key: 'cat.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile('cat.jpg');