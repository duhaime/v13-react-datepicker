var React = require( "react" );
var DateUtil = require( "./util/date" );
var moment = require( "moment" );

var DateInput = React.createClass( {

  getDefaultProps: function() {
    return {
      dateFormat: "YYYY-MM-DD",
      className: "datepicker__input",
      onBlur: function() {}
    };
  },

  safeDateFormat: function(date) {
    return !!date ? date.format(this.props.dateFormat) : null;
  },

  componentWillMount: function() {
    this.setState({
        maybeDate: this.safeDateFormat(this.props.date)
    });
  },

  componentDidMount: function() {
    this.toggleFocus( this.props.focus );
  },

  componentWillReceiveProps: function( newProps ) {
    console.log("sending new props:", newProps, this);
    this.toggleFocus( newProps.focus );

    if (newProps.date != this.props.date) {
      console.log("updating maybeDate");
      this.setState({
        maybeDate: this.safeDateFormat(newProps.date)
      });
    }
  },

  toggleFocus: function( focus ) {
    if ( focus ) {
      React.findDOMNode( this.refs.input ).focus();
    } else {
      React.findDOMNode( this.refs.input ).blur();
    }
  },

  handleChange: function( event ) {
    console.log( "sent change", event.target.value, this );
    var value = event.target.value;
    var date = moment( value, this.props.dateFormat, true );

    if ( date.isValid() ) {
      console.log("date is valid", date);
      this.props.setSelected( new DateUtil( date ) );
    } else {
        
      // if the value is empty, erase the selected value,
      // else update the selected value
      if ( value === "" ) {
        this.props.clearSelected();
      } else {
        console.log("date is not valid", value, date);
        
        this.setState({
          maybeDate: value
        });

      }
    }
  },

  handlsafeDateFormat: function( date ) {
    return !!date ? date.format( this.props.dateFormat ) : null;
  },

  handleKeyDown: function( event ) {
    console.log( "sent keydown", event.key, this );
    switch ( event.key ) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    case "Escape":
      event.preventDefault();
      this.props.hideCalendar();
      break;
    }
  },

  handleClick: function( event ) {
    if ( !this.props.disabled ) {
      this.props.handleClick( event );
    }
  },

  render: function() {
    return <input
        ref="input"
        type="text"
        name={this.props.name}
        value={this.state.maybeDate}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onChange={this.handleChange}
        className={this.props.className}
        disabled={this.props.disabled}
        placeholder={this.props.placeholderText}
        readOnly={this.props.readOnly}
        required={this.props.required} />;
  }
} );

module.exports = DateInput;
