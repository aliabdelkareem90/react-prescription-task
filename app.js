import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Modal from './components/Modal';
import Main from './components/Main'
import Context from './components/Context';
import firebase from 'firebase'
import axios from 'axios'

/**
 *  In this code we will Context Provider and Consumer to send data of states between Components
 */


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDsnlolBoqno-MOGZBGYIHBJEdU5AsIfPI",
    authDomain: "prescriptionapp-fa6cb.firebaseapp.com",
    databaseURL: "https://prescriptionapp-fa6cb.firebaseio.com",
    projectId: "prescriptionapp-fa6cb",
    storageBucket: "",
    messagingSenderId: "363811399960"
};

firebase.initializeApp(config);

class App extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            rachetat: [],
            drugsArray: [],
            patientName: '',
            patientAge: '',
            selectedDrug: '',
        };
        // save drugs from firebase into array to put it into autocomplete's items
        firebase.firestore().collection('drugs').onSnapshot((snapshot)=>{
            let drugsArray = []
      
            snapshot.forEach((doc)=>{
            drugsArray.push(doc.data().drugName)
            this.setState({
                drugsArray: drugsArray
              })
            })
        })
        // show data in the main component and update it on every change
        firebase.firestore().collection('rachetat').orderBy('date', 'desc').onSnapshot((snapshot)=>{
            let rachetatList = []
      
            snapshot.forEach((doc)=>{
                rachetatList.push(doc.data())
                console.log(doc.data())
                this.setState({
                    rachetat: rachetatList
                })
            })
        })
    }

    // The below code excuted a once to store drugs into firebase
    componentDidMount() {
        // axios.get('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=100')
        //     .then(res => {
        //         for (let i = 0; i < res.data.results.length; i++) {
        //             // console.log(res.data.results[i].term)  
        //             firebase.firestore().collection('drugs').add({
        //                 drugName: res.data.results[i].term
        //             }) 
        //         }
        //         console.log(firebase.firestore().collection('drugs'))   
        //     }
        // )
    }

    render() {
        return(
            <Context.Provider value={{
                state: this.state,
                actions: {
                    openModal: () => {
                        this.setState({
                            modalIsOpen:true
                        })
                    },
                    closeModal: () => {
                        this.setState({
                            modalIsOpen:false
                        })
                    },
                    // store patient name from TextInput
                    onChangeName: (value) =>{
                        this.setState({
                            patientName: value
                        })
                    },
                    // store patient age from TextInput
                    onChangeAge: (value) =>{
                        this.setState({
                            patientAge: value
                        })
                    },
                    // save all data to firebase and set all states to show data in the Main component
                    saveDetails: () => {
                        let items = this.state.rachetat
                        items.push({
                            patientName: this.state.patientName,
                            patientAge: this.state.patientAge,
                            selectedDrug: this.state.selectedDrug
                        })
                        this.setState({
                            modalIsOpen:false,
                            rachetat: items
                        })
                        firebase.firestore().collection('rachetat').add({
                            patientName: this.state.patientName,
                            patientAge: this.state.patientAge,
                            selectedDrug: this.state.selectedDrug,
                            date: Date.now()
                        })
                    }
                }
            }}>
                <Header />
                <Modal />
                <Main />
            </Context.Provider>    
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))