import {postFile} from "@/utils/request";

export const processImage = async (data: any) => {
    const res = await postFile('/process-image', data)
    return res
}
