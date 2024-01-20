const Member = require("../models/members");
const Coupon = require("../models/coupon");


// couponCode, discountAmount, gymId, subscriptionId, expiryDate, applicableMemberIds  

async function useCouponCode(req,res){

    let body=req.body
    // couponCode, memberId
    //validations
    coupon = await Coupon.findOne({couponCode:body.couponCode})

    if(!coupon){
        return res.status(401).json({msg: "No such coupon code exists"})
    }
    member = await Member.findOne({memberId:body.memberId})
    var found = false
    var discountAmount = 0
    for (const couponCode of member.applicableCouponCodes) {
        if (couponCode == body.couponCode){
            found = true
            await Member.findOneAndUpdate(
                { memberId: body.memberId },
                {
                    $pull: {
                        applicableCouponCodes: couponCode,
                    },
                },
                { new: true }
            );

            coupon = await Coupon.findOneAndUpdate(
                { couponCode: body.couponCode },
                {
                    $pull: {
                        applicableMemberIds: body.memberId,
                    },
                },
                { new: true }
            );

            discountAmount = coupon.discountAmount
        }
      
    }

    if(!found){
        return res.status(401).json({msg: "Coupon not applicable to you"})

    }

    return res.status(200).json({msg: "You have been discounted", discountAmount})
}

module.exports={useCouponCode}