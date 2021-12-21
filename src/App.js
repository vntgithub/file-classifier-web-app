import React, {useState, useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import BlockSize from './component/BlockSize';
import Scenario from './component/Scenario';
import Button from '@mui/material/Button';
import TableType from './component/TableType';
import Labels from './labels.json';

import './App.css';

function App() {
  const [labels, setLabels] = useState(null)
  const [model, setModel] = useState(null)
  const [file, setFile] = useState(null)
  const [isLoadedData, setIsLoadedData] = useState(false)
  const [isLoadingModel, setIsLoadingModel] = useState(false)
  const [isSucessLoading, setIsSucessLoading] = useState(false)
  const [blockSize, setBlockSize] = useState(4096)
  const [scenario, setScenario] = useState('')
  const [checkScenario, setCheckScenario] = useState(true)

  const clickButtonEvent = () => {
    document.getElementById('file').click()
  }
  const loadData = (e) => {
    setFile(e.target.files[0])
    setIsLoadedData(true)

  }
  const alertSuccess = () => {
    setIsSucessLoading(true)
    setTimeout(() => {
      setIsSucessLoading(false)
    }, 3000)
  }
  const loadModel = async () => {
    if(scenario === ''){
      setCheckScenario(false)
      return
    }else
      setCheckScenario(true)
    setIsLoadingModel(true)
    const modelLocation = '/model/' + blockSize + '_' +  scenario + '/model.json'
    const modelFromDB = await tf.loadLayersModel(modelLocation);
    setModel(modelFromDB)
    setIsLoadingModel(false)
    alertSuccess()
  }
  return (
    <div className="App">
      <h1 className='header'>FILE CLASSIFIER</h1>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h3>Load model for your scenario</h3>
          <BlockSize blockSize={blockSize} setBlockSize={setBlockSize} />
          <div className='scenario'>
            <Scenario scenario={scenario} setScenario={setScenario} />
            <div className='button-load-model'>
              <Button onClick={loadModel} variant="outlined">Load model</Button>
              {isLoadingModel && <div className='circularprogress'><CircularProgress /></div>}
            </div>
            {!checkScenario &&<Alert severity="error">Please choose your scenario!</Alert>}
            {isSucessLoading &&<Alert severity="success">Model load successfully !</Alert>}
          </div>
          <h3>Load data and analysic</h3>
          <div className='button'>
            <Button onClick={clickButtonEvent} variant="contained">Load data</Button>
            <input id='file' onChange={loadData} className='inputfile' type='file' />
          </div>
          <div className='button'>
            <Button onClick={clickButtonEvent} variant="contained" disabled={!isLoadedData}>analyze your data</Button>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className='introduce'>
            <h2>Large-scale File Fragment Type Identification using Neural Networks</h2>
            <p>We present models for six scenarios on two popular block sizes of 512 and 4096 bytes. File type selection reflects focus on media carving applications, where scenarios #3 to #6 are the most relevant: </p>
            <p><b>#1 (All; 75 classes):</b> All filetypes are separate classes; this is the most generic case and can be aggregated into more specialized use-cases.</p>
            <p><b>#2 (Use-specific; 11):</b> Filetypes are grouped into 11 classes according to their use; this information may be useful for more-detailed, hierarchical classification or for determining the primary use of an unknown device.</p>
            <p><b>#3 (Media Carver - Photos &amp; Videos; 25):</b> Every filetype tagged as a bitmap (6), RAW photo (11) or video (7) is considered as a separate class; all remaining types are grouped into one other class.</p>
            <p><b>#4 (Coarse Photo Carver; 5):</b> Separate classes for different photographic types: JPEG, 11 raw images, 7 videos, 5 remaining bitmaps are grouped into one separate class per category; all remaining types are grouped into one other class.</p>
            <p><b>#5 (Specialized JPEG Carver; 2):</b> JPEG is a separate class and the remaining 74 filetypes are grouped into one other class; scenario intended for analyzing disk images from generic devices.</p>
            <p><b>#6 (Camera-Specialized JPEG Carver; 2):</b> JPEG is a separate class and the remaining photographic/video types (11 raw images, 3GP, MOV, MKV, TIFF and HEIC) are grouped into one other class; scenario intended for analyzing SD cards from digital cameras.</p>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className='introduce'>
            <h2 className='table-header'>File type supported </h2>
            <TableType rows={Labels[1]} />
          </div>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default App;
