import React, {useState} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {Upload, message, Form, Radio, InputNumber, Col, Row} from 'antd';
import type {UploadProps} from 'antd';
import type {FormProps} from 'antd';
import './index.less'
import {processImage} from "@/api/toolBox";

const {Dragger} = Upload;
type FormType = {
    image?: File;
    format?: string;
    imgWidth?: string;
    imgHeight?: string;
};
const PictureConversion: React.FC = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const [handleImgForm, setHandleImgForm] = useState({
        format: 'png',
        imgWidth: 256,
        imgHeight: 256,
    })

    const handleFormChange = (changedValues: any) => {
        setHandleImgForm(prevState => ({
            ...prevState,
            ...changedValues,
        }));
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            message.success(`文件上传成功.`);
            setHandleImgForm(prevState => {
                console.log('prevState', prevState)
                const newForm = {...prevState, image: file};
                form.setFieldsValue(newForm);
                uploadImage(newForm)
                return newForm;
            })
            return false;
        },
        fileList,
        accept: '.jpg,.png,.jpeg,.webp,.avif',
    };
    const onFinish: FormProps<FormType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const uploadImage = async (data: any) => {
        let res = await processImage(data);
        let {code, msg} = res
        if (code == 500) {
            message.error(msg);
            return
        }
        downloadImage(res as any, handleImgForm.format);
    }

    const downloadImage = (iamge: ArrayBuffer, format: string) => {
        const url = URL.createObjectURL(new Blob([iamge], {type: `image/${format}`}));
        const a = document.createElement('a');
        a.href = url;
        a.download = `processed-image.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setFileList([]);
    };

    return (
        <div className="PictureConversion h100">
            <div className="handleImgForm">
                <Row>
                    <Form
                        labelCol={{span: 5}}
                        layout="inline"
                        form={form}
                        style={{width: '100%'}}
                        onFinish={onFinish}
                        colon={false}
                        initialValues={{...handleImgForm}}
                        onValuesChange={handleFormChange}
                    >
                        <Col span={8} className="mb10">
                            <Form.Item label="转换图片格式" name="format">
                                <Radio.Group>
                                    <Radio.Button value="png">png</Radio.Button>
                                    <Radio.Button value="jpeg">jpeg</Radio.Button>
                                    <Radio.Button value="webp">webp</Radio.Button>
                                    <Radio.Button value="avif">avif</Radio.Button>
                                    <Radio.Button value="ICO">ICO</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="转换图片宽度" name="imgWidth">
                                <InputNumber min={1} changeOnWheel style={{width: '100%'}}
                                             addonAfter={'PX'}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="转换图片高度" name="imgHeight">
                                <InputNumber min={1} changeOnWheel style={{width: '100%'}}
                                             addonAfter={'PX'}/>
                            </Form.Item>
                        </Col>
                    </Form>
                </Row>
            </div>
            <div className="uploadDragger">
                <Dragger {...uploadProps} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域进行上传</p>
                </Dragger>
            </div>
        </div>
    );
};

export default PictureConversion;
