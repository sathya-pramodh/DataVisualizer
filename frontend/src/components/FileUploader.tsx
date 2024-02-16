import { FormEvent, useState } from "react"
import axios, { AxiosResponse } from "axios"

// TODO: Style all elements.
function FileUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [reponseData, setResponseData] = useState<string | null>(null)

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
            axios.post(url, formData, config).catch((response: AxiosResponse) => {
                // TODO: Templated reponseData and setResponseData for now. Still need to decide what to send from the backend.
                setResponseData(response.data)
            })
        }
    }

    return <>
        <h1> Upload File </h1>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={(event) => {
                if (event.target.files != null) {
                    setFile(event.target.files[0])
                }
            }} />
            <div>{(reponseData != null) ? reponseData : ""}</div>
            <button type="submit">Upload</button>
        </form>
    </>
}

export default FileUploader
