import sizes from './sizes';
import chroma from 'chroma-js';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-5.2px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%",
        }
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0px",
        bottom: "0px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        color: props => chroma(props.color).luminance() <= 0.085
            ? "rgba(255,255,255,0.8)"
            : "rgba(0,0,0,0.6)",
        [sizes.down("sm")]: {
            padding: "0 3px",
            fontSize: "10px"
        }
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out",
        [sizes.down("sm")]: {
            fontSize: "1.3rem",
            marginBottom: "2px"
        }
    }
};

export default styles;