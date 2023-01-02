var express = require('express');
const https = require("https");
const fs = require("fs");
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const nhomDoiTuongRouter = require('./routes/nhomDoiTuongRouter');
const loaiHinhSachRouter = require('./routes/loaiHinhSachRouter');
const coSoRouter = require('./routes/coSoRouter');
const hocKyRouter = require('./routes/hocKyRouter');
const doiTuongRouter = require('./routes/doiTuongRouter');
const sachRouter = require('./routes/sachRouter');
const nhanVienRouter = require('./routes/nhanVienRouter');
const tonDauKyRouter = require('./routes/tonDauKyRouter')

const phieuNhapRouter = require('./routes/phieuNhapRouter')
const phieuXuatRouter = require('./routes/phieuXuatRouter')
 
const port = process.env.PORT === 'production' ? (dotenv.PORT || 80) : 3005;
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("cert.key"),
      cert: fs.readFileSync("cert.crt"),
    },
    app
  )
  .listen(3005, () => {
    console.log("serever is runing at port 3005");
  });

//user login router in /routes/loginRouter.js
app.use('/user/', authRouter)
app.use('/nhomdoituong/', nhomDoiTuongRouter)
app.use('/loaihinhsach/', loaiHinhSachRouter)
app.use('/coso/', coSoRouter)
app.use('/hocky/', hocKyRouter)
app.use('/doituong/', doiTuongRouter)
app.use('/sach/', sachRouter)
app.use('/nhanvien/', nhanVienRouter)
app.use('/tondauky/', tonDauKyRouter)
app.use('/phieunhap/', phieuNhapRouter)
app.use('/phieuxuat/', phieuXuatRouter)
