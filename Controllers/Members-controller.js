let Member = require('../models/Members');
let Sect = require('../models/Sects');
let MyError = require('../ControllerError/MyError');

let controller = {};

controller.get = async (req, res, next) =>{
    try {
        res.status(200).json(await Member.find({}));
        console.log('get');
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};

controller.getId = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let member = await Member.findById(id);
        let sect = await Sect.findById(member.sectId);
        res.render('satanist',{
            member,
            sect
        })
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};

controller.post = async (req, res, next)=>{
    try {
        let member = await Member.create(req.body);
        let sect = await Sect.findById(member.sectId);
        sect.membersId.push(member._id);
        sect.save();
        res.redirect('/api/sects/'+ member.sectId +'')
    } catch (e) {
        next(new MyError(e.message, 500))
    }

};
controller.put = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let member = await Member.findByIdAndUpdate(id, req.body);

        member.save();
        res.redirect('/api/members/'+member._id)
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};

controller.delete = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let member = await Member.findByIdAndDelete(id);
        let sect = await Sect.findById(member.sectId);
        let mas = sect.membersId.splice(sect.membersId.indexOf(member._id),1);
        let sect2 = await Sect.findByIdAndUpdate(sect._id,{
            membersId: sect.membersId
        });
        sect2.save();
        res.redirect('/api/sects/'+ member.sectId)
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};




module.exports = controller;