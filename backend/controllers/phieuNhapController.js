const {sql, poolPromise } = require('../config/db.js')
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const moment = require("moment")

async function create(req, res) {
  try{
    const id = uuidv4()
    const Ident = req.body.Ident
    const NgayCt = req.body.NgayCt
    const MaCt = req.body.MaCt
    const LoaiCt = req.body.LoaiCt
    const SoCt = req.body.SoCt
    const MaNhanVien = req.body.MaNhanVien
    const MaSach = req.body.MaSach
    const MaLoaiHinhSach = req.body.MaLoaiHinhSach
    const MaCoSo = req.body.MaCoSo
    const MaDoiTuong = req.body.MaDoiTuong
    const HTThanhToan = req.body.HTThanhToan
    const DienGiai = req.body.DienGiai
    const SoLuongNhap = req.body.SoLuongNhap
    const DonGiaNhap = req.body.DonGiaNhap
    const CreatedBy = req.body.MaNhanVien
    const CreatedDate = moment(Date(), "YYYY-MM-DD")
    
    // //Check authorized
    // var roles
    // jwt.verify(token, 'tracuu', (err, decoded) => {
    //   if (err) {
    //     return res.status(401).send({ message: "Unauthorized!" });
    //   }
    //   roles = decoded.roles;
    // });
    
    // if(roles.toLowerCase().trim() === 'user'){
    //   return res.status(500).send({
    //     message: 'Không có quyền truy cập!'
    //   })
    // } 

    const pool = await poolPromise
    await pool.request()
    .input('Id', id)
    .input('NgayCt', NgayCt)
    .input('MaCt', MaCt)
    .input('LoaiCt', LoaiCt)
    .input('SoCt', SoCt)
    .input('MaNhanVien', MaNhanVien)
    .input('MaCoSo', MaCoSo)
    .input('MaSach', MaSach)
    .input('MaLoaiHinhSach', MaLoaiHinhSach)
    .input('MaDoiTuong', MaDoiTuong)
    .input('HTThanhToan', HTThanhToan)
    .input('DienGiai', DienGiai)
    .input('SoLuongNhap', SoLuongNhap)
    .input('DonGiaNhap', DonGiaNhap)
    .input('CreatedBy', CreatedBy)
    .input('CreatedDate', CreatedDate)
    .execute('sp_CreatePhieuNhap', (err, result)=>{
      if (err) {
          res.status(500).send({ message: err });
          return;
        }

        return res.status(200).send({
          result
        });
    })
  }catch(error){
    res.status(500).send(error.message)
  }
}

async function update(req, res) {
  try{
      const {id} = req.params
      const NgayCt = req.body.NgayCt
      const MaCt = req.body.MaCt
      const SoCt = req.body.SoCt
      const LoaiCt = req.body.LoaiCt
      const MaNhanVien = req.body.MaNhanVien
      const MaSach = req.body.MaSach
      const MaLoaiHinhSach = req.body.MaLoaiHinhSach
      const MaCoSo = req.body.MaCoSo
      const MaDoiTuong = req.body.MaDoiTuong
      const HTThanhToan = req.body.HTThanhToan
      const DienGiai = req.body.DienGiai
      const SoLuongNhap = req.body.SoLuongNhap
      const DonGiaNhap = req.body.DonGiaNhap

      const pool = await poolPromise
      await pool.request()
      .input('Id', id)
      .input('NgayCt', NgayCt)
      .input('SoCt', SoCt)
      .input('MaNhanVien', MaNhanVien)
      .input('MaCoSo', MaCoSo)
      .input('MaSach', MaSach)
      .input('MaLoaiHinhSach', MaLoaiHinhSach)
      .input('MaDoiTuong', MaDoiTuong)
      .input('HTThanhToan', HTThanhToan)
      .input('DienGiai', DienGiai)
      .input('SoLuongNhap', SoLuongNhap)
      .input('DonGiaNhap', DonGiaNhap)
      .execute('sp_UpdatePhieuNhap', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

          return res.status(200).send({
            result
          });
    })
  }catch(error){
    res.status(500).send(error.message)
  }
}

async function deletePhieuNhap(req, res) {
  try{
    const {id} = req.params
      const pool = await poolPromise
      await pool.request()
      .input('Id', id)
      .execute('sp_DeletePhieuNhap', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

          return res.status(200).send({
            result
          });
    })
  }catch(error){
    res.status(500).send(error.message)
  }
}
async function getPhieuNhap(req, res) {
  try{
      const pool = await poolPromise
      await pool.request()
      .execute('sp_GetPhieuNhap', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

          return res.status(200).send({
            result
          });
    })
  }catch(error){
    res.status(500).send(error.message)
  }
}

async function getPhieuNhapById(req, res) {
  try{
    const {id} = req.params
      const pool = await poolPromise
      await pool.request()
      .input('Id', id)
      .execute('sp_GetPhieuNhapById', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

          return res.status(200).send({
            result
          });
    })
  }catch(error){
    res.status(500).send(error.message)
  }
}


module.exports = {
  create,
  update,
  deletePhieuNhap,
  getPhieuNhapById,
  getPhieuNhap
}