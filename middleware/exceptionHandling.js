module.exports=function exceptionHandling(handler){

    return async (req,res,next)=>{
        try {

            await handler()
            
        } catch (error) {

            next(error)
            
        }
    }

}