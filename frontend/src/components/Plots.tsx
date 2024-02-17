import axios, { AxiosResponse } from "axios"
import JSZip from "jszip"
import { useEffect, useState } from "react"

function Plots() {

    const [urls, setUrls] = useState<Array<string>>([])

    useEffect(() => {
        const url = "http://localhost:5000/api/get-recent-plots"
        axios.get(url, { responseType: 'arraybuffer' }).then((response: AxiosResponse) => {
            const jszip = new JSZip()
            jszip.loadAsync(response.data).then(({ files }) => {
                const urls: Array<string> = []
                const mediaFiles = Object.entries(files).filter(([fileName]) =>
                    fileName.endsWith('.png'),
                )
                mediaFiles.forEach(([, image]) => {
                    image.async('blob').then((blob: Blob) => {
                        urls.push(URL.createObjectURL(blob))
                        setUrls(urls)
                    })
                })
            })
        })
    }, [])
    console.log(urls)
    return <>
        {urls.map((url) => {
            return <img src={url} />
        })}
    </>
}

export default Plots
