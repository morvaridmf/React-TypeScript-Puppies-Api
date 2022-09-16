import React, { useState } from 'react'
import {useParams} from "react-router-dom";
import {IPuppies} from "../types/types";


interface IarrPuppies {
    puppiesArr: IPuppies[],
    setPuppiesArr:React.Dispatch<React.SetStateAction<IPuppies[]>>;
}
interface RouteParams{
    id:string
}
function EditPuppies({puppiesArr, setPuppiesArr}:IarrPuppies) {
  const  {id}  = useParams<RouteParams>();
  const puppy: IPuppies | undefined = puppiesArr.find(p=>p.id === id);
  const initialState:IPuppies = {
    id: puppy!.id,
    name:puppy!.name,
    breed:puppy!.breed,
    birthdate:puppy!.birthdate
    }
    const [editPuppy, setEditPuppy] = useState<IPuppies>(initialState);

    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPuppy({
      ...editPuppy,
      [e.target.name]: e.currentTarget.value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    // console.log(addPuppy);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPuppy)
      }

    fetch(`http://localhost:5000/api/puppies/${id}`, requestOptions)
    .then(res => res.json())
    .then(data => console.log("edit",data))
    setPuppiesArr(prev => {
      const filtered = prev.filter(p => p.id !== id);
      return [...filtered, editPuppy as IPuppies]
    })
  
  }
  return (
    <div className='editpuppies'>
         <h1>Edit your puppy here!</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Puppy name'  name='name' value={editPuppy!.name} onChange={handleChange}/>
        <input type='text' placeholder='Puppy breed' name='breed' value={editPuppy!.breed} onChange={handleChange} />
        <input type='text' placeholder='Puppy birth date' name='birthdate' value={editPuppy!.birthdate} onChange={handleChange}/>
        <input type='submit' className='submit'/>
      </form>
    </div>
  )
}

export default EditPuppies