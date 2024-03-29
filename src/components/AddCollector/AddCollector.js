import React,{Component} from 'react';
import {Form,Button,Message,Header} from 'semantic-ui-react'
import axios from 'axios';


class AddCollector extends Component {
  
    state = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        errors:{},
        msgerror:''
    }   
    
  
    handleChange = (e) => {
      if(!!this.state.errors[e.target.name]){
        let errors = Object.assign({},this.state.errors);
        delete errors[e.target.name]
        this.setState({
          [e.target.name]:e.target.value,errors
        })
      }else{
        this.setState({
          [e.target.name]:e.target.value
        })
      }  
  } 

  validate = () =>{
    const errors = {};
    if(this.state.firstname === '') errors.firstname = "FirstName Can't Be Empty";
    if(this.state.lastname === '') errors.lastname = "LastName Can't Be Empty";
    if(this.state.email === '') errors.email = "Email Can't Be Empty";
    if(this.state.password === '') errors.password = "Password Can't Be Empty";
    return errors; 
  }   



  createCollectorHandler = (e) =>{
    e.preventDefault();
    const errors = this.validate();
    this.setState({errors});
    const isValid = Object.keys(errors).length === 0;
    if(isValid){
    const isonline = navigator.onLine;
    if(isonline){
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accesstoken')
        }
      };
    axios.post('http://localhost:8080/Admin/addcollector',this.state,axiosConfig)
    .then(response=>{
        this
        .setState({
          msgerror:response.data.message
        })
    }).catch(error=>{
        console.log(error)  
    }) 
 }else{
    alert('Dear User No Internet Connection Available');
   }
    } 
}  

      render(){
        const {errors} = this.state;  
    
          return(
            <div>   
      <Header as='h2' textAlign='center'>
      New Data Collector 
    </Header>
       <br/>
       <br/>
       <div>
         {this.state.msgerror?
         <Message positive>
         <Message.Header>
          {this.state.msgerror}
         </Message.Header>
         </Message>
         :null
         }
       </div>
       <br/>
       <br/>
         <Form>
    <Form.Field>
      <label>FirstName</label>
      <input placeholder='firstname'
        name='firstname'
        defaultValue={this.state.firstname}
       onChange={this.handleChange}
      />
    </Form.Field>
    <span style={{color:"#ae5856"}}>
     {errors.firstname && errors.firstname}
    </span> 

    <Form.Field>
      <label>LastName</label>
      <input placeholder='lastname'
        name='lastname'
        defaultValue={this.state.lastname}
       onChange={this.handleChange}
      />
    </Form.Field>
    <span style={{color:"#ae5856"}}>
    {errors.lastname && errors.lastname}
    </span> 


    <Form.Field>
      <label>Email</label>
      <input placeholder='email'
        name='email'
        defaultValue={this.state.email}
       onChange={this.handleChange}
      />
    </Form.Field>
    <span style={{color:"#ae5856"}}>
    {errors.email && errors.email}
    </span> 


    <Form.Field>
      <label>Password</label>
      <input placeholder='password'
        name='password'
        defaultValue={this.state.password}
       onChange={this.handleChange}
      />
    </Form.Field>
    <span style={{color:"#ae5856"}}>
    {errors.password && errors.password}
    </span> 

    <Button fluid color='purple'
    onClick={this.createCollectorHandler}
    >Create New Collector</Button>


  </Form>
      
            </div>
          );
          
      }


}



export default AddCollector