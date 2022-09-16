import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {IPuppies} from "../types/types";
import {Link} from "react-router-dom"


interface RouteParams{
    id:string
}
interface IarrPuppies {
  puppiesArr: IPuppies []
}

function Puppies({puppiesArr}:IarrPuppies) {
    const [image, setImage] = useState("")

  const  {id}  = useParams<RouteParams>();
  const puppy: IPuppies | undefined = puppiesArr.find(p=>p.id === id);

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos/?client_id=7GVbwjCVwcBApOWfILqwgkXLkHGBFjZ2QeagBZKy03A&query=${puppy?.breed}`)
        .then(res => res.json())
        .then(data=> {
            const newImage = data.results[0].urls.small;
            setImage(newImage)
            
         }
          )

     
    }, [])
    
    
  return (
    <div className="puppies">
        <img src={image}/>
        <h2>{puppy!.name}</h2>
         <h3>{puppy!.breed}</h3>
        <p>{puppy!.birthdate}</p>
        <Link to={`/editpuppies/${puppy!.id}`}>
           <button type="submit">Edit Puppy</button>
        </Link>

    </div>
  )
}

export default Puppies