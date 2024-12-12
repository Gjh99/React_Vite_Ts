import {Col, Form, Input, InputNumber, message, Modal, Row, Select, Switch} from "antd";
import {useImperativeHandle, useState, forwardRef, useEffect} from "react";
import {userAdd} from "@/api/user";

type roleType = {
    id: number;
    role_name: string;
    status: boolean;
}

type dictType = {
    id: number;
    data_label: string;
    data_value: string;
}

interface FormModalInterface {
    ModalTitle: string;
    RoleOption: roleType[];
    DictDataOption: dictType[];
    userInfoList: () => void;
    editDataFn: (data:any) => void;
}

interface FormModalRef {
    addHandleOk: () => void;
    modalIsOpen: (val:any) => void;
}

const FormModal = forwardRef<FormModalRef, FormModalInterface>(({
                                                                    ModalTitle,
                                                                    RoleOption,
                                                                    DictDataOption,
                                                                    userInfoList,
                                                                    editDataFn
                                                                }, ref) => {
    const [modalForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formItem, setFormItem] = useState()

    useImperativeHandle(ref, () => ({
        addHandleOk: () => addHandleOk(),
        modalIsOpen: (val:any) => modalIsOpen(val)
    }))

    const modalIsOpen = (val:any) => {
        if (val) {
            setFormItem(val)
        }
        console.log('val',val)
        setIsAddModalOpen(!isAddModalOpen)
    }
    useEffect(() => {
        console.log('formItem',formItem)
        if (formItem) {
            modalForm.setFieldsValue(formItem)
        }
    }, [formItem])

    const addHandleOk = async () => {
        const validate = await modalForm.validateFields();
        if (validate.errorFields) {
            return
        }
        const values = modalForm.getFieldsValue();
        if (ModalTitle == '新增') {
            let res = await userAdd(values)
            let {code, msg} = res
            if (code == 200) {
                modalForm.resetFields();
                userInfoList()
                setIsAddModalOpen(false)
                message.success(msg);
            } else {
                message.error(msg)
            }
        } else {
            // @ts-ignore
            values.id = formItem?.id
            editDataFn(values)
        }
    }

    return (
        <Modal
            title={ModalTitle}
            open={isAddModalOpen}
            centered
            okText="确定"
            cancelText="取消"
            okButtonProps={{htmlType: 'submit'}}
            onCancel={() => setIsAddModalOpen(false)}
            onOk={() => addHandleOk()}
            destroyOnClose
            width={1000}
        >
            <Form
                form={modalForm}
                layout="horizontal"
                name="userForm"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                autoComplete="off"
                initialValues={{
                    status: true
                }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="user_name"
                            label="登录账号"
                            rules={[{required: true, message: '请输入账号!'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{required: true, message: '请输入密码!'}]}
                        >
                            <Input.Password disabled={ModalTitle !== '新增'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="nick_name"
                            label="用户名称"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="phone_number"
                            label="电话"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="user_sex"
                            label="性别"
                        >
                            <Select
                                options={DictDataOption}
                                fieldNames={{
                                    value: 'id',
                                    label: 'label'
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="user_age"
                            label="年龄"
                        >
                            <InputNumber min={1} style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="status"
                            label="是否启用"
                        >
                            <Switch defaultChecked={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="roleId"
                            label="角色"
                            rules={[{required: true, message: '请选择角色!'}]}
                        >
                            <Select
                                options={RoleOption}
                                fieldNames={{
                                    label: 'role_name',
                                    value: 'id'
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>

    )

})

FormModal.displayName = "FormModal";

export default FormModal;
