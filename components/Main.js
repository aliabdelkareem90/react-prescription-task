import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'evergreen-ui'
import * as jsPDF from 'jspdf'
import Context from './Context';

let Racheta = styled.div`
    background-color: #fff;
    margin: 20px;
    padding: 20px;
    margin: auto;
    margin-bottom: 20px;
    width: 60%;
    font-size: 1.2rem;
    border-radius: 5px;
    color: #555;
    font-family: sans-serif;
    box-shadow: 2px 2px 25px rgba(0,0,0,0.16);
    display: flex;
`

let Details = styled.div`
    flex-grow: 1
`

let P = styled.p`
    margin:10px;
`

let Span = styled.span`
    color: #888
`

class Main extends Component {

  printPDF(name , age, drug) {
    /**
     * Uncaught TypeError: jsPDF is not a constructor
     */
    var doc = new jsPDF()
    doc.text(name, 10, 10)
    doc.text(age, 10, 30)
    doc.text(drug, 10, 50)
    doc.save(name+age+drug+'.pdf')
  }

  render() {
    return (
      <Context.Consumer>
        {
          (ctx) => {
            return (
              <main>
                {
                  ctx.state.rachetat.map((racheta, i) => {
                    return (
                      <Racheta key={i} >
                        <Details>
                          <P><Span>Patient's name:</Span> {racheta.patientName}</P>
                          <P><Span>Patient's age:</Span> {racheta.patientAge}</P>
                          <P><Span>Drug:</Span> {racheta.selectedDrug}</P>
                        </Details>
                        {/* Add Print button */}
                        <Button onCilck={this.printPDF.bind(this, racheta.patientName + racheta.patientAge + racheta.selectedDrug)}>Print</Button>
                      </Racheta>
                    )
                  })
                }
              </main>
            )
          }
        }
      </Context.Consumer>
    )
  }
}

export default Main