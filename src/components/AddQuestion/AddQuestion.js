import React,{Component} from 'react';
import {Form,Button,Message,Header, Input} from 'semantic-ui-react'
import axios from 'axios';


class AddQuestion extends Component {
   
  constructor(props) {
    super(props);
    this.state = { 
      question:"",
      questiontype:"created",
      Answers: [{answer:""}],
      Surveyid:"488790d0-82bb-11e9-807f-a78b186f9a72",
      errors: {},
      msgerror:''
    }
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
  if(this.state.question === '') errors.question = "Question Can't Be Empty";
  return errors; 
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
  event.preventDefault();
  event.preventDefault();
  const errors = this.validate();
  this.setState({errors});
  const isValid = Object.keys(errors).length === 0;
  if(isValid){
    const isonline = navigator.onLine;
    if(isonline){
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNzg2N2QxMTAtODJiMi0xMWU5LTliNjItN2I4ZWFjMmFjNTZmIiwiaWF0IjoxNTU5MjAzODc4fQ.NeH8rOKmxY_IcTgbDHaKLPjyASdUqCM4wzIRi0eEjfs' 
        }    
      };  
      console.log(JSON.stringify(this.state));
      axios.post('http://localhost:8080/Admin/createquestion',JSON.stringify(this.state),axiosConfig)
    .then(response=>{
        this.setState({
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
      New Question
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
    <span style={{color:"#ae5856"}}>
     {errors.question && errors.question}
    </span> 


        <Form.Field>
         <div>
        {this.showUi()}        
       <input type='button' 
        value='Add Answer' onClick={this.addClick.bind(this)}/>
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