import { Box, Button, Container } from "@chakra-ui/react";
// import { addProduct, deleteProduct, useProductsListener } from "../../config/firebase";
import { useProductsListener } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../redux/productSlice";

const Home = () => {
    useProductsListener();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    return (
        <Container>
            <Button className="my-2" onClick={() => dispatch(addProduct())}>
                add Product
            </Button>
            <Box>
                {products?.map((product) => (
                    <div key={product.id} className="my-8">
                        <h2 className="font-semibold">{product.name}</h2>
                        <h2 className="font-semibold">{product.price}</h2>
                        <h2 className="font-semibold">{product.description}</h2>
                        <Button onClick={() => dispatch(deleteProduct(product.id))}>deleteProduct</Button>
                    </div>
                ))}
            </Box>
        </Container>
    );
};

export default Home;
