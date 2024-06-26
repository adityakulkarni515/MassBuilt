const Member = require("../models/members");
const Coupon = require("../models/coupon");

var voucher_codes = require('voucher-code-generator');

// couponCode, discountAmount, gymId, subscriptionId, expiryDate, applicableMemberIds  

async function createCouponCode(req,res){

    let body=req.body
    // memberIds, discountAmount, gymId, subscriptionId, expiryDate  
    //validations

    const code = voucher_codes.generate({
        length: 8,
        count: 1
    });

    await Coupon.create({
    
       couponCode:code[0],
       discountAmount:body.discountAmount,
       gymId:body.gymId,
       subscriptionId:body.subscriptionId,
       expiryDate:body.expiryDate,
       applicableMemberIds: body.memberIds

      });

    for(const memberId of body.memberIds){

        await Member.findOneAndUpdate(
            { memberId: memberId},
            {
                $push: {
                    applicableCouponCodes:code,
                },
            }
        )
        
    }

    

    return res.status(200).json({msg: "Coupon Code Created Succesfully"})
}

module.exports={createCouponCode}