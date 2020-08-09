import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import styles from './styles/PaletteStyles';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: "hex"
        };
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, color) {
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(c => c.id === color)
            );
        }
        return shades.slice(1);
    }
    changeFormat(val) {
        this.setState({format: val});
    }
    render() {
        const {format} = this.state;
        const {classes} = this.props;
        const {paletteName, emoji, id} = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name} background={color[format]} showFullPalette={false}/>
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showAllColors={false}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);