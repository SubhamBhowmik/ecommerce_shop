import { Box, makeStyles, Typography } from '@material-ui/core';
import { navData } from '../../constant/data';
import { useDispatch } from 'react-redux';
import { getProductsByCategory } from '../../redux/actions/productActions';

const useStyle = makeStyles(theme => ({
    component: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '55px 130px 0 130px',
        overflowX: 'overlay',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    container: {
        padding: '30px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f5'
        }
    },
    image: {
        width: 64
    },
    text: {
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit'
    }
}));

const NavBar = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const handleCategoryClick = (category) => {
        dispatch(getProductsByCategory(category));
    };

    return (
        <Box className={classes.component}>
            {
                navData.map((temp, index) => (
                    <Box 
                        key={index}
                        className={classes.container}
                        onClick={() => handleCategoryClick(temp.text)}
                    >
                        <img src={temp.url} className={classes.image} alt={temp.text} />
                        <Typography className={classes.text}>{temp.text}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default NavBar;