import React, { Component } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import Context from './Context';
import { Autocomplete, TextInput, Button } from "evergreen-ui"

class Modal extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <Context.Consumer>
        {
          (ctx) => {
            return (
              <ReactModal
                className="modal"
                isOpen={ctx.state.modalIsOpen}
                contentLabel="Example Modal"
                ariaHideApp={false}
              >
                <h1>Rachetah Details</h1>
                <TextInput className="TextInput" placeholder="Patint's name" onChange={(event) => { ctx.actions.onChangeName(event.target.value) }} />

                <TextInput className="TextInput" value={ctx.state.patientAge}
                  placeholder="Patint's age" onChange={(event) => { ctx.actions.onChangeAge(event.target.value) }} />

                <Autocomplete
                  className="autocomplete"
                  title="Drug list"
                  onChange={(changedItem) => ctx.state.selectedDrug = changedItem}
                  items={ctx.state.drugsArray}
                >
                  {(props) => {
                    const { getInputProps, getRef, inputValue } = props
                    return (
                      <TextInput
                        placeholder="Choose a drug"
                        value={inputValue}
                        innerRef={getRef}
                        {...getInputProps()}
                        className="drug-select"
                      />
                    )
                  }}
                </Autocomplete>
                <div className="buttons-div">
                  <button onClick={ctx.actions.closeModal} className="button cancel">Cancel</button>
                  <button onClick={ctx.actions.saveDetails} className="button save">Save</button>
                </div>

              </ReactModal>
            )
          }
        }
      </Context.Consumer>
    )
  }
}

export default Modal