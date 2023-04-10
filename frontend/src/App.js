import { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

function App() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  let url = "http://localhost:5000/upload"


  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    console.log(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async () => {

    const formData = new FormData();
    selectedFile ? formData.append('file', selectedFile) : alert('please select the file.')
    setUploading(true)
    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
        console.log(progress);
        setProgress(progress);
      },
    });
  }

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <br />
      {selectedFile && <img src={preview} alt='test' width={100} height={100} />}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label as={'h1'}>File Upload</Form.Label>
        <Form.Control type="file" onChange={onSelectFile} />
      </Form.Group>

      <Button onClick={handleSubmit}>upload</Button>
      <br />
      <br />
      {uploading && <><div style={{ width: '50%', margin: 'auto' }}>
        <ProgressBar now={progress} />
      </div>
        {progress}</>}
    </div>
  );
}

export default App;
