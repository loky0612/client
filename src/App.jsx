import axios from 'axios';
import { useState } from 'react';
import './App.css'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  const [file, setFile] = useState(null);
  const fileHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }
  const click = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append('file', file)

      await axios.post('/getdocx', fileData).then((res) => {
        console.log(res.data);


        const element = document.createElement("a");
        const out = new Blob([res.data], {
          type: "docx/plain;charset=utf-8",
        });
        element.href = URL.createObjectURL(out);
        element.download = "output.doc";
        document.body.appendChild(element);
        element.click();
        URL.revokeObjectURL(element.href);
        document.body.removeChild(element);
      })
        .catch((error) => {
          console.log(error)
        })

    } catch (error) {
      console.log("Convertion unsuccessful");
    }
  }
  return (
    <div className="App w-screen h-screen flex justify-center items-center">
      <div className='w-1/2 min-w-fit h-1/2 bg-blue-300 rounded-3xl relative'>
        <form action="POST" onSubmit={click}>
          <div className='flex my-5 justify-center items-center'>
            <h1 className='tex font-semibold p-5 text-center text-white'>PDF TO DOCX CONVERSION</h1>
          </div>
          <div className=' flex justify-center my-4 mx-8 rounded-2xl border-2 border-dashed border-gray-600 cursor-pointer'>
            <label htmlFor="in" className='lable py-20 p-4 text-center cursor-pointer w-full h-full'>Drap and drop or click</label>
            <input type='file' id='in' placeholder='upload file' name='file' accept='application/pdf' onChange={fileHandler} />
          </div>
          <div className='flex justify-center mt-12'>
            <button type='submit' className='bg-green-300 absolute rounded-3xl py-3 px-6'><span className=' butt text-white font-medium p-5'>Convert</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;