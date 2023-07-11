import Card from "../../../Card/Card"
import {fetchAboutData} from "../../../../api/userapi"
const Following = () => {
  let arr = fetchAboutData().following;
  let arr1 = arr.map((props) => (
    <Card userName={props.userName} key={props._id}  photoUrl = {props.photoURL} />
  ));

  return (
  <div className="homepage"> {arr1}
  
  </div>)
  
};
export default Following;