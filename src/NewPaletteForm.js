import React, {useState} from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {arrayMove} from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const {maxColors, savePalette, history, palettes} = props;
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const isPaletteFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createColor = (newColor) => {
    setColors([...colors, newColor]);
  }

  const handleSubmit = (newPalette) => {
    newPalette.colors = colors;
    savePalette(newPalette);
    history.push("/");
  }

  const removeColor = (colorName) => {
    setColors(colors.filter(color => color.name !== colorName));
  }

  const clearColors = () => {
    setColors([]);
  }

  const addRandomColor = () => {
    const allColors = palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  }

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
          <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={addRandomColor}
                disabled={isPaletteFull}
                className={classes.button}
              >
                Random Color
              </Button>
          </div>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            createColor={createColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={5}
        />
      </main>
    </div>
  );
};

NewPaletteForm.defaultProps = {
  maxColors: 20
}