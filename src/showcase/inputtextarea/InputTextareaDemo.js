import React, {Component} from 'react';
import {Link} from 'react-router';
import {InputTextarea} from '../../components/inputtextarea/InputTextarea';
import {TabView,TabPanel} from '../../components/tabview/TabView';
import {CodeHighlight} from '../../components/codehighlight/CodeHighlight';

export class InputTextareaDemo extends Component {
        
    constructor() {
        super();
        this.state = {value: 'Welcome to Prime!'};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h1>InputTextarea</h1>
                        <p>Inputtextarea add styling and autoResize functionality to standard textarea element.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h3>Default</h3>
                    <InputTextarea value={this.state.value} onChange={this.handleChange} rows={5} cols={30}></InputTextarea>
                    <div>{this.state.value}</div>

                    <h3>AutoResize</h3>
                    <InputTextarea rows={5} cols={30} autoResize={true}></InputTextarea>
                </div>

                <InputTextareaDoc />
            </div>
        )
    }
}

class InputTextareaDoc extends Component {

    render() {
        return (
            <div className="content-section source">
                <TabView>
                    <TabPanel header="Documentation">
                        <h3>Import</h3>
<CodeHighlight className="language-javascript">
{`
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';

`}
</CodeHighlight>

                        <h3>Getting Started</h3>
                        <p>Textarea is defined using the InputTextarea element with standard attributes of a textarea element.</p>
                        
<CodeHighlight className="language-markup">
{`
<InputTextarea rows={5} cols={30} />

`}
</CodeHighlight>

                        <h3>Controlled Input</h3>
                        <p>Textarea is used as a controlled input with value and onChange properties.</p>
<CodeHighlight className="language-markup">
{`
<InputTextarea rows={5} cols={30} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />

`}
</CodeHighlight>

                        <h3>AutoResize</h3>
                        <p>In auto resize mode, textarea grows instead of displaying a scrollbar.</p>
<CodeHighlight className="language-markup">
{`
<InputTextarea rows={5} cols={30} autoResize={true} />

`}
</CodeHighlight>

                        <h3>Attributes</h3>
                        <p>InputTextarea passes any attribute to the underlying textarea element, additional attributes are as follows;</p>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>autoResize</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>When present, height of textarea changes as being typed.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Styling</h3>
                        <p>Following is the list of structural style classes, for theming classes visit <Link to="/theming">theming</Link> page.</p>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Element</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ui-inputtextarea</td>
                                        <td>Textarea element</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Dependencies</h3>
                        <p>None.</p>
                    </TabPanel>

                    <TabPanel header="Source">
                        <a href="https://github.com/primefaces/primereact/tree/master/src/showcase/inputtextarea" className="btn-viewsource" target="_blank">
                            <i className="fa fa-github"></i>
                            <span>View on GitHub</span>
                        </a>
<CodeHighlight className="language-javascript">
{`
export class InputTextareaDemo extends Component {
        
    constructor() {
        super();
        this.state = {value: 'Welcome to Prime!'};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h1>InputTextarea</h1>
                        <p>Inputtextarea add styling and autoResize functionality to standard textarea element.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h3>Default</h3>
                    <InputTextarea value={this.state.value} onChange={this.handleChange} rows={5} cols={30}></InputTextarea>
                    <div>{this.state.value}</div>

                    <h3>AutoResize</h3>
                    <InputTextarea rows={5} cols={30} autoResize={true}></InputTextarea>
                </div>

                <InputTextareaDoc />
            </div>
        )
    }
}

`}
</CodeHighlight>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}
