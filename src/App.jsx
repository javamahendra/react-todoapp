import { useState } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  //const [fmsg, setFmsg] = useState();
  //const [fclr, setFclr] = useState();
  
  const [message, setMessage] = useState({
    id: '',
    text: '',
    fcolor: '#000000'
  });
  const [editingItem, setEditingItem] = useState(
    {id: "",
    isEditing: false,
  });
  const changeMessage  =(e) =>{
    setMessage({
      ...message,
      text: e.target.value
    });
    //setFmsg(e.target.value)
  };

  const changeFColor  =(e) =>{
    setMessage({
      ...message,
      fcolor: e.target.value
    });
    //setFclr(e.target.value);
  };

  const handleSubmit =(e) => {
    e.preventDefault();
    let newTodo = {
      text: message.text,
      fcolor: message.fcolor,
      id: new Date().getTime().toString()
    };
    console.log(JSON.stringify(newTodo));
    setTodos([...todos, newTodo]);
    setMessage({
      text: "",
      id: "",
      fcolor: ''
    });
  }

  const handleDelete = (id) => {
    let indexToRemove = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    if (indexToRemove !== -1) {
       newTodos.splice(indexToRemove, 1); // Remove 1 element at the found index
    }
    setTodos(newTodos);
  };

  const changeEditState = (id) => {
    setEditingItem({
      ...editingItem,
      id: id,
      isEditing: true,
    });
    let editableItem = todos.find((eachItem) => eachItem.id === id);
    setMessage({
      ...message,
      text: editableItem.text,
      fcolor: editableItem.fcolor,
      id: editableItem.id,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("previous todos", todos);
    let newTodos = todos.map((eachItem) => {
      if (eachItem.id === editingItem.id) {
        return {
          text: message.text,
          fcolor: message.fcolor,
          id: editingItem.id,
        };
      } else {
        return eachItem;
      }
    });
    setTodos(newTodos);
    setMessage({
      text: "",
      id: "",
      fcolor: "#000000"
    });
    setEditingItem({
      id: "",
      isEditing: false,
    });
  };


  return (
    <>
      <div className="card">
        <input type='text' name="message" id ="message" value={message.text} onChange={ changeMessage }
        placeholder='enter text here...'/>
        <input type='color' name="fcolor" id ="fcolor" value={message.fcolor || '#000000'} onChange={ changeFColor }/>
        {editingItem.isEditing ? (
          <button onClick={handleEdit} type="submit">
            edit todo
          </button>
        ) : (
          <button onClick={handleSubmit} type="submit">
            add todo
          </button>
        )}
      
        
      </div>
      <hr/>
      {todos.length === 0 && <h4>There is no items in the list</h4>}
      <ul>
        {todos.map((eachItem) => {
          const { text, id , fcolor} = eachItem;
          return (
            <li key={id}>
              <span style={{color:fcolor}}>{text}</span>
              <button onClick={() => changeEditState(id)}>edit</button>
              <button onClick={() => handleDelete(id)}>delete</button>
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default App;
