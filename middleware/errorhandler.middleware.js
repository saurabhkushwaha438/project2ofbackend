const errorhandler = (err,req,res,next)=>{
    console.log("i am at errorhandler middleware");
    
    console.error(err.stack);
    res.status(err.statusCode||500).json({
        success:false,
        message:err.message||"internal server error"
    })
    
}
export default errorhandler; 