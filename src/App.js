import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import NewPaletteForm from "./NewPaletteForm";
import {generatePalette} from "./colorHelpers";

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    };
    this.savePalette = this.savePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage);
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }
  render() {
    return (
      <Switch>      
        <Route exact path="/" render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />}/>
        <Route exact path="/palette/new" render={(routeProps) =>
          <NewPaletteForm palettes={this.state.palettes} savePalette={this.savePalette} {...routeProps}/>}
        />
        <Route 
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette palette={generatePalette(
              this.findPalette(routeProps.match.params.id)
            )}/>
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              colorId={routeProps.match.params.colorId}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
