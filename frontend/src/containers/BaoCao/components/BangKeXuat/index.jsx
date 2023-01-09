import React, {useState, useEffect} from "react";
import {useSearchParams, setSearchParams, useNavigate} from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import { Divider,Modal, Typography, Button, Select, Result, Space, DatePicker, InputNumber, Input, Table, Form, Tag, Popconfirm , Alert, Spin, Col, Row} from 'antd';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter  } from "@chakra-ui/react";
import { SearchOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {VStack, HStack, cookieStorageManager} from  '@chakra-ui/react';
import { useCookies } from 'react-cookie';

const { Title } = Typography;
const { Option } = Select;

const BangKeXuat = () =>{
  const _ = require("lodash"); 
  
  const [cookies, setCookie] = useCookies(['user']);
  
  const [form] = Form.useForm();
  const [data, setData] = useState()  
  const [soCt, setSoCt] = useState()
  const [dataEditCt, setDataEditCt] = useState()
  const [dataSum, setDataSum] = useState()
  const [dataSach, setDataSach] = useState()
  const [dataDoiTuong, setDataDoiTuong] = useState()
  const [dataCoSo, setDataCoSo] = useState()
  const [dataLoaiHinhSach, setDataLoaiHinhSach] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [optionsDoiTuong, setOptionDoiTuong] = useState()
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function showModal(Ident, SoCt){
    setIsModalOpen(true);
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/PhieuXuat/${Ident}`)
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
    setOptionDoiTuong(dataDoiTuong?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    
  }, [dataSach, dataDoiTuong])

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
        setDataDoiTuong(result.data[3])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function loadBangKePhieuXuat(values){
    const header = getHeader()
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/baocao/bangkexuat`, {
        NgayCt0: values.NgayCt0.format("YYYYMMDD"),
        NgayCt1: values.NgayCt1.format("YYYYMMDD"),
        MaSach: values.MaSach, 
        MaCoSo: values.MaCoSo,
        MaLoaiHinhSach: values.MaLoaiHinhSach,
        MaDoiTuong: values.MaDoiTuong,
        LoaiCt: '2',        
      }, {headers:header})
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setLoading(true)
        setTimeout(() => {          
          setData(result.data[0])     
          setDataSum(result.data[1][0])
          setLoading(false)
        }, 1000); 
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  const columns = [
    {
      title: 'Mã chứng từ',
      dataIndex: 'MaCt',
      key: 'MaCt',
      // filters: dataSachFilter,
      // onFilter: (value, record) => record.TenSach.includes(value),
      // filterSearch: true,
    },
    {
      title: 'Loại hình sách',
      dataIndex: 'TenLoaiHinhSach',
      key: 'TenLoaiHinhSach',
      // filters: dataSachFilter,
      // onFilter: (value, record) => record.TenSach.includes(value),
      // filterSearch: true,
    },
    {
      title: 'Cơ sở xuất',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
      // filters: dataSachFilter,
      // onFilter: (value, record) => record.TenSach.includes(value),
      // filterSearch: true,
    },
    {
      title: 'Ngày phiếu',
      dataIndex: 'NgayCt',
      key: 'NgayCt',
    },
    {
      title: 'Số chứng từ',
      dataIndex: 'SoCt',
      key: 'SoCt',
    },
    {
      title: 'Diễn giải',
      dataIndex: 'DienGiai',
      key: 'DienGiai',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'NhaXB',
      key: 'TenDoiTuong',
    },
    {
      title: 'Tổng số lượng',
      dataIndex: 'SoLuong',
      key: 'TongSoLuong',
      align:'right'
    },
    {
      title: 'Tổng thành tiền',
      dataIndex: 'ThanhTien',
      key: 'TongThanhTien',
      align:'right'
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <>
          <Space size="middle">
            {!record.Is_Deleted && <Button key={record.Ident} type="link" onClick= {() =>{showModal(record.Ident, record.SoCt)}}>Xem</Button>}
          </Space>         
        </>
      ),
    },
  ];

  const columnsChiTiet = [
    {
      title: 'Tên sách',
      dataIndex: 'TenSach',
      key: 'TenVatTu',
    },
    {
      title: 'Số lượng',
      dataIndex: 'SoLuong',
      key: 'SoLuong',
      align:'right'
    },    
    {
      title: 'Đơn giá',
      dataIndex: 'DonGia',
      key: 'DonGia',
      align:'right'
    },
    {
      title: 'Thành tiền',
      dataIndex: 'ThanhTien',
      key: 'ThanhTien',
      align:'right'
    }
  ];
  
  return(
    <>
      <Title level={3}>Bảng kê phiếu xuất</Title>
      <Divider />
      <>
      <Form form={form} 
              name="control-hooks" 
              labelCol={{
                span: 12,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={loadBangKePhieuXuat}
            >
              <Form.Item
                    label="Từ ngày: "
                    name="NgayCt0"                                    
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập chọn ngày!'
                      },
                    ]}     
                  >
                  <DatePicker  format={"DD-MM-YYYY"} />
                  </Form.Item>
                
                  <Form.Item
                    label="Đến ngày: "
                    name="NgayCt1"  
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập chọn ngày!'
                      },
                    ]}     
                  >
                  <DatePicker  format={"DD-MM-YYYY"}/>
                  </Form.Item>    
                  <Form.Item
                    label={"Chọn nhà cung cấp: "}
                    name={"MaDoiTuong"}                    
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
                        {optionsDoiTuong}
                      </Select>
                  </Form.Item>
                  <Form.Item
                    label={"Chọn cơ sở: "}
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
                    label={"Chọn loại hình sách: "}
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
                    label={"Chọn sách: "}
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
                <Button key="save" type="primary" htmlType="submit">Lọc bảng kê</Button>
                <Button key="print" type="default">In bảng kê</Button>
                <Button key="export" type="default">Xuất Excel</Button>
              </HStack>
            </Form>
        <Divider />
        {loading ? 
            <>
              <Spin size="large" spinning={loading}>                
                <Result
                  title="Đang tải dữ liệu....."                  
                />
              </Spin>
            </> 
            :
              <Table 
                columns={columns} 
                dataSource={data} 
                summary={(pageData) => {
                  let totalBorrow = 0;
                  let totalRepayment = 0;
                  pageData.forEach(({SoLuong, ThanhTien}) => {
                    totalBorrow += _.toNumber(SoLuong);
                    totalRepayment += _.toNumber(ThanhTien);
                  });
                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={3}>
                            <Title level={5}>Tổng cộng</Title>
                          </Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4}>
                        </Table.Summary.Cell>           
                        <Table.Summary.Cell index={5}>
                        </Table.Summary.Cell>        
                        <Table.Summary.Cell index={6}>
                        </Table.Summary.Cell>           
                        <Table.Summary.Cell index={7}>
                          <Title 
                            level={5}
                            style={{
                              textAlign:'right'
                            }}
                          >{dataSum?.SoLuong}
                          </Title>
                        </Table.Summary.Cell>                       
                        <Table.Summary.Cell index={8}>
                          <Title 
                            level={5}
                              style={{
                                textAlign:'right'
                              }}
                            >
                              {dataSum?.ThanhTien}
                          </Title>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={9}>
                        </Table.Summary.Cell>         
                      </Table.Summary.Row>
                    </>
                  );
                }}/>}
      </>
      <Modal title={`Chi tiết phiếu ${soCt}`} open={isModalOpen} onOk={handleCancel} onCancel={handleCancel}>
        <Table pagination={false} columns={columnsChiTiet}  dataSource={dataEditCt}/>
      </Modal>
    </>
  )
}


export default BangKeXuat;