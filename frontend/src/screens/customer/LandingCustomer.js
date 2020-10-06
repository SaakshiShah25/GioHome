import React, {Component,Fragment} from 'react';

import { Link } from 'react-router-dom';


export default class LandingCustomer extends Component{
    constructor(props){
        super(props);
        // this.handleChange=this.handleChange.bind(this);

        this.state={
            products:[{id:134,image:"dgad",name:"sanket",description:"This is it"},{id:134,image:"dgad",name:"sanket",description:"This is it"},{id:134,image:"dgad",name:"sanket",description:"This is it"},{id:134,image:"dgad",name:"sanket",description:"This is it"},{id:134,image:"dgad",name:"sanket",description:"This is it"},{id:134,image:"dgad",name:"sanket",description:"This is it"},{id:134,image:"dgad",name:"sanket",description:"This is it"}],
            name:'',
        }
    }

        render()
        {
            return(
                <div className="row">

                <ul className="products">
                    {this.state.products.map((u)=>(
                    <li key={u._id}>
                    <div className="product">
                    <Link to={'' + u._id}>
                        <img
                        className="product-image"
                        src={u.image}
                        alt="product"
                        />
                    </Link>
                    <div className="product-name">
                        <Link to={'' + u._id}>{u.name}</Link>
                    </div>
                    <div className="product-description">{u.description}</div>
                    <div className="product-price">Price: {u.price}</div>
                    <div className="product-life">Life: {u.life}</div>
                    <button variant="btn btn-success" value={this.state.name} onClick={() =>this.handleChange(u)}>Add to Cart</button>
                    </div>
                    </li>
                    
                    ))}
                </ul> 
            </div>
            )
        }
   

}
