import React, {useState, useEffect} from "react";
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify'
import { Divider, Typography, Button, Select, Modal,Result, Space, DatePicker, InputNumber, Input, Table, Form, Tag, Popconfirm , Alert, Spin} from 'antd';
import { SearchOutlined, PlusCircleOutlined,ReloadOutlined } from '@ant-design/icons';
import {VStack, HStack} from  '@chakra-ui/react';

const { Title } = Typography;
const { Option } = Select;

const TonDauKy = () =>{
  
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [data, setData] = useState()
  const [editMode, setEditMode] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [dataSach, setDataSach] = useState()
  const [dataCoSo, setDataCoSo] = useState()
  const [dataLoaiHinhSach, setDataLoaiHinhSach] = useState()
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [openModalContact, setOpenModalContact] = useState(false)
  const [openModalFilter, setOpenModalFilter] = useState(false)
  const [optionsSach, setOptionSach] = useState()
  const [optionsLoaiHinhSach, setOptionLoaiHinhSach] = useState()
  const [optionsCoSo, setOptionCoSo] = useState()

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }

  useEffect(()=>{
    setTimeout(() => {    
      setLoading(true)
      loadTonDauKy()
    }, 1000);
  },[refresh])

  useEffect(()=>{
    
    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    form.setFieldsValue({
        NgayCt: moment(dataEdit?.NgayCt, 'YYYY/MM/DD'),
        MaSach: dataEdit?.MaSach,
        MaLoaiHinhSach: dataEdit?.MaLoaiHinhSach,
        MaCoSo : dataEdit?.MaCoSo,
        SoLuongTon : dataEdit?.SoLuongTon,
        DonGiaTon: dataEdit?.DonGiaTon
    })
  }, [dataEdit])

  function toogleModalFormContact(){
    setOpenModalContact(!openModalContact)
  }
  
  function toogleModalFormFilter(){
    setOpenModalFilter(!openModalFilter)
  }

  function openCreateMode(){
    setEditMode(false)
    setOpenModalContact(!openModalContact)

    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));

    form.setFieldsValue({
        NgayCt: "",
        MaSach: "",
        MaLoaiHinhSach: "",
        MaCoSo : "",
        SoLuongTon : "",
        DonGiaTon: ""
    })
  }

  function openFilterMode(){
    setOpenModalFilter(!openModalFilter)

    setOptionSach(dataSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionCoSo(dataCoSo?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    setOptionLoaiHinhSach(dataLoaiHinhSach?.map((d) => <Option key={d?.value}>{d?.label}</Option>));
    
  }
  
  function resetData(){    
    formFilter.setFieldsValue({
      MaSach: '',
      MaLoaiHinhSach: '',
      MaCoSo : ''
  })
    setLoading(true)
    setTimeout(() => {    
      loadTonDauKy()
    }, 1000);
    
  }
  async function loadTonDauKy(){
    return await axios
      .get('https://app-trungtamhoclieu.ufm.edu.vn:3005/TonDauKy')
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordsets,
        }
        setData(result.data[0])
        setDataCoSo(result.data[1])
        setDataLoaiHinhSach(result.data[2])
        setDataSach(result.data[3])
        setLoading(false)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function GetTonDauKyEdit(MaTonDauKy){
    console.log('id', MaTonDauKy)
    setEditMode(true)
    return await axios
      .get(`https://app-trungtamhoclieu.ufm.edu.vn:3005/TonDauKy/${MaTonDauKy}`)
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

  async function CreateTonDauKy(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/TonDauKy/create', {
        NgayCt: values.NgayCt, 
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: values.MaCoSo, 
        MaSach: values.MaSach, 
        SoLuongTon: values.SoLuongTon, 
        DonGiaTon: values.DonGiaTon})
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

  async function UpdateTonDauKy(values){
    console.log('run update')
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/TonDauKy/${dataEdit?.Id}`, {
        NgayCt: values.NgayCt.format('YYYY-MM-DD'), 
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: values.MaCoSo, 
        MaSach: values.MaSach, 
        SoLuongTon: values.SoLuongTon, 
        DonGiaTon: values.DonGiaTon})
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

  async function DeleteTonDauKy(MaTonDauKy){
    return await axios
      .post(`https://app-trungtamhoclieu.ufm.edu.vn:3005/TonDauKy/delete/${MaTonDauKy}`)
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

  async function filterTonDauKy(values){
    return await axios
      .post('https://app-trungtamhoclieu.ufm.edu.vn:3005/TonDauKy/filter', {
        MaLoaiHinhSach: values.MaLoaiHinhSach, 
        MaCoSo: values.MaCoSo, 
        MaSach: values.MaSach
      })
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordsets,
        }
        setLoading(true)
        setOpenModalFilter(!openFilterMode)
        setTimeout(() => {
          setData(result.data[0])
          setDataCoSo(result.data[1])
          setDataLoaiHinhSach(result.data[2])
          setDataSach(result.data[3])
          setLoading(false)
        }, 1000);
        
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
      title: 'Ngày tồn',
      dataIndex: 'NgayCt',
      key: 'NgayCt',
    },
    {
      title: 'Cơ sở',
      dataIndex: 'TenCoSo',
      key: 'TenCoSo',
    },
    {
      title: 'Loại hình sách',
      dataIndex: 'TenLoaiHinhSach',
      key: 'TenLoaiHinhSach',
    },
    {
      title: 'Tên sách',
      dataIndex: 'TenSach',
      key: 'TenSach',
    },
    {
      title: 'Số lượng tồn',
      dataIndex: 'SoLuongTon',
      key: 'SoLuongTon',
      align:'right'
    },
    {
      title: 'Đơn giá tồn',
      dataIndex: 'DonGiaTon',
      key: 'DonGiaTon',
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
            {!record.Is_Deleted && <Button key={record.id} type="link" onClick= {() =>{GetTonDauKyEdit(record.Id)}}>Cập nhật</Button>}
          </Space>
        </>
      ),
    },
  ];

  return(
    <>
      <Title level={3}>Tồn kho sách đầu kỳ</Title>
      <Divider />
      <>
        <Space align="left" style={{ marginBottom: 16 }}>
          <Button  onClick={openCreateMode}  type="primary" icon={<PlusCircleOutlined />}>
              Thêm mới
          </Button>
          <Button  onClick={openFilterMode} icon={<SearchOutlined />}>
              Tìm kiếm
          </Button>
          <Button onClick={resetData} type="default" icon={<ReloadOutlined />}>
              Reload
          </Button>
        </Space>
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
              <Table columns={columns} dataSource={data} />}
      </>

      {/* Modal thêm mới */}
      <Modal
        open={openModalContact}
        title={!editMode ? "Thêm mới tồn đầu kỳ" : "Cập nhật tồn đầu kỳ"}
        onCancel={toogleModalFormContact}
        footer={null}
      >
      <Form form={form} 
          name="control-hooks"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={!editMode? CreateTonDauKy: UpdateTonDauKy}
        >
          <Form.Item
            label="Ngày tồn: "
            name="NgayCt"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày tồn kho!'
              },
            ]}
          >
            <DatePicker format={"DD-MM-YYYY"}   />
          </Form.Item>
          
          <Form.Item
            label="Cơ sở thư viện: "
            name="MaCoSo"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn cơ sở thư viện!'
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
                {optionsCoSo}
              </Select>
          </Form.Item>
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
              filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
              filterSort={(optionA, optionB) =>
                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
              }

              >
                {optionsLoaiHinhSach}
              </Select>
          </Form.Item>
          <Form.Item
            label="Tên sách: "
            name="MaSach"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tên sách!'
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
            label="Số lượng tồn: "
            name="SoLuongTon"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số lượng tồn kho!'
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
            label="Đơn giá tồn: "
            name="DonGiaTon"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập đơn giá tồn!'
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
            <Button key="back" onClick={toogleModalFormContact}>Thoát</Button>
            <Button key="save" type="primary"  htmlType="submit">Lưu</Button>
          </HStack>
        </Form>
      </Modal>

      {/* Modal tìm kiếm */}
      <Modal
        open={openModalFilter}
        title={"Tìm kiếm nâng cao"}
        onCancel={toogleModalFormFilter}
        footer={null}
      >
      <Form form={formFilter} 
          name="control-hooks"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={filterTonDauKy}
        >          
          <Form.Item
            label="Cơ sở thư viện: "
            name="MaCoSo"            
          >
            <Select 
              showSearch 
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
            label="Loại hình sách: "
            name="MaLoaiHinhSach"
          >
            <Select 
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
            label="Tên sách: "
            name="MaSach"            
          >
            <Select 
              showSearch
              allowClear 
              optionFilterProp="children"
              filterOption={(input, option) => option?.children?.toLowerCase().includes(input.toLowerCase())}  
              filterSort={(optionA, optionB) =>
                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
              }

              >
                {optionsSach}
              </Select>
          </Form.Item>        
          
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormFilter}>Thoát</Button>
            <Button key="save" type="primary"  htmlType="submit">Tìm</Button>
          </HStack>
        </Form>
      </Modal>
    </>
  )
}

export default TonDauKy;