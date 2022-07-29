let  mongoose=require("mongoose")
let ObjectId=mongoose.Schema.Types.ObjectId
let orderSchema=new mongoose.Schema(
    {
        
        userId: {type:ObjectId, refs:'User', required:true},
        items: [{
          productId: {type:ObjectId, ref:'Product', required:true},
          quantity: {type:Number, required:true}
        }],
        totalPrice: {type:Number, required:true},
        totalItems: {type:Number, required:true},
        totalQuantity: {type:Number, required:true},
        cancellable: {type:Boolean, default: true},
        status: {type:String, default: 'pending', enum:[pending, completed, cancled]},
        deletedAt: {type:Date}, 
        isDeleted: {type:Boolean, default: false}
     
    },
  { timestamps: true })
  
module.exports = mongoose.model('Order', orderSchema)