import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Sidebar from './sidebar.component'
import * as FaIcons from "react-icons/fa";
import './footer.css'

import {
  getFromStorage,
  setInStorage,
} from '../utils/storage';

export default class Footer extends Component{

  constructor(props){
    super(props);


    this.state={
        userType : ""
    }
}

render(){
    return(
        <footer style={{marginTop:'100px',height:'180px',fontFamily:'Open Sans'}}>
        {/* <div className='col-md-3'></div> */}
        <div className="foot"> 
        <div className="col"> 
         <div> 
             <div className="column-h"> About Us</div> 
             <div className="column-e"> About</div> 
             <div className="column-e"> Careers</div> 
              <div className="column-e"> Affiliations</div> 
              
         </div> 
         <div> 
             <div className="column-h">My Account</div> 
             <div className="column-e"> My Account</div> 
             <div className="column-e">Orders</div> 
             <div className="column-e"> Fresh shipping</div> 
         </div> 
         <div> 
             <div className="column-h">FAQ & Help</div> 
             <div className="column-e"> FAQ</div> 
             <div className="column-e"> Help</div> 
             <div className="column-e"> Contact us</div> 
         </div> 
         <div> 
             <div className="column-h">Ways to Shop</div> 
             <div className="column-e"> Online</div> 
             <div className="column-e"> Warehouse</div> 
             <div className="column-e"> Retail</div> 
         </div> 
         </div>
          
           
   
   <div style={{display:'flex',justifyContent:"space-around"}} className='social'> 
    


     
     <a href="https://www.instagram.com/" ><i  style={{color:"black"}} className="fa fa-instagram" id="footicon"></i> </a>
     <a href="https://www.whatsapp.com/" ><i style={{color:"black"}} className="fa fa-whatsapp" id="footicon"></i> </a>
     <a href="https://www.linkedin.com/" ><i style={{color:"black"}} className="fa fa-linkedin" id="footicon"></i> </a>
     <a href="https://www.gmail.com/" ><i style={{color: "black"}} className="fa fa-envelope" id="footicon"></i> </a>
    
    </div>
    
    
    
    <div><br></br> </div>
       <div style={{display:'flex',justifyContent:"center"}}>
       <div className="add">No. U-15, J.V.P.D. Scheme,<br></br> Bhaktivedanta Swami Rd, Opp.Cooper Hospital,<br></br> Vile Parle, Mumbai, Maharashtra 400056</div>
       </div> 
       <div><br></br> </div>
       <div style={{display:'flex',justifyContent:"center"}}>          
       <a style={{textDecoration:'none'}} className="term" href="">Terms of use</a> |  <a style={{textDecoration:'none'}} className="term" href="">Privacy Policy</a> 
       </div>
       
       <div style={{display:'flex',justifyContent:"center"}} className="copyright"> 
       Copyright © 2020 Farmer's Mart Inc. All rights reserved  
    </div>
     </div>
    
  

 
    

 

        </footer>
    )
}

}