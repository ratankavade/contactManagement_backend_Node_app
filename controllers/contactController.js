const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@routes GET - /api/contacts
//access private
const getAllContacts = asyncHandler(async (req, res)=>{
    const contact = await Contact.find({user_id: req.user.id})
    await res.status(200).json(contact);
})

//@desc Create contacts
//@routes POST - /api/contacts
//access private
const createContact = asyncHandler(async (req, res)=>{
    const {name, email, phone} = req.body;

    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mondetory")
    }
    const contact = Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    await res.status(201).json("Contact created", contact);
    console.log("Contact created", req.body)
})


//@desc Get contact by id
//@routes GET - /api/contacts/:id
//access private
const getContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Can not get details of another user contacts");
    }
    await res.status(200).send(contact);
})


//@desc Update contact
//@routes PUT - /api/contacts/:id
//access private
const updateContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Can not update details of another user");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true} // Return the updated document
    )
    await res.status(200).send(updatedContact);
})


//@desc Delete contact
//@routes Delete - /api/contacts/:id
//access private
const deleteContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Can not delete details of another user");
    }
    await Contact.deleteOne({_id: req.params.id})
    await res.status(200).json(contact);
})


module.exports = {getAllContacts, createContact, getContact, updateContact, deleteContact}