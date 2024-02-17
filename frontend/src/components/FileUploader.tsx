import { FormEvent, useState } from "react"
import axios, { AxiosResponse } from "axios"
import Plots from "./Plots"

// TODO: Style all elements.
function FileUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [respSuccess, setRespSuccess] = useState<boolean>(false)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (file != null) {
            const url = "http://localhost:5000/api/visualize"
            const formData = new FormData()
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            formData.append('file', file)
            formData.append('fileName', file.name)
            axios.post(url, formData, config).then((response: AxiosResponse) => {
                console.log(response.data)
                setRespSuccess(true)
            })
        }
    }
    return <>
        <h1> Upload File </h1>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={(event) => {
                if (event.target.files != null) {
                    setFile(event.target.files[0])
                    setRespSuccess(false)
                }
            }} />
            <button type="submit">Upload</button>
            {respSuccess && <Plots />}
        </form>
    </>
}

export default FileUploader
