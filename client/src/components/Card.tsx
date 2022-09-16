import { IPuppies } from "../types/types"
import { Link } from 'react-router-dom';
import Puppies from './Puppies';


interface IarrPuppies {
    puppiesArr: IPuppies[],
    setPuppiesArr:React.Dispatch<React.SetStateAction<IPuppies[]>>;
}


function Card({puppiesArr, setPuppiesArr }:IarrPuppies) {

    const handleDelete = (id:string) =>{
        const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }

    fetch(`http://localhost:5000/api/puppies/${id}`, requestOptions)
    .then(res => res.json())
    .then(data => console.log("1",data))
        setPuppiesArr(prev => {
            const filtered = prev.filter(p => p.id !== id);
            return filtered
        })
        }
    
    return (
        <div className="card">
            {puppiesArr.map(p => (
                <div className="card-container" key={p.id}>
                 <Link to={`/puppies/${p.id}`}>
                    <h2>{p.name}</h2>
                 </Link>
                    <button type="submit" onClick={()=> handleDelete(p.id)}>Delete Puppy</button>                 
                </div>
            ))
            }  
        </div>
        
    )
}

export default Card