import React, {useState, useEffect} from "react";
import {useSearchParams, setSearchParams} from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import { Divider,Modal, Typography, Button, Select, Space, DatePicker, InputNumber, Input, Table, Form, Tag, Popconfirm , Alert, Spin, Col, Row} from 'antd';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter  } from "@chakra-ui/react";
import { SearchOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const { Option } = Select;

const PhieuNhap = () =>{
  const _ = require("lodash");  

  const [form] = Form.useForm();
  const [formChiTiet] = Form.useForm();
  const [data, setData] = useState()
  const [dataChiTiet, setDataChiTiet] = useState()
  const [editMode, setEditMode] = useState(false)
  const [editModeChiTiet, setEditModeChiTiet] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [dataEditChiTiet, setDataEditChiTiet] = useState()
  const [dataSach, setDataSach] = useState()
  const [dataCoSo, setDataCoSo] = useState()
  const [dataDoiTuong, setDataDoiTuong] = useState()
  const [dataNhanVien, setDataNhanVien] = useState()
  const [dataLoaiHinhSach, setDataLoaiHinhSach] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)
  const [openModalChiTiet, setOpenModalChiTiet] = useState(false)
  const [optionsSach, setOptionSach] = useState()
  const [optionsLoaiHinhSach, setOptionLoaiHinhSach] = useState()
  const [optionsCoSo, setOptionCoSo] = useState()
  const [optionsDoiTuong, setOptionDoiTuong] = useState()
  const [optionsNhanVien, setOptionNhanVien] = useState()
  const [tongSoLuongNhap,setTongSoLuongNhap] = useState(0)
  const [tongThanhTienNhap,setTongThanhTienNhap] = useState(0)
  const [maCt, setMaCt] = useState('')
  const [title, setTitle] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  //   console.log('type',searchParams.get('type'))
  
  const Ident = uuidv4()
  const type = searchParams.get('type')
  const fieldsForm = form.getFieldsValue()

  console.log('fieldsForm', fieldsForm)
  function getMaCt (type)
  {
    switch (type.toLowerCase()) {
      case 'nhapmua':
        return setMaCt("NM");
      case 'nhapin':
        return setMaCt("NI");
      case 'nhapcoso':
         return setMaCt("NCS");
      case 'nhapphongban':
        return setMaCt("NPB");
      default: 
        return ''
    }
  }

  function getTitle (type)
  {
    switch (type.toLowerCase()) {
      case 'nhapmua':
        return setTitle("nhập mua");
      case 'nhapin':
        return setTitle("nhập in - photo");
      case 'nhapcoso':
         return setTitle("nhập cơ sở");
      case 'nhapphongban':
        return setTitle("nhập phòng/ ban");
      default: 
        return ''
    }
  }

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }
  function toogleModalFormChiTiet(){
    setOpenModalChiTiet(!openModalChiTiet)
  }

  useEffect(()=>{
    getMaCt(type)
    getTitle(type)
  },[type])
  

  useEffect(()=>{
    loadPhieuNhap()
  },[refresh])

  // useEffect(() =>{
  //   setTongSoLuongNhap(_.sumBy(users, 'SoLuongNhap'))    
  //   setTongThanhTienNhap(_.sumBy(users, 'ThanhTienNhap'))
  // },[users])

  useEffect(()=>{
    
    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    form.setFieldsValue({
        NgayCt: moment(dataEdit?.NgayCt, 'YYYY/MM/DD'),
        MaLoaiHinhSach: dataEdit?.MaLoaiHinhSach,
        MaCoSo : dataEdit?.MaCoSo,
        MaDoiTuong: dataEdit?.MaDoiTuong,
        MaNhanVien: dataEdit?.MaNhanVien,
        HTThanhToan: dataEdit?.HTThanhToan,
        DienGiai: dataEdit?.DienGiai,
        SoLuongNhap : dataEdit?.SoLuongNhap,
        DonGiaNhap: dataEdit?.DonGiaNhap,
        ThanhTienNhap: dataEdit?.ThanhTienNhap
    })
  }, [dataEdit])


  function openCreateMode(){
    setEditMode(false)
    setOpenModalContact(!openModalContact)

    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionNhanVien(dataNhanVien?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    form.setFieldsValue({
        NgayCt: "",
        MaSach: "",
        MaLoaiHinhSach: "",
        MaCoSo : "",
        DienGiai : "",
        HTThanhToan:""
    })
  }

  function openCreateModeChiTiet(){
    setEditModeChiTiet(false)
    setOpenModalChiTiet(!openModalChiTiet)

    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    
    formChiTiet.setFieldsValue({        
        MaSach: "",
    })
  }
  

  const onDonGiaChange = (name) => {
    
  const fields = form.getFieldsValue()
  const { users } = fields

    console.log('users', users)
    Object.assign(users[name], { ThanhTienNhap: fields.users[name].SoLuongNhap * fields.users[name].DonGiaNhap })
    form.setFieldsValue({users})
    setTongSoLuongNhap(_.sumBy(users, 'SoLuongNhap'))    
    setTongThanhTienNhap(_.sumBy(users, 'ThanhTienNhap'))
  }


  async function loadPhieuNhap(){
    return await axios
      .get('http://localhost:3001/PhieuNhap')
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setData(result.data[0])
        setDataCoSo(result.data[1])
        setDataLoaiHinhSach(result.data[2])
        setDataSach(result.data[3])
        setDataNhanVien(result.data[4])
        setDataDoiTuong(result.data[5])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function GetPhieuNhapEdit(MaPhieuNhap){
    setEditMode(true)
    return await axios
      .get(`http://localhost:3001/PhieuNhap/${MaPhieuNhap}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        setDataEdit(result.data[0])
        setOpenModalContact(!openModalContact)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function CreatePhieuNhap(values){
    // return await axios
    //   .post('http://localhost:3001/PhieuNhap/create', {
    //     Ident: Ident,
    //     NgayCt: values.NgayCt,
    //     MaCt: maCt,
    //     LoaiCt: '1',
    //     SoCt: values.SoCt, 
    //     MaLoaiHinhSach: values.MaLoaiHinhSach, 
    //     MaCoSo: values.MaCoSo, 
    //     MaSach: values.MaSach, 
    //     MaDoiTuong: values.MaDoiTuong,
    //     MaNhanVien: values.MaNhanVien,
    //     DienGiai: values.DienGiai,
    //     HTThanhToan: values.HTThanhToan,
    //     SoLuongNhap: values.SoLuongNhap, 
    //     DonGiaNhap: values.DonGiaNhap})
    //   .then((res) => {
    //     const result = {
    //       status: res.status,
    //       data: res.data.result.recordset,
    //     }
    //     result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
    //     setRefresh(!refresh)
    //     setOpenModalContact(!openModalContact)
    //     return(result)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error.response)
    //     toast.error(error?.response)
    //   })
    console.log(values)
  };

  async function CreateChiTiet(values){
    console.log('run', values)
    setDataChiTiet(values)
  };

useEffect(()=>{

  console.log('dataChiTiet', dataChiTiet)
}, [dataChiTiet])

  async function UpdatePhieuNhap(values){
    console.log('run update')
    return await axios
      .post(`http://localhost:3001/PhieuNhap/${dataEdit?.Id}`, {
        NgayCt: values.NgayCt.format('YYYY-MM-DD'), 
        SoCt: values.SoCt, 
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: values.MaCoSo, 
        MaSach: values.MaSach, 
        MaDoiTuong: values.MaDoiTuong,
        MaNhanVien: values.MaNhanVien,
        DienGiai: values.DienGiai,
        HTThanhToan: values.HTThanhToan,
        SoLuongNhap: values.SoLuongNhap, 
        DonGiaNhap: values.DonGiaNhap})
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
        setRefresh(!refresh)
        setOpenModalContact(!openModalContact)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function DeletePhieuNhap(MaPhieuNhap){
    return await axios
      .post(`http://localhost:3001/PhieuNhap/delete/${MaPhieuNhap}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
        setRefresh(!refresh)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };
  
  const columns = [
    {
      title: 'Ngày phiếu',
      dataIndex: 'NgayCt',
      key: 'NgayCt',
    },
    {
      title: 'Diễn giải',
      dataIndex: 'DienGiai',
      key: 'DienGiai',
    },
    {
      title: 'Người lập',
      dataIndex: 'TenNhanVien',
      key: 'TenNhanVien',
    },
    {
      title: 'Đối tượng',
      dataIndex: 'TenDoiTuong',
      key: 'TenDoiTuong',
    },
    {
      title: 'Cơ sở',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: 'Tổng số lượng',
      dataIndex: 'TongSoLuong',
      key: 'TongSoLuong',
      align:'right'
    },
    {
      title: 'Tổng thành tiên',
      dataIndex: 'TongThanhTien',
      key: 'TongThanhTien',
      align:'right'
    },
    // {
    //   title: 'Tình trạng',
    //   key: 'STATUS',
    //   dataIndex: 'STATUS',
    //   render: (_, { STATUS }) => (                   
    //       <Tag color={STATUS === 'active' ? 'green' : 'volcano'} key={STATUS}>
    //         {STATUS.toUpperCase()}
    //       </Tag>         
    //   )
    // },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <>
         <Space size="middle">
            {!record.Is_Deleted && <Button key={record.Id} type="link" onClick= {() =>{GetPhieuNhapEdit(record.Id)}}>Cập nhật</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="Bạn có chắc xóa phiếu không?"
                onConfirm={()=>{DeletePhieuNhap(record.Id)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.Id} type="link" danger >Xóa</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
      ),
    },
  ];
  
  return(
    <>
      <Title level={3}>Phiếu {title}</Title>
      <Divider />
      <VStack justifyContent={"start"} alignItems="start">
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
              Thêm mới
          </Button>
          <Button  onClick={toogleModalFormContact} icon={<SearchOutlined />}>
              Tìm kiếm
          </Button>
        </Space>
        <Divider />
        {loading ? 
            <>
              <Spin tip="Loading..." spinning={loading}>
                <Alert
                  message="Đang lấy dữ liệu"
                  description="Vui lòng chờ trong giây lát."
                  type="info"
                />
              </Spin>
            </> 
            :
              <Table columns={columns} dataSource={data} />}
      </VStack>

      {/* Modal thêm mới */}
      <Modal
         style={{
          top: 0,
        }}
        open={openModalContact}
        size="lg"
        // size={"full"}
        title={!editMode ? `Thêm mới phiếu ${title}` : `Cập nhật phiếu ${title}`}
        onCancel={toogleModalFormContact}
        footer={null}
        width={1500}
      >
          <Form form={form} 
              name="dynamic_form_nest_item" 
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 20,
              }}
              onFinish={!editMode? CreatePhieuNhap: UpdatePhieuNhap}
            >
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Ngày phiếu: "
                    name="NgayCt"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập ngày phiếu!'
                      },
                    ]}
                  >
                  <DatePicker format={"DD-MM-YYYY"}   />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                      label="Số phiếu: "
                      name="SoCt"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số phiếu!'
                        },
                      ]}
                    >
                    <Input   />
                  </Form.Item>
                </Col>
                <Col  span={8}>
                  <Form.Item
                    label="Đối tượng: "
                    name="MaDoiTuong"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn đối tượng!'
                      },
                    ]}
                  >
                    <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input)}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsDoiTuong}
                      </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                </Col>
              </Row>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col className="gutter-row" span={8}>
                  <Form.Item
                  label="Loại hình sách: "
                  name="MaLoaiHinhSach"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn loại hình sách!'
                    },
                  ]}
                  >
                    <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input)}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsLoaiHinhSach}
                      </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    label="Nhân viên: "
                    name="MaNhanVien"                    
                  >
                  <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input)}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsNhanVien}
                      </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                      label="Cơ sở: "
                      name="MaCoSo"
                    >
                    <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input)}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsCoSo}
                      </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        size={"large"}
                        key={key}
                        style={{
                          display: 'flex',
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                    <Form.Item
                      {...restField}
                      name={[name, 'MaSach']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn tên sách!'
                        },
                      ]}
                    >
                    <Select 
                       style={{
                        width: 250,
                      }}
                      placeholder="Chọn sách"
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input)}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsSach}
                  </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'SoLuongNhap']}
                    rules={[
                      {
                        required: true,
                        message: 'Nhập số lượng',
                      },
                    ]}
                  >
                  <InputNumber 
                    placeholder="Số lượng"
                      style={{
                        width: 80,
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      min={0}  
                      onChange={() =>onDonGiaChange(name)}/>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'DonGiaNhap']}
                    rules={[
                      {
                        required: true,
                        message: 'Nhập đơn giá',
                      },
                    ]}
                  >
                  <InputNumber
                    placeholder="Đơn giá"
                      style={{
                        width: 150,
                      }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      min={0}  
                      onChange={() =>onDonGiaChange(name)}/>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'ThanhTienNhap']}                    
                  >
                    <InputNumber
                      readOnly
                      placeholder="Thành tiền"
                        style={{
                          width: 150
                        }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        min={0}  />
                  </Form.Item>
                  
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
                    ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm sách
                    </Button>
                  </Form.Item>
                  </>
                  )}
                </Form.List>
              <Divider/>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col className="gutter-row" span={6}>                  
                  <Title level={5} >Tổng số lượng: </Title>
                  <InputNumber size="large" readOnly formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                    value = {tongSoLuongNhap}/>
                </Col>
                <Col className="gutter-row" span={6}>                  
                  <Title level={5} >Tổng thành tiền: </Title>
                  <InputNumber size="large" readOnly formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                    value = {tongThanhTienNhap}
                    style={{
                      width: 200,
                      textAlign:"right"
                    }}
                    />
                </Col>
              </Row>
                                        
              <HStack justifyContent="end">
                <Button key="back" onClick={toogleModalFormContact}>Thoát</Button>
                <Button key="save" type="primary"  htmlType="submit">Lưu</Button>
              </HStack>
            </Form>
      </Modal>
    </>
  )
}

export default PhieuNhap;
// import React from "react";
// import {
//   useSearchParams,
// } from "react-router-dom";

// const PhieuNhap = () =>{
//   const [searchParams, setSearchParams] = useSearchParams();
//   console.log('type',searchParams.get('type'))

//   return(
//     <>
//       <p>Phieu {searchParams.get('type')}</p>
//     </>
//   )
// }
// export default PhieuNhap;