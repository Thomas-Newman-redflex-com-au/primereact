import React, { Component } from 'react';
import classNames from 'classnames';
import {BodyRow} from './BodyRow';
import DomHandler from '../utils/DomHandler';
import ObjectUtils from '../utils/ObjectUtils';

export class TableBody extends Component {

    constructor(props) {
        super(props);
        this.onRowClick = this.onRowClick.bind(this);
        this.onRowTouchEnd = this.onRowTouchEnd.bind(this);
        this.onRowToggle = this.onRowToggle.bind(this);
    }

    onRowClick(event) {
        let targetNode = event.originalEvent.target.nodeName;
        if(targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode ==='A' || (DomHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }

        if(this.props.onRowClick) {
            this.onRowClick.next(event);
        }

        if(this.props.selectionMode) {
            let rowData = event.data;
            let rowIndex = event.index;

            if(this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex !== null) {
                DomHandler.clearSelection();
                //shift key
            }
            else {
                let selected = this.isSelected(rowData);
                let metaSelection = this.rowTouched ? false : this.props.metaKeySelection;
                this.anchorRowIndex = rowIndex;
                this.rangeRowIndex = rowIndex;
                let selection;

                if(metaSelection) {
                    let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;

                    if(selected && metaKey) {
                        if(this.isSingleSelectionMode()) {
                            selection = null;
                        }
                        else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            selection = this.props.selection.filter((val,i) => i !== selectionIndex);
                        }
                        
                        if(this.props.onRowUnselect) {
                            this.onRowUnselect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                        }
                    }
                    else {
                        if(this.isSingleSelectionMode()) {
                            selection = rowData;
                        }
                        else if(this.isMultipleSelectionMode()) {
                            if(metaKey)
                                selection = this.props.selection ? [...this.props.selection] : [];
                            else
                                selection = [];

                            selection = [...selection, rowData];
                        }

                        if(this.props.onRowSelect) {
                            this.props.onRowSelect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                        }
                    }
                }
                else {
                    if(this.isSingleSelectionMode()) {
                        if(selected) {
                            selection = null;
                            if(this.props.onRowUnselect) {
                                this.onRowUnselect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                            }
                        }
                        else {
                            selection = rowData;
                            if(this.props.onRowSelect) {
                                this.props.onRowSelect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                            }
                        }
                    }
                    else {
                        if(selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            selection = this.props.selection.filter((val,i) => i !== selectionIndex);
                            if(this.props.onRowSelect) {
                                this.props.onRowSelect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                            }

                        }
                        else {
                            selection = [...this.props.selection||[], rowData];
                            if(this.props.onRowSelect) {
                                this.props.onRowSelect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                            }
                        }
                    }
                }

                this.props.onSelectionChange({originalEvent: event.originalEvent, data: selection});
            }
        }
        
        this.rowTouched = false;
    }

    onRowTouchEnd(event) {
        this.rowTouched = true;
    }

    isSingleSelectionMode() {
        return this.props.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.props.selectionMode === 'multiple';
    }

    isSelected(rowData) {
        if(rowData && this.props.selection) {
            if(this.props.selection instanceof Array)
                return this.findIndexInSelection(rowData) > -1;
            else
                return this.equals(rowData, this.props.selection);
        }
        
        return false;
    }

    equals(data1, data2) {
        return this.props.compareSelectionBy === 'equals' ? (data1 === data2) : ObjectUtils.equals(data1, data2, this.props.dataKey);
    }

    findIndexInSelection(rowData) {
        let index = -1;
        if(this.props.selection) {
            for(let i = 0; i  < this.props.selection.length; i++) {
                if(this.equals(rowData, this.props.selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    onRowToggle(event) {
        let expandedRowIndex = this.findExpandedRowIndex(event.data);
        let expandedRows = this.props.expandedRows ? [...this.props.expandedRows] : [];

        if(expandedRowIndex !== -1) {
            expandedRows = expandedRows.filter((val,i) => i !== expandedRowIndex);

            if(this.props.onRowCollapse) {
                this.props.onRowCollapse(event.data);
            }
        }
        else {
            expandedRows.push(event.data);
           

            if(this.props.onRowExpand) {
                this.props.onRowExpand(event.data);
            }
        }

        this.props.onRowToggle({
            data: expandedRows
        });
    }

    findExpandedRowIndex(row) {
        let index = -1;
        if(this.props.expandedRows) {
            for(let i = 0; i < this.props.expandedRows.length; i++) {
                if(this.props.expandedRows[i] === row) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }

    isRowExpanded(row) {
        return this.findExpandedRowIndex(row) !== -1;
    }

    render() {
        let className = classNames('ui-datatable-data ui-widget-content', {'ui-datatable-hoverable-rows': this.props.selectionMode});
        let rows;

        if(this.props.value && this.props.value.length) {
            rows = [];
            let startIndex = this.props.lazy ? 0 : this.props.first;
            let endIndex = startIndex + this.props.rows||this.props.value.length;

            for(let i = startIndex; i < endIndex; i++) {
                if(i >= this.props.value.length) {
                    break;
                }
                
                let rowData = this.props.value[i];
                let expanded = this.isRowExpanded(rowData);
                let rowClassName = this.props.selectionMode ? classNames({'ui-state-highlight': this.isSelected(this.props.value[i])}) : null;
                let bodyRow = <BodyRow key={i} rowData={rowData} rowIndex={i} onClick={this.onRowClick} onTouchEnd={this.onRowTouchEnd} 
                            className={rowClassName} onRowToggle={this.onRowToggle} expanded={expanded} responsive={this.props.responsive}>{this.props.children}</BodyRow>

                rows.push(bodyRow);

                if(expanded) {
                    let expandedRowContent = this.props.rowExpansionTemplate(rowData);
                    let expandedRow = <tr className="ui-widget-content" key={i + '_expanded'}><td colSpan={this.props.children.length}>{expandedRowContent}</td></tr>
                    rows.push(expandedRow);
                }
            }
        }

        return (
            <tbody className={className}>
                {rows}
            </tbody>
        );
    }
}