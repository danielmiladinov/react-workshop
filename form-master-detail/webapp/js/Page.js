/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms', 'wingspan-cursor', 'wingspan-contrib',
    'util',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, $, Forms, Cursor, Contrib,
             util, ContactModel, contacts) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var contacts = JSON.parse(contacts).data;

    var FormField = Forms.FormField;
    var AutoField = Forms.AutoField;
    var AutoControl = Forms.AutoControl;

    var AutoForm = React.createClass({
        getDefaultProps: function () {
            return {
                metadata: {},
                form: {},
                onChange: function (fieldName, fieldValue) {}
            }
        },
        render: function () {
            var controls = _.map(this.props.metadata, function (fieldInfo) {
                return (
                    <AutoField
                        fieldInfo={fieldInfo}
                        value={this.props.form[fieldInfo.name]}
                        onChange={_.partial(this.props.onChange, fieldInfo.name)} />
                );
            }.bind(this));
            return (
                <div>
                    {controls}
                </div>
            );
        }
    });

    var App = React.createClass({
        getInitialState: function () {
            return {
                "firstName": '',
                "lastName": '',
                "phoneNumber": '',
                "email": '',
                "contactGroup": 'friend',
                "id": "12345",
                "revision": 1
            };
        },

        onChange: function (fieldName, fieldValue) {
            var nextState = {};
            nextState[fieldName] = fieldValue;
            this.setState(nextState);
        },

        render: function () {
            window.App = this;

            return (
                <div className="App">
                    <AutoForm
                        metadata={ContactModel.properties}
                        form={this.state}
                        onChange={this.onChange} />
                    <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
            );
        }
    });


    window.Cursor = Cursor;
    window.util = util;

    function entrypoint(rootEl) {
        React.renderComponent(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});