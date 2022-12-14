import React, {useState, useEffect} from "react";
import {useSearchParams, setSearchParams, useNavigate} from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import { Divider,Modal, Typography, Button, Select, Space, Result, DatePicker, InputNumber, Input, Table, Form, Tag, Popconfirm , Alert, Spin, Col, Row} from 'antd';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter  } from "@chakra-ui/react";
import { SearchOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {VStack, HStack, cookieStorageManager} from  '@chakra-ui/react';
import { useCookies } from 'react-cookie';

const { Title } = Typography;
const { Option } = Select;

const NhapXuatTon = () =>{
  const _ = require("lodash");  
  
  const [cookies, setCookie] = useCookies(['user']);
  
  const [form] = Form.useForm();
  const [data, setData] = useState()
  const [soCt, setSoCt] = useState()
  const [dataChiTiet, setDataChiTiet] = useState()
  const [dataEdit, setDataEdit] = useState()
  const [Stt, setStt] = useState(0)
  const [dataEditCt, setDataEditCt] = useState()
  const [dataSach, setDataSach] = useState()
  const [dataSachFilter, setDataSachFilter] = useState()
  const [dataCoSo, setDataCoSo] = useState()
  const [dataLoaiHinhSach, setDataLoaiHinhSach] = useState()
  const [dataNhomSachFilter, setDataNhomSachFilter] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [optionsSach, setOptionSach] = useState()
  const [optionsLoaiHinhSach, setOptionLoaiHinhSach] = useState()
  const [optionsCoSo, setOptionCoSo] = useState()
  
  const navigate = useNavigate();

  const fieldsForm = form.getFieldsValue()
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getHeader = function () {
    const rToken = cookies.rToken
    return {
      Authorization: 'Bearer ' + rToken,
    }
  }

  const onChange = (pagination, filters, sorter, extra) => {
    // const filterNhom = dataSachFilter.filters(item => item.TenNhomSach === filters?.TenNhomSach[0])
    // setFilterVt(filterNhom)
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  async function showModal(Ident, SoCt){
    setIsModalOpen(true);
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/BaoCao/${Ident}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordsets,
        }        
        setDataEditCt(result.data[1])
        setSoCt(SoCt)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  useEffect(()=>{
    loadList()
  },[])
  
  useEffect(()=>{
    
    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    
  }, [dataSach, dataLoaiHinhSach, dataCoSo])

  async function loadList(){
    const header = getHeader()
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/baocao/list`, {headers:header})
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setDataSach(result.data[0])
        setDataLoaiHinhSach(result.data[2])
        setDataCoSo(result.data[1])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function loadNhapXuatTon(values){
    console.log('values:', values)
    const header = getHeader()
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/baocao/baocao-nhapxuatton`, {        
        NgayCt0: values.NgayCt0.format("YYYYMMDD"),
        NgayCt1: values.NgayCt1.format("YYYYMMDD"),
        MaSach: values.MaSach, 
        MaCoSo: values.MaCoSo,
        MaLoaiHinhSach: values.MaLoaiHinhSach
      }, {headers:header})
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setLoading(true)
        setTimeout(() => {          
          setData(result.data[0])     
          setLoading(false)
        }, 1000); 
        // setDataNhomSachFilter(result.data[1])  
        // setDataSachFilter(result.data[2])  
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  const columns = [
    {
      title: 'C?? s???',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
      // filters: dataNhomSachFilter,
      // onFilter: (value, record) => record.TenNhomSach.includes(value),
      // filterSearch: true,
    },
    {
      title: 'Lo???i h??nh s??ch',
      dataIndex: 'TenLoaiHinhSach',
      key: 'TenLoaiHinhSach',
      // filters: dataSachFilter,
      // onFilter: (value, record) => record.TenSach.includes(value),
      // filterSearch: true,
    },
    {
      title: 'T??n s??ch',
      dataIndex: 'TenVatTu',
      key: 'TenVatTu',
      // filters: dataVatTuFilter,
      // onFilter: (value, record) => record.TenVatTu.includes(value),
      // filterSearch: true,
    },
    {
      title: 'Khoa',
      dataIndex: 'TenKhoa',
      key: 'TenKhoa',
      // filters: dataVatTuFilter,
      // onFilter: (value, record) => record.TenVatTu.includes(value),
      // filterSearch: true,
    },
    {
      title: 'T???n ?????u k???',
      dataIndex: 'Ton_Dau',
      key: 'Ton_Dau',
      align:'right'
    }, 
    {
      title: 'Tr??? gi?? t???n ?????u',
      dataIndex: 'Du_Dau',
      key: 'Du_Dau',
      align:'right'
    },    
    {
      title: 'SL nh???p',
      dataIndex: 'Sl_Nhap',
      key: 'Sl_Nhap',
      align:'right'
    },   
    {
      title: 'Tr??? gi?? nh???p',
      dataIndex: 'Tien_Nhap',
      key: 'Tien_Nhap',
      align:'right'
    },  
    {
      title: 'SL xu???t',
      dataIndex: 'Sl_Xuat',
      key: 'Sl_Xuat',
      align:'right'
    },      
    {
      title: 'Tr??? gi?? xu???t',
      dataIndex: 'Tien_Xuat',
      key: 'Tien_Xuat',
      align:'right'
    }, 
    {
      title: 'T???n cu???i k???',
      dataIndex: 'Ton_Cuoi',
      key: 'Ton_Cuoi',
      align:'right'
    }, 
    {
      title: 'Tr??? gi?? t???n cu???i',
      dataIndex: 'Du_Cuoi',
      key: 'Du_Cuoi',
      align:'right'
    }, 
  ];

  const columnsChiTiet = [
    {
      title: 'T??n v???t t??',
      dataIndex: 'TenVatTu',
      key: 'TenVatTu',
    },
    {
      title: 'S??? l?????ng',
      dataIndex: 'SoLuong',
      key: 'SoLuong',
      align:'right'
    },    
    {
      title: '????n gi??',
      dataIndex: 'DonGia',
      key: 'DonGia',
      align:'right'
    },
    {
      title: 'Th??nh ti???n',
      dataIndex: 'ThanhTien',
      key: 'ThanhTien',
      align:'right'
    }
  ];
  
  return(
    <>
      <Title level={3}>B??o c??o nh???p xu???t t???n s??ch</Title>
      <Divider />
      <>
      <Form form={form} 
              name="control-hooks" 
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 20,
              }}
              onFinish={loadNhapXuatTon}
            >
              
                  <Form.Item
                    label="T??? ng??y: "
                    name="NgayCt0"                                    
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng nh???p cho??n nga??y!'
                      },
                    ]}     
                  >
                  <DatePicker  format={"DD-MM-YYYY"} />
                  </Form.Item>
                
                  <Form.Item
                    label="?????n ng??y: "
                    name="NgayCt1"  
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng nh???p cho??n nga??y!'
                      },
                    ]}     
                  >
                  <DatePicker  format={"DD-MM-YYYY"}/>
                  </Form.Item>    
                  <Form.Item
                    label={"Ch???n c?? s???: "}
                    name={"MaCoSo"}                    
                  >
                    <Select 
                      showSearch
                      style={{ width: 300 }}
                      allowClear
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }

                      >
                        {optionsCoSo}
                      </Select>
                  </Form.Item>
                
                  <Form.Item
                    label={"Ch???n lo???i h??nh s??ch: "}
                    name={"MaLoaiHinhSach"}                    
                  >
                    <Select       
                      style={{ width: 200 }}              
                      showSearch 
                      allowClear
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }
                      >
                        {optionsLoaiHinhSach}
                      </Select>
                  </Form.Item>
               
                  <Form.Item
                    label={"Ch???n s??ch: "}
                    name={"MaSach"}                    
                  >
                    <Select                     
                      showSearch 
                      allowClear
                      optionFilterProp="children"
                      filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
                      filterSort={(optionA, optionB) =>
                        optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                      }
                      style={{ width: 400 }}
                      >
                        {optionsSach}
                      </Select>
                  </Form.Item>
                                  
              <HStack justifyContent="start">
                <Button key="save" type="primary" htmlType="submit">L???c b??o c??o</Button>
              </HStack>
            </Form>
        <Divider />
        {loading ? 
            <>
              <Spin size="large" spinning={loading}>                
                <Result
                  title="??ang t???i d??? li???u....."                  
                />
              </Spin>
            </> 
            :
              <Table bordered pagination={false} columns={columns} dataSource={data} onChange={onChange} />}
      </>
    </>
  )
}

export default NhapXuatTon;