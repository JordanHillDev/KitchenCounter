const User = require("../models/User")

module.exports = {
    getIndex: async (req,res)=>{
        const userName = await req.user.userName
        try {
            res.render('dashboard.ejs', {userName: userName})
        } catch (err) {
            console.log(err)
        }
        
    }
}