import React, {useState} from 'react';
import { IPuppies } from '../types/types';

interface IsetPuppies {
  puppiesArr: IPuppies[],
  setPuppiesArr:React.Dispatch<React.SetStateAction<IPuppies[]>>;
}
function AddPuppies( {setPuppiesArr, puppiesArr}:IsetPuppies) {
  const [addPuppy, setAddPuppy ] = useState<IPuppies>({} as IPuppies)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPuppy({
      ...addPuppy,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    console.log(addPuppy);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addPuppy)
      }

    fetch("http://localhost:5000/api/puppies", requestOptions)
    .then(res => res.json())
    .then(data => console.log("1",data))
    setPuppiesArr(puppiesArr.concat(addPuppy))
    setAddPuppy({...addPuppy,name:'', breed:'', birthdate:''})

  
  }
  return (
    <div className='addpuppies'>
      <h1>Add your puppy here!</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Puppy name'  name='name' value={addPuppy.name} onChange={handleChange}/>
        <input type='text' placeholder='Puppy breed' name='breed' value={addPuppy.breed} onChange={handleChange} />
        <input type='text' placeholder='Puppy birth date' name='birthdate' value={addPuppy.birthdate} onChange={handleChange}/>
        <input type='submit' className='submit'/>
      </form>
    </div>

  )
}

export default AddPuppies