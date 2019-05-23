import React,{Component} from 'react';
import {Form,Button,TextArea,Header,Checkbox} from 'semantic-ui-react'
import axios from 'axios';


class AddSurvey extends Component {
     
     state ={
        title:'',
        description:'',
        surveyType:''
           }

     checkboxhandleChange = (e, { value }) => this.setState({ value ,surveyType:value})

     handleChange = (e) => {
          this.setState({
            [e.target.name]:e.target.value
          })  
      }   

    createSurveyHandler = () =>{
      console.log(this.state)
        let axiosConfig = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiODI2ZjRjOTAtN2M3OS0xMWU5LWIxNjktMGQ1ODVhYTZlZTMzIiwiaWF0IjoxNTU4NTE5Njk2LCJleHAiOjE1NTg2MDYwOTZ9.-jwAUnpyW-Ors9uCM0NuZcazz6fCz22I6y0_Vc7GOi0' 
            }
          };

        axios.post('http://localhost:8080/Admin/createsurvey',this.state,axiosConfig)
        .then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)  
        })  
    }  
     
      render(){
          return(
            <div>   
      <Header as='h2' textAlign='center'>
      New Survey
    </Header>
         <Form>
    <Form.Field>
      <label>Survey Title</label>
      <input placeholder='survey title' 
         name='title'
         defaultValue={this.state.title}
        onChange={this.handleChange}
      />
    </Form.Field>

    <Form.Field>
      <label>Survey Description</label>
      <TextArea placeholder='survey description'
        name='description'
        defaultValue={this.state.description}
       onChange={this.handleChange}
      />
    </Form.Field>


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