import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import DashBoard from './components/DashBoard/DashBoard';
import Login from './components/Login/Login';



class  Routes extends Component {



    render(){
        let routes = (
            <Switch>
             <Route path="/" exact  component={Login} /> 
             <Redirect to="/"/>  
            </Switch>
        );
        
        const token = localStorage.getItem('accesstoken');
        
        if(token){
            console.log('ok done')
            routes = (
           <Switch>
                  <Route path="/DashBoard" exact  component={DashBoard} />
                  <Redirect to="/DashBoard"/>
           </Switch>
            );
        }


        return (
            <div>
             {routes}
            </div>
        );
    }
  
};


export default Routes;   