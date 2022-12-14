import React, {useState, useEffect} from "react";
import {useSearchParams, setSearchParams} from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import { Divider,Modal, Typography, Button, Select, Space, DatePicker, InputNumber, Input, Table, Form, Tag, Popconfirm , Alert, Spin, Col, Row} from 'antd';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter  } from "@chakra-ui/react";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const { Option } = Select;

const PhieuNhap = () =>{
  
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
  const [maCt, setMaCt] = useState('')
  const [title, setTitle] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  //   console.log('type',searchParams.get('type'))
  
  const Ident = uuidv4()
  const type = searchParams.get('type')

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
        return setTitle("nh???p mua");
      case 'nhapin':
        return setTitle("nh???p in - photo");
      case 'nhapcoso':
         return setTitle("nh???p c?? s???");
      case 'nhapphongban':
        return setTitle("nh???p ph??ng/ ban");
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

  async function loadPhieuNhap(){
    return await axios
      .get('https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap')
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
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/${MaPhieuNhap}`)
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
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/create', {
        Ident: Ident,
        NgayCt: values.NgayCt,
        MaCt: maCt,
        LoaiCt: '1',
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
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/${dataEdit?.Id}`, {
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
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuNhap/delete/${MaPhieuNhap}`)
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
      title: 'Ng??y phi???u',
      dataIndex: 'NgayCt',
      key: 'NgayCt',
    },
    {
      title: 'Di???n gi???i',
      dataIndex: 'DienGiai',
      key: 'DienGiai',
    },
    {
      title: 'Ng?????i l???p',
      dataIndex: 'TenNhanVien',
      key: 'TenNhanVien',
    },
    {
      title: '?????i t?????ng',
      dataIndex: 'TenDoiTuong',
      key: 'TenDoiTuong',
    },
    {
      title: 'C?? s???',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: 'T???ng s??? l?????ng',
      dataIndex: 'TongSoLuong',
      key: 'TongSoLuong',
      align:'right'
    },
    {
      title: 'T???ng th??nh ti??n',
      dataIndex: 'TongThanhTien',
      key: 'TongThanhTien',
      align:'right'
    },
    // {
    //   title: 'T??nh tr???ng',
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
            {!record.Is_Deleted && <Button key={record.Id} type="link" onClick= {() =>{GetPhieuNhapEdit(record.Id)}}>C???p nh???t</Button>}
          </Space>
          <Space size="middle">
          {!record.Is_Deleted && <>
              <Popconfirm
                title="B???n c?? ch???c x??a phi???u kh??ng?"
                onConfirm={()=>{DeletePhieuNhap(record.Id)}}
                okText="Yes"
                cancelText="No"
              >
                <Button key={record.Id} type="link" danger >X??a</Button>
              </Popconfirm>
            </>}
          </Space>
        </>
      ),
    },
  ];
  
  return(
    <>
      <Title level={3}>Phi???u {title}</Title>
      <Divider />
      <VStack justifyContent={"start"} alignItems="start">
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
              Th??m m???i
          </Button>
          <Button  onClick={toogleModalFormContact} icon={<SearchOutlined />}>
              T??m ki???m
          </Button>
        </Space>
        <Divider />
        {loading ? 
            <>
              <Spin tip="Loading..." spinning={loading}>
                <Alert
                  message="??ang l???y d??? li???u"
                  description="Vui l??ng ch??? trong gi??y l??t."
                  type="info"
                />
              </Spin>
            </> 
            :
              <Table columns={columns} dataSource={data} />}
      </VStack>

      {/* Modal th??m m???i */}
      <Modal
        open={openModalContact}
        size="lg"
        // size={"full"}
        title={!editMode ? `Th??m m???i phi???u ${title}` : `C???p nh???t phi???u ${title}`}
        onCancel={toogleModalFormContact}
        footer={null}
        width={1500}
      >
          <Form form={form} 
              name="control-hooks"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 20,
              }}
              // onFinish={!editMode? CreatePhieuNhap: UpdatePhieuNhap}
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
                    label="Ng??y phi???u: "
                    name="NgayCt"
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng nh???p ng??y phi???u!'
                      },
                    ]}
                  >
                  <DatePicker format={"DD-MM-YYYY"}   />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                      label="S??? phi???u: "
                      name="SoCt"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p s??? phi???u!'
                        },
                      ]}
                    >
                    <Input   />
                  </Form.Item>
                </Col>
                <Col  span={8}>
                  <Form.Item
                    label="?????i t?????ng: "
                    name="MaDoiTuong"
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng ch???n ?????i t?????ng!'
                      },
                    ]}
                  >
                    <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
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
                  label="Lo???i h??nh s??ch: "
                  name="MaLoaiHinhSach"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n lo???i h??nh s??ch!'
                    },
                  ]}
                  >
                    <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
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
                    label="Nh??n vi??n: "
                    name="MaNhanVien"                    
                  >
                  <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
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
                      label="C?? s???: "
                      name="MaCoSo"
                    >
                    <Select 
                      showSearch 
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsCoSo}
                      </Select>
                  </Form.Item>
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
                <Col className="gutter-row" span={6}>                  
                  <Button key="save" type="primary" onClick={openCreateModeChiTiet} >Th??m s??ch</Button>
                </Col>
              </Row>
              
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
                  <Title level={4} >T???ng s??? l?????ng: </Title>
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
                <Col className="gutter-row" span={6}>                  
                  <Title level={4} >T???ng Th??nh ti???n: </Title>
                </Col>
              </Row>
                           
              <HStack justifyContent="end">
                <Button key="back" onClick={toogleModalFormContact}>Tho??t</Button>
                <Button key="save" type="primary"  htmlType="submit">L??u</Button>
              </HStack>
            </Form>
      </Modal>
      <Modal
          open={openModalChiTiet}
          closable ={false}
          title={!editMode ? `Th??m chi ti???t` : `C???p nh???t chi ti???t`}
          onCancel={toogleModalFormContact}
          footer={null}
        >
            <Form form={formChiTiet} 
                name="control-hooks"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 20,
                }}
                onFinish={!editModeChiTiet? CreateChiTiet: UpdatePhieuNhap}
              >                
                <Form.Item
                  label="T??n s??ch: "
                  name="MaSach"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n t??n s??ch!'
                    },
                  ]}
                >
                  <Select 
                    showSearch 
                    optionFilterProp="children"
                    filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                    filterSort={(optionA, optionB) =>
                      optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                    }

                    >
                      {optionsSach}
                    </Select>
                </Form.Item>
                <Form.Item
                  label="S??? l?????ng t???n: "
                  name="SoLuongTon"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng nh???p s??? l?????ng t???n kho!'
                    },
                  ]}
                >
                  <InputNumber 
                  style={{
                    width: 150,
                  }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  min={0}  
                  defaultValue={0} />
                </Form.Item>
                <Form.Item
                  label="????n gi?? t???n: "
                  name="DonGiaTon"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng nh???p ????n gi?? t???n!'
                    },
                  ]}
                >
                <InputNumber 
                  style={{
                    width: 150,
                  }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  min={0}  
                  defaultValue={0} />
                </Form.Item>
                
                <HStack justifyContent="end">
                  <Button key="back" onClick={toogleModalFormChiTiet}>Tho??t</Button>
                  <Button key="save" type="primary" htmlType="submit" >Th??m</Button>
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