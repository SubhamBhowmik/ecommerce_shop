import { Box, Grid, Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Star } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
    component: {
        marginTop: 20,
        padding: '20px 130px',
        background: '#F2F2F2',
        [theme.breakpoints.down('md')]: {
            padding: '20px 20px'
        }
    },
    header: {
        padding: '15px 20px',
        background: '#FFFFFF',
        display: 'flex',
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 600,
        color: '#212121'
    },
    gridContainer: {
        marginTop: 10
    },
    card: {
        background: '#FFFFFF',
        borderRadius: 0,
        transition: 'all 0.3s',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)'
        }
    },
    cardMedia: {
        height: 200,
        objectFit: 'contain',
        padding: 10
    },
    cardContent: {
        padding: '15px !important'
    },
    productName: {
        fontSize: 14,
        fontWeight: 600,
        color: '#212121',
        marginBottom: 5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
    },
    price: {
        fontSize: 18,
        fontWeight: 600,
        color: '#212121',
        marginTop: 5
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
        fontSize: 12,
        color: '#878787'
    },
    star: {
        fontSize: 14,
        color: '#FFC120',
        marginRight: 3
    },
    subcategory: {
        fontSize: 12,
        color: '#878787',
        marginTop: 5
    },
    stock: {
        fontSize: 12,
        color: '#388E3C',
        marginTop: 5,
        fontWeight: 600
    }
}));

const ProductList = ({ products, category }) => {
    const classes = useStyle();

    if (!products || products.length === 0) {
        return (
            <Box className={classes.component}>
                <Box className={classes.header}>
                    <Typography className={classes.title}>
                        {category ? `${category} Products` : 'Products'}
                    </Typography>
                </Box>
                <Typography style={{ textAlign: 'center', padding: 40, color: '#878787' }}>
                    No products found
                </Typography>
            </Box>
        );
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.header}>
                <Typography className={classes.title}>
                    {category ? `${category} Products` : 'All Products'} ({products.length})
                </Typography>
            </Box>
            <Grid container spacing={3} className={classes.gridContainer}>
                {products.map((product) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    className={classes.cardMedia}
                                    image={product.url || (product.images && product.images[0]) || ''}
                                    alt={product.name || product.title?.shortTitle || 'Product'}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                                    }}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.productName}>
                                        {product.name || product.title?.shortTitle || 'Product'}
                                    </Typography>
                                    {product.subcategory && (
                                        <Typography className={classes.subcategory}>
                                            {product.subcategory}
                                        </Typography>
                                    )}
                                    <Typography className={classes.price}>
                                        ₹{product.originalPrice || product.price?.cost || product.price || 0}
                                    </Typography>
                                    {product.rating > 0 && (
                                        <Box className={classes.rating}>
                                            <Star className={classes.star} />
                                            <Typography>{product.rating}</Typography>
                                            {product.reviews > 0 && (
                                                <Typography style={{ marginLeft: 5 }}>
                                                    ({product.reviews} reviews)
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                    {product.stock !== undefined && (
                                        <Typography className={classes.stock}>
                                            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;

