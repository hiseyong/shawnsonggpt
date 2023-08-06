import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Message } from './Message';
function App() {
  const client = axios.create()
  const [text, setText] = useState('')
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([])
  const [btnTxt, setBtnTxt] = useState('Send')
  const [end, setEnd] = useState(true)

  const sendText = () =>{
    if (end && text !== '') {
      setEnd(false)
      setSentMessages([...sentMessages, text])
      setText('')
      setBtnTxt(<Spinner animation="border" role="status"/>)
      client.post('http://localhost:8000/', {msg:text})
      .then(res=>{
        setReceivedMessages([...receivedMessages, res.data])
        setText('')
        setBtnTxt('Send')
        setEnd(true)
      })
    }
  }


  const onPressKey = (e) => {
    if(e.code === 'Enter' && e.shiftKey === false) {
      sendText()
    }
  }

  const onChange = (e) => {
    if (e.code !== 'Enter') {
      setText(e.target.value)
    }
  }

  return (
    <div className="App">
      <Message sent={sentMessages} received={receivedMessages}/>
      <Form.Control placeholder='Enter anything' as="textarea" rows={1} id='input' value={text} onKeyDown={onPressKey} onChange={onChange}/>
      <Button variant="secondary" id='button'>{btnTxt}</Button>
    </div>
  );
}

export default App;
