
var x = 3;
if (x == 0){
    exec("aws2 rekognition create-collection \
        --collection-id 'shit'", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
} else if (x == 1){
    exec("aws2 rekognition list-collections", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}  else if (x == 2){
    exec("aws2 rekognition search-faces-by-image \
    --image '{\"S3Object\":{\"Bucket\":\"image1213\",\"Name\":\"a.jpg\"}}' \
    --collection-id \"shit\"", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

