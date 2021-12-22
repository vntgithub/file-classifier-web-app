import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

import BlockSize from './component/BlockSize';
import Scenario from './component/Scenario';
import Button from '@mui/material/Button';
import TableType from './component/TableType';
import TableResult from './component/TableResult';
import FileTypeSelectExtract from './component/FileTypeSelectExtract';
import Labels from './labels.json';

import './App.css';
import Logo from './logo.png'

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12.599999, 18.500001, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}


function App() {
  const [dataResult, setDataResult] = useState([])
  const [chartData, setChartData] = useState(data)
  const [isCanPredict, setIsCanPredict] = useState(false)
  const [isGetExtract, setIsGetExtract] = useState(false)
  const [wait, setWait] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isGetCSV, setIsGetCSV] = useState(false)
  const [blockSize, setBlockSize] = useState(4096)
  const [scenario, setScenario] = useState('')
  const [dataDir, setDataDir] = useState('')
  const [outputCSVDir, setOutputCSVDir] = useState('')
  const [outputExtractDir, setOutputExtractDir] = useState('')
  const [fileType, setFileType] = useState('')
  const [serviceURL, setServiceURL] = useState('')

  const getURLData = (e) => setDataDir(e.target.value)
  const getURLService = (e) => setServiceURL(e.target.value)
  const alertSuccess = () => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
  }

  const getChartData = (resData) => {
    let chart = {
      labels: [],
      datasets: [
        {
          label: '# of Votes',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }
    chart.labels = resData.map(item => item[0])
    chart.datasets[0].data = resData.map(item => item[1])
    for(let i = 0; i < resData.length; i++){
      let x = Math.floor(Math.random() * 255)
      let y = Math.floor(Math.random() * 255)
      let z = Math.floor(Math.random() * 255)
      let color = `rgba(${x}, ${y}, ${z}, 0.4)`
      let colorBorder = `rgba(${x}, ${y}, ${z}, 1)`
      chart.datasets[0].backgroundColor.push(color)
      chart.datasets[0].borderColor.push(colorBorder)
    }
    setChartData(chart)
  }

  const analyzeData = async () => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    
    setWait(true)
    const url = serviceURL + '/analyze'
    let payload = {block_size: blockSize, scenario: scenario, dataURL: dataDir}
    if(isGetCSV)
      payload.outputCSVDir = outputCSVDir
    if(isGetExtract){
      payload.fileType = fileType
      payload.outputExtractDataDir = outputExtractDir
    }
    const res = await axios.post(url, payload, headers = headers) 
    setDataResult(res.data)
    setWait(false)
    getChartData(res.data)
    alertSuccess()
  }
  const changeCheckBox = () => setIsGetCSV(!isGetCSV)
  const getOutputCSVDir = (e) => setOutputCSVDir(e.target.value)
  const changeCheckBoxExtract = () => setIsGetExtract(!isGetExtract)
  const getOutputExtractDir = (e) => setOutputExtractDir(e.target.value)

  useEffect(() => {
    if(scenario !== '' && dataDir !== '' && serviceURL !== '')
      setIsCanPredict(true)
    else
      setIsCanPredict(false)

  }, [scenario, dataDir, serviceURL])
 
  return (
    <div className="App">
      <div className='logoContainer'>
        <img src={Logo} />
      </div>
      <Box m={3} sx={{ flexGrow: 1 }}>
      <Grid className='container1' container spacing={3}>
        <Grid className='fragmentInf' item xs={4}>
          <h3>Fill your file fragment information</h3>
          <BlockSize blockSize={blockSize} setBlockSize={setBlockSize} />
          <div className='scenario'>
            <Scenario scenario={scenario} setScenario={setScenario} />
          </div>
          <div className='textField'>
            <TextField onChange={getURLData} fullWidth  id="urlData" label="Data URL" variant="outlined" />
          </div>
          <div className='textField'>
            <TextField onChange={getURLService} fullWidth  id="urlService" label="Machine-learning service URL" variant="outlined" />
          </div>
          <FormGroup>
            <FormControlLabel onChange={changeCheckBox} control={<Checkbox checked={isGetCSV} />} label="Get file CSV" />
          </FormGroup>
          {isGetCSV &&
          <div className='textField'>
            <TextField onChange={getOutputCSVDir} fullWidth  id="outputDir" label="CSV file location" variant="outlined" />
          </div>}
          <FormGroup>
            <FormControlLabel onChange={changeCheckBoxExtract} control={<Checkbox checked={isGetExtract} />} label="Extract file type" />
          </FormGroup>
          {isGetExtract &&
          <div className='textField'>
            <TextField onChange={getOutputExtractDir} fullWidth  id="outputExtractDir" label="Output extracted file location" variant="outlined" />
          </div>}
          {isGetExtract &&
          <div className='textField'>
            <FileTypeSelectExtract labels={Labels[scenario]||[]} setFileType={setFileType} />
          </div>}
          <div className='button'>
            <Button onClick={analyzeData} variant="contained" disabled={!isCanPredict}>Analyze your data</Button>
            {wait && <div className='circularprogress'><CircularProgress /></div>}
          </div>
          {success && <Alert className='alertSuccess' severity="success">Complete data analysis!!</Alert>}
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
      {dataResult.length !== 0 &&
        <Grid className='result' container spacing={5}>
          <Grid item xs={5}>
            <h2>Table result</h2>
            <TableResult rows={dataResult} />
          </Grid>
          <Grid className='chartContainer' item xs={7}>
            <h2>The doughnut chartshows the ratio of file types in the data </h2>
            <Doughnut className='chart' data={chartData} />
          </Grid>
        </Grid>
      }
    </Box>
    </div>
  );
}

export default App;
