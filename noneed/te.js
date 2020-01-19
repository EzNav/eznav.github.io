
   const AWS = require('aws-sdk')
   const bucket        = 'image1213' // the bucketname without s3://
   const photo_source  = 'a.jpg'
   const photo_target  = 'a.jpg'
   
   AWS.config.update({
      accessKeyId: 'AKIA3C5KRETDBWGT3EXG',
      secretAccessKey: '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',
      region: 'us-east-2'
    });

   const client = new AWS.Rekognition();
   const params = {
     SourceImage: {
       S3Object: {
         Bucket: bucket,
         Name: photo_source
       },
     },
     TargetImage: {
       S3Object: {
         Bucket: bucket,
         Name: photo_target
       },
     },
     SimilarityThreshold: 70
   }
   client.compareFaces(params, function(err, response) {
     if (err) {
       console.log(err, err.stack); // an error occurred
     } else {
       response.FaceMatches.forEach(data => {
         let position   = data.Face.BoundingBox
         let similarity = data.Similarity
         console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
       }) // for response.faceDetails
     } // if
   });