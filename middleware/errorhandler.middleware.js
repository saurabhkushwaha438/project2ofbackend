const errorhandler = (err,req,res,next)=>{
    console.error(err.stack);
    res.status(err.statusCode||500).json({
        success:false,
        message:err.message||"internal server error"
    })
    
}
export default errorhandler; 