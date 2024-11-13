import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import * as icojs from 'icojs';

const app = express();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const PORT = 5000;

// 设置默认的高质量值
const DEFAULT_QUALITY = 90;
app.post('/process-image', upload.single('image'), async (req, res) => {
    const {format, imgWidth, imgHeight} = req.body;
    const file = req.file
    try {
        if (!file) {
            return res.status(400).send({ error: '未上传图片' });
        }

        const outputFormat = format.toLowerCase();
        let image = sharp(file.buffer);

        if (imgWidth || imgHeight) {
            image = image.resize(parseInt(imgWidth) || null, parseInt(imgHeight) || null);
        }

        if (outputFormat === 'jpeg') {
            image = image.jpeg({ quality: DEFAULT_QUALITY });
        } else if (outputFormat === 'webp') {
            image = image.webp({ quality: DEFAULT_QUALITY });
        } else if (outputFormat === 'avif') {
            image = image.avif({ quality: DEFAULT_QUALITY });
        }

        // ico转换png、jpeg、jpg
        if (file.mimetype === 'image/x-icon') {
            const iconImages = await icojs.parseICO(file.buffer);

            if (!iconImages || iconImages.length === 0) {
                return res.status(400).send({ error: '无法解析 ICO 文件' });
            }

            const firstIcon = iconImages[0];
            image = sharp(firstIcon.buffer);

            if (outputFormat === 'png' || outputFormat === 'jpeg' || outputFormat === 'jpg') {
                const buffer = await image.toFormat(outputFormat).toBuffer();
                res.set('Content-Type', `image/${outputFormat}`);
                return res.status(200).send(buffer);
            } else {
                return res.status(400).send({ error: '不支持的目标格式' });
            }
        }

        if (outputFormat !== 'ico') {
            const buffer = await image.toFormat(outputFormat).toBuffer();
            res.set('Content-Type', `image/${outputFormat}`);
            return res.status(200).send(buffer);
        }

        const buffer = await image.toBuffer();
        try {
            const icoBuffer = await pngToIco(buffer);
            res.set('Content-Type', 'image/x-icon');
            return res.status(200).send(icoBuffer);
        } catch (err) {
            console.error('转换为 ICO 时出错:', err);
            return res.status(500).send({ error: '转换为 ICO 时出错', details: err.message });
        }
    } catch (e) {
        console.error('处理图像时出错:', e);
        return res.status(500).send({ error: '处理图像时出错', details: e.message });
    }

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
