import Card from "../../../Card/Card"
import {fetchAboutData} from "../../../../api/userapi"
const Followed = () => {
  let arr = fetchAboutData().followers;
  let arr1 = arr.map((props) => (
    <Card userName={props.userName} key={props._id}  photoUrl = {props.photoURL} />
  ));

  return (
  <div className="Follower"> {arr1}
  
  </div>)
  
};
export default Followed;