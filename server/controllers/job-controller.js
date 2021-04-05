const { Job, User, Driver } = require('../models')

class JobController {
    static getJobUser (req, res, next) {
        const UserId = +req.decoded.id
        console.log(UserId, 'dari job controller');
        Job.findAll({
            where: {UserId},
            include: [{model: User, attributes: ['nama', 'telephone']}, {model: Driver, attributes: ['nama', 'telephone']}],
            order: [['id', 'ASC']]}
            )
        .then(job => {
            res.status(200).json(job)
        })
        .catch(error => {
            next(error)
        })
    }
    static getJobDriver (req, res, next) {
        Job.findAll({
            where: {status: 'waiting'},
            include: {model: User, attributes: ['nama', 'telephone']},
            order: [['id', 'ASC']]
        })
        .then(job => {
            res.status(200).json(job)
        })
        .catch(error => {
            next(error)
        })
    }
    static postJob (req, res, next) {
        const UserId = +req.decoded.id
        const {alamat_asal , alamat_tujuan , nama_penerima, telephone_penerima,
            nama_barang, jenis_barang, jumlah, berat, estimasi_harga} = req.body

        let newJob = {alamat_asal , alamat_tujuan , nama_penerima, telephone_penerima,
            nama_barang, jenis_barang, jumlah, berat, estimasi_harga, status : 'waiting', UserId}
        
        Job.create(newJob)
        .then (job => {
            res.status(201).json(job)
        })
        .catch (err => {
            next(err)
        })
    }
    static pickJob (req, res, next) {
        const DriverId = +req.decoded2.id
        const requestId = +req.params.id

        const updateData = {
            tanggal: new Date(),
            DriverId,
            status: 'on delivery'
        }

        Job.update(updateData, {where: {id: requestId}, returning: true})
        .then (updatedJob => {
            res.status(200).json(updatedJob[1][0])
        })
        .catch (err => {
            next(err)
        })
    }
    static endJob (req, res, next) {
        const DriverId = +req.decoded2.id
        const requestId = +req.params.id
        const updateData = {
            status: 'done'
        }

        Job.update(updateData, {where: {id: requestId}, returning: true})
        .then (updatedJob => {
            res.status(200).json(updatedJob[1][0])
        })
        .catch (err => {
            next(err)
        })
    }
    static deleteJob (req, res, next) {
        const requestId = +req.params.id
        Job.destroy({where: {id: requestId}})
        .then (() => {
            res.status(200).json({message:'Job deleted'})
        })
        .catch (err => {
            next(err)
        })
    }
    
}

module.exports = JobController