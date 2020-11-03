// import React, {Component,Fragment, version} from 'react';
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal'

// export default class FarmerOrders extends Component{
//     constructor(props){
//         super(props);

//         this.state={
//            farmer_doc:[] 
//         }
//     }
//     componentDidMount(){
//         axios.get('http://localhost:5000/orders/farmer')
//         .then(res=>{
//             console.log(res)
//             this.setState({
//                 farmer_doc:res.data
//             })
//             console.log(this.state.farmer_doc)
//         })
//         .catch(err=>console.log(err))
    
//     }
   

//     render(){
//         return(
//             <div>farmer order !!!!</div>
//         )
//     }
// }