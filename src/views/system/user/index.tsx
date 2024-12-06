import React, {useEffect, useRef, useState} from 'react';
import './index.less';
import {
    SearchOutlined,
    RedoOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
    InboxOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import {
    Select,
    Button,
    Form,
    Input,
    DatePicker,
    Col,
    Flex,
    Table,
    Switch,
    Modal,
    UploadProps,
    message,
    Upload
} from 'antd';
import type {GetProp, TableColumnsType, TableProps} from 'antd';
import {getUserInfoList, uploadUserTemplate, userEdit} from "@/api/user";
import moment from 'moment';
import {createStyles} from 'antd-style';
import {download} from "@/utils/request";
import FormModal from "@/views/system/user/component/FormModal";
import {getRoleList} from "@/api/role";

const {Option} = Select;
const {RangePicker} = DatePicker;

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const {Dragger} = Upload;

const useStyle = createStyles(({css}) => {
    return {
        customTable: css`
          .ant-table {
            .ant-table-container {
              .ant-table-body,
              .ant-table-content {
                scrollbar-width: thin;
                scrollbar-color: #eaeaea transparent;
                scrollbar-gutter: stable;
              }
            }
          }
        `,
    };
});

interface DataType {
    key?: React.Key;
    id: number;
    user_name: string;
    nick_name: string;
    user_age: number;
    phone_number: number;
    status: boolean;
    create_time: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
}

const user: React.FC = () => {
    const {styles} = useStyle();
    const [role, setRole] = useState([])
    const [form] = Form.useForm();
    const [userTable, setUserTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('新增');
    const formModalRef = useRef<any>(null);

    const columns: TableColumnsType<DataType> = [
        {
            title: '登录账号',
            dataIndex: 'user_name',
        },
        {
            title: '用户名称',
            dataIndex: 'nick_name',
            defaultSortOrder: 'descend',
        },
        {
            title: '年龄',
            dataIndex: 'user_age',
        },
        {
            title: '性别',
            dataIndex: 'user_sex',
        },
        {
            title: '手机号',
            dataIndex: 'phone_number',
        },
        {
            title: '是否启用',
            dataIndex: 'status',
            render: (_, record) => (
                <Switch checked={record.status} onChange={(checked) => enableChange(checked, record)}/>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
        },
    ];

    const onSearch = () => {
        const values = form.getFieldsValue();
        let {create_time} = values
        let params = {
            ...values,
            startTime: create_time ? create_time[0].format("YYYY-MM-DD") : null,
            endTime: create_time ? create_time[1].format("YYYY-MM-DD") : null,
        }
        getUserInfoListFn(params);
    }

    const onReset = () => {
        getUserInfoListFn();
        form.resetFields();
    }

    const getUserInfoListFn = async (params?: any) => {
        let {current: page, pageSize: limit} = tableParams.pagination as TablePaginationConfig;
        let res = await getUserInfoList({
            ...params,
            page,
            limit,
        });
        let {code, data} = res
        if (code == 200) {
            data = data.map((user: any) => ({
                ...user,
                create_time: moment(user.create_time).format('YYYY-MM-DD HH:mm:ss'),
                update_time: moment(user.update_time).format('YYYY-MM-DD HH:mm:ss')
            }));
            setLoading(false);
            setUserTable(data)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.totalCount,
                },
            });
        }
    }

    useEffect(() => {
        getUserInfoListFn()
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
    ]);

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination) => {
        console.log('pagination', pagination)
        setTableParams({
            pagination
        });
        // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        //     setTableParams([]);
        // }
    };

    const enableChange = (checked: boolean, record: DataType) => {
        record.status = checked
        userEditFn(record)
    };

    const userEditFn = async (data: DataType) => {
        let res = await userEdit(data);
        let {code, msg} = res
        if (code == 200) {
            getUserInfoListFn()
            message.success(msg);
        } else {
            message.error(msg)
        }
    }

    // 新增
    const addUserFn = () => {
        setModalTitle('新增')
        formModalRef.current.modalOpen()
    }

    // 导入
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            message.success(`文件上传成功.`);
            uploadUserTemplate({file})
            return false;
        },
        accept: '.xlsx',
    };

    const uploadFn = () => {
        setIsModalOpen(true);
    };

    const downloadExcel = () => {
        download('/user/exportExcel', '用户信息', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
    }

    const getRoleListFn = async () => {
      let res = await getRoleList();
      let {code,data} = res;
      if (code == 200) {
          setRole(data)
      }
    }

    useEffect(() => {
        getRoleListFn()
    }, []);

    const downloadTemplateFn = () => {
        download('/user/downloadTemplate', '上传模板', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
    }

    return (
        <div className="user h100">
            <div className="handleForm">
                <Form
                    layout="inline"
                    form={form}
                    initialValues={{layout: 'horizontal'}}
                    colon={false}
                >
                    <Col span={5}>
                        <Form.Item label="用户名称" name="nick_name">
                            <Input placeholder="用户名称"/>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="登录账号" name="user_name">
                            <Input placeholder="登录账号"/>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="是否启用" name="status">
                            <Select
                                placeholder="是否启用"
                                allowClear
                            >
                                <Option value="1">是</Option>
                                <Option value="2">否</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="创建时间" name="create_time">
                            <RangePicker/>
                        </Form.Item>
                    </Col>
                    <Form.Item>
                        <Button color="primary" icon={<SearchOutlined/>} variant="outlined"
                                onClick={onSearch}>搜索</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button color="danger" icon={<RedoOutlined/>} variant="outlined" onClick={onReset}>重置</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="mt10">
                <Flex gap="small" wrap>
                    <Button color="primary" icon={<PlusOutlined/>} variant="outlined"
                            onClick={addUserFn}
                            style={{
                                borderColor: '#69c91d',
                                color: '#69c91d',
                            }}>新增</Button>
                    <Button color="primary" icon={<EditOutlined/>} variant="outlined">修改</Button>

                    <Button color="danger" icon={<DeleteOutlined/>} variant="outlined">删除</Button>
                    <Button color="primary" icon={<VerticalAlignTopOutlined/>} variant="outlined"
                            onClick={uploadFn}
                            style={{
                                borderColor: '#909399',
                                color: '#909399',
                            }}>导入</Button>
                    <Button color="primary" icon={<VerticalAlignBottomOutlined/>} variant="outlined"
                            onClick={downloadExcel}
                            style={{
                                borderColor: '#e6a23c',
                                color: '#e6a23c',
                            }}>导出</Button>
                </Flex>
            </div>
            <div className="table mt10">
                <Table<DataType>
                    className={styles.customTable}
                    rowKey={(record) => record.id}
                    loading={loading}
                    columns={columns}
                    dataSource={userTable}
                    pagination={tableParams.pagination}
                    onChange={handleTableChange}
                    scroll={{y: 100 * 5}}
                />
            </div>
            {/*新增 修改*/}
            <FormModal ModalTitle={modalTitle} RoleOption={role} ref={formModalRef}/>
            {/*导入*/}
            <Modal title="文件上传" open={isModalOpen} footer={null} centered>
                <Dragger {...uploadProps} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域进行上传</p>
                </Dragger>
                <div className="flx-justify-end">
                    <Button type="link" onClick={downloadTemplateFn}><DownloadOutlined/> 模板下载</Button>
                </div>
            </Modal>
        </div>
    );
};

export default user;
