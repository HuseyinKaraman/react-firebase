import { Box, Button, Container } from "@chakra-ui/react";
import { addProduct, deleteProduct, useProductsListener } from "../../config/firebase";

const Home = () => {
    const products = useProductsListener();

    return (
        <Container>
            <Button className="my-2" onClick={() => addProduct()}>
                add Product
            </Button>
            <Box>
                {products?.map((product) => (
                    <div key={product.id} className="my-8">
                        <h2 className="font-semibold">{product.name}</h2>
                        <h2 className="font-semibold">{product.price}</h2>
                        <h2 className="font-semibold">{product.description}</h2>
                        <Button onClick={() => deleteProduct(product.id)}>deleteProduct</Button>
                    </div>
                ))}
            </Box>
        </Container>
    );
};

export default Home;
