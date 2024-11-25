import Parser from 'html-react-parser';
import hljs from 'highlight.js';

import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Container,
    Row, Col
} from 'react-bootstrap';


export default class App extends Component {
    constructor (props) {
        super(props);

        this.marked = new Marked(
            markedHighlight({
                emptyLangClass: 'hljs',
                langPrefix: 'hljs language-',
                highlight(code, lang, info) {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                }
            })
        );

        this.marked.setOptions({ breaks: true });

        this.state = {
            content: this.marked.parse(this.props.initContent)
        };

        this.handleChange = this.onEditorChange.bind(this);
    }

    onEditorChange(e) {
        this.setState({
            content: this.marked.parse(e.target.value)
        });
    }

    render () {
        const styling ={
            overflow: 'auto',
            border: '1px solid #eee',
            borderRadius: 3,
            marginTop: 15,
            padding: '10px',
            minHeight: 600,
            maxHeight: 800
        };

        return (
            <Container fluid={true} style={{height: '100%', margin: '5px'}}>
                <Row className="mt-5">
                    <Col md={6}>
                        <h4><FontAwesomeIcon icon={['fab','markdown']} /> Editor</h4>
                        <fieldset className="editorWrap" style={styling}>
                            <textarea 
                                id="editor" 
                                rows={50} 
                                defaultValue={this.props.initContent}
                                multiple
                                onChange={this.handleChange}
                                autoFocus
                            />
                        </fieldset>
                    </Col>
                    <Col md={6}>
                        <h4><FontAwesomeIcon icon={['fab','html5']}/> Preview</h4>
                        <fieldset id="preview" style={styling}>
                            {Parser(this.state.content)}
                        </fieldset>
                    </Col>
                </Row>
            </Container>
        );
    }
}

