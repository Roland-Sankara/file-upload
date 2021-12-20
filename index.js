const express = require('express');
const multer = require('multer');

const app = express();

const PORT = process.env.PORT || 3000;

// Storage configuration
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload = multer({storage});

// Make static files available
app.use(express.static(__dirname + '/Public'));
app.use('/uploads', express.static('uploads'));


// Route to upload a single image
app.post('/profile-upload-single',upload.single('profile-file'),(req,res)=>{
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log('request',req)
    console.log('request file',JSON.stringify(req.file))
    let response = '<a href="/">Home</a><br>'
    response += "File uploaded successfully.<br>"
    response += `<img src="${req.file.path}" style="width:50%" /><br>`
    return res.send(response)
})

// Route for multiple images
app.post('/profile-upload-multiple', upload.array('profile-files', 12), (req,res)=> {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    console.log('request',req);
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"

    for(var i=0;i<req.files.length;i++){
        response += `<img src="${req.files[i].path}" style="width:50%" /><br>`
    }
    
    return res.send(response)
})

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})