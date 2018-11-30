import React, { Component } from 'react'
import styled from 'styled-components'
import Context from './Context';

let Nav = styled.div`
    background-color: #3f3f3f;
    height: 60px;
    display: flex;
    padding: 0px 8%;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 25px rgba(0,0,0, .4)
`

let Button = styled.button`
    background-color: tomato;
    padding: 10px;
    border-radius: 8px;
    border: none;
    color: white;
    font-weight: bold;
    min-width: 100px;
    border: none;
    outline: none;
`

let Span = styled.span`
    color: tomato
`

class Header extends Component {

    render() {
        return(
            <Context.Consumer>
                {
                    (ctx) => {
                        return(
                            <Nav>
                                <h1 className="logo-text"><Span>R</Span>achetah</h1>
                                <Button onClick={ctx.actions.openModal} className="new-prescription">New Prescription </Button> 
                            </Nav>
                        )
                    }
                }
                
            </Context.Consumer>
        )
    }
}

export default Header