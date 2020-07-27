import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import './Palette.css';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    colors: {
        height: "90%"
    }
}

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {level: 500, format: "hex"};
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        this.setState({level});
    }
    changeFormat(val) {
        this.setState({format: val});
    }
    render() {
        const {classes} = this.props;
        const {colors, paletteName, emoji, id} = this.props.palette;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                colorId={color.id}
                paletteId={id}
                showFullPalette
            />
        ));
        return(
            <div className={classes.Palette}>
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showAllColors
                />
                <div className={classes.colors}>
                    {/*Bunch of color boxes*/}
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette);