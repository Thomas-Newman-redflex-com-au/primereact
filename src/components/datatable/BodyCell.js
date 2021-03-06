import React, { Component } from 'react';
import classNames from 'classnames';
import ObjectUtils from '../utils/ObjectUtils';

export class BodyCell extends Component {

    constructor(props) {
        super(props);
        this.onExpanderClick = this.onExpanderClick.bind(this);
    }
    
    onExpanderClick(event) {
        if(this.props.onRowToggle) {
            this.props.onRowToggle({
                originalEvent: event,
                data: this.props.rowData
            });
        }
        event.preventDefault();
    } 

    render() {
        let content, header;

        if(this.props.expander) {
            let iconClassName = classNames('ui-row-toggler fa fa-fw ui-clickable', {'fa-chevron-circle-down': this.props.expanded, 'fa-chevron-circle-right': !this.props.expanded});
            content = <a href="#" onClick={this.onExpanderClick}>
                        <span className={iconClassName}></span>
                      </a>;
        }
        else {
            if(this.props.bodyTemplate)
                content = this.props.bodyTemplate(this.props.rowData, this.props);
            else
                content = ObjectUtils.resolveFieldData(this.props.rowData, this.props.field);
        }

        if(this.props.responsive) {
            header = <span className="ui-column-title">{this.props.header}</span>;
        }
       
        return (
            <td className={this.props.className} style={this.props.style}>
                {header}
               <span className="ui-cell-data">{content}</span>
            </td>
        );
    }
}