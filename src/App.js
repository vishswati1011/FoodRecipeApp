import React,{useState}from 'react';
import Axios from 'axios';
import './App.css';
import Recipe from "./components/Recipe"
import {v4 as uuidv4} from 'uuid';
import Alert from "./components/Alert"

const App= () =>{
    const [query, setQuery]=useState("");
    const [recipes,setRecipes] = useState([]);
    const [alert,setAlert]= useState([]);
    const API_KEY="c40fb98abd183446464476b0372a6956";
    const API_ID="5e74f4d7";
    
    const url=`https://api.edamam.com/search?q=${query}&
    &app_id=${API_ID}&app_key=${API_KEY}`;
     const getData= async()=>{
       if(query!==""){
        const result =await Axios.get(url);
        if(!result.data.more)
        {
          return setAlert("No food item found");
        }
        console.log(result);
        setRecipes(result.data.hits); 
        setQuery("");
        setAlert("");
       }else{
         setAlert("Please Fill the form");
       }
     };
     const onChange = e => setQuery(e.target.value);
    
     const onSubmit = e =>{
      e.preventDefault();
      getData();
     };
  return (
    <div className="App">
      <h1>Enter Recipe Name</h1>
      <form className="search-form" onSubmit={onSubmit} >
      {alert !==" "&& <Alert alert={alert}/>}
        <input type="text" name="qurey" autoComplete="off" onChange={onChange} value={query}/>
        <input type="submit"  value="Search" />
      </form>
      <div className="recipes">
        {recipes!==[]&& recipes.map(recipe =>
         <Recipe key={uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
}
export default App;
