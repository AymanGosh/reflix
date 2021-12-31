import React, { Component } from 'react';
import '../styles/budget.css'

class Budget extends Component {
    render() {
        let budget = this.props.budget
        return (
            <div id="budget">
                Budget : ${budget}.00
            </div>
        );
    }
}

export default Budget;