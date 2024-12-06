import {Col, Form, Input, message, Modal, Row, Select, Switch} from "antd";
import {useImperativeHandle, useState, forwardRef} from "react";
import {userAdd} from "@/api/user";

type roleType = {
    id: number;
    role_name: string;
    status: boolean;
}

interface FormModalInterface {
    ModalTitle: string;
    RoleOption: roleType[];
}

interface FormModalRef {
    addHandleOk: () => void;
    modalOpen: () => void;
}

const FormModal = forwardRef<FormModalRef, FormModalInterface>(({ModalTitle, RoleOption}, ref) => {
    // let {ModalTitle} = props
    const [modalForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        addHandleOk: () => addHandleOk(),
        modalOpen: () => modalOpen()
    }))

    const modalOpen = () => {
        setIsAddModalOpen(true)
    }

    const addHandleOk = async () => {
        try {
            const validate = await modalForm.validateFields();
            console.log('validate', validate)
            if (validate) {
                return
            }
            const values = modalForm.getFieldsValue();
            let res = await userAdd(values)
            let {code, msg} = res
            if (code == 200) {
                message.success(msg);
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log('Failed:', e);
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
                            <Input/>
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
                            <Select/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="user_age"
                            label="年龄"
                        >
                            <Input/>
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
                            name="role"
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
