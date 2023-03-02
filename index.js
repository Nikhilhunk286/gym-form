const express=require("express");
const path=require("path");
const app=express();
const port=process.env.PORT || 3000;
const fs=require("fs");
/*To run this doc. first go to express folder and then type nodemon L-25_Using-raw-HTML-in-pug.js in terminal,a   server of nodemon will start running and type localhost in chrome but to keep on checking any updates we have to first save it to rerun the  server  and rerun the webpage  in chrome,
only then changes will be visible */
//EXPRESS specific stuff
app.use('/static',express.static('static'))//For serving static files.
app.use(express.urlencoded({extended:true}))//express.urlencoded()->It's a middleware function i.e. those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method. It is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.  It's for POST and PUT requests, because in both these requests we are sending data (in the form of some data object) to the server(Here server is our laptop itself cuz it's localhost ,so all the req. will be served by it.) and we are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
//PUG RELATED STUFF(To install pug: do npm install pug --save)
app.set('view engine','pug')//set the template engine as pug, can also say set the view engine as pug.
app.set('views',path.join(__dirname,'views'))//set the view directory.

//ENDPOINTS
//1.GET request
app.get('/',(req,res)=>{
/*Here we are passing paramerers,arguments to our template file index.pug.It will be added at run time and so we can say we are adding
  dynamic content in placeholders specified index.pug.*/  
    const con="This is the content about pug template engine."
    const params={'title':'PUG is a good template engine',"content":con}
    res.status(200).render('index.pug',params);
 })
    
//2. POST request
app.post('/',(req,res)=>{

    console.log(req.body);//The req. body object allows you to access data in a string or JSON object from the client side. You generally use the req. body object to receive data through POST and PUT requests in the Express server.So, when we submit the form it will submit the data and console.log will print it.Actually we are not saving this data  in any file, we ar directly printin it.
    //We can also submit data in another way.
    name=req.body.name;
    age=req.body.age;
    gender=req.body.gender;
    address=req.body.address;
    more=req.body.more
    let outputToWrite=`The name of  the client is ${name}, he/she is ${age} years old, resides in ${address}.More  about him/her: ${more}`
    fs.writeFileSync('output.txt',outputToWrite)//writeFileSync is a method in fs module which create files, but it can also overwrite or append to the data on any existing file. So, here our user I/P will be stored in output.txt file and it will be overwritten whenever we submit data in form of index.pug file.
    const  params={message:'Your form has been submitted successfully'};
    res.status(200).render('index',params);//Here the message tag is not working, tried several methods but it seems a new technique is needed here. So don't use more brain here,  leave it for now.

  
});
//START  THE SERVER
app.listen(port,()=>{console.log(`The application started successfully on port ${port}`);});
