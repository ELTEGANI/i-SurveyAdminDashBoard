import React,{Component} from 'react';
import {Form,Button,TextArea,Header,Checkbox,Message} from 'semantic-ui-react'
import axios from 'axios';


class AddSurvey extends Component {
     
     state ={
        title:'',
        description:'',
        surveyType:'',
        errors:{},
        msgerror:''
           }

     checkboxhandleChange = (e, { value }) => this.setState({ value ,surveyType:value})

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
        if(this.state.title === '') errors.title = "Title Can't Be Empty";
        if(this.state.description === '') errors.description = "Description Can't Be Empty";
        return errors; 
      }  


    createSurveyHandler = (e) =>{
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

        axios.post('http://localhost:8080/Admin/createsurvey',this.state,axiosConfig)
        .then(response=>{
             this.setState({msgerror:response.data.message})
             localStorage.setItem('Surveysid',response.data.Surveys.id);
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
      New Survey
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
      <label>Survey Title</label>
      <input placeholder='survey title' 
         name='title'
         defaultValue={this.state.title}
        onChange={this.handleChange}
      />
    </Form.Field>
    <span style={{color:"#ae5856"}}>
     {errors.title && errors.title}
    </span> 



    <Form.Field>
      <label>Survey Description</label>
      <TextArea placeholder='survey description'
        name='description' 
        defaultValue={this.state.description}
       onChange={this.handleChange}
      />
    </Form.Field>
    <span style={{color:"#ae5856"}}>
     {errors.description && errors.description}
    </span> 


    <Form.Field>
          <Checkbox
            radio
            label='People'
            name='checkboxRadioGroup'
            value='People'
            checked={this.state.value === 'People'}
            onChange={this.checkboxhandleChange}
          />
        </Form.Field>
        <span style={{color:"#ae5856"}}>
         {errors.checkboxRadioGroup && errors.checkboxRadioGroup}
        </span> 

    
        <Form.Field>
          <Checkbox
            radio
            label='Companies'  
            name='checkboxRadioGroup'
            value='Companies'
            checked={this.state.value === 'Companies'}
            onChange={this.checkboxhandleChange}
          />
        </Form.Field>

  
     
    <Button fluid color='pink' onClick={this.createSurveyHandler}>Create New Survey</Button>

  </Form>
            </div>
          );
          
      }


}



export default AddSurvey