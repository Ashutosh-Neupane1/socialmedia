import About from "./About"
import {  remove } from "../../api/userapi";
const AboutPage  = ()=>{
    const handleClick = () => {
        remove();
      };
     
    return (<>
        <About handleClick={handleClick} _id ={_id}/>
        </>)

}
export default AboutPage