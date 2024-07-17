import ReactSlider from "react-slider"
import "./Slider.css"
import { useSettings } from "../context/SettingsContext"
import BackButton from "./buttons/BackButton";

function Settings() {
    const { workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes, settingsOnClick } = useSettings();

  return (
    <div style={{textAlign:'left'}}>

        <label>Work: {workMinutes}:00</label>
        <ReactSlider 
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={workMinutes}
        onChange={newValue => setWorkMinutes(newValue)}
        min={1}
        max={120}
        />

        <label>break: {breakMinutes}:00</label>
        <ReactSlider 
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={breakMinutes}
        onChange={newValue => setBreakMinutes(newValue)}
        min={1}
        max={120}
        />

    <div style={{textAlign:'center', marginTop:'20px'}}>
    <BackButton  onClick={settingsOnClick}/>        
    </div>
    </div>
  )
}

export default Settings