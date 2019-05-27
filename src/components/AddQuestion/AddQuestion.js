import React,{Component} from 'react';
import {Form,Button,Checkbox,Header, Input} from 'semantic-ui-react'
import axios from 'axios';


class AddQuestion extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      question:"",
      questiontype:"created",
      Answers: [{answer:""}],
      Surveyid:"2c022520-7f9a-11e9-9974-b543e76e34c1"
    };
     this.handleSubmit = this.handleSubmit.bind(this);
  }
   
  

  showUi(){
    return this.state.Answers.map((el,i) => (
      <div key={i}>
      <label>{`${i + 1}-Answer`}</label>  
       <Input 
       placeholder="answer" 
       name="answer" 
       value={el.answer ||''}
       onChange={this.createHandleChange.bind(this, i)} 
       />

       <input 
       type='button' 
       value='Remove Answer' 
       onClick={this.removeClick.bind(this, i)}
       />

      </div>          
    ))
 }

 removeClick(i){
  let Answers = [...this.state.Answers];
  Answers.splice(i, 1);
  this.setState({ Answers });
}

questionhandleChange = (e) => {
  this.setState({
    [e.target.name]:e.target.value
  })
} 

createHandleChange(i, e) {
  const { name, value } = e.target;
  let Answers = [...this.state.Answers];
  Answers[i] = {...Answers[i], [name]: value};
  this.setState({ Answers });
}

addClick(){
  this.setState(prevState => ({ 
    Answers: [...prevState.Answers, { answer: ""}]
  }))
}

handleSubmit(event) {
  console.log(JSON.stringify(this.state));
  event.preventDefault();
        let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiZmM1NzNiZDAtN2Y5OS0xMWU5LTk5NzQtYjU0M2U3NmUzNGMxIiwiaWF0IjoxNTU4OTQwMjU0LCJleHAiOjE1NTkwMjY2NTR9.82VHzN6ND2ZMN4mYdTHuHB6nSbD-Sy2MpkugKUqBvEk' 
    }
  };  
  axios.post('http://localhost:8080/Admin/createquestion',JSON.stringify(this.state),axiosConfig)
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
      New Question
    </Header> 


    <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>Question</label>
      <input 
      placeholder='new question'
        name='question'
        defaultValue={this.state.question}
       onChange={this.questionhandleChange}
      />
    </Form.Field>   
 
        <Form.Field>
         <div>
        {this.showUi()}        
       <input type='button' value='Add Answer' onClick={this.addClick.bind(this)}/>
        </div> 
        </Form.Field>  
      
        <br/>
    <Button fluid color='red'>Create New Question</Button>

  </Form>
            </div>
          );
          
      }


}



export default AddQuestion