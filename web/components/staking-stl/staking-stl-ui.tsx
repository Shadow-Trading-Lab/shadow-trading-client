import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './staking-stl.css'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface StakingTabs {
  setAction: (action: string) => void
  setShowModal: (show: boolean) => void
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const rules = [{value:10, followerReward: 85, traderReward: 4}, {value:100, followerReward: 87, traderReward: 8}, {value:500, followerReward: 90, traderReward: 11}]

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3, px: 2, fontSize:'3rem' }}>
          <Typography>
            <p>{value===0?'Stake':'Unstake'} amount</p>
            <input type="number" className='input border-2 border-white my-2'/>
            <br/>
            <br/>
            <h2 className='text-xl text-yellow-300 font-bold'>Profit sharing ( trader / follower )</h2>
            {rules.map((rule, index) => (
                <div className='text-lg flex justify-between' key={index}>
                    <p>VIP{index+1}</p>
                    <p>{rule.traderReward}% / {rule.followerReward}%</p>
                </div>
            ))}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function StakingTabs({setAction, setShowModal}: StakingTabs) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setAction(newValue===0?'staking':'unstaking')
  };

  return (
    <Box sx={{ width: '28rem', mx:'auto' }} className='text-white shadow-lg border-white border-2 rounded-lg p-2'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Stake STL" {...a11yProps(0)} className='text-white text-xl' />
          <Tab label="Unstake STL" {...a11yProps(1)} className='text-white text-xl' />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} />
      <CustomTabPanel value={value} index={1} />
      <button className='btn btn-primary bg-yellow-200 text-xl w-full' onClick={()=>{
        setShowModal(true)
      }}>Stake</button>
    </Box>
  );
}


export function AlertSuccess({msg, setShowModal}: {msg: string, setShowModal: (show: boolean) => void}) {
    return (
        <div className="fixed mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8 z-50 bottom-12 right-12">
            <div className="flex justify-between py-3">
                <div className="flex">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="self-center ml-3">
                        <span className="text-green-600 font-semibold">
                            Success
                        </span>
                        <p className="text-green-600 mt-1">
                            {msg}
                        </p>
                    </div>
                </div>
                <button className="self-start text-green-500" onClick={()=>setShowModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
  }
  