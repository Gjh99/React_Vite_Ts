import {Checkbox, Col, Form, Input, message, Modal, Row, Switch, Tree} from "antd";
import {useImperativeHandle, useState, forwardRef, useEffect} from "react";
import type {CheckboxProps} from 'antd';
import '../index.less'
import type {TreeProps} from 'antd';
import {getAllMenu, roleAdd} from "@/api/role";
import {flattenTree} from "@/utils";

interface FormModalInterface {
    ModalTitle: string;
    roleList: () => void;
    editDataFn: (data: any) => void;
}

interface MenuData {
    id: string;
    menu_name: string;
    children?: MenuData[];
}

interface FormModalRef {
    addHandleOk: () => void;
    modalIsOpen: (val: any) => void;
}

const FormModal = forwardRef<FormModalRef, FormModalInterface>(({
                                                                    ModalTitle,
                                                                    roleList,
                                                                    editDataFn
                                                                }, ref) => {
    const [modalForm] = Form.useForm();
    const [treeData, setTreeData] = useState([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formItem, setFormItem] = useState<any>()
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    useImperativeHandle(ref, () => ({
        addHandleOk: () => addHandleOk(),
        modalIsOpen: (val: any) => modalIsOpen(val)
    }))

    const modalIsOpen = (val: any) => {
        if (val) {
            let {id, role_name, status, role_menu} = val
            let obj = {
                id,
                role_name,
                status,
                menu_id: []
            }
            const treeDataFilter: any[] = []
            treeData.forEach((item: any) => {
                if (item.children.length > 0) {
                    item.children.forEach((child: any) => {
                        treeDataFilter.push(child.id);
                    });
                } else {
                    treeDataFilter.push(item.id);
                }
            });
            const uniqueResult = [...new Set(treeDataFilter)].filter(item => item !== null);
            // @ts-ignore
            const menu_id = role_menu.filter(item => uniqueResult.includes(item.menu_id));
            // @ts-ignore
            obj.menu_id = menu_id.map(item => item.menu_id)
            setFormItem(obj)
            setCheckedKeys([...obj.menu_id])
        }
        setIsAddModalOpen(!isAddModalOpen)
    }
    useEffect(() => {
        console.log('formItem', formItem)
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
        values.menu_id = checkedKeys
        if (ModalTitle == '新增') {
            let res = await roleAdd(values)
            let {code, msg} = res
            if (code == 200) {
                modalForm.resetFields();
                roleList()
                setIsAddModalOpen(false)
                message.success(msg);
            } else {
                message.error(msg)
            }
        } else {
            // @ts-ignore
            values.id = formItem?.id
            let flattenTreeData = flattenTree(treeData)
            const parentMenuId = Array.from(flattenTreeData.filter(item => checkedKeys.includes(item.id)).map(val => val.parent_id).filter(item => item !== null))
            const menu_id = Array.from(new Set([...checkedKeys, ...parentMenuId]))
            values.menu_id = menu_id
            editDataFn(values)
        }
    }
    const getAllKeys = (nodes: MenuData[] | undefined): React.Key[] => {
        if (!nodes) return [];
        return nodes.reduce(
            (keys, node) => [...keys, node.id, ...getAllKeys(node.children)],
            [] as React.Key[]
        );
    };
    const handleCheckOrSelect = (key: string, isChecked: boolean, children: MenuData[]) => {
        // console.log('patient_id', patient_id)
        const updatedKeys = updateCheckedKeys(key, isChecked, children);
        setCheckedKeys(updatedKeys);
    };

    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck: TreeProps['onCheck'] = (_checkedKeysValue, {node}) => {
        // @ts-ignore
        const isChecked = checkedKeys.includes(node.id);
        // @ts-ignore
        handleCheckOrSelect(node.id, !isChecked, node.children || []);
    };

    const onSelect: TreeProps['onSelect'] = (_selectedKeysValue, {node}) => {
        // @ts-ignore
        const isChecked = checkedKeys.includes(node.id);
        // @ts-ignore
        handleCheckOrSelect(node.id, !isChecked, node.children || []);
    };
    /*
    * key 当前被操作节点id
    * isChecked 当前节点勾选状态
    * nodes 当前节点下的子节点
    * */
    const updateCheckedKeys = (key: string, isChecked: boolean, nodes: MenuData[]) => {
        let keysToUpdate: any[] = [key, ...getAllKeys(nodes)]
        let newCheckedKeys: any[] = [];

        if (isChecked) {
            // 添加当前节点及其子节点
            newCheckedKeys = Array.from(new Set([...checkedKeys, ...keysToUpdate]));
        } else {
            // 移除当前节点及其子节点
            newCheckedKeys = checkedKeys.filter((k) => !keysToUpdate.includes(k));
        }
        // 检查父节点状态
        const parentCheckHandler = (currentKey: string, data: MenuData[]) => {
            for (const node of data) {
                if (node.children && node.children.some((child) => child.id === currentKey)) {
                    const parentKey = node.id;
                    const siblings = node.children.map((child) => child.id);
                    const isParentChecked = siblings.every((sibling) => newCheckedKeys.includes(sibling));

                    if (isParentChecked) {
                        newCheckedKeys = Array.from(new Set([...newCheckedKeys, parentKey]));
                    } else {
                        newCheckedKeys = newCheckedKeys.filter((k) => k !== parentKey);
                    }
                    parentCheckHandler(parentKey, data);
                }
                if (node.children) {
                    parentCheckHandler(currentKey, node.children);
                }
            }
        };

        parentCheckHandler(key, treeData);
        return newCheckedKeys;
    };

    const getAllMenuFn = async () => {
        let res = await getAllMenu()
        let {code, data} = res
        if (code == 200) {
            setTreeData(data)
        }
    }

    useEffect(() => {
        getAllMenuFn()
    }, [])

    useEffect(() => {
        if (!isAddModalOpen) {
            setExpandedKeys([]);
            setCheckedKeys([]);
            modalForm.resetFields();
        }
    }, [isAddModalOpen])

    const checkBoxChange: CheckboxProps['onChange'] = (e) => {
        if (e.target.checked) {
            setCheckedKeys(getAllCheckKeys(treeData))
        } else {
            setCheckedKeys([])
        }
    }

    const getAllCheckKeys = (data: any[]) => {
        let key: string[] = []
        const keyList = (nodes: any[]) => {
            nodes.forEach(node => {
                key.push(node.id)
                if (node.children) {
                    keyList(node.children)
                }
            })
        }
        keyList(data)
        return key
    }

    return (
        <Modal
            title={ModalTitle}
            open={isAddModalOpen}
            centered
            okText="确定"
            cancelText="取消"
            okButtonProps={{htmlType: 'submit'}}
            onCancel={() => {
                setIsAddModalOpen(false);
            }}
            onOk={() => addHandleOk()}
            destroyOnClose
            width={600}
        >
            <Form
                form={modalForm}
                layout="horizontal"
                name="userForm"
                labelCol={{span: 6}}
                wrapperCol={{span: 20}}
                autoComplete="off"
                initialValues={{
                    status: true
                }}
            >
                <Row>
                    <Col span={20}>
                        <Form.Item
                            name="role_name"
                            label="权限名称"
                            rules={[{required: true, message: '请输入权限名称!'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item
                            name="status"
                            label="是否启用"
                        >
                            <Switch defaultChecked={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item
                            name="menu_id"
                            label="菜单权限"
                        >
                            <div>
                                <Checkbox onChange={checkBoxChange}
                                          className="mt4 mb10 ml10">全部选中/全部不选</Checkbox>
                                <div className="treeClass">
                                    <Tree
                                        checkable
                                        onExpand={onExpand}
                                        expandedKeys={expandedKeys}
                                        autoExpandParent={autoExpandParent}
                                        onCheck={onCheck}
                                        checkedKeys={checkedKeys}
                                        onSelect={onSelect}
                                        treeData={treeData}
                                        fieldNames={{
                                            title: 'menu_name',
                                            key: 'id',
                                            children: 'children'
                                        }}
                                        height={400}
                                    />
                                </div>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>

    )

})

FormModal.displayName = "FormModal";

export default FormModal;
