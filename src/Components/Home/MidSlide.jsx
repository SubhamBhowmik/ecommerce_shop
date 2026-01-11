import { Box, makeStyles } from '@material-ui/core';
import Slide from './Slide';

const useStyle = makeStyles(theme => ({
    component: {
        display: 'flex'
    },
    leftComponent: {
        width: '83%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    rightComponent: {
        paddingTop: 80,
        background: '#FFFFFF',
        width: '17%',
        marginLeft: 10,
        padding: 5,
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    }
}));

const MidSlide = ({ products }) => {
    const classes = useStyle();
    const adURL = 'https://cdn.w600.comps.canstockphoto.com/online-shopping-sale-deals-discounts-image_csp71198275.jpg';

    return (
        <Box className={classes.component}>
            <Box className={classes.leftComponent}>
                <Slide 
                    data={products} 
                    title='Deals of the Day'
                    timer={true} 
                    multi={true} 
                />
            </Box>
            <Box className={classes.rightComponent}>
                <img src={adURL} style={{width: 232}}/>
            </Box>
        </Box>
    )
}

export default MidSlide;