import React,{Component} from 'react';
import {Container,Tab,Menu,Button} from 'semantic-ui-react'
import AddSurvey from '../AddSurvey/AddSurvey';
import AddCollector from '../AddCollector/AddCollector';
import AddQuestion from '../AddQuestion/AddQuestion';
import Statistic from '../Statistic/Statistic';

class DashBoard extends Component {
   
  
      render(){
        const panes = [
          { menuItem: 'Add Data Collector', render: () => <Tab.Pane><AddCollector/></Tab.Pane> },
          { menuItem: 'Add Survey', render: () => <Tab.Pane><AddSurvey/></Tab.Pane> },
          { menuItem: 'Add Question To Survey', render: () => <Tab.Pane><AddQuestion/></Tab.Pane> },
          { menuItem: 'Survey Statistic', render: () => <Tab.Pane><Statistic/></Tab.Pane> },

        ]
          return(
            <div>              
    <Container style={{paddingTop:20}} >
            <Menu>
    <Container>
      <Menu.Item as="h2" header>
             i-Brochures Admin
      </Menu.Item>
{/* 
      <Menu.Menu position="right">
        <Menu.Item name="logout">
        <Button  onClick={this.signOut}
         size='tiny' color='red'
        >Exit</Button>
        </Menu.Item>
      </Menu.Menu> */}
    </Container>
  </Menu>     
  </Container>

  <Container style={{paddingTop:0.8 + 'em'}}>
     <Tab menu={{ fluid: true, vertical: true }} menuPosition='left' panes={panes} />
  </Container>
          </div>
          );
          
      }


      signOut = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

}



export default DashBoard