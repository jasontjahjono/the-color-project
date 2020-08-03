import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default function PaletteMetaForm(props) {
    const {handleSubmit, palettes, hideForm} = props;
    const [open] = useState(true);
    const [newPaletteName, setName] = useState("");

    const handlePaletteChange = (evt) => {
        setName(evt.target.value);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            palettes.every( ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    });

    return (
        <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new beautiful palette. Make sure
                        it's unique
                    </DialogContentText>
                    <Picker />
                    <TextValidator
                        label="Palette Name"
                        fullWidth
                        margin="normal"
                        value={newPaletteName}
                        onChange={handlePaletteChange}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["Enter Palette Name", "Name already used"]}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}