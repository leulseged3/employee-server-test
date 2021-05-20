import express from 'express'
import Mongoose from 'mongoose'

import { Employee } from './models'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json({ employees })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', (req, res, next) => {

    const employee = new Employee({
        _id:  new Mongoose.Types.ObjectId,
        name:req.body.name,
        date_birth: req.body.date_birth,
        gender:req.body.gender,
        salary: req.body.salary
    });

    employee.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "successful",
                newEmploy:result
            })
        })
        .catch(error => {
            res.status(500).json({
                error
            })
            console.log(error)
        })
})

router.get('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    if(Mongoose.Types.ObjectId.isValid(id)){
        Employee.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error:error
            })
        })
    } else {
        res.status(404).json({ message: "invalid id"})
    }
})

router.delete("/:employeeId", (req, res, next) => {
    const id = req.params.employeeId
    if(Mongoose.Types.ObjectId.isValid(id)){
        Employee.remove({ _id : id})
            .exec()
            .then(result => {
                res.status(200).json(result)
            }).catch(error => {
                res.status(500).json({ error })
            })
    } else {
        res.status(404).json({ message: "invalid id" })
    }
})

router.patch('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId
    if(Mongoose.Types.ObjectId.isValid(id)){
        Employee.updateOne({
            _id: id
        }, { $set: { 
                name:req.body.name, 
                salary: req.body.salary ,
                date_birth:req.body.date_birth,
                gender: req.body.gender
            }
        })
        .exec()
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ error }))
    } else {
        res.status(404).json({ message: "invalid id" })
    }
})

export  default router