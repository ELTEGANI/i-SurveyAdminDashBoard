import React,{Component} from 'react';
import {Form,Button,Checkbox,Header, Input} from 'semantic-ui-react'
import axios from 'axios';


class AddQuestion extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      question:"",
      questiontype:"",
    	Answers: [{answer:""}]
    };
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange = (e, { value }) => this.setState({ value,questiontype:value })

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
  alert('A name was submitted: ' + JSON.stringify(this.state));
  console.log(JSON.stringify(this.state));
  event.preventDefault();
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


    <label>Question Type</label>
    <Form.Field>
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Yes/No'
            name='checkboxRadioGroup'
            value='Yes/No'
            checked={this.state.value === 'Yes/No'}
            onChange={this.handleChange}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            radio
            label='True/False'
            name='checkboxRadioGroup'
            value='True/False'
            checked={this.state.value === 'True/False'}
            onChange={this.handleChange}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            radio
            label='Excellent/V.good/good/Bad options'
            name='checkboxRadioGroup'
            value='Excellent/V.good/good/Bad options'
            checked={this.state.value === 'Excellent/V.good/good/Bad options'}
            onChange={this.handleChange}
          />
        </Form.Field>



        <Form.Field>
          <Checkbox
            radio
            label='Add Answers'
            name='checkboxRadioGroup'
            value='AddedAnswers'
            checked={this.state.value === 'AddedAnswers'}
            onChange={this.handleChange}
          />
        </Form.Field>


        {
          this.state.questiontype && this.state.questiontype === 'AddedAnswers'?
        <Form.Field>
         <div>
        {this.showUi()}        
       <input type='button' value='Add Answer' onClick={this.addClick.bind(this)}/>
        </div> 
        </Form.Field>  
        :null
        }
        <br/>
    <Button fluid color='red'>Create New Question</Button>

  </Form>
            </div>
          );
          
      }


}



export default AddQuestion