import * as path from "path";
import fs from "fs";

export default [
    {
        url: '/api/menu',
        method: 'get',
        response: () => {
            const dataPath = path.resolve(__dirname, './data/menu.json');
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            return data;
        }
    },
    {
        url: '/api/systemInterView',
        method: 'get',
        response: () => {
            const dataPath = path.resolve(__dirname, './data/systemInterView.json');
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            return data;
        }
    }
]
