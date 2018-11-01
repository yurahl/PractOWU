let Sects = require('../models/Sects');
let Members = require('../models/Members');
let MyError = require('../ControllerError/MyError');

let controller = {};

let sects = [];
let members = [];


controller.get = async (req, res, next)=>{
    try {
        sects = await Sects.find({});
        res.render('Index',{
            sects
        })

    } catch (e) {
        next(new MyError(e.message, 500))
    }
};
controller.getId = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let sect = await Sects.findById(id);
        let mas = [];

        for (let member of sect.membersId) {
            let memberObj = await Members.findById(member);
            mas.push(memberObj);
        }
        members = mas;

        res.render('sect', {
            members,
            sect
        })
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};
controller.post = async (req, res, next)=>{
    try {
        let sect = await Sects.create(req.body);
        res.redirect('/api/sects');
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};
controller.put = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let sect = await Sects.findByIdAndUpdate(id, req.body);
        res.redirect('/api/sects/'+sect._id)
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};
controller.delete = async (req, res, next)=>{
    try {
        let id = req.params.id;
        let sect = await Sects.findByIdAndDelete(id);
        for (let memb  of sect.membersId) {
            await Members.findByIdAndDelete(memb);

        }
        res.redirect('/api/sects')
    } catch (e) {
        next(new MyError(e.message, 500))
    }
};

module.exports = controller;