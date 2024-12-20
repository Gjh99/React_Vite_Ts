import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    GetProp,
    Input,
    Select, Space,
    Switch,
    Table,
    App,
    TableColumnsType,
    TableProps
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    RedoOutlined,
    SearchOutlined,
    VerticalAlignBottomOutlined
} from "@ant-design/icons";
import './index.less'
import React, {useEffect, useRef, useState} from "react";
import {createStyles} from "antd-style";
import moment from "moment/moment";
import {getRoleList, roleDel, roleEdit} from "@/api/role";
import FormModal from "@/views/system/role/component/FormModal";
import {download} from "@/utils/request";

const {Option} = Select;
const {RangePicker} = DatePicker;
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

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
    role_name: string;
    status: boolean;
    create_time: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
}

const role = () => {
    const { message  } = App.useApp();
    const {styles} = useStyle();
    const [form] = Form.useForm();
    const [userTableData, setUserTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const formModalRef = useRef<any>(null);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: TableColumnsType<DataType> = [
        {
            title: '权限名称',
            dataIndex: 'role_name',
        },
        {
            title: '是否启用',
            dataIndex: 'status',
            render: (_, record) => (
                record.id !== 1 ?
                    <Switch checked={record.status} onChange={(checked) => enableChange(checked, record)}/> : ''
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <div>
                    {
                        record.id !== 1 ?
                            <Space size="middle">
                                <Button type="link" onClick={() => editFn(record)}>修改</Button>
                                <Button type="link" danger onClick={() => roleDeleteFn([record.id])}>删除</Button>
                            </Space> : <Space></Space>
                    }
                </div>
            ),
        }
    ];
    const onSearch = () => {
        const values = form.getFieldsValue();
        let {create_time} = values
        let params = {
            ...values,
            startTime: create_time ? create_time[0].format("YYYY-MM-DD") : null,
            endTime: create_time ? create_time[1].format("YYYY-MM-DD") : null,
        }
        getRoleListFn(params);
    }
    const onReset = () => {
        getRoleListFn();
        form.resetFields();
    }

    const getRoleListFn = async (params?: any) => {
        let {current: page, pageSize: limit} = tableParams.pagination as TablePaginationConfig;
        let res = await getRoleList({
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
            setUserTableData(data)
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
        getRoleListFn()
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
    ]);

    const enableChange = (checked: boolean, record: DataType) => {
        record.status = checked
        roleEditFn(record, 'switch')
    };

    const roleEditFn = async (data: DataType, type?:string) => {
        if (type) {
            // @ts-ignore
            data.type = type
        }
        let res = await roleEdit(data);
        let {code, msg} = res
        if (code == 200) {
            getRoleListFn()
            message.success(msg);
            if (data.id && type !== 'switch') {
                formModalRef.current.modalIsOpen()
            }
        } else {
            message.error(msg)
        }
    }

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination) => {
        console.log('pagination', pagination)
        setTableParams({
            pagination
        });
    }

    const addRoleFn = () => {
        setModalTitle('新增')
        formModalRef.current.modalIsOpen()
    }
    const editFn = (val: DataType | string) => {
        setModalTitle('修改')
        let nowItemData = null
        if (!val) {
            // @ts-ignore
            nowItemData = userTableData.find(item => item.id == selectedRowKeys)
        } else {
            nowItemData = val
        }
        formModalRef.current.modalIsOpen(nowItemData)
    }
    const deleteFn = () => {
        roleDeleteFn(selectedRowKeys)
    }

    const roleDeleteFn = async (ids: React.Key[]) => {
        let idList = ids.map(item => Number(item))
        let res = await roleDel({id: idList})
        let {code, msg} = res
        if (code == 200) {
            getRoleListFn()
            message.success(msg);
        } else {
            message.error(msg)
        }
    }

    const downloadExcel = () => {
        download('/role/exportExcel', '权限信息', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
    }

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeys)
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.id === 1, // Column configuration not to be checked
            name: record.role_name,
        }),
    };

    const onRowClick = (record: DataType, e: React.MouseEvent<HTMLElement>) => {
        console.log('e----------', record)
        if (e.target instanceof HTMLElement && e.target.closest('a')) {
            return;
        }

        if (record.id == 1) return
        const {id} = record;
        const isSelected = selectedRowKeys.includes(id)
        const newSelectedKeys = isSelected ? selectedRowKeys.filter((key) => key !== id) // 取消选中
            : [...selectedRowKeys, id];
        setSelectedRowKeys(newSelectedKeys);
    }

    return (
        <div className="role h100">
            <div className="handleForm">
                <Form
                    layout="inline"
                    form={form}
                    colon={false}
                    autoComplete="off"
                >
                    <Col span={5}>
                        <Form.Item label="权限名称" name="role_name">
                            <Input placeholder="权限名称"/>
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
                            onClick={addRoleFn}
                            style={{
                                borderColor: '#69c91d',
                                color: '#69c91d',
                            }}>新增</Button>
                    <Button
                        color="primary" icon={<EditOutlined/>} variant="outlined"
                        disabled={selectedRowKeys.length == 0 || selectedRowKeys.length > 1}
                        onClick={() => editFn('')}
                    >修改</Button>

                    <Button color="danger" icon={<DeleteOutlined/>} variant="outlined"
                            onClick={deleteFn}
                    >删除</Button>
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
                    rowSelection={{type: 'checkbox', ...rowSelection}}
                    className={styles.customTable}
                    rowKey={(record) => record.id}
                    loading={loading}
                    columns={columns}
                    dataSource={userTableData}
                    pagination={tableParams.pagination}
                    onChange={handleTableChange}
                    scroll={{y: 100 * 5}}
                    onRow={(record) => ({
                        onClick: (e) => onRowClick(record, e),
                    })}
                />
            </div>
            {/*新增 修改*/}
            <FormModal
                ModalTitle={modalTitle}
                ref={formModalRef}
                roleList={getRoleListFn}
                editDataFn={roleEditFn}
            />
        </div>
    )
}

export default role
