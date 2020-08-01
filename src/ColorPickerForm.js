import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles = {
    root: {
        width: "100%"
    },
    picker: {
        width: "100% !important",
        marginTop: "2rem"
    },
    addColor: {
        width: "100%",
        padding: "0.5rem",
        marginTop: "1rem",
        fontSize: "1.2rem"
    },
    colorNameInput: {
        width: "100%",
        height: 50
    }
}

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
            ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', () =>
            this.props.colors.every( ({color}) => color !== this.state.currentColor )
        );
    }
    updateCurrentColor(newColor) {
        this.setState({currentColor: newColor.hex});
    }
    handleColorChange(evt) {
        this.setState({
            newColorName: evt.target.value
        });
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.createColor(newColor);
        this.setState({newColorName: ""});
    }
    render() {
        const {isPaletteFull, classes} = this.props;
        const {currentColor, newColorName} = this.state;
        return (
            <div className={classes.root}>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                <TextValidator
                    value={newColorName}
                    variant="filled"
                    label="Color Name"
                    margin="normal"
                    onChange={this.handleColorChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={[
                    'Enter a color name',
                    'Color name must be unique',
                    'Color already used'
                    ]}
                    className={classes.colorNameInput}
                    // InputProps={{
                    //     className: classes.colorNameInput
                    // }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isPaletteFull}
                    style={{
                    backgroundColor: isPaletteFull
                        ? "grey"
                        : currentColor
                    }}
                    className={classes.addColor}
                >
                    {isPaletteFull ? "Palette Full" : "Add Color"}
                </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);
