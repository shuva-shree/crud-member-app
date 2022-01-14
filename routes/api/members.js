const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");



//Gets all members
router.get('/', (req, res) => res.json(members));

//Get single meber
router.get('/:id', (req,res) => {
    // res.send(parse.Int(req.params.id));
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg : `No member with the id of ${req.params.id}`});
    }
});

//Create a member
router.post("/",(req,res) => {
    const newMember = {
        id: uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : "active",
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg : 'Please include a name and an email'});
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/')
});

//Update a member
router.put('/:id', (req,res) => {
    const updateMember = req.body;
    
    const found = members.some(member => member.id === parseInt(req.params.id));
   

    if(found){
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name,
                member.email = updateMember.email ? updateMember.email : member.email,

                res.json({msg : 'Member is updated',member})
            }
        })
    }else{
        res.status(400).json({msg : `No member with the id of ${req.params.id}`});
    }
});

//Delete  a member
router.delete('/:id', (req,res) => {
    const updateMember = req.body;
    
    const found = members.some(member => member.id === parseInt(req.params.id));
   

    if(found){
       res.json({
            msg:'Member is deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
    }else{
        res.status(400).json({msg : `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;