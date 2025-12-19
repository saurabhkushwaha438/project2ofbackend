import contents from "../models/contents.model.js";

export const saveContent = async (req, res, next) => {
  try {
    const { email, content } = req.body;

    const updatedUser = await contents.findOneAndUpdate(
      { email }, // find by email
      { $push: { contents: content } }, // push new content
      {
        new: true,       // return updated document
        upsert: true     // create if not exists
      }
    );

    res.status(200).json({
      success: true,
      message: "Content saved successfully",
      data: updatedUser
    });

  } catch (error) {
    next(error);
  }
};

export const getContent = async (req,res,next)=>{
    const {email}=req.params;
    const data = await contents.find({email:email});
    res.status(200).json({
        success:true,
        content:data[0].contents
    })
}